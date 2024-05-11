// These variables need to be universal
var filetype = "jpg";
var subdirectory = "RiderWaiteSmith";

// This is the code for the pagan tools app. It must be loaded after jquery and jquery ui because it depends on both of them.
$(document).ready( function() {
	// Makes the app have navigation tabs
	$("#tarotCards").tabs({ active: 0 });
	
	// This is for getting the tool tips
	$("#tarotSpreadResult").on("click", ".tarotCardLink", function() {
		$("#cardresult").empty()
		console.log($(this).children("img"));
		data = "<img src='" + $(this).children("img").attr("src") + "'><br>" + $(this).children("img").attr("tooltip");
		$("#cardresult").append(data);
	});

	$("#tarot-credits-dialogue").dialog({
		autoOpen: false
	});
	$("#tarot-credits-menu").click(function(){
		$("#tarot-credits-dialogue").dialog("open");
	});
})


function checkDirectory() {
	var deckName = $("#tarotDeckName option").filter(":selected").val();

	switch(deckName){
		case "riderwaitesmith":
			subdirectory = "RiderWaiteSmith";
			filetype = "jpg";
			break;
		case "marseilles":
			subdirectory = "Marseilles";
			filetype = "jpg";
			break;
		case "publicdomain":
			subdirectory = "PublicDomain";
			filetype = "jpg";
			break;
		case "innerworld":
			subdirectory = "InnerWorld";
			filetype = "BMP";
			break;
		default:
			subdirectory = "RiderWaiteSmith";
			filetype = "jpg";
			break;
	}
}

function initializeTarot(){
	// I'm initializing this when we click the icon on the "desktop." I could do it elsewhere but this just saves processing so nothing is run until it's needed.
	availableCards = [];
	cardFileName = "";
	suitName = "";
	
	// Get list of all the files in the tarot images folder. I can't access the file system, so I'll need to build the array, which I'll do programmatically to save space. Fortunately I know and control what all the filenames will be.
	for(ia = 0; ia < 4; ++ia)
		// This could also be a switch case, but the if/else statements are shorter and simpler. Why do dig thing when small thing work too?
		for(ja = 1; ja < 15; ja++){
			if(ia == 0){
				suitName = "cups";
			}
			else if(ia == 1){
				suitName = "pentacles";
			}
			else if(ia == 2){
				suitName = "wands";
			}
			else if(ia == 3){
				suitName = "swords";
			}
			else
				break;
			// Here I'm building the file name into a string which I'll push to the array. The toString and padStart functions add a leading zero to numbers that are less than 10
			cardFileName = suitName + "-" + ja.toString().padStart(2, "0");
			availableCards.push(cardFileName);
		}
	for(ib = 0; ib < 22; ib++){
		availableCards.push("major-" + [ib].toString().padStart(2, "0"));
	}
}

// This is just a function that takes a two decimal number and returns the word for it, minified because it's stupidly simple and takes up a lot of space. It's basically a big switch statement.
function numberToWord(e){let a="";switch(e){case"01":a="One";break;case"02":a="Two";break;case"03":a="Three";break;case"04":a="Four";break;case"05":a="Five";break;case"06":a="Six";break;case"07":a="Seven";break;case"08":a="Eight";break;case"09":a="Nine";break;case"10":a="Ten";break;case"11":a="Eleven";break;case"12":a="Twelve";break;case"13":a="Thirteen";break;case"14":a="Fourteen";break;case"15":a="Fifteen";break;case"16":a="Sixteen";break;case"17":a="Seventeen";break;case"18":a="Eighteen";break;case"19":a="Ninteen";break;case"20":a="Twenty";break;case"21":a="Twenty-one";break;case"22":a="Twenty-two"}return a;}

