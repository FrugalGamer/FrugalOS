import { getClass } from "../../maki/objects";
import { ParsedMaki } from "../../maki/parser";
import BaseObject from "./BaseObject";
import Container from "./Container";
import { clamp, integerToTime, unimplemented } from "../../utils";
import Group from "./Group";
import PRIVATE_CONFIG from "../PrivateConfig";
import { UIRoot } from "../../UIRoot";
import GuiObj from "./GuiObj";
import Config from "./Config";
import WinampConfig from "./WinampConfig";

import {
  AUDIO_PAUSED,
  AUDIO_STOPPED,
  AUDIO_PLAYING,
  Track,
} from "../AudioPlayer";
import Application from "./Application";

const MOUSE_POS = { x: 0, y: 0 };

// TODO: Figure out how this could be unsubscribed eventually
document.addEventListener("mousemove", (e: MouseEvent) => {
  // https://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y
  MOUSE_POS.x = e.pageX;
  MOUSE_POS.y = e.pageY;
});

export default class SystemObject extends BaseObject {
  static GUID = "d6f50f6449b793fa66baf193983eaeef";
  _uiRoot: UIRoot;
  _parentGroup: Group;
  _parsedScript: ParsedMaki;
  _param: string;
  _id: string;

  constructor(
    uiRoot: UIRoot,
    parsedScript: ParsedMaki,
    param: string,
    id: string
  ) {
    super();
    this._uiRoot = uiRoot;
    this._parsedScript = parsedScript;
    this._param = param;
    this._id = id; // useful while debuggin
    this._uiRoot.audio.onSeek(() => {
      this._uiRoot.vm.dispatch(this, "onseek", [
        {
          type: "INT",
          value: this._uiRoot.audio.getCurrentTimePercent() * 255,
        },
      ]);
    });
    this._uiRoot.audio.on("play", () =>
      this._uiRoot.vm.dispatch(this, "onplay", [])
    );
    this._uiRoot.audio.on("pause", () =>
      this._uiRoot.vm.dispatch(this, "onpause", [])
    );
    this._uiRoot.audio.on("stop", () =>
      this._uiRoot.vm.dispatch(this, "onstop", [])
    );
    // this._uiRoot.audio.onPlay(() => this._uiRoot.vm.dispatch(this, "onplay", []));
    this._uiRoot.audio.onVolumeChanged(() => {
      this._uiRoot.vm.dispatch(this, "onvolumechanged", [
        { type: "INT", value: this._uiRoot.audio.getVolume() * 255 },
      ]);
    });
    const EqBandHandle = (band: number) => {
      // console.log('eq.changed:',band, this._uiRoot.audio.getEq(String(band)))
      this._uiRoot.vm.dispatch(this, "oneqbandchanged", [
        { type: "INT", value: band - 1 },
        {
          type: "INT",
          value: this._uiRoot.audio.getEq(String(band)) * 255 - 127,
        },
      ]);
    };
    this._uiRoot.audio.onEqChange("1", () => EqBandHandle(1));
    this._uiRoot.audio.onEqChange("2", () => EqBandHandle(2));
    this._uiRoot.audio.onEqChange("3", () => EqBandHandle(3));
    this._uiRoot.audio.onEqChange("4", () => EqBandHandle(4));
    this._uiRoot.audio.onEqChange("5", () => EqBandHandle(5));
    this._uiRoot.audio.onEqChange("6", () => EqBandHandle(6));
    this._uiRoot.audio.onEqChange("7", () => EqBandHandle(7));
    this._uiRoot.audio.onEqChange("8", () => EqBandHandle(8));
    this._uiRoot.audio.onEqChange("9", () => EqBandHandle(9));
    this._uiRoot.audio.onEqChange("10", () => EqBandHandle(10));
    this._uiRoot.audio.onEqChange("preamp", () => {
      this._uiRoot.vm.dispatch(this, "oneqpreampchanged", [
        { type: "INT", value: this._uiRoot.audio.getEq("preamp") * 255 - 127 },
      ]);
    });
  }

  init() {
    // dumpScriptDebug(this._parsedScript);
    // console.log('initing script:', this._id)
    const initialVariable = this._parsedScript.variables[0];
    if (initialVariable.type !== "OBJECT") {
      throw new Error("First variable was not SystemObject.");
    }
    initialVariable.value = this;

    for (const vari of this._parsedScript.variables) {
      if (vari.type == "OBJECT") {
        if (vari.guid == Config.GUID) {
          vari.value = this._uiRoot.CONFIG;
        } else if (vari.guid == WinampConfig.GUID) {
          vari.value = this._uiRoot.WINAMP_CONFIG;
        } else if (vari.guid == Application.GUID) {
          vari.value = this._uiRoot.APPLICATION;
        }
      }
    }

    this._uiRoot.vm.addScript(this._parsedScript);
    this._uiRoot.vm.dispatch(this, "onscriptloaded");
  }

  dispose() {
    this._uiRoot.vm.dispatch(this, "onscriptunloading");
  }

  setParentGroup(group: Group) {
    this._parentGroup = group;
  }

  hasvideosupport(): number {
    return unimplemented(0);
  }
  /* Required for Maki */
  getruntimeversion(): number {
    return 5.666;
  }

  getskinname(): string {
    return this._uiRoot.getSkinName();
  }
  getwinampversion(): string {
    return this._uiRoot.APPLICATION.getversionstring();
  }

