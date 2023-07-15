// Yes, this is copied from the main index page
var d = new Date();

month = d.getMonth()+1;
day = d.getDate();

dateOutput = (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day + "/" + d.getFullYear();
			
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
		returnString = "<img src='img/" + fileName + "' title='" + toolTip + "'>";

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
			returnString = "<img src='img/" + fileName + "' title='" + toolTip + "'>";

			$("#cruneResult").append(returnString);
		}
	}

// This is the code for the pagan tools app. It must be loaded after jquery and jquery ui because it depends on both of them.
$( function() {

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
			else {
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
			
});