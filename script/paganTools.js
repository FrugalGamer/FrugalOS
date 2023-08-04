// Yes, this is copied from the main index page
var d = new Date();

month = d.getMonth()+1;
day = d.getDate();

dateOutput = (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day + "/" + d.getFullYear();

// From here: https://foolishdeveloper.com/save-textarea-text-to-a-file-using-javascript/
function downloadSpread(filename, content) {
  // It works on all HTML5 Ready browsers as it uses the download attribute of the <a> element:
  const element = document.createElement("a");
  
  //A blob is a data type that can store binary data
  // “type” is a MIME type
  // It can have a different value, based on a file you want to save
  const blob = new Blob([content], { type: "plain/text" });
  //createObjectURL() static method creates a DOMString containing a URL representing the object given in the parameter.
  const fileUrl = window.URL.createObjectURL(blob);
  
  //setAttribute() Sets the value of an attribute on the specified element.
  element.setAttribute("href", window.URL.createObjectURL(blob)); //file location
  element.setAttribute("download", filename); // file name
  element.style.display = "none";
  
  //use appendChild() method to move an element from one element to another
  document.body.appendChild(element);
  element.click();
  
  //The removeChild() method of the Node interface removes a child node from the DOM and returns the removed node
  //document.body.removeChild(element);
  //Release fileURL object for memory reasons
  URL.revokeObjectURL(blob.URL);
};

	function pullWitchRune(){
	if($(".intention").val() == 0){
		$("#paganTools .error").show();
	}
	else {
		$("#paganTools .error").hide();
		randomNum = Math.floor(Math.random() * 12 + 1);
		fileName = "";

		switch(randomNum) {
			case 1:
				fileName = "wrunes_eye.png";
				toolTip = "Psychic workings, truth and honesty. May also indicate its opposite. Can indicate protection";
				break;
			case 2:
				fileName = "wrunes_female.png";
				toolTip = "Feminine energy or a feminine-presenting person";
				break;
			case 3:
				fileName = "wrunes_flight.png";
				toolTip = "Higher knowledge or movement and travel.";
				break;
			case 4:
				fileName = "wrunes_harvest.png";
				toolTip = "Prosperity and abundance, reaping what you sew. Can also refer to money.";
				break;
			case 5:
				fileName = "wrunes_male.png";
				toolTip = "Male energy or a male-presenting person";
				break;
			case 6:
				fileName = "wrunes_moon.png";
				toolTip = "Shadow work and magic, Esbats";
				break;
			case 7:
				fileName = "wrunes_rings.png";
				toolTip = "Bonds, new love, connections and unions";
				break;
			case 8:
				fileName = "wrunes_romance.png";
				toolTip = "Love, both physical and emotional";
				break;
			case 9:
				fileName = "wrunes_scythe.png";
				toolTip = "Breaking bonds, encountering endings. Can sometimes indicate danger";
				break;
			case 10:
				fileName = "wrunes_star.png";
				toolTip = "Hope, wishes, and taking risks";
				break;
			case 11:
				fileName = "wrunes_sun.png";
				toolTip = "Growth and happiness, conscious mind, Sabbats";
				break;
			case 12:
				fileName = "wrunes_waves.png";
				toolTip = "Emotions, intuition, imagination";
				break;
			case 13:
				fileName = "wrunes_crossroads.png";
				toolTip = "Big changes or decisions";
				break;			
			default:
				fileName = "error.png";
				toolTip = "An error has occured";
				break;					
		}
		returnString = "<img src='img/runes/" + fileName + "' title='" + toolTip + "'>";

		$("#wruneResult").append(returnString);
	}
	}

	function pullCityRune(){
		if($(".intention").val() == 0){
			$("#paganTools .error").show();
		}
		else {
			$("#paganTools .error").hide();
			randomNum = Math.floor(Math.random() * 32 + 1);
			fileName = "";

			switch(randomNum) {
				case 1:
					fileName = "cityRune_airplane.png";
					toolTip = "Element of air; this rune represents travel and journeys.";
					break;
				case 2:
					fileName = "cityRune_arrow.png";
					toolTip = "A symbol of direction, this can indicate restriction and no turning back. It can also point to your answer.";
					break;
				case 3:
					fileName = "cityRune_atom.png";
					toolTip = "This shows great potential for creation and destruction. It can also represents power and its misuse.";
					break;
				case 4:
					fileName = "cityRune_balloon.png";
					toolTip = "Representing the sky, this rune can also symbolize perspective or losing track of details.";
					break;
				case 5:
					fileName = "cityRune_boat.png";
					toolTip = "This represents travel by water, or an emotional journey, or even a journey to the underworld.";
					break;
				case 6:
					fileName = "cityRune_brickwall.png";
					toolTip = "This rune is an obstacle, or an obscurity. It is blocking something.";
					break;
				case 7:
					fileName = "cityRune_car.png";
					toolTip = "This is another symbol of travel, probably short term, or even a home away from home.";
					break;
				case 8:
					fileName = "cityRune_clock.png";
					toolTip = "This can indicate either the importance of time or a lack of it. Can also represent deadlines.";
					break;
				case 9:
					fileName = "cityRune_computer.png";
					toolTip = "This indicates the ability to do many different things at once. It can mean creation or communication, but also can be harmful.";
					break;
				case 10:
					fileName = "cityRune_dollar.png";
					toolTip = "Obviously representing money, prosperity and abundance, and everything that comes with it.";
					break;
				case 11:
					fileName = "cityRune_donot.png";
					toolTip = "Not allowed, at this time at least.";
					break;
				case 12:
					fileName = "cityRune_greenlight.png";
					toolTip = "You may proceed with your plans - the road is clear";
					break;
				case 13:
					fileName = "cityRune_gun.png";
					toolTip = "This can mean either protection or danger, depending on your interpretation.";
					break;			
				case 14:
					fileName = "cityRune_key.png";
					toolTip = "A symbol of opening, the key can remove obstacles. If there is no obvious target, it can indicate a quest to find it.";
					break;
				case 15:
					fileName = "cityRune_lightbulb.png";
					toolTip = "This rune can mean an idea or inspiration. It resonates with fire or spirit.";
					break;
				case 16:
					fileName = "cityRune_man.png";
					toolTip = "Not necessarily gendered, this represents masculine energy.";
					break;
				case 17:
					fileName = "cityRune_medical.png";
					toolTip = "Can indicate a potential illness or injury, whether spiritual or physical. Also represents the connection between body and spirit.";
					break;
				case 18:
					fileName = "cityRune_pedestrian.png";
					toolTip = "Can indicate potential danger, or being caught in the crossfire.";
					break;
				case 19:
					fileName = "cityRune_phone.png";
					toolTip = "Two-way communication, sometimes obscured.";
					break;
				case 20:
					fileName = "cityRune_railroad.png";
					toolTip = "Represents the archetypal crossroads and the goddess Hecate.";
					break;
				case 21:
					fileName = "cityRune_recycling.png";
					toolTip = "This is a rune of transformation, whether personal, physical, or spiritual.";
					break;
				case 22:
					fileName = "cityRune_rocket.png";
					toolTip = "Represents a journey, usually spiritual, upward. Can be an opportunity for growth.";
					break;
				case 23:
					fileName = "cityRune_scissors.png";
					toolTip = "A tool for cutting, or breaking away. May mean some things need to be cut out of your life";
					break;
				case 24:
					fileName = "cityRune_shoe.png";
					toolTip = "A sign of walking, or traveling under your own power. Can be a time for introspection.";
					break;
				case 25:
					fileName = "cityRune_skull.png";
					toolTip = "Care must be taken, can mean jealousy or anger. There is toxicity here.";
					break;
				case 26:
					fileName = "cityRune_skyscraper.png";
					toolTip = "The connective force between the worlds, can represent the mundane (street), or the sky (higher self).";
					break;
				case 27:
					fileName = "cityRune_stop.png";
					toolTip = "Come to a complete stop.";
					break;			
				case 28:
					fileName = "cityRune_test.png";
					toolTip = "A symbol of potential miracles, but also of danger. It can also indicate an accident.";
					break;
				case 29:
					fileName = "cityRune_trashcan.png";
					toolTip = "Unwanted waste, refuse, and remains. It can indicate something discarded, or that something needs to be thrown out.";
					break;
				case 30:
					fileName = "cityRune_tv.png";
					toolTip = "One way window to the world. Can represent receiving information, but not the ability to send a response.";
					break;
				case 31:
					fileName = "cityRune_voicemail.png";
					toolTip = "This rune represents one-way communication, miscommunication, or avoidance. Responsibilities are piling up.";
					break;
				case 32:
					fileName = "cityRune_woman.png";
					toolTip = "Indicates female energy.";
					break;			
				case 33:
					fileName = "cityRune_yield.png";
					toolTip = "You must let others go before you, or possibly wait until the opportunity comes.";
					break;	
				default:
					fileName = "error.png";
					toolTip = "An error has occured";
					break;						
			}
			returnString = "<img src='img/runes/" + fileName + "' title='" + toolTip + "'>";

			$("#cruneResult").append(returnString);
		}
	}
	
	function pullFtharkRune(numRunes){
	if($(".intention").val() == 0){
		$("#paganTools .error").show();
	}
	else {
		$("#paganTools .error").hide();
		randomNum = Math.floor(Math.random() * 43 + 1);
		fileName = "";
		aettGroup = "";
		sound = "";
		runeName= "";

		switch(randomNum) {
			case 1:
				fileName = "fthark_fehu.png";
				runeName = "Fehu";
				aettGroup = "Frey's Aett";
				sound = "f";
				toolTip = "From the root word for cattle, this rune represents wealth, property, and the success of your plans and workings.";
				break;
			case 2:
				fileName = "fthark_uruz.png";
				runeName = "Uruz";
				aettGroup = "Frey's Aett";
				sound = "oo";
				toolTip = "Represents the Auroch and all the power that comes with it. This rune indicates creative power and change. Uruz represents energy, passion, vitality, fertility, and the unconscious. It is mostly concerned with the irrational and instinctive sides of our nature";
				break;
			case 3:
				fileName = "fthark_thurisaz.png";
				runeName = "Thurisaz";
				aettGroup = "Frey's Aett";
				sound = "th";
				toolTip = "Represents thorns, destruction, and sometimes defenses. In its positive form here, it represents the destruction that needs to come before change can happen.";
				break;
			case 4:
				fileName = "fthark_ansuz.png";
				runeName = "Ansuz";
				aettGroup = "Frey's Aett";
				sound = "ah";
				toolTip = "This rune represents the Aesir, the gift of the runes to people, as well as inspiration and creativity. In a reading it can indicate wisdom, or someone who holds it, and the use of language and clear speech.";
				break;
			case 5:
				fileName = "fthark_raido.png";
				runeName = "Raido";
				aettGroup = "Frey's Aett";
				sound = "r";
				toolTip = "This rune represents the wheel, and as such can indicate a journey and travel, whether physical or spiritual. If you are planning on travelling, the appearance of this rune can be a good omen.";
				break;
			case 6:
				fileName = "fthark_kaunaz.png";
				runeName = "Kaunaz";
				aettGroup = "Frey's Aett";
				sound = "k";
				toolTip = "This rune represents fire and inflammation, and has often been associated with torches and ulcers. In its positive form it indicates illumination and understanding. It can also indicate a good attitude and health.";
				break;
			case 7:
				fileName = "fthark_gebo.png";
				runeName = "Gebo";
				aettGroup = "Frey's Aett";
				sound = "g";
				toolTip = "Represents gifts and generosity, as well as partnership and vows or commitment. This may mean that you will be experiencing the benefits of a good partnership, or to a sense of unity with what is currently around us.";
				break;
			case 8:
				fileName = "fthark_wunjo.png";
				runeName = "Wujo";
				aettGroup = "Frey's Aett";
				sound = "v or w";
				toolTip = "Bliss, happiness, and joy, this is a very positive rune that can show that relief is coming, or that you will soon be able to enjoy a break from life&apos;s chaos. It emphasizes harmony and balance with the world.";
				break;
			case 9:
				fileName = "fthark_hagalaz.png";
				runeName = "Hagalaz";
				aettGroup = "Hagal's Aett";
				sound = "h";
				toolTip = "This rune means hail (as in freezing rain) and represents the primal chaos of nature. It can mean difficult times are coming and that you will be tested. It is associated with Ymir and winter.";
				break;
			case 10:
				fileName = "fthark_nauthiz.png";
				runeName = "Nauthiz";
				aettGroup = "Hagal's Aett";
				sound = "n";
				toolTip = "Nauthiz is associated with the Nornir, and as such represents the fates that shape our world. Because it focuses on the differences between wants and needs, it can mean you are in for some challenges.";
				break;
			case 11:
				fileName = "fthark_isa.png";
				runeName = "Isa";
				aettGroup = "Hagal's Aett";
				sound = "ee";
				toolTip = "This rune comes from the word for ice, and represents withdrawal and standing still. Procrastination can be a problem here, but this is a good time to stop and reflect until things begin to move again.";
				break;
			case 12:
				fileName = "fthark_jera.png";
				runeName = "Jera";
				aettGroup = "Hagal's Aett";
				sound = "y";
				toolTip = "This rune represents the wheel of the year, and the completion of seasons of all kinds. There is a time and place for everything, and in order to reap we must sow our seeds early.";
				break;
			case 13:
				fileName = "fthark_eihwaz.png";
				runeName = "Eihwaz";
				aettGroup = "Hagal's Aett";
				sound = "eh";
				toolTip = "Eihwaz represents the yew tree, along with its strength and protection. It can mean perserverance, strength, dependability, and even a connection to the past.";
				break;		
			case 14:
				fileName = "fthark_perth.png";
				runeName = "Pertho";
				aettGroup = "Hagal's Aett";
				sound = "p";
				toolTip = "This rune is associated with Freya and the vulva. It represents initiation and the Nornir, and so can indicate that you will be tested. It is also the rune of problem solving and memory.";
				break;
			case 15:
				fileName = "fthark_algiz.png";
				runeName = "Algiz";
				aettGroup = "Hagal's Aett";
				sound = "z";
				toolTip = "This rune represents the protection of the Valkryies, and was often used as a protection symbol. It can indicate warnings and support, and you should take heed of what close friends are trying to protect your from.";
				break;		
			case 16:
				fileName = "fthark_sowelo.png";
				runeName = "Sowelo";
				aettGroup = "Hagal's Aett";
				sound = "s";
				toolTip = "Sowelo is the sun rune and the balancing force to Isa. It is associated with female energy and represents life-giving warmth and happiness. Keep in mind that too much can result in drought and feeling burned out.";
				break;	
			case 17:
				fileName = "fthark_teiwaz.png";
				runeName = "Teiwaz";
				aettGroup = "Tyr's Aett";
				sound = "t, voiced and unvoiced";
				toolTip = "This rune belongs to Tyr, the god of war and victory. As such, it represents success and bravery in your endeavors.";
				break;
			case 18:
				fileName = "fthark_berkano.png";
				runeName = "Berkano";
				aettGroup = "Tyr's Aett";
				sound = "b";
				toolTip = "Represents the birch tree and the earth. It is associated with birth and fertility, and can represent new beginnings and emotional stability.";
				break;
			case 19:
				fileName = "fthark_ehwaz.png";
				runeName = "Ehwaz";
				aettGroup = "Tyr's Aett";
				sound = "eh";
				toolTip = "This rune is associated with horses and journeys, and can also represent the journey between the two worlds. It is associated with psychoactive drugs and reevaluating your outlook on life.";
				break;
			case 20:
				fileName = "fthark_mannaz.png";
				runeName = "Mannaz";
				aettGroup = "Tyr's Aett";
				sound = "m";
				toolTip = "This rune represents man and mortality. It is a rune of rationality as well as teamwork and social structure, and is associated with the god Heimdal.";
				break;
			case 21:
				fileName = "fthark_inguz.png";
				runeName = "Inguz";
				aettGroup = "Tyr's Aett";
				sound = "ng";
				toolTip = "This is the rune of Ing, the horse-god of fertility. This rune is representative of fresh starts and new projects.";
				break;		
			case 22:
				fileName = "fthark_othila.png";
				runeName = "Othila";
				aettGroup = "Tyr's Aett";
				sound = "o";
				toolTip = "This rune represents inheritance and everything that comes with it. It can refer to physical possessions, traditions, and family, or harvesting and cultivating the land.";
				break;
			case 23:
				fileName = "fthark_dagaz.png";
				runeName = "Dagaz";
				aettGroup = "Tyr's Aett";
				sound = "d";
				toolTip = "Dagaz represents the day and the passage from dark to light. It can represent gradual change as well as protection and the banishment of negative energy.";
				break;		
			case 24:
				fileName = "fthark_wyrd.png";
				runeName = "Wyrd";
				aettGroup = "Tyr's Aett";
				sound = "none";
				toolTip = "This is sometimes used as the blank rune, and in a reading can refer to fate or destiny.";
				break;	

			/* This is where the reversed runes start */

			case 25:
				fileName = "fthark_fehuRev.png";
				runeName = "Fehu (reversed)";
				aettGroup = "Frey's Aett";
				sound = "f";
				toolTip = "The reversed form of this rune can indicate financial troubles, poverty, or greed. You should be careful not to waste resources and to scrutinize any offers coming your way.";
				break;
			case 26:
				fileName = "fthark_uruzRev.png";
				runeName = "Uruz (reversed)";
				aettGroup = "Frey's Aett";
				sound = "oo";
				toolTip = "Reversed, Uruz stands for brutality, harshness, and hatred. It is associated with abuse and weak wills. Take stock of your self-esteem and make sure you do not stumble.";
				break;
			case 27:
				fileName = "fthark_thurisazRev.png";
				aettGroup = "Frey's Aett";
				runeName = "Thurisaz (reversed)";
				sound = "th";
				toolTip = "Stubbornnes and an unwillingness to listen to information";
				break;
			case 28:
				fileName = "fthark_ansuzRev.png";
				runeName = "Ansuz (reversed)";
				aettGroup = "Frey's Aett";
				sound = "ah";
				toolTip = "Dishonesty, lies, and trickery are about. You should seek second opinions.";
				break;
			case 29:
				fileName = "fthark_raidoRev.png";
				runeName = "Raido (reversed)";
				aettGroup = "Frey's Aett";
				sound = "r";
				toolTip = "Reversed, Raido indicates that it is not a good time to travel or begin a journey. It can also indicate that your goals are not well chosen.";
				break;
			case 30:
				fileName = "fthark_kaunazRev.png";
				runeName = "Kaunaz (reversed)";
				aettGroup = "Frey's Aett";
				sound = "k";
				toolTip = "Kaunaz reversed can indicate that you have missed an opportunity or had poor judgement. A relationship you have may been coming to an end.";
				break;
			case 31:
				fileName = "fthark_wunjoRev.png";
				runeName = "Wunjo (reversed)";
				aettGroup = "Frey's Aett";
				sound = "v or w";
				toolTip = "When this rune is reversed, it indicates unrealistic enthusiasm or impractical expectations.";
				break;
			case 32:
				fileName = "fthark_hagalazRev.png";
				runeName = "Hagalaz (reversed)";
				aettGroup = "Hagal's Aett";
				sound = "h";
				toolTip = "Chaos and destruction, and a loss of shelter.";
				break;
			case 33:
				fileName = "fthark_nauthizRev.png";
				runeName = "Nauthiz (reversed)";
				aettGroup = "Hagal's Aett";
				sound = "n";
				toolTip = "In its reversed form, Nauthiz means you are soon to be tested. It is not time to make hasty judgements.";
				break;	
			case 34:
				fileName = "fthark_perthRev.png";
				runeName = "Pertho (reversed)";
				aettGroup = "Hagal's Aett";
				sound = "p";
				toolTip = "When Pertho is reversed, it can indicate that you are about to experience an unpleasant surprise, perhaps from your past. You may have to right your wrongs.";
				break;
			case 35:
				fileName = "fthark_algizRev.png";
				runeName = "Algiz (reversed)";
				aettGroup = "Hagal's Aett";
				sound = "z";
				toolTip = "In its negative form Algiz describes vulnerability, danger and forbidden acts. Pay attention to how people are acting around you.";
				break;		
			case 36:
				fileName = "fthark_soweloRev.png";
				runeName = "Sowelo (reversed)";
				aettGroup = "Hagal's Aett";
				sound = "s";
				toolTip = "When reversed, Sowelo can indicate burnout or overconfidence.";
				break;	
			case 37:
				fileName = "fthark_teiwazRev.png";
				runeName = "Teiwaz (reversed)";
				aettGroup = "Tyr's Aett";
				sound = "t, voiced and unvoiced";
				toolTip = "Reversed, this rune indicates cowardice, weakness, and lack of initiative. It may mean that you are being too rigid and will experience failure as a result.";
				break;
			case 38:
				fileName = "fthark_berkanoRev.png";
				runeName = "Berkano (reversed)";
				aettGroup = "Tyr's Aett";
				sound = "b";
				toolTip = "When this rune is reversed, it can point to infertility, argumentativeness, and domestic problems. Take care to make sure you are not putting your own needs above others'.";
				break;
			case 39:
				fileName = "fthark_ehwazRev.png";
				runeName = "Ehwaz (reversed)";
				aettGroup = "Tyr's Aett";
				sound = "eh";
				toolTip = "Now is not the time for change or actions. You may need to reflect and wait.";
				break;
			case 40:
				fileName = "fthark_mannazRev.png";
				runeName = "Mannaz (reversed)";
				aettGroup = "Tyr's Aett";
				sound = "m";
				toolTip = "When Mannaz is reversed, you may be feeling lost and isolated. Seek advice and second opinions from those you trust.";
				break;
			case 41:
				fileName = "fthark_laguzRev.png";
				runeName = "Laguz (reversed)";
				aettGroup = "Tyr's Aett";
				sound = "l";
				toolTip = "The appearance of this rune is reversed position can indicate depression and confusion, due to not listening to your intuition.";
				break;		
			case 42:
				fileName = "fthark_othilaRev.png";
				runeName = "Othila (reversed)";
				aettGroup = "Tyr's Aett";
				sound = "o";
				toolTip = "Reversed, this is a rune of decay, and indicates that you are holding on to old ideas and traditions.";
				break;	
			case 43:
				fileName = "fthark_dagazRev.png";
				runeName = "Dagaz (reversed)";
				aettGroup = "Tyr's Aett";
				sound = "d";
				toolTip = "Dagaz actually has no negative interpretation. If you&apos;ve drawn this rune, you may be looking for problems where are are none.";
				break;					
			default:
				fileName = "error.png";
				toolTip = "An error has occured";
				break;					
		}
		// I'm returning this as an object so that I can use the function in multiple places
		result = {"fileName": fileName,"toolTip": toolTip,"runeName": runeName,"aettGroup": aettGroup,"sound": sound};
		return(result);
	}
}

// This is for spreads, to make sure that all the runes I've pulled are unique. This function takes one argument: the number of runes you'd like to pull
function pullUniqueFtharkRunes(numRunes){
	var runesPulled = new Array();
	i = 0;

	// Here we're looping through this procedure as many times as we need to in order to pull the correct amount of runes.
	while(i < numRunes){
		
		length = numRunes;

		// Here I'm looping through all existing runes I've already pulled
		for(j = 0; j < length; j++){
			// Pull a new rune
			newRune = pullFtharkRune();

			// If the existing array includes the filename of the rune we just pulled, pull another one
			if(runesPulled.find(o => o.fileName === newRune.fileName)){
				//If we have, pull another rune (restart the loop)
				newRune = pullFtharkRune();
			}
			// If we haven't, add it to the array and increment our counter
			else {
				runesPulled.push(newRune);
				i++;
			}
		}

	}
	return runesPulled;
}

function displayFtharkRune(){
	pullFtharkRune();

	returnString = "<div class='frune'><img src='img/runes/" + result.fileName + "' title='" + result.runeName + "'><br><b>" + result.runeName + "</b><br><i>(" + result.aettGroup + ")</i><br><b>Sound:</b> " + result.sound + "<br><p>" + result.toolTip + "</p></div>";

	$("#fruneResult").append(returnString);
}

function pullFtharkSpread(){
	spreadName = document.getElementById("spreadName").value;
	$("#ftharkSpreadResult").empty();

	/* Here's where the spreads are. Yes, they are ugly. I don't yet know of a way to do them without being ugly. Basically I'm buliding a unique table for each one and running the pullUniqueFtharkRune function for the runes I need.*/
	switch(spreadName){
		case "threerune":
			// Get the runes
			runes = pullUniqueFtharkRunes(3);

				returnString = "<h3 class='spreadElement'>Three Rune Spread</h3><table><tr>";
				returnString += "<td><i>Past<br>Problem<br>Physical</i></td><td><i>Present<br>Action<br>Mental</i></td><td><i>Future<br>Outcome<br>Spiritual</i></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><i class='off spreadElement'>Past/problem/physical</i>";
				returnString += "</td><td>"

				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><i class='off spreadElement'>Present/action/mental</i>";
				returnString += "</td><td>";

				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><i class='off spreadElement'>Future/outcome/spiritual</i>";
				returnString += "</td></tr><tr><td colspan=3 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "fourdwarves":
			// Get the runes
			runes = pullUniqueFtharkRunes(4);

				returnString = "<h3 class='spreadElement'>The Four Dwarves</h3><table><tr><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>How you feel about the question now</i></td>";
				returnString += "</td><td><td></td><td>"

				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>Your past desires in relation to the question</i>";
				returnString += "</td><td></tr><tr>";
				returnString += "<td></td><td>";

				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>Desires and feelings of others regarding the question</i>";
				returnString += "</td><td></td><td></tr>";
				returnString += "<tr><td></td><td></td><td>";

				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>Your heart's hidden desire regarding the question</i>";
				returnString += "</td></tr><tr><td colspan=4 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "crossofthor":
			runes = pullUniqueFtharkRunes(5);

				returnString = "<h3 class='spreadElement'>Cross of Thor</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>Situation</i></td>";
				returnString += "</td><td></tr><tr><td>"

				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>Obstacles</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><br><i class='spreadElement'>Long term outcome</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>Short term outcome</i>";
				returnString += "</td><td></tr><tr>";
				returnString += "<td></td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>Supportive Forces</i>";
				returnString += "</td><td></td></tr>";
				returnString += "</td></tr><tr><td colspan=4 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "fiveelements":
			runes = pullUniqueFtharkRunes(5);

				returnString = "<p><b>Note:</b> This spread is useful for personality insight or questions</p><h3 class='spreadElement'>The Five Elements</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>Intellect</i></td>";
				returnString += "</td><td></tr><tr><td>"

				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>Strength</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><br><i class='spreadElement'>Balance</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>Love</i>";
				returnString += "</td><td></tr><tr>";
				returnString += "<td></td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>Desire</i>";
				returnString += "</td><td></td></tr>";
				returnString += "</td></tr><tr><td colspan=4 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "fiveelements2":
			runes = pullUniqueFtharkRunes(5);

				returnString = "<h3 class='spreadElement'>The Five Elements (alt)</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>Physical body and environment</i></td>";
				returnString += "</td><td></tr><tr><td>"

				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>Your emotions in regard to the question</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><br><i class='spreadElement'>Spiritual influences</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>Your present state of mind</i>";
				returnString += "</td><td></tr><tr>";
				
				returnString += "<td></td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>Creative forces at work</i>";
				returnString += "</td><td></td></tr>";
				returnString += "</td></tr><tr><td colspan=4 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "fourdwarves2":
			runes = pullUniqueFtharkRunes(5);

				returnString = "<h3 class='spreadElement'>The Four Dwarves (alt)</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>Positive influences at work</i></td>";
				returnString += "</td><td></tr><tr><td>"

				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>Any problems or obstacles</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><br><i class='spreadElement'>Key future influences</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>Immediate outcome</i>";
				returnString += "</td><td></tr><tr>";
				returnString += "<td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>Basic influences surrounding the question</i>";
				returnString += "</td><td></td></tr>";
				returnString += "</td></tr><tr><td colspan=4 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "situation":
			runes = pullUniqueFtharkRunes(6);

				returnString = "<h3 class='spreadElement'>Situation Spread</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>Positive influences at work</i></td>";
				returnString += "</td><td></tr><tr><td>"

				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>Any problems or obstacles</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>Key future influences</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>Immediate outcome</i>";
				returnString += "</td><td></tr><tr>";
				returnString += "<td></td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><br><i class='spreadElement'>Basic influences surrounding the question</i>";
				returnString += "</td><td></td></tr>";
				returnString += "</td></tr><tr><td colspan=4 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "persona":
			runes = pullUniqueFtharkRunes(5);

				returnString = "<h3 class='spreadElement'>Persona Spread</h3><table><tr><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>Where you currently find yourself in life</i>";
				returnString += "</td><td>"

				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>What is on your mind</i>";
				returnString += "</td><td>"

				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>What is in your heart</i>";
				returnString += "</td><td>"

				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>Your primary intentions</i>";
				returnString += "</td><td>"

				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><br><i class='spreadElement'>Your future actions and deeds</i>";
				returnString += "</td></tr><tr><td colspan=5 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>"
				break;

		case "celticcross":
			runes = pullUniqueFtharkRunes(6);

				returnString = "<h3 class='spreadElement'>The Celtic Cross</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[5].fileName + "' toolTip='" + runes[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[5].runeName + "</b><br><i class='spreadElement'>New situation</i></td>";
				returnString += "</td><td></tr><tr><td></td><td>"

				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><br><i class='spreadElement'>Challenges you will face</i>";
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>What lies ahead of you</i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>Your past</i>";
				returnString += "</td></tr><tr>";
				returnString += "<td></td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>Where you currently are</i>";
				returnString += "</td><td></td></tr>";
				returnString += "<tr><td></td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>Foundation</i>";
				returnString += "</td></tr><tr><td colspan=3 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "runiccross":
			runes = pullUniqueFtharkRunes(6);

				returnString = "<h3 class='spreadElement'>The Runic Cross</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[5].fileName + "' toolTip='" + runes[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[5].runeName + "</b><br><i class='spreadElement'>Most likely outcome</i>";
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>The past</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><br><i class='spreadElement'>Factors that will hinder or help the outcome</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>Your possible future</i>";
				returnString += "</td></tr>";
				returnString += "<tr><td></td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>Your present state of mind</i>";
				returnString += "<td></td></tr><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>Basic influences behind the question</i>";				
				returnString += "<td></td></td></tr><tr><td colspan=3 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "career":
			runes = pullUniqueFtharkRunes(6);

				returnString = "<h3 class='spreadElement'>Career Spread</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[5].fileName + "' toolTip='" + runes[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[5].runeName + "</b><br><i class='spreadElement'>Future outcome</i>";
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>Your current position</i>";
				returnString += "</td><td>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>Your position of greatest<br>strength and ability</i>";
				returnString += "</td></tr>";
				returnString += "<tr><td></td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><br><i class='spreadElement'>Your future perception</i>";
				returnString += "<td></td></tr><tr><td></td><td>";

				returnString += "<tr><td></td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>The challenge you face</i>";
				returnString += "<td></td></tr><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink' id='test'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>Past perception of the matter</i>";				
				returnString += "<td></td></td></tr><tr><td colspan=3 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "sevenworlds":
			runes = pullUniqueFtharkRunes(7);

				returnString = "<h3 class='spreadElement'>Seven Worlds Spread</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>That which is right</i>";
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>Things working in your favor</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>The querent or core of the question</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>Force and strength</i>";
				returnString += "</td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><br><i class='spreadElement'>Skill, purpose, and ability</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[6].fileName + "' toolTip='" + runes[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[6].runeName + "</b><br><i class='spreadElement'>Hidden factors</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[5].fileName + "' toolTip='" + runes[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[5].runeName + "</b><br><i class='spreadElement'>Dangers and forces opposing the querent</i>";			
				returnString += "</td></tr><tr><td colspan=3 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;
			
		case "combinedrunes":
			runes = pullUniqueFtharkRunes(7);

				returnString = "<h3 class='spreadElement'>The Combined Runes Spread</h3><p><b>Note:</b> The runes in this spread are meant to be read in pairs.</p>";
				returnString += "<table><tr><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>The issue at hand</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>The issue at hand</i>";
				returnString += "</td><td></td><td></td></tr>";
				returnString += "<tr><td></td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>Factors in the past that are influencing the issue</i>";
				returnString += "</td><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><br><i class='spreadElement'>Advice on how to solve the issue</i>";
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>Factors in the past that are influencing the issue</i>";
				returnString += "</td><td></td><td colspan=2>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[6].fileName + "' toolTip='" + runes[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[6].runeName + "</b><br><i class='spreadElement'>Outcome of the situation</i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[5].fileName + "' toolTip='" + runes[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[5].runeName + "</b><br><i class='spreadElement'>Advice on how to solve the issue</i>";			
				returnString += "</td></tr><tr><td colspan=6 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;
			
		case "mimirshead":
			runes = pullUniqueFtharkRunes(7);

				returnString = "<h3 class='spreadElement'>Mimir's Head</h3><p><b>Note:</b> The runes in this spread are meant to be read in pairs.</p>";
				returnString += "<table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[6].fileName + "' toolTip='" + runes[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[6].runeName + "</b><br><i class='spreadElement'>Results and final outcome</i>";
				returnString += "</td><td></td><tr>";
				returnString += "<tr><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[5].fileName + "' toolTip='" + runes[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[5].runeName + "</b><br><i class='spreadElement'>Ways to resolve the issue</i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><br><i class='spreadElement'>Ways to resolve the issue</i>";
				returnString += "</td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>The reason for the problem</i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>The reason for the problem</i>";
				returnString += "</td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>Signifies the issue at hand</i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>Signifies the issue at hand</i>";			
				returnString += "</tr><tr><td colspan=3 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;
			
		case "mimirshead2":
			runes = pullUniqueFtharkRunes(8);

				returnString = "<h3 class='spreadElement'>Mimir's Head (alt)</h3><p><b>Note:</b> The runes in this spread represents the Wheel of the Year, and each position is ruled by a particular house. Runes that match the house they have landed in have meanings that are especially strong, while if their house is the opposite of their meaning, they are neutralized.</p>";
				returnString += "<table><tr><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[6].fileName + "' toolTip='" + runes[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[6].runeName + "</b><br><i class='spreadElement'>House of Jera: Rune of the yearly harvest, reward, success, and luck</i>";
				returnString += "</td><td></td><td></td></tr>";
				returnString += "<tr><td></td><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[5].fileName + "' toolTip='" + runes[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[5].runeName + "</b><br><i class='spreadElement'>House of Hagalaz: Transformation and metamorphosis</i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>8</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[7].fileName + "' toolTip='" + runes[7].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[7].runeName + "</b><br><i class='spreadElement'>House of Algiz: Inner strength, the rune of divine guidance and assistance.</i>";
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><br><i class='spreadElement'>House of Kaunaz: Learning, creativity,  inspiration</i>";
				returnString += "</td><td></td><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>House of Berkano: Birth, motherhood, beginnings, Mother Goddess</i>";
				returnString += "</td></tr><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>House of Thurisaz: Protection from enemies and personal attack, defensive and resistant powers</i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>House of Laguz: Growth, flow, second sight</i>";
				returnString += "</td><td></td></tr><tr><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>House of Dagaz: Possible sudden changes, polarities, the balance of day and night</i>";		
				returnString += "</td><td></td><td></td></tr><tr><td colspan=5 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;
			
		case "ninegrid":
			runes = pullUniqueFtharkRunes(9);

				returnString = "<h3 class='spreadElement'>Grid of Nine</h3><p><b>Note:</b> This particular spread represents a magic square</p>";
				returnString += "<table><tr><td><i>The future</i></td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>Hidden obstacles</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>9</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[8].fileName + "' toolTip='" + runes[8].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[8].runeName + "</b><br><i class='spreadElement'>Best possible outcomes</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>Your attitude towards the outcome</i>";
				returnString += "</td></tr><tr><td><i>The present</i></td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>Current hidden influences</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><br><i class='spreadElement'>Current state of affairs</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[6].fileName + "' toolTip='" + runes[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[6].runeName + "</b><br><i class='spreadElement'>Your attitude towards present influences</i>";
				returnString += "</td></tr><tr><td><i>The Past</i></td><td>";
				returnString += "<sup class='spreadElement'>8</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[7].fileName + "' toolTip='" + runes[7].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[7].runeName + "</b><br><i class='spreadElement'>Hidden past influences</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>Basic past influences</i>";
				returnString += "</td><td>";				
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[5].fileName + "' toolTip='" + runes[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[5].runeName + "</b><br><i class='spreadElement'>Your attitude about those events</i>";		
				returnString += "</td></tr><tr><td colspan=4 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;
			
		case "treeoflife":
			runes = pullUniqueFtharkRunes(10);

				returnString = "<h3 class='spreadElement'>Tree of Life</h3><p><b>Note:</b> This spread is good for an overview of your life. The runes that share a line should be read as a pair.</p>";
				returnString += "<table><tr><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>Your highest ideals and standards</i>";
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>Your physical and mental experiences</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>Your current energy level</i>";
				returnString += "</td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><br><i class='spreadElement'>Your most recent victories and successes</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>Your ethics and personal moral code</i>";
				returnString += "</td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[5].fileName + "' toolTip='" + runes[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[5].runeName + "</b><br><i class='spreadElement'>Your health and any issues there you may have</i>";
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>8</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[7].fileName + "' toolTip='" + runes[7].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[7].runeName + "</b><br><i class='spreadElement'>Creativity, both physical and mental</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[6].fileName + "' toolTip='" + runes[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[6].runeName + "</b><br><i class='spreadElement'>Personal issues of love and trust/i>";
				returnString += "</td></tr><tr><td>";				
				returnString += "<sup class='spreadElement'>9</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[8].fileName + "' toolTip='" + runes[8].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[8].runeName + "</b><br><i class='spreadElement'>Your powers of imagination and creativity</i>";		
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>10</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[9].fileName + "' toolTip='" + runes[9].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[9].runeName + "</b><br><i class='spreadElement'>Your living conditions and the state of your home</i>";
				returnString += "</td><td></td></tr><tr><td colspan=2 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;
			
		case "cosmicaxis":
			runes = pullUniqueFtharkRunes(11);

				returnString = "<h3 class='spreadElement'>Cosmic Axis</h3><table><tr><td>";
				returnString += "<sup class='spreadElement'>10</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[9].fileName + "' toolTip='" + runes[9].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[9].runeName + "</b><br><i class='spreadElement'>Your unconscious response to the outcome in #9</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>9</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[8].fileName + "' toolTip='" + runes[8].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[8].runeName + "</b><br><i class='spreadElement'>The major outcome of the issue at hand</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>11</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[10].fileName + "' toolTip='" + runes[10].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[10].runeName + "</b><br><i class='spreadElement'>Your conscious response to #9</i>";
				returnString += "</td></tr><tr><td></td><td>";
				
				returnString += "<sup class='spreadElement'>8</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[7].fileName + "' toolTip='" + runes[7].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[7].runeName + "</b><br><i class='spreadElement'>If you do nothing, this will be the result</i>";
				returnString += "</td><td></td></tr><tr><td>";
				
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[5].fileName + "' toolTip='" + runes[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[5].runeName + "</b><br><i class='spreadElement'>Your current unconscious responses</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><br><i class='spreadElement'>The present</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[6].fileName + "' toolTip='" + runes[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[6].runeName + "</b><br><i class='spreadElement'>Your conscious responses</i>";
				returnString += "</td></tr><tr><td></td><td>";
				
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><br><i class='spreadElement'>Results of these influences from the past</i>";
				returnString += "</td><td></td></tr><tr><td>";	
				
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><br><i class='spreadElement'>Your conscious response to #1</i>";		
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><br><i class='spreadElement'>Major past influence on the present</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><br><i class='spreadElement'>Your unconscious response to the influence in #1</i>";
				returnString += "</td></tr><tr><td colspan=3 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;
			
		case "fourquarters":
			runes = pullUniqueFtharkRunes(11);

				returnString = "<h3 class='spreadElement'>The Four Quarters</h3><p>This spread represents the four quarters of the year, and can be used to divine an overall look at your life from six months back to six months in the future</p>";
				returnString += "<table><tr><td class='firstq'>First quarter<br><i>Your present state of mind</i></td><td colspan=2 class='thirdq'>Third quarter<br><i>If you do nothing, this is what will result</i></td><td class='secondq'>Second quarter<br><i>Influences that are acting<br>upon the question</td></tr><tr><td class='firstq'>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><i  class='spreadElement off'>First quarter<br><i>Your present state of mind</i>";
				returnString += "</td><td class='thirdq'>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><i class='spreadElement off'>Third quarter: If you do nothing, this is what will result</i>";
				returnString += "</td><td class='thirdq'>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><i class='spreadElement off'>Third quarter: If you do nothing, this is what will result</i>";
				returnString += "</td><td class='secondq'>";				
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><i class='spreadElement off'>Second quarter: Influences that are acting<br>upon the question</i>";
				returnString += "</td></tr><tr><td class='firstq'>";
				
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><i class='spreadElement off'>First quarter: Your present state of mind</i>";
				returnString += "</td><td colspan=2>";
				returnString += "<sup class='spreadElement'>11</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[10].fileName + "' toolTip='" + runes[10].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[10].runeName + "</b><br><i class='spreadElement'>Overall tone of the spread.</i>";
				returnString += "</td><td class='secondq'>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[5].fileName + "' toolTip='" + runes[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[5].runeName + "</b><i class='spreadElement off'>Second quarter: Influences that are acting<br>upon the question</i>";
				returnString += "</td></tr><tr><td class='firstq'>";
				
				returnString += "</td><td colspan=2 class='fourthq'>Fourth quarter<br><i>Possible outcome six months from now</i></td><td class='secondq'></td></tr><tr><td class='firstq'>";
				
				returnString += "<sup class='spreadElement'>10</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[9].fileName + "' toolTip='" + runes[9].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[9].runeName + "</b><i class='spreadElement off'>First quarter: Your present state of mind</i>";		
				returnString += "</td><td class='fourthq'>";
				returnString += "<sup class='spreadElement'>9</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[8].fileName + "' toolTip='" + runes[8].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[8].runeName + "</b><i class='spreadElement off'>Fourth quarter: Possible outcome six months from now</i>";
				returnString += "</td><td class='fourthq'>";
				returnString += "<sup class='spreadElement'>8</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[7].fileName + "' toolTip='" + runes[7].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[7].runeName + "</b><i class='spreadElement off'>Fourth quarter: Possible outcome six months from now</i>";
				returnString += "</td><td class='secondq'>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[6].fileName + "' toolTip='" + runes[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[6].runeName + "</b><i class='spreadElement off'>Second quarter: Influences that are acting<br>upon the question</i>";				
				returnString += "</td></tr><tr><td colspan=5 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;
			
		case "runicwheel":
			runes = pullUniqueFtharkRunes(13);

				returnString = "<h3 class='spreadElement'>Runic Wheel</h3><p>There are no set specific meanings to the places in this spread. It is, however, meant to be read in order going counterclockwise</p>";
				returnString += "<table><tr><td></td><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>10</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[9].fileName + "' toolTip='" + runes[9].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[9].runeName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td></td><td></td></tr>";
				
				returnString += "<tr><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>11</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[10].fileName + "' toolTip='" + runes[10].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[10].runeName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>9</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[8].fileName + "' toolTip='" + runes[8].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[8].runeName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td></td></tr>";
				
				returnString += "<tr><td></td><td>";
				returnString += "<sup class='spreadElement'>12</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[11].fileName + "' toolTip='" + runes[11].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[11].runeName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>8</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[7].fileName + "' toolTip='" + runes[7].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[7].runeName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td></tr>";
				
				returnString += "<tr><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[0].fileName + "' toolTip='" + runes[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[0].runeName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>13</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[12].fileName + "' toolTip='" + runes[12].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[12].runeName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[6].fileName + "' toolTip='" + runes[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[6].runeName + "</b><i class='spreadElement'></i>";
				returnString += "</td></tr>";
								
				returnString += "<tr><td></td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[1].fileName + "' toolTip='" + runes[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[1].runeName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[5].fileName + "' toolTip='" + runes[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[5].runeName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td></tr>";
				
				returnString += "<tr><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[2].fileName + "' toolTip='" + runes[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[2].runeName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[4].fileName + "' toolTip='" + runes[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[4].runeName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td></tr>";
				
				returnString += "<tr><td></td><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='ftharkRuneLink'><img src='img/runes/" + runes[3].fileName + "' toolTip='" + runes[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + runes[3].runeName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td></td><td></td></tr>";
				
				returnString += "</td></tr><tr><td colspan=7 id='runeresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		default:
			returnString = "An error has occured";
			break;
	}
	$("#ftharkSpreadResult").append(returnString);
}

// This is the code for the pagan tools app. It must be loaded after jquery and jquery ui because it depends on both of them.
$(document).ready( function() {

	// Here's where the date is used
	$("#paganTools .currentDate").append(dateOutput);

	// Original Snippet: https://gist.github.com/endel/dfe6bb2fbe679781948c
	// Example usage: Moon.phase('2018', '01', '19');
	var Moon = {
	  phases: ['new-moon', 'waxing-crescent-moon', 'quarter-moon', 'waxing-gibbous-moon', 'full-moon', 'waning-gibbous-moon', 'last-quarter-moon', 'waning-crescent-moon'],
	  // Get the current phase
	  phase: function  getPhase(year, month, day) {
		let c = e = jd = b = 0;

		if (month < 3) {
		  year--;
		  month += 12;
		}

			++month;
			c = 365.25 * year;
			e = 30.6 * month;
			jd = c + e + day - 694039.09; // jd is total days elapsed
			
			// This is for getting the date of the next full moon. I chose the most recent for my base calcs since it's easy
			fmyear = 2023;
			fmmonth = 7;
			fmday = 3;
			
			// Multiply lunar period by number of months between this and the previous full moon.
			// subtract prev. year from current
			tyear = year - fmyear;
			// multiply the difference by 12 to get the number of months in between. Add the number of months we're currently into the year
			tmonths = (tyear*12) + (month-fmmonth);
			// Multiply the result by the lunar period, then add it to the date of a known full moon
			res = 29.5305882 * tmonths;
			resa = fmday + res;
			// parseInt gives us an integer and gets rid of that ugly decimal. 30.6 is the average number of days in a month
			resb = parseInt(resa % 30.6);
			
			full_moon_day = month + "/" + resb + "/" + year;
			
			jd /= 29.5305882; // divide by the moon cycle
			b = parseInt(jd); // int(jd) -> b, take integer part of jd
			jd -= b; // subtract integer part to leave fractional part of original jd
			b = Math.round(jd * 8); // scale fraction from 0-8 and round

			if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0
			return {phase: b, name: Moon.phases[b], nextFull: full_moon_day }
		}
	};
				
	// This puts the current Moon Phase in the PaganTools window below.
	var splitDate = dateOutput.split("/");
	var currentPhase = Moon.phase(splitDate[2], splitDate[0], splitDate[1]);

	$("#paganTools .lunarPhase").append(currentPhase.name);
	$("#paganTools .nextFull").append(currentPhase.nextFull);

	// Function to get the next upcoming Sabbat
	function getSabbat(month, day){
		// I doubled some of the Sabbats because some of them fall on a range of dates. This way I don't really have to account for an additional format when looping through the dates
		sabbatnames = ["Imbolc", "Ostara", "Ostara", "Beltane", "Litha", "Litha", "Lughnasa", "Mabon", "Mabon", "Samhain", "Yule", "Yule"];
		sabbatdates = ["2/1", "3/19", "3/22", "5/1", "6/19", "6/20", "8/1", "9/21", "9/24", "11/1", "12/20", "12/23"];
		var nextSabbatn = " ";
		var nextSabbatd = " ";
		
		var l = sabbatdates.length;
		// split the array for the dates so I can compare them separately.
		// Compare the current date to my list of Sabbat days
		for(i = 0; i < l; ++i){
			sabbatmonth = sabbatdates[i].split("/");

			// If we're in the same month as the nearest Sabbat, compare the dates
			if(month == sabbatmonth[0]){
				// If we're below the day, then that's our next Sabbat
				if(day <= sabbatmonth[1]){
					nextSabbatd = sabbatdates[i];
					nextSabbatn = sabbatnames[i];
					return (nextSabbatn + ", " + nextSabbatd);
				}
				// Otherwise, move to the next Sabbat in the list
				else {
					nextSabbatd = sabbatdates[i + 1];
					nextSabbatn = sabbatnames[i + 1];	
					return (nextSabbatn + ", " + nextSabbatd);				
				}
			}
			// If we're not in the same month as the next Sabbat, compare them until we find one that's larger than the current month
			else if(month < sabbatmonth[0]){
				// That's our next Sabbat and we can return it to wherever we called it from
				nextSabbatd = sabbatdates[i];
				nextSabbatn = sabbatnames[i];
				return (nextSabbatn + ", " + nextSabbatd);
			}
			else{
			}
		}
	}
			
	$("#paganTools .nextSabbat").append(getSabbat(month, day));

	// This is for a specific window
	 $("#paganTools .runes").accordion({
	  heightStyle: "content",
	  collapsible: "true",
	  active: false
	});

	// This is for the Fthark Reader app
	$("#ftharkSpreadResult").on("click", ".ftharkRuneLink", function() {
		$("#runeresult").empty()
		data = $(this).children("img").attr("tooltip");
		$("#runeresult").append(data);
	});
	
	// Makes the app have navigation tabs
	$("#ftharkRunes").tabs({ active: 0 });
	
	// This is for downloading rune spreads. I'm basically digging through the DOM and re-building the objects I made earlier. I'm aware that I could build both the printed tables and the print string simultaneously above, but I've already written everything above and don't want to go back over it. Plus, this way I get to learn about building strings from existing HTML elements.
	$("#saveSpreadTxt").click(function() {
		// Here I'm grabbing everything that I've tagged with "spreadElement." I specifically tagged these so I could pull them out later
		spreadElements = Array.from(document.getElementById("ftharkSpreadResult").getElementsByClassName("spreadElement"));
		var printString = "";
		var getRune = { SpreadName: "", Order: "", Description: "", Name: "", Meaning: "" };
		
		// Loop through the resulting array and extract the text contents. There will be a special case for the filename, since that needs to be cleaned up and made pretty
		for(i = 0; i < spreadElements.length; i++){			
			// If the element is in an h3 tag, it needs to go on its own line since it's the name of the spread
			if(spreadElements[i].nodeName == "H3"){
				getRune.SpreadName = spreadElements[i].innerHTML;
				printString += spreadElements[i].innerHTML + "\n";
			}
			// If the element is in a <sup> tag, it marks the order of the runes
			else if(spreadElements[i].nodeName == "SUP"){
				getRune.Order = spreadElements[i].innerHTML;
			}
			// If the element is in an img tag, we'll need to extract the tooltip
			else if(spreadElements[i].nodeName == "IMG"){
				// I've replaced all commas with their HTML entity because they break CSV formatting
				getRune.Description = spreadElements[i].getAttribute("toolTip").replaceAll(",", "&comma;");
			}
			// If the element is in a <b> tag, it's the name of the rune.
			else if(spreadElements[i].nodeName == "B"){
				getRune.Name = spreadElements[i].innerHTML;
			}
			// If the element is in an i tag, it's the position/meaning of the rune. Also, this is the last thing I'll expect on the rune, so we can push everything to the print string now
			else if(spreadElements[i].nodeName == "I"){
				getRune.Meaning = spreadElements[i].innerHTML;
				printString += getRune.Order + "," + getRune.Name + "," + getRune.Description + "," + getRune.Meaning + "," + "\n";
			}
			else{
				printString += "Error: tag not found";
			}
		}
		
		console.log(printString);
		// Here's where I tie it up and send it to a file
		var filename = "FtharkSpread-" + dateOutput + ".csv";
		downloadFile(filename,printString);
	});

});