  /**
   * This returns the X position of the mouse in the screen,
   * using the screen coordinate system.
   *
   * @ret The mouse's current X pos.
   */
  getmouseposx(): number {
    return unimplemented(MOUSE_POS.x);
  }

  /**
   * This returns the Y position of the mouse in the screen,
   * using the screen coordinate system.
   *
   * @ret The mouse's current Y pos.
   */
  getmouseposy(): number {
    return unimplemented(MOUSE_POS.y);
  }

  /**
   * Read a private config entry of Integer type. Returns
   * the specified default value if the section and item isn't
   * found.
   *
   * @ret           The value of the config entry.
   * @param  section   The section from which to read the entry.
   * @param  item      The name of the item to read.
   * @param  defvalue  The defautl value to return if no item is found.
   */
  getprivateint(section: string, item: string, defvalue: number): number {
    return PRIVATE_CONFIG.getPrivateInt(section, item, defvalue);
  }

  /**
   * Int
   * StringToInteger()
   *
   * Get the integer representation of a string.
   *
   * @ret     The integer equivalent of the string.
   * @param  str The string to change into an integer.
   */
  stringtointeger(str: string): number {
    // TODO: Confirm if this should be round/ceil/floor
    if (str == "") return 0;
    return Math.floor(parseFloat(str));
  }

  /**
   * String
   * floatToString()
   *
   * Get the string representation of a floating point number.
   *
   * @ret         The string representation of the float number.
   * @param  value   The float to convert.
   * @param  ndigits Number of digits after the decimal point you want.
   */
  floattostring(value: number, ndigits: number): string {
    return value.toFixed(ndigits);
  }

  /**
   * Float
   * stringToFloat()
   *
   * Get the floating point representation of a string.
   *
   * @ret     The float representation of the string.
   * @param  str The string to convert.
   */
  stringtofloat(str: string): number {
    return Number(str);
  }

  /**
   * String
   * integerToLongTime()
   *
   * Convert a time in seconds to a H:MM:SS value.
   *
   * @ret       The string representation of the time (H:MM:SS).
   * @param  value Timestamp to use.
   */
  integertolongtime(value: number) {
    // TODO
  }

  /**
   * String
   * prints the time from a date with the same format as integerToTime
   * @param datetime
   */
  datetotime(datetime: number) {
    // TODO
  }

  /**
   * String
   * prints the time from a date with the same format as integerToLongTime
   * @param datetime
   */
  datetolongtime(datetime: number) {
    // TODO
  }

  /**
   * String
   * formats the date according to the locales - short date format
   * @param datetime
   */
  formatdate(datetime: number) {
    // TODO
  }
  /**
   * String
   * formats the date according to the locales - long date format
   * @param datetime
   */
  formatlongdate(datetime: number) {
    // TODO
  }

  /**
   * Int
   * returns the datetime's year since 1900
   * @param datetime
   */
  getdateyear(datetime: number) {
    // TODO
  }

  /**
   * Int
   * returns the datetime's month (0-11)
   * @param datetime
   */
  getdatemonth(datetime: number) {
    // TODO
  }

  /**
   * Int
   * returns the datetime's day of the month (1-31)
   * @param datetime
   */
  getdateday(datetime: number) {
    // TODO
  }

  /**
   * Int
   * returns the datetime's day of the week (0-6)
   * @param datetime
   */
  getdatedow(datetime: number) {
    // TODO
  }

  /**
   * Int
   * returns the datetime's day of the year (0-365)
   * @param datetime
   */
  getdatedoy(datetime: number) {
    // TODO
  }

  /**
   * Int
   * returns the datetime's hour (0-23)
   * @param datetime
   */
  getdatehour(datetime: number) {
    // TODO
  }

  /**
   * Int
   * returns the datetime's minutes (0-59)
   * @param datetime
   */
  getdatemin(datetime: number) {
    // TODO
  }

  /**
   * Int
   * returns the datetime's seconds (0-59)
   * @param datetime
   */
  getdatesec(datetime: number) {
    // TODO
  }

  /**
   * Int
   * returns the datetime's daylight savings flag
   * @param datetime
   */
  getdatedst(datetime: number) {
    // TODO
  }

  /**
   * Int
   * returns the datetime, use with the above functions
   * @param datetime
   */
  getdate() {
    // TODO
  }

  /**
   * strmid()
   *
   * Get a substring from a string.
   *
   * @ret       The substring.
   * @param  str   The string.
   * @param  start The start position.
   * @param  len   The length of the string to extract, from start position.
   */
  strmid(str: string, start: number, len: number): string {
    return str.slice(start, start + len);
  }

  /**
   * strleft()
   *
   * Get a substring from a string, starting from the left.
   *
   * @ret         The substring.
   * @param  str     The string.
   * @param  nchars  The length of the string to extract, from the left.
   */
  strleft(str: string, nchars: number): string {
    return str.slice(0, nchars);
  }

  /**
   * strright()
   *
   * Get a substring from a string, starting from the right. Since
   * the start point is the right of the string (or the end). It will
   * extract the string starting from the END going towards the BEGINNING.
   *
   * @ret         The substring.
   * @param  str     The string.
   * @param  nchars  The length of the string to extract, from the right.
   */
  strright(str: string, nchars: number): string {
    // TODO: Validate that this is correct
    return str.slice(str.length - nchars);
  }