function pullTarotCard(){
	checkDirectory()
	if($(".intention").val() == 0){
		$("#paganTools .error").show();
	}
	else {
		$("#paganTools .error").hide();
		ft = filetype;
		fileName = "";
		suit = "";
		cardValue = "";
		cardName= "";
		toolTip = "";
		reversed = false;
			
		// Get random number between 0-156, use that as an index to get card. If the number is above 78, get the correct card x-78 and stick "reversed" in the name
		randomNum = Math.floor(Math.random() * 155 + 1);
		if(randomNum > 77) {
			reversed = true;
			randomNum = randomNum - 78;
		}
		
		// Set the filename to the card located in the index of our random number
		fileName = 	availableCards[randomNum];

		// Explode the filename to get our suit and value
		fileNameExplode = fileName.split("-");
		suit = fileNameExplode[0];
		//console.log(fileNameExplode);
		cardValue = fileNameExplode[1];
		
	// Here I have to do some fancy stuff to set the readable card names correctly.
		// Capitalize first letter of suit
		suit = suit.charAt(0).toUpperCase() + suit.slice(1);
		
		// This swaps "Ace" for "01"
		if(cardValue == 01)
			cardName = "Ace of" + suit;
		else if(cardValue == 11)
			cardName = "Page of " + suit;
		else if(cardValue == 12)
			cardName = "Knight of " + suit;
		else if(cardValue == 13)
			cardName = "Queen of " + suit;
		else if(cardValue == 14)
			cardName = "King of " + suit;
		else {
			b = numberToWord(cardValue);
			cardName = b + " of " + suit;
		}
		
		// If we pulled a major arcana card, those have special names, so I have to set that up differently. Minified of course.
		if(suit == "Major"){
			//console.log(cardValue);
			switch(cardValue){case '00':cardName="The Fool";break;case '01':cardName="The Magician";break;case '02':cardName="The High Priestess";break;case '03':cardName="The Empress";break;case '04':cardName="The Emporer";break;case '05':cardName="The Hierophant";break;case '06':cardName="The Lovers";break;case '07':cardName="The Chariot";break;case '08':cardName="Strength";break;case '09':cardName="The Hermit";break;case '10':cardName="Wheel of Fortune";break;case '11':cardName="Justice";break;case '12':cardName="The Hanged Man";break;case '13':cardName="Death";break;case '14':cardName="Temperance";break;case '15':cardName="The Devil";break;case '16':cardName="The Tower";break;case '17':cardName="The Star";break;case '18':cardName="The Moon";break;case '19':cardName="The Sun";break;case '20':cardName="Judgement";break;case '21':cardName="The World";break;default:cardName="Card not found";break}
		}

		if(reversed)
			cardName += ", reversed";
	// Here we'll set the tooltips dynamically. For more in-depth descriptions I'll be putting them in the dictionary, and may eventually add "read more..." links to the relevant parts
	switch(suit){
		case 'Wands':
			toolTip = "<b>Fire</b>. Action, creation, desire, and passion";
			break;
		case 'Pentacles':
			toolTip = "<b>Earth</b>. Resources, money, and work";
			break;
		case 'Cups':
			toolTip = "<b>Water</b>. Emotions, intuition, and relationships";
			break;
		case 'Swords':
			toolTip = "<b>Air</b>. Intellect, communication, and logic.";
			break;
		default:
			break;
		}

	if(suit != 'Major'){
		switch(cardValue){
			case '01':
				toolTip += " New beginnings. May indicate yes.";
				break;
			case '02':
				toolTip += " Balance, partnerships, and decisions.";
				break;
			case '03':
				toolTip += " Self expression and growth. Also working with groups.";
				break;
			case '04':
				toolTip += " Home, stability, and security";
				break;
			case '05':
				toolTip += " Challenges, change, and expansion.";
				break;
			case '06':
				toolTip += " Service, community, and empathy.";
				break;
			case '07':
				toolTip += " Meditation and solitude. Inner life.";
				break;
			case '08':
				toolTip += " Leadership and authority. Action.";
				break;
			case '09':
				toolTip += " Completion, perhaps the ending of the cycle.";
				break;
			case '10':
				toolTip += " Change, transition, and renewal";
				break;
			case '11':
				toolTip += " The child; the holder of energy";
				break;
			case '12':
				toolTip += " The messenger";
				break;
			case '13':
				toolTip += " The keeper; masters energy and conveys it to others";
				break;
			case '14':
				toolTip += " The master or executor";
				break;
		}
	}

		// I'm returning this as an object so that I can use the function in multiple places
		result = {"fileName": fileName + "." + ft,"toolTip": toolTip,"cardName": cardName,"suit": suit,"cardValue": cardValue};
		//console.log(result);
		return(result);
	}
}

