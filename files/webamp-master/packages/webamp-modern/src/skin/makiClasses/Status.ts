import GuiObj from "./GuiObj";
import { AUDIO_PAUSED, AUDIO_STOPPED, AUDIO_PLAYING } from "../AudioPlayer";

// Maybe this?
// http://wiki.winamp.com/wiki/XML_GUI_Objects#.3CWasabi:StandardFrame:Status.2F.3E
export default class Status extends GuiObj {
  static GUID = "0f08c9404b23af39c4b8f38059bb7e8f";
  _stopbitmap: string;
  _playbitmap: string;
  _pausebitmap: string;
  _state: string = AUDIO_STOPPED;

  constructor(uiRoot: UIRoot) {
    super(uiRoot);
    this._uiRoot.audio.on("statchanged", () => this._updateStatus());
  }

  _updateStatus() {
    this._state = this._uiRoot.audio.getState();
    this._renderBackground();
  }

  setXmlAttr(_key: string, value: string): boolean {
    const key = _key.toLowerCase();
    if (super.setXmlAttr(key, value)) {
      return true;
    }
    switch (key) {
      case "stopbitmap":
        this._stopbitmap = value;
        this._renderBackground();
        break;
      case "playbitmap":
        this._playbitmap = value;
        this._renderBackground();
        break;
      case "pausebitmap":
        this._pausebitmap = value;
        this._renderBackground();
        break;
      default:
        return false;
    }
    return true;
  }

  // This shadows `getheight()` on GuiObj
  getheight(): number {
    if (this._h) {
      return this._h;
    }
    if (this._stopbitmap != null) {
      const bitmap = this._uiRoot.getBitmap(this._stopbitmap);
      return bitmap ? bitmap.getHeight() : 15;
    }
    return super.getheight();
  }

  // This shadows `getwidth()` on GuiObj
  getwidth(): number {
    if (this._w) {
      return this._w;
    }
    if (this._stopbitmap != null) {
      const bitmap = this._uiRoot.getBitmap(this._stopbitmap);
      return bitmap ? bitmap.getWidth() : 15;
    }
    return super.getwidth();
  }

  _renderBackground() {
    let bitmap_id: string;
    switch (this._state) {
      case AUDIO_PLAYING:
        bitmap_id = this._playbitmap;
        break;
      case AUDIO_PAUSED:
        bitmap_id = this._pausebitmap;
        break;
      case AUDIO_STOPPED:
      default:
        bitmap_id = this._stopbitmap;
        break;
    }
    const bitmap = this._uiRoot.getBitmap(bitmap_id);
    if (bitmap != null) {
      this.setBackgroundImage(bitmap);
    } else {
      this.setBackgroundImage(null);
    }
  }

  draw() {
    super.draw();
    this._div.classList.add("webamp--img");
    this._renderBackground();
  }
}