  /**
   * strsearch()
   *
   * Search a string for any occurance of substring. If the substring was
   * found in the string, it will return the position of the substring in
   * the string searched. If the substring is not found, the return value
   * is -1.
   *
   * @ret         Position at which the substring was found.
   * @param  str     The string to search in.
   * @param  substr  The substring to find.
   */
  strsearch(str: string, substr: string): number {
    return str.indexOf(substr);
  }

  /**
   * Int
   * strlen()
   *
   * Returns the length of the string.
   *
   * @ret     The length of the string.
   * @param  str The string.
   */
  strlen(str: string): number {
    return str ? str.length : 0;
  }

  /**
   * strupper()
   *
   * Convert a string to all uppercase.
   *
   * @ret     The uppercase string.
   * @param  str The string to uppercase.
   */
  strupper(str: string): string {
    return str.toUpperCase();
  }

  /**
   * strlower()
   *
   * Convert a string to all lowercase.
   *
   * @ret     The lowercase string.
   * @param  str The string to lowercase.
   */
  strlower(str: string): string {
    return str.toLowerCase();
  }

  /**
   * urlEncode()
   *
   * URL Encode a string. Characters that are NOT encoded
   * are: All letters, All digits, underscore (_), dash (-) and
   * period (.).
   *
   * @ret       The URL encoded string.
   * @param  url   The string to URL encode.
   */
  urlencode(url: string) {
    // TODO
  }

  /**
   * Requires 5.54
   * @param url
   */
  urldecode(url: string) {
    // TODO
  }

  /**
   * setPrivateString()
   *
   * Create a private config entry for your script, of String type.
   *
   * @param  section   The section for the entry.
   * @param  item      The item name for the entry.
   * @param  value     The value of the entry.
   */
  setprivatestring(section: string, item: string, value: string) {
    // TODO
  }

  /**
   * Create a private config entry for your script, of Int type.
   *
   * @param  section   The section for the entry.
   * @param  item      The item name for the entry.
   * @param  value     The value of the entry.
   */
  setprivateint(section: string, item: string, value: number) {
    PRIVATE_CONFIG.setPrivateInt(section, item, value);
  }

  /**
   * getPrivateString()
   *
   * Read a private config entry of String type. Returns
   * the specified default value if the section and item isn't
   * found.
   *
   * @ret           The value of the config entry.
   * @param  section   The section from which to read the entry.
   * @param  item      The name of the item to read.
   * @param  defvalue  The default value to return if no item is found.
   */
  getprivatestring(section: string, item: string, defvalue: string) {
    return PRIVATE_CONFIG.getPrivateString(section, item, defvalue);
  }

  setpublicstring(item: string, value: string) {
    // TODO
  }

  /**
   * setPublicInt()
   *
   * Create a public config entry for your script, of Int type.
   *
   * @param  item  The item name of the entry.
   * @param  value The value of the entry.
   */
  setpublicint(item: string, value: number) {
    // TODO
  }

  /**
   * getPublicString()
   *
   * Read a public config entry of String type. Returns
   * the specified default value if the item isn't found.
   *
   * @ret           The value of the config entry.
   * @param  item      The item name to read.
   * @param  defvalue  The default value to return if no item is found.
   */
  getpublicstring(item: string, defvalue: string) {
    // TODO
  }

  /**
   * Int
   * getPublicInt()
   *
   * Read a public config entry of Integer type. Returns
   * the specified default value if the item isn't found.
   *
   * @ret           The value of the config entry.
   * @param  item      The item name to read.
   * @param  defvalue  The default value to return if no item is found.
   */
  getpublicint(item: string, defvalue: number) {
    // TODO
  }

  /**
   * getParam()
   *
   * Get the parameters with which the script is called.
   * This is the 'param="..."' attribute in the <script ...>
   * skin XML tag.
   *
   * @ret The parameter for the script.
   */
  getparam(): string {
    return this._param;
  }

  /**
   * getScriptGroup()
   *
   * Get the group in which the script is instantiated. Returns
   * Null if it's not instantiated in a group.
   *
   * @ret
   */
  getscriptgroup(): Group {
    return this._parentGroup;
  }

  /**
   * Read the current time of the day. Returns a number that's
   * the number of milliseconds since the start of the day (0:00).
   *
   * @ret The number of milliseconds since midnight.
   **/
  gettimeofday(): number {
    const date = new Date();
    const dateTime = date.getTime();
    const dateCopy = new Date(dateTime);
    return dateTime - dateCopy.setHours(0, 0, 0, 0);
  }

  /**
   * @ret                 The requested container.
   * @param  container_id    The containers identifier string.
   **/
  getcontainer(containerId: string): Container {
    const lower = containerId.toLowerCase();
    for (const container of this._uiRoot.getContainers()) {
      if (container.getId() === lower) {
        return container;
      }
    }
    throw new Error(`Could not find a container with the id; "${containerId}"`);
  }

  /**
   * Container
   * newDynamicContainer()
   *
   * @ret                 The new container.
   * @param  container_id    The identifier for the container you want to create.
   */
  newdynamiccontainer(container_id: string): Container {
    //TODO
    return unimplemented(null)
  }

  /**
   * Group
   * newGroup()
   *
   * @ret             The new group.
   * @param  group_id    The identifier for the group you want to create.
   */
  newgroup(group_id: string): Group {
    return this._parentGroup.findobject(group_id) as Group;
  }

  /**
   * @param group_id
   */
  newgroupaslayout(group_id: string) {
    //TODO
  }