// This is for spreads, to make sure that all the cards I've pulled are unique. This function takes one argument: the number of cards you'd like to pull
function pullUniqueTarotCard(numCards){
	var cardsPulled = new Array();
	i = 0;

	// Here we're looping through this procedure as many times as we need to in order to pull the correct amount of cards.
	while(i < numCards){
		
		length = numCards;

		// Here I'm looping through all existing cards I've already pulled
		for(j = 0; j < length; j++){
			// Pull a new card
			newCard = pullTarotCard();

			// If the existing array includes the filename of the card we just pulled, pull another one
			if(cardsPulled.find(o => o.fileName === newCard.fileName)){
				//If we have, pull another card (restart the loop)
				newCard = pullTarotCard();
			}
			// If we haven't, add it to the array and increment our counter
			else {
				cardsPulled.push(newCard);
				i++;
			}
		}

	}
	return cardsPulled;
}

function displayTarotCard(){
	result = pullUniqueTarotCard(1);
	checkDirectory();

	if(reversed)
		var printReversed = "reversed"
		
	returnString = "<div class='tcard'><img src='img/tarot/" + subdirectory + "/" + result[0].fileName + "' title='" + result[0].cardName + "' class='" + printReversed + "'><br><b>" + result[0].cardName + "</b><br><p>" + result[0].toolTip + "</p></div>";

	$("#tarotResult").append(returnString);
}