  /**
   * Int
   * getNumContainers()
   *
   * Get the number of containers currently created.
   *
   * @ret The number of containers.
   */
  getnumcontainers(): number {
    return this._uiRoot.getContainers().length;
  }

  /**
   * Container
   * enumContainer()
   *
   * Returns the name of the container associated with it's number.
   * Use getNumContainers() to fetch the number of containers present.
   * The containers are numbered from 0 to the value returned by getNumContainers().
   *
   * @ret       The name of the specified container.
   * @param  num   The container's number for which you want to know the name.
   */
  enumcontainer(num: number) {
    return this._uiRoot._containers[num];
  }

  /**
   *
   * @param num
   */
  enumembedguid(num: number) {
    //TODO
  }

  /**
   * deprecated, Wac
   * getWac()
   *
   * Gets the reference to the wac identified by the guid sent.
   *
   * @ret The requested WAC.
   * @param  wac_guid  The WAC's GUID.
   */
  getwac(wac_guid: string) {
    //TODO
  }

  /**
   * Get the value of the left vu meter.
   * Range is from 0 to 255. Linear.
   *
   * @ret The value of the left vu meter.
   */
  getleftvumeter(): number {
    return this._uiRoot.audio._vuMeter * 255;
  }

  /**
   * Get the value of the right vu meter.
   * Range is from 0 to 255. Linear.
   *
   * @ret The value of the right vu meter.
   */
  getrightvumeter(): number {
    return this._uiRoot.audio._vuMeter * 255;
  }

  /**
   * Get the current volume. Range is from 0 to 255.
   *
   * @ret The current volume.
   **/
  getvolume(): number {
    return this._uiRoot.audio.getVolume() * 255;
  }

  /**
   * Set the volume to the desired value.
   * Range is from 0 to 255.
   *
   *  @param vol  The desired volume value.
   */
  setvolume(_vol: number) {
    const vol = clamp(_vol, 0, 255);

    this._uiRoot.audio.setVolume(vol / 255);
  }

  /**
   * play()
   *
   * Trigger the play event.
   */
  play() {
    this._uiRoot.audio.play();
  }

  /**
   * stop()
   *
   * Trigger the stop event.
   */
  stop() {
    this._uiRoot.audio.stop();
  }

  /**
   * pause()
   *
   * Trigger the pause event.
   */
  pause() {
    this._uiRoot.audio.pause();
  }

  /**
   * next()
   *
   * Trigger the next event.
   */
  next() {
    this._uiRoot.next();
  }

  /**
   * previous()
   *
   * Trigger the previous event.
   */
  previous() {
    this._uiRoot.previous();
  }

  /**
   * eject()
   *
   * Trigger the eject event.
   */
  eject() {
    this._uiRoot.eject();
  }

  /**
   * messageBox()
   *
   * Creates a message box.
   * The flag paramater lets you set the style of the message box.
   * Just use the OR bitwise operator to set the style you want.
   * Here's a list of the flags you can use:
   *
   * MSGBOX_OK         Adds an OK button.      (1)
   * MSGBOX_CANCEL     Adds a CANCEL button.   (2)
   * MSGBOX_YES        Adds a YES button.      (4)
   * MSGBOX_NO         Adds a NO button.       (8)
   * MSGBOX_ALL        Adds ALL buttons.       (16)
   * MSGBOX_NEXT       Adds a NEXT button.     (32)
   * MSGBOX_PREVIOUS   Adds a PREVIOUS button. (64)
   *
   * Note that the notanymore_id parameter stores the users answer in the
   * configuration file with the entry name specified by it's value.
   *
   * @ret   The value of the button that was pressed (example: if OK is pressed, 1 is returned).
   * @param    message         The message you want to display.
   * @param    msgtitle        The title of the message box.
   * @param    flag            The message box style you want.
   * @param    notanymore_id   Configuration item name in which to store the users answer.
   */
  messagebox(
    message: string,
    msgtitle: string,
    flag: number,
    notanymore_id: string
  ) {
    // TODO
  }

  // #region //? Track method =========================================
  _currentTrack(): Track {
    return this._uiRoot.playlist.currentTrack();
  }
  /**
   * getPlayItemString()
   *
   * @ret The name of what is playing.
   */
  getplayitemstring(): string {
    return unimplemented("Niente da Caprie");
  }

  getplaylistlength(): number {
    return this._uiRoot.playlist.getnumtracks();
  }

  getplaylistindex(): number {
    return this._uiRoot.playlist.getcurrentindex();
  }

  /**
   * getPlayItemMetaDataString()
   *
   * Get metadata for the track currently playing. Make sure to wrap metadataname in double quotes -> ".
   * The metadata field names that are available are the following:
   *
   * title
   * album
   * artist
   * albumartist
   * comment
   * year
   * composer
   * bitrate
   * srate
   * stereo
   * vbr
   * replaygain_track_gain
   * replaygain_album_gain
   * replaygain_track_peak
   * replaygain_album_peak
   * gain
   * genre
   * track
   * length
   * disc
   * bpm
   * conductor
   * key
   * mood
   * subtitle
   * lyricist
   * ISRC
   * media
   * remixer
   * encoder
   * publisher
   * tool
   * pregap
   * postgap
   * numsamples
   *
   *
   * @ret                 The requested metadata.
   * @param  metadataname    The name of the metadata field you want to read.
   */
  getplayitemmetadatastring(metadataname: string): string {
    return unimplemented("Metadata"); // TODO
  }

  /**
   * Requires 5.53
   * @ret                 The requested metadata.
   * @param  metadataname    The name of the metadata field you want to read.
   */
  getmetadatastring(filename: string, metadataname: string): string {
    return unimplemented("Metadatastring"); // TODO
  }

  /**
   setState2(){
    String currenttitle = System.strlower(System.getPlayItemDisplayTitle());
    
    if(System.strsearch(currenttitle, "[connecting") != -1){
		playstatus.setXmlParam("image", "wa.play.red");
	}
    if(System.strsearch(currenttitle, "[resolving hostname") != -1){
		playstatus.setXmlParam("image", "wa.play.red");
	}
    if(System.strsearch(currenttitle, "[http/1.1") != -1){
		playstatus.setXmlParam("image", "wa.play.red");
	}
    if(System.strsearch(currenttitle, "[buffer") != -1){
		playstatus.setXmlParam("image", "wa.play.red");
	}else{
        if(bitrateint == 0 || bitrateint == -1 && freqint == 0 || freqint == -1){
            playstatus.setXmlParam("image", "wa.play.red"); 
            setPlaysymbol.start();
        }
        if(bitrateint > 0 && freqint > 0){setPlaysymbol.start(); 
            playstatus.setXmlParam("image", "wa.play.green");
        }
    }
}
   */
  /**
   * Get network status of currrent playing items.
   * @returns string
   */
  getplayitemdisplaytitle(): string {
    // taken from  winamp_classic "classicDisplayStatus.m"
    return unimplemented("playitemdisplaytitle"); //What does this really do?
  }

  /**
   * Requires 5.5
   * TODO
   */
  getcurrenttrackrating(): number {
    // TODO
    return unimplemented(1);
  }
  /**
   * Requires 5.5
   * TODO
   * @param rating
   */
  oncurrenttrackrated(rating: number) {
    // TODO
  }

  /**
   * Requires 5.5
   * TODO
   * @param rating
   */
  setcurrenttrackrating(rating: number) {
    // TODO
  }

  /**
   * getExtFamily()
   *
   * This one still return the same as getDecoderName()
   *
   * Gets registered family for given extension (i.e. mp3 -> "Audio")
   *
   * @ret The registered family for given extension.
   * @param ext The extension in question.
   */
  getextfamily(ext: string): string {
    return unimplemented("Audio");
  }

  /**
   *
   * @param playitem
   * @returns Above as getExtFamily(), needs more investigating
   */
  getdecodername(playitem: string): string {
    return "Nullsoft MPEG Decoder v4.103";
  }

  /**
   * Requires 5.54
   * downloadMedia()
   *
   * Hookable. Downloads a file from url and saves it as destination_filename.
   * If destinationPath is "" it will be saved in CD Ripping dir (=getDownloadPath()).
   *
   * @param  url  the file to be downloaded
   * @param  destinationPath  the path you want to store the file
   * @param  wantAddToML  set true if you wnt to add the file to ML database
   * @param  notifyDownloadsList  set true in order to list the download in <DownloadsLis/> Object
   */
  downloadmedia(
    url: string,
    destinationPath: string,
    wantAddToML: boolean,
    notifyDownloadsList: boolean
  ) {
    // TODO
  }

  /**
   * Deprecated, destination_filename is just a dummy parameter as well as progress_dialog_title - use download() instead
   * Requires 5.5
   * @param url
   * @param destination_filename
   * @param progress_dialog_title
   */
  downloadurl(
    url: string,
    destination_filename: string,
    progress_dialog_title: string
  ) {
    // TODO
  }

  /**
   * Requires 5.53
   * @param url
   * @param success
   * @param filename
   */
  ondownloadfinished(url: string, success: boolean, filename: string) {
    // TODO
  }

  /**
   * Requires 5.53
   * @param string returns the CD Ripping Directory
   */
  getdownloadpath(): string {
    return unimplemented("C:\\CD Rips");
  }
  /**
   * Requires 5.53
   * @param new_path Sets the CD Ripping Directory
   */
  setdownloadpath(new_path: string) {
    // TODO
  }

  /**
   * Requires 5.5
   * enqueueFile()
   *
   * Enqueque the requested file. Path and filename are required
   * with proper extension (example: playFile("c:\music\mp3\file.mp3"); ).
   * It also works with URL's (example: playFile("http://myshoutcast.com:8000"); ).
   *
   * @param  playitem  The path and filename to play.
   */
  enqueuefile(playitem: string) {
    // TODO
  }

  /**
   * playFile()
   *
   * Play the requested file. Path and filename are required
   * with proper extension (example: playFile("c:\music\mp3\file.mp3"); ).
   * It also works with URL's (example: playFile("http://myshoutcast.com:8000"); ).
   *
   * @param  playitem  The path and filename to play.
   */
  playfile(playitem: string) {
    // TODO
  }

  /**
   * Requires 5.51
   * @param fullfilename
   */
  getfilesize(fullfilename: string): number {
    return unimplemented(100);
  }

  /**
   * Requires 5.5
   * @param playitem
   * @returns Will return 1 if an album art has been downloaded, otherwise 0
   */
  getalbumart(playitem: string): number {
    return unimplemented(1);
  }

  /**
   * Get the length of the track currently playing, in milliseconds.
   *
   * @ret Length of the track, in seconds.
   */
  getplayitemlength(): number {
    return this._uiRoot.audio.getLength();
  }