function pullTarotSpread(){
	var spreadName = document.getElementById("tarotSpreadName").value;
	console.log(spreadName);
	checkDirectory();
	$("#tarotSpreadResult").empty();

	/* Here's where the spreads are. Yes, they are ugly. I don't yet know of a way to do them without being ugly. Basically I'm buliding a unique table for each one and running the pullUniqueFtharkRune function for the cards I need.*/
	switch(spreadName){
		case "threecard":
			// Get the cards
			cards = pullUniqueTarotCard(3);

				returnString = "<h3 class='spreadElement'>Three Card Spread</h3><table><tr>";
				returnString += "<td><i>Past<br>Problem<br>Physical</i></td><td><i>Present<br>Action<br>Mental</i></td><td><i>Future<br>Outcome<br>Spiritual</i></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><i class='off spreadElement'>Past/problem/physical</i>";
				returnString += "</td><td>"

				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><i class='off spreadElement'>Present/action/mental</i>";
				returnString += "</td><td>";

				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><i class='off spreadElement'>Future/outcome/spiritual</i>";
				returnString += "</td></tr><tr><td colspan=3 id='cardresult'>Click on a card for more info";
				returnString += "</td></tr></table>";
			break;

		case "fourdwarves":
			// Get the cards
			cards = pullUniqueTarotCard(4);

				returnString = "<h3 class='spreadElement'>The Four Dwarves</h3><table><tr><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>How you feel about the question now</i></td>";
				returnString += "</td><td><td></td><td>"

				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>Your past desires in relation to the question</i>";
				returnString += "</td><td></tr><tr>";
				returnString += "<td></td><td>";

				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>Desires and feelings of others regarding the question</i>";
				returnString += "</td><td></td><td></tr>";
				returnString += "<tr><td></td><td></td><td>";

				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>Your heart's hidden desire regarding the question</i>";
				returnString += "</td></tr><tr><td colspan=4 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "crossofthor":
			cards = pullUniqueTarotCard(5);

				returnString = "<h3 class='spreadElement'>Cross of Thor</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>Situation</i></td>";
				returnString += "</td><td></tr><tr><td>"

				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>Obstacles</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><br><i class='spreadElement'>Long term outcome</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>Short term outcome</i>";
				returnString += "</td><td></tr><tr>";
				returnString += "<td></td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>Supportive Forces</i>";
				returnString += "</td><td></td></tr>";
				returnString += "</td></tr><tr><td colspan=4 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "fiveelements":
			cards = pullUniqueTarotCard(5);

				returnString = "<p><b>Note:</b> This spread is useful for personality insight or questions</p><h3 class='spreadElement'>The Five Elements</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>Intellect</i></td>";
				returnString += "</td><td></tr><tr><td>"

				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>Strength</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><br><i class='spreadElement'>Balance</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>Love</i>";
				returnString += "</td><td></tr><tr>";
				returnString += "<td></td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>Desire</i>";
				returnString += "</td><td></td></tr>";
				returnString += "</td></tr><tr><td colspan=4 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "fiveelements2":
			cards = pullUniqueTarotCard(5);

				returnString = "<h3 class='spreadElement'>The Five Elements (alt)</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>Physical body and environment</i></td>";
				returnString += "</td><td></tr><tr><td>"

				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>Your emotions in regard to the question</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><br><i class='spreadElement'>Spiritual influences</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>Your present state of mind</i>";
				returnString += "</td><td></tr><tr>";
				
				returnString += "<td></td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>Creative forces at work</i>";
				returnString += "</td><td></td></tr>";
				returnString += "</td></tr><tr><td colspan=4 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "fourdwarves2":
			cards = pullUniqueTarotCard(5);

				returnString = "<h3 class='spreadElement'>The Four Dwarves (alt)</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>Positive influences at work</i></td>";
				returnString += "</td><td></tr><tr><td>"

				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>Any problems or obstacles</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><br><i class='spreadElement'>Key future influences</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>Immediate outcome</i>";
				returnString += "</td><td></tr><tr>";
				returnString += "<td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>Basic influences surrounding the question</i>";
				returnString += "</td><td></td></tr>";
				returnString += "</td></tr><tr><td colspan=4 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "situation":
			cards = pullUniqueTarotCard(6);

				returnString = "<h3 class='spreadElement'>Situation Spread</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>Positive influences at work</i></td>";
				returnString += "</td><td></tr><tr><td>"

				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>Any problems or obstacles</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>Key future influences</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>Immediate outcome</i>";
				returnString += "</td><td></tr><tr>";
				returnString += "<td></td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><br><i class='spreadElement'>Basic influences surrounding the question</i>";
				returnString += "</td><td></td></tr>";
				returnString += "</td></tr><tr><td colspan=4 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "persona":
			cards = pullUniqueTarotCard(5);

				returnString = "<h3 class='spreadElement'>Persona Spread</h3><table><tr><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>Where you currently find yourself in life</i>";
				returnString += "</td><td>"

				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>What is on your mind</i>";
				returnString += "</td><td>"

				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>What is in your heart</i>";
				returnString += "</td><td>"

				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>Your primary intentions</i>";
				returnString += "</td><td>"

				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><br><i class='spreadElement'>Your future actions and deeds</i>";
				returnString += "</td></tr><tr><td colspan=5 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>"
				break;

		case "celticcross":
			cards = pullUniqueTarotCard(6);

				returnString = "<h3 class='spreadElement'>The Celtic Cross</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[5].fileName + "' toolTip='" + cards[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[5].cardName + "</b><br><i class='spreadElement'>New situation</i></td>";
				returnString += "</td><td></tr><tr><td></td><td>"

				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><br><i class='spreadElement'>Challenges you will face</i>";
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>What lies ahead of you</i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>Your past</i>";
				returnString += "</td></tr><tr>";
				returnString += "<td></td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>Where you currently are</i>";
				returnString += "</td><td></td></tr>";
				returnString += "<tr><td></td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>Foundation</i>";
				returnString += "</td></tr><tr><td colspan=3 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "runiccross":
			cards = pullUniqueTarotCard(6);

				returnString = "<h3 class='spreadElement'>The Runic Cross</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[5].fileName + "' toolTip='" + cards[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[5].cardName + "</b><br><i class='spreadElement'>Most likely outcome</i>";
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>The past</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><br><i class='spreadElement'>Factors that will hinder or help the outcome</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>Your possible future</i>";
				returnString += "</td></tr>";
				returnString += "<tr><td></td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>Your present state of mind</i>";
				returnString += "<td></td></tr><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>Basic influences behind the question</i>";				
				returnString += "<td></td></td></tr><tr><td colspan=3 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "career":
			cards = pullUniqueTarotCard(6);

				returnString = "<h3 class='spreadElement'>Career Spread</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[5].fileName + "' toolTip='" + cards[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[5].cardName + "</b><br><i class='spreadElement'>Future outcome</i>";
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>Your current position</i>";
				returnString += "</td><td>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>Your position of greatest<br>strength and ability</i>";
				returnString += "</td></tr>";
				returnString += "<tr><td></td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><br><i class='spreadElement'>Your future perception</i>";
				returnString += "<td></td></tr><tr><td></td><td>";

				returnString += "<tr><td></td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>The challenge you face</i>";
				returnString += "<td></td></tr><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink' id='test'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>Past perception of the matter</i>";				
				returnString += "<td></td></td></tr><tr><td colspan=3 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;

		case "sevenworlds":
			cards = pullUniqueTarotCard(7);

				returnString = "<h3 class='spreadElement'>Seven Worlds Spread</h3><table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>That which is right</i>";
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>Things working in your favor</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>The querent or core of the question</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>Force and strength</i>";
				returnString += "</td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><br><i class='spreadElement'>Skill, purpose, and ability</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[6].fileName + "' toolTip='" + cards[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[6].cardName + "</b><br><i class='spreadElement'>Hidden factors</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[5].fileName + "' toolTip='" + cards[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[5].cardName + "</b><br><i class='spreadElement'>Dangers and forces opposing the querent</i>";			
				returnString += "</td></tr><tr><td colspan=3 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;
			
		case "combinedcards":
			cards = pullUniqueTarotCard(7);

				returnString = "<h3 class='spreadElement'>The Combined Runes Spread</h3><p><b>Note:</b> The cards in this spread are meant to be read in pairs.</p>";
				returnString += "<table><tr><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>The issue at hand</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>The issue at hand</i>";
				returnString += "</td><td></td><td></td></tr>";
				returnString += "<tr><td></td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>Factors in the past that are influencing the issue</i>";
				returnString += "</td><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><br><i class='spreadElement'>Advice on how to solve the issue</i>";
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>Factors in the past that are influencing the issue</i>";
				returnString += "</td><td></td><td colspan=2>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[6].fileName + "' toolTip='" + cards[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[6].cardName + "</b><br><i class='spreadElement'>Outcome of the situation</i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[5].fileName + "' toolTip='" + cards[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[5].cardName + "</b><br><i class='spreadElement'>Advice on how to solve the issue</i>";			
				returnString += "</td></tr><tr><td colspan=6 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;
			
		case "mimirshead":
			cards = pullUniqueTarotCard(7);

				returnString = "<h3 class='spreadElement'>Mimir's Head</h3><p><b>Note:</b> The cards in this spread are meant to be read in pairs.</p>";
				returnString += "<table><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[6].fileName + "' toolTip='" + cards[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[6].cardName + "</b><br><i class='spreadElement'>Results and final outcome</i>";
				returnString += "</td><td></td><tr>";
				returnString += "<tr><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[5].fileName + "' toolTip='" + cards[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[5].cardName + "</b><br><i class='spreadElement'>Ways to resolve the issue</i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><br><i class='spreadElement'>Ways to resolve the issue</i>";
				returnString += "</td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>The reason for the problem</i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>The reason for the problem</i>";
				returnString += "</td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>Signifies the issue at hand</i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>Signifies the issue at hand</i>";			
				returnString += "</tr><tr><td colspan=3 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;
			
		case "mimirshead2":
			cards = pullUniqueTarotCard(8);

				returnString = "<h3 class='spreadElement'>Mimir's Head (alt)</h3><p><b>Note:</b> The cards in this spread represents the Wheel of the Year, and each position is ruled by a particular house. Runes that match the house they have landed in have meanings that are especially strong, while if their house is the opposite of their meaning, they are neutralized.</p>";
				returnString += "<table><tr><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[6].fileName + "' toolTip='" + cards[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[6].cardName + "</b><br><i class='spreadElement'>House of Jera: Rune of the yearly harvest, reward, success, and luck</i>";
				returnString += "</td><td></td><td></td></tr>";
				returnString += "<tr><td></td><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[5].fileName + "' toolTip='" + cards[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[5].cardName + "</b><br><i class='spreadElement'>House of Hagalaz: Transformation and metamorphosis</i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>8</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[7].fileName + "' toolTip='" + cards[7].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[7].cardName + "</b><br><i class='spreadElement'>House of Algiz: Inner strength, the rune of divine guidance and assistance.</i>";
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><br><i class='spreadElement'>House of Kaunaz: Learning, creativity,  inspiration</i>";
				returnString += "</td><td></td><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>House of Berkano: Birth, motherhood, beginnings, Mother Goddess</i>";
				returnString += "</td></tr><tr><td></td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>House of Thurisaz: Protection from enemies and personal attack, defensive and resistant powers</i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>House of Laguz: Growth, flow, second sight</i>";
				returnString += "</td><td></td></tr><tr><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>House of Dagaz: Possible sudden changes, polarities, the balance of day and night</i>";		
				returnString += "</td><td></td><td></td></tr><tr><td colspan=5 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;
			
		case "ninegrid":
			cards = pullUniqueTarotCard(9);

				returnString = "<h3 class='spreadElement'>Grid of Nine</h3><p><b>Note:</b> This particular spread represents a magic square</p>";
				returnString += "<table><tr><td><i>The future</i></td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>Hidden obstacles</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>9</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[8].fileName + "' toolTip='" + cards[8].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[8].cardName + "</b><br><i class='spreadElement'>Best possible outcomes</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>Your attitude towards the outcome</i>";
				returnString += "</td></tr><tr><td><i>The present</i></td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>Current hidden influences</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><br><i class='spreadElement'>Current state of affairs</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[6].fileName + "' toolTip='" + cards[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[6].cardName + "</b><br><i class='spreadElement'>Your attitude towards present influences</i>";
				returnString += "</td></tr><tr><td><i>The Past</i></td><td>";
				returnString += "<sup class='spreadElement'>8</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[7].fileName + "' toolTip='" + cards[7].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[7].cardName + "</b><br><i class='spreadElement'>Hidden past influences</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>Basic past influences</i>";
				returnString += "</td><td>";				
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[5].fileName + "' toolTip='" + cards[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[5].cardName + "</b><br><i class='spreadElement'>Your attitude about those events</i>";		
				returnString += "</td></tr><tr><td colspan=4 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;
			
		case "treeoflife":
			cards = pullUniqueTarotCard(10);

				returnString = "<h3 class='spreadElement'>Tree of Life</h3><p><b>Note:</b> This spread is good for an overview of your life. The cards that share a line should be read as a pair.</p>";
				returnString += "<table><tr><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>Your highest ideals and standards</i>";
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>Your physical and mental experiences</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>Your current energy level</i>";
				returnString += "</td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><br><i class='spreadElement'>Your most recent victories and successes</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>Your ethics and personal moral code</i>";
				returnString += "</td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[5].fileName + "' toolTip='" + cards[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[5].cardName + "</b><br><i class='spreadElement'>Your health and any issues there you may have</i>";
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>8</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[7].fileName + "' toolTip='" + cards[7].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[7].cardName + "</b><br><i class='spreadElement'>Creativity, both physical and mental</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[6].fileName + "' toolTip='" + cards[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[6].cardName + "</b><br><i class='spreadElement'>Personal issues of love and trust/i>";
				returnString += "</td></tr><tr><td>";				
				returnString += "<sup class='spreadElement'>9</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[8].fileName + "' toolTip='" + cards[8].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[8].cardName + "</b><br><i class='spreadElement'>Your powers of imagination and creativity</i>";		
				returnString += "</td><td></td></tr><tr><td>";
				returnString += "<sup class='spreadElement'>10</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[9].fileName + "' toolTip='" + cards[9].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[9].cardName + "</b><br><i class='spreadElement'>Your living conditions and the state of your home</i>";
				returnString += "</td><td></td></tr><tr><td colspan=2 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;
			
		case "cosmicaxis":
			cards = pullUniqueTarotCard(11);

				returnString = "<h3 class='spreadElement'>Cosmic Axis</h3><table><tr><td>";
				returnString += "<sup class='spreadElement'>10</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[9].fileName + "' toolTip='" + cards[9].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[9].cardName + "</b><br><i class='spreadElement'>Your unconscious response to the outcome in #9</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>9</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[8].fileName + "' toolTip='" + cards[8].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[8].cardName + "</b><br><i class='spreadElement'>The major outcome of the issue at hand</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>11</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[10].fileName + "' toolTip='" + cards[10].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[10].cardName + "</b><br><i class='spreadElement'>Your conscious response to #9</i>";
				returnString += "</td></tr><tr><td></td><td>";
				
				returnString += "<sup class='spreadElement'>8</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[7].fileName + "' toolTip='" + cards[7].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[7].cardName + "</b><br><i class='spreadElement'>If you do nothing, this will be the result</i>";
				returnString += "</td><td></td></tr><tr><td>";
				
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[5].fileName + "' toolTip='" + cards[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[5].cardName + "</b><br><i class='spreadElement'>Your current unconscious responses</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><br><i class='spreadElement'>The present</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[6].fileName + "' toolTip='" + cards[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[6].cardName + "</b><br><i class='spreadElement'>Your conscious responses</i>";
				returnString += "</td></tr><tr><td></td><td>";
				
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><br><i class='spreadElement'>Results of these influences from the past</i>";
				returnString += "</td><td></td></tr><tr><td>";	
				
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><br><i class='spreadElement'>Your conscious response to #1</i>";		
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><br><i class='spreadElement'>Major past influence on the present</i>";
				returnString += "</td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><br><i class='spreadElement'>Your unconscious response to the influence in #1</i>";
				returnString += "</td></tr><tr><td colspan=3 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;
			
		case "fourquarters":
			cards = pullUniqueTarotCard(11);

				returnString = "<h3 class='spreadElement'>The Four Quarters</h3><p>This spread represents the four quarters of the year, and can be used to divine an overall look at your life from six months back to six months in the future</p>";
				returnString += "<table><tr><td class='firstq'>First quarter<br><i>Your present state of mind</i></td><td colspan=2 class='thirdq'>Third quarter<br><i>If you do nothing, this is what will result</i></td><td class='secondq'>Second quarter<br><i>Influences that are acting<br>upon the question</td></tr><tr><td class='firstq'>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><i  class='spreadElement off'>First quarter<br><i>Your present state of mind</i>";
				returnString += "</td><td class='thirdq'>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><i class='spreadElement off'>Third quarter: If you do nothing, this is what will result</i>";
				returnString += "</td><td class='thirdq'>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><i class='spreadElement off'>Third quarter: If you do nothing, this is what will result</i>";
				returnString += "</td><td class='secondq'>";				
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><i class='spreadElement off'>Second quarter: Influences that are acting<br>upon the question</i>";
				returnString += "</td></tr><tr><td class='firstq'>";
				
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><i class='spreadElement off'>First quarter: Your present state of mind</i>";
				returnString += "</td><td colspan=2>";
				returnString += "<sup class='spreadElement'>11</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[10].fileName + "' toolTip='" + cards[10].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[10].cardName + "</b><br><i class='spreadElement'>Overall tone of the spread.</i>";
				returnString += "</td><td class='secondq'>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[5].fileName + "' toolTip='" + cards[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[5].cardName + "</b><i class='spreadElement off'>Second quarter: Influences that are acting<br>upon the question</i>";
				returnString += "</td></tr><tr><td class='firstq'>";
				
				returnString += "</td><td colspan=2 class='fourthq'>Fourth quarter<br><i>Possible outcome six months from now</i></td><td class='secondq'></td></tr><tr><td class='firstq'>";
				
				returnString += "<sup class='spreadElement'>10</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[9].fileName + "' toolTip='" + cards[9].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[9].cardName + "</b><i class='spreadElement off'>First quarter: Your present state of mind</i>";		
				returnString += "</td><td class='fourthq'>";
				returnString += "<sup class='spreadElement'>9</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[8].fileName + "' toolTip='" + cards[8].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[8].cardName + "</b><i class='spreadElement off'>Fourth quarter: Possible outcome six months from now</i>";
				returnString += "</td><td class='fourthq'>";
				returnString += "<sup class='spreadElement'>8</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[7].fileName + "' toolTip='" + cards[7].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[7].cardName + "</b><i class='spreadElement off'>Fourth quarter: Possible outcome six months from now</i>";
				returnString += "</td><td class='secondq'>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[6].fileName + "' toolTip='" + cards[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[6].cardName + "</b><i class='spreadElement off'>Second quarter: Influences that are acting<br>upon the question</i>";				
				returnString += "</td></tr><tr><td colspan=5 id='cardresult'>Click on a rune for more info";
				returnString += "</td></tr></table>";
			break;
			
		case "runicwheel":
			cards = pullUniqueTarotCard(13);

				returnString = "<h3 class='spreadElement'>Runic Wheel</h3><p>There are no set specific meanings to the places in this spread. It is, however, meant to be read in order going counterclockwise</p>";
				returnString += "<table><tr><td></td><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>10</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[9].fileName + "' toolTip='" + cards[9].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[9].cardName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td></td><td></td></tr>";
				
				returnString += "<tr><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>11</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[10].fileName + "' toolTip='" + cards[10].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[10].cardName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>9</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[8].fileName + "' toolTip='" + cards[8].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[8].cardName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td></td></tr>";
				
				returnString += "<tr><td></td><td>";
				returnString += "<sup class='spreadElement'>12</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[11].fileName + "' toolTip='" + cards[11].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[11].cardName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>8</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[7].fileName + "' toolTip='" + cards[7].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[7].cardName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td></tr>";
				
				returnString += "<tr><td>";
				returnString += "<sup class='spreadElement'>1</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[0].fileName + "' toolTip='" + cards[0].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[0].cardName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>13</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[12].fileName + "' toolTip='" + cards[12].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[12].cardName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>7</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[6].fileName + "' toolTip='" + cards[6].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[6].cardName + "</b><i class='spreadElement'></i>";
				returnString += "</td></tr>";
								
				returnString += "<tr><td></td><td>";
				returnString += "<sup class='spreadElement'>2</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[1].fileName + "' toolTip='" + cards[1].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[1].cardName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>6</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[5].fileName + "' toolTip='" + cards[5].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[5].cardName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td></tr>";
				
				returnString += "<tr><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>3</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[2].fileName + "' toolTip='" + cards[2].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[2].cardName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td>";
				returnString += "<sup class='spreadElement'>5</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[4].fileName + "' toolTip='" + cards[4].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[4].cardName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td></tr>";
				
				returnString += "<tr><td></td><td></td><td></td><td>";
				returnString += "<sup class='spreadElement'>4</sup><a href='#' class='tarotCardLink'><img src='img/tarot/" + subdirectory + "/" + cards[3].fileName + "' toolTip='" + cards[3].toolTip + "' class='spreadElement'></a><br>";
				returnString += "<b class='spreadElement'>" + cards[3].cardName + "</b><i class='spreadElement'></i>";
				returnString += "</td><td></td><td></td><td></td></tr>";
				
				returnString += "</td></tr><tr><td colspan=7 id='cardresult'>Click on a card for more info";
				returnString += "</td></tr></table>";
			break;

		default:
			returnString = "An error has occured";
			break;
	}
	$("#tarotSpreadResult").append(returnString);
};