  /**
   * Seek to the desired position in the track. Range is from
   * 0 to SONG LENGTH (in milliseconds).
   */
  seekto(pos: number) {
    // Note: For some reason I seem to be getting passed seconds here not MS
    this._uiRoot.audio.seekTo(pos);
  }

  chr(charnum: number): string {
    return String.fromCharCode(charnum);
  }

  integer(d: number): number {
    return Math.round(Number(d));
  }

  frac(d: number): number {
    const i = Math.floor(d);
    return d - i;
  }

  /**
   * Get the string representation of an integer.
   *
   * @ret         The string equivalent of the integer.
   * @param  value   The integer to change into a string.
   */
  integertostring(value: number): string {
    return String(Math.round(value));
  }

  /**
   * Convert a time in seconds to a M:SS value, does not
   * return MM:SS as originally stated.
   *
   * @ret       The string representation of the time (M:SS).
   * @param  value Timestamp to use.
   */
  integertotime(value: number): string {
    return integerToTime(value);
  }

  /**
   * Get the user's screen width in pixels.
   *
   * @ret The width of the user's screen.
   */
  getviewportwidth() {
    return window.document.documentElement.clientWidth;
  }

  /**
   * Requires 5.5
   * Int
   */
  getviewportwidthfromguiobject(g: GuiObj) {
    // TODO
    return unimplemented(100);
  }

  /**
   *
   * @param x
   * @param y
   */
  getviewportwidthfrompoint(x: number, y: number) {
    // TODO
  }

  /**
   * Requires 5.5
   * Int
   */
  getmonitorwidth() {
    return screen.width;
  }

  /**
   * Requires 5.5
   * Int
   * @param x
   * @param y
   */
  getmonitorwidthfrompoint(x: number, y: number) {
    // TODO
  }

  /**
   * Requires 5.631
   * Int
   */
  getmonitorwidthfromguiobject(g: GuiObj) {
    // TODO
  }

  /**
   * getExtension()
   *
   * Gets the extension from a filename. (example:
   * c:\music\mp3\test.mp3 -> mp3)
   * Also works on URLs.
   *
   * @ret    The extension of the filename.
   * @param str The fullpath of a file.
   */
  getextension(str: string): string {
    return unimplemented("mp3");
  }

  /**
   * getToken()
   *
   * Retreive a token from a list of tokens seperated by separator.
   * The index starts at 0, not 1, so be careful.
   * Here's a short example:
   *   getToken("1,2,3,4,5", ",", 3);
   * Would return, 4. If the token you ask for doesn't exist, an
   * empty string is returned.
   *
   * @ret             The token requested.
   * @param  str         The tokenenized string.
   * @param  separator   The separator to use.
   * @param  tokennum    The token to retreive.
   */
  gettoken(str: string, separator: string, tokennum: number): string {
    // getToken("28,39,-56,-84,0,0,1,1", ",", 3) will return "-84"
    const commas = str.split(separator);
    return commas[tokennum] || "";
  }

  /**
   * removePath()
   *
   * Remove the path from a full filename. (example:
   * c:\music\mp3\test.mp3 -> test.mp3)
   * Also works on URLs.
   *
   * @ret    The filename with the path removed.
   * @param str The fullpath of a file.
   */
  removepath(str: string): string {
    return unimplemented("test.mp3");
  }

  /**
   * getPath()
   *
   * Gets the path from a full filename. (example:
   * c:\music\mp3\test.mp3 -> c:\music\mp3)
   * Also works on URLs.
   *
   * @ret    The path with the filename removed.
   * @param str The fullpath of a file.
   */
  getpath(str: string): string {
    return unimplemented("c:\\music\\mp3");
  }

  /**
   * getPosition()
   *
   * Get the current position in the track currently playing,
   * in milliseconds.
   *
   * @ret The current position in the track.
   */
  getposition(): string {
    return String(this._uiRoot.audio.getCurrentTime() * 1000);
  }

  /**
   * getStatus()
   *
   * returns the status of the main player core.
   *
   * @ret STATUS_PAUSED (-1) if paused, STATUS_STOPPED (0) if stopped, STATUS_PLAYING (1) if playing.
   */
  getstatus(): number {
    const audioState = this._uiRoot.audio.getState();
    switch (audioState) {
      case AUDIO_PLAYING:
        return 1;
      case AUDIO_PAUSED:
        return -1;
      case AUDIO_STOPPED:
        return 0;
      default:
        console.warn("Unknown audio state:", audioState);
    }
  }

  /**
   * Get the user's screen height in pixels.
   *
   * @ret The height of the user's screen.
   */
  getviewportheight(): number {
    return window.document.documentElement.clientHeight;
  }

  /**
   * Int
   * Requires 5.5
   */
  getviewportheightfromguiobject(g: GuiObj): number {
    // TODO
    return unimplemented(100);
  }

  /**
   * Requires 5.5
   * Int
   * @param x
   * @param y
   */
  getviewportheightfrompoint(x: number, y: number): number {
    // TODO
  }

  /**
   * Requires 5.5
   * Int
   */
  getmonitorheight(): number {
    return screen.height;
  }

  /**
   * Requires 5.5
   * Int
   * @param x
   * @param y
   */
  getmonitorheightfrompoint(x: number, y: number): number {
    // TODO
  }

  /**
   * Int
   * Requires 5.631
   */
  getmonitorheightfromguiobject(g: GuiObj): number {
    // TODO
  }

  /**
   * Requires 5.631
   * Int
   */
  getmonitorleft(): number {
    // TODO
    return screenLeft;
  }

  /**
   * Int
   * Requires 5.5
   */
  getmonitorleftfromguiobject(g: GuiObj): number {
    // TODO
  }

  /**
   * Requires 5.5
   * Int
   * @param x
   * @param y
   */
  getmonitorleftfrompoint(x: number, y: number): number {
    // TODO
  }

  /**
   * Requires 5.631
   * Int
   */
  getmonitortop(): number {
    // TODO
    return screenTop;
  }

  getviewporttop(): number {
    // TODO: What should this really be?
    return unimplemented(0);
  }

  /**
   * Int
   * Requires 5.631
   */
  getmonitortopfromguiobject(g: GuiObj): number {
    // TODO
  }

  /**
   * Requires 5.631
   * Int
   * @param x
   * @param y
   */
  getmonitortopfrompoint(x: number, y: number): number {
    // TODO
  }

  getviewportleft(): number {
    // TODO: What should this really be?
    return unimplemented(0);
  }

  /**
   * Int
   * Requires 5.5
   */
  getviewportleftfromguiobject(g: GuiObj): number {
    // TODO
    return unimplemented(0);
  }

  /**
   * Requires 5.5
   * Int
   * @param x
   * @param y
   */
  getviewportleftfrompoint(x: number, y: number): number {
    // TODO
  }

  /**
   * Int
   * Requires 5.5
   */
  getviewporttopfromguiobject(g: GuiObj): number {
    // TODO
    return 0;
  }

  /**
   * Int
   * @param x
   * @param y
   */
  getviewporttopfrompoint(x: number, y: number): number {
    // TODO
  }

  /**
   * debugString()
   *
   * Send a debug message to the Wasabi Console.
   * The severity ranges from 0 (not serious) to 9 (very serious).
   *
   * @param  str       The debug message.
   * @param  severity  The severity of the error.
   */
  debugstring(str: string, severity: number) {
    console.log("Wasabi Console:", str);
  }

  /**
   * ddeSend()
   *
   * Send a DDE message to an application. The minimum
   * interval between messages is specified in milliseconds.
   * Here's an example:
   *
   * ddeSend("mIRC", "/msg #channel I'm using Winamp5", 300);
   *
   * @param  application   The DDE server name of the application.
   * @param  command       The command to send.
   * @param  mininterval   The minimum interval to respect between messages (in ms).
   */
  ddesend(application: string, command: string, mininterval: number) {
    // TODO
  }

  /**
   * Get the applications current left coordinate in the screen,
   * using the screen coordinate system.
   *
   * @ret The left coordinate of the application.
   */
  getcurappleft(): number {
    return 0;
  }

  /**
   * Get the applications current top coordinate in the screen,
   * using the screen coordinate system.
   *
   * @ret The top coordinate of the application.
   */
  getcurapptop(): number {
    return 0;
  }

  /**
   * getCurAppWidth()
   *
   * Get the applications current window width, in pixels.
   *
   * @ret The width of the application window.
   */
  getcurappwidth(): number {
    // TODO
    return 1000;
  }

  /**
   * Get the applications current window height, in pixels.
   *
   * @ret The height of the application window.
   */
  getcurappheight(): number {
    // TODO
    return unimplemented(100);
  }

  /**
   * Get the equalizer state. 0 for off, 1 for on.
   * Remember to compare return value to true and false.
   *
   *  @ret The EQ's state.
   */
  geteq(): number {
    return unimplemented(1);
  }

  /**
   * getEqPreamp()
   *
   * Get the equalizer preamp value. The value range is
   * from -127 to +127 (0 means no preamp).
   *
   * @ret The preamp's current value.
   */
  geteqpreamp(): number {
    return unimplemented(0);
  }

  /**
   * Set the equalizer to the desired state. On or off.
   * 0 is off, 1 is on.
   *
   * @param  onoff The desired state for the eq.
   */
  seteq(onoff: number) {
    // TODO
  }

  /**
   * setEqPreamp()
   *
   * Set the equalizer pre-amp to the desired value.
   * Range is from -127 to +127 (0 means no preamp).
   *
   * @param  value The desired value for the pre-amp.
   */
  seteqpreamp(value: number) {
    this._uiRoot.audio.setEq("preamp", (value + 127) / 255);
  }

  /**
   * Sets the requested equalizer band to the specified value.
   * The bands are numbered from 0 (60Hz) to 9 (16kHz) and
   * each range from -127 to +127.
   *
   * @param  band  The EQ band to set.
   * @param  value The desired value for the specified band.
   */
  seteqband(band: number, value: number) {
    this._uiRoot.audio.setEq(String(band + 1), (value + 127) / 255);
  }

  /**
   getEqBand()

  Get the value of an equalizer band. The bands
  are numbered from 0 (60Hz) to 9 (16kHz). The return
  value range is from -127 to +127.

  @ret       The value of the band.
  @param  band  The eq band number you want to get.
  */
  geteqband(band: number): number {
    // console.log('getEqBand',band, this._uiRoot.audio.getEq(String(band + 1)) * 255 - 127);
    return this._uiRoot.audio.getEq(String(band + 1)) * 255 - 127;
  }

  //maki need it
  oneqbandchanged(band: number, value: number) {
    this._uiRoot.vm.dispatch(this, "oneqbandchanged", [
      { type: "INT", value: band },
      { type: "INT", value: value },
    ]);
  }

  /**
   * @param channel 0: Mono, 1: Left, 2: Right, does not work in Winamp3 or Winamp5
   * @param band Returns the selected band of the Spectrum Analyzer
   * @ret ranges from 0 to 255
   */
  getvisband(channel: number, band: number): number {
    return unimplemented(0);
  }

  /**
   * Takes an angle in radians and returns the ratio between two sides of a right triangle.
   * The ratio is sin(x) divided by cos(x).
   *
   * @ret       The tangent value of the angle.
   * @param  value The angle for which you want to know the tangent value.
   */
  tan(value: number): number {
    return Math.tan(value);
  }

  /**
   * Takes an angle in radians and returns the ratio of two sides of a right triangle.
   * The ratio is the length of the side opposite the angle divided by the length
   * of the hypotenuse. The result range is from -1 to 1.
   *
   * Converting from degrees to radians can be done by multiplying degrees by PI/180.
   *
   * @ret       The sine value of the angle.
   * @param  value The angle for which you want to know the sine value.
   */
  sin(value: number): number {
    return Math.sin(value);
  }

  /**
   * Takes an angle in radians and returns the ratio of the two sides of a right triangle.
   * The ratio is the length of the side adjacent to the angle divided by the length of the
   * hypotenuse. The result is range is from -1 to 1.
   *
   * @ret       The cosine value of the angle.
   * @param  value The angle for which you want to know the cosine value.
   */
  cos(value: number): number {
    return Math.cos(value);
  }

  /**
   * Takes a sine value ranging from -1 to 1 and returns the angle in radians.
   * The return value ranges from -PI/2 to +PI/2.
   *
   *  @ret       The angle in radians.
   * @param  value The sine value for which you want to know the angle.
   */
  asin(value: number): number {
    return Math.asin(value);
  }

  /**
   * Takes a cosine value ranging from -1 to 1 and returns the angle in radians.
   * The return value ranges from -PI/2 to +PI/2.
   *
   * @ret       The angle in radians.
   * @param  value The cosine value for which you want to know the angle.
   */
  acos(value: number): number {
    return Math.acos(value);
  }

  /**
   * Takes an angle in radians and returns the ration between two sides of a right triangle.
   * The ratio is cos(x) divided by sin(x).
   *
   * @ret     The arc tangent value of the angle.
   */
  atan(value: number): number {
    return Math.atan(value);
  }

  /**
   * @ret The arctangent of y/x.
   */
  atan2(y: number, x: number): number {
    return Math.atan2(y, x);
  }

  /**
   * Elevate a number to the N'th power.
   *
   * @ret         The number
   * @param  value   The number you want to elevate to the N power.
   * @param  pvalue  The power to which you want to elevate the number.
   */
  pow(value: number, pvalue: number): number {
    return Math.pow(value, pvalue);
  }

  /**
   * Get the square of a number.
   *
   * @ret       The number, squared.
   * @param  value The number for which you want the square value.
   */
  sqr(value: number): number {
    return value * value;
  }

  log10(value: number): number {
    return Math.log10(value);
  }
  ln(value: number): number {
    throw new Error("Unimplemented");
  }

  /**
   * Get the square root of a number.
   *
   * @ret       The square root of the number.
   * @param  value The number for which you want the square root value.
   */
  sqrt(value: number): number {
    return Math.sqrt(value);
  }

  /**
   * Get a randomely generated number. The random number will not
   * be bigger than the max value indicated. Smallest value is 0.
   *
   * @ret     The random number.
   * @param  max The maximum value of the random number to return.
   */
  random(max: number): number {
    // TODO: Should this return an int?
    return Math.random() * max;
  }

  oneqfreqchanged(isiso: number) {}

  getsonginfotext(): string {
    const track = this._currentTrack();
    if (track) {
      const m = track.metadata;
      if (m) {
        return `${m.bitrate}kbps ${m.channelMode} ${Math.floor(
          m.sampleRate / 1000
        )}khz`;
      }
    }
    return "123kbps stereo 79khz";
  }

  getsonginfotexttranslated(): string {
    return this.getplayitemstring();
  }

  lockui() {
    //TODO:
  }

  unlockui() {
    //TODO:
  }

  isobjectvalid(o: any): boolean {
    return o != null;
  }

  istransparencyavailable(): boolean {
    return true;
  }

  translate(str: string): string {
    return unimplemented(str);
  }

  isvideo(): number {
    return unimplemented(0);
  }
  isvideofullscreen(): number {
    return unimplemented(0);
  }
  iskeydown(vk: number): number {
    return unimplemented(0);
  }
  isminimized(): number {
    return unimplemented(0);
  }
  isdesktopalphaavailable(): boolean {
    // whether or not irregular window shape is supported by platform.
    // html5 is always possible. Maybe used by html5 + electron.
    return true;
  }
  isproversion(): boolean {
    // lets avoid ugly (uneeded visible of only-non-pro) ui
    return true;
  }
}

function dumpScriptDebug(script: ParsedMaki) {
  // @ts-ignore
  for (const [i, binding] of script.bindings.entries()) {
    const method = script.methods[binding.methodOffset];
    const guid = script.classes[method.typeOffset];
    const klass = getClass(guid);
    console.log(
      `${i}. ${klass.name}.${method.name} => ${binding.commandOffset}`
    );
  }
}
