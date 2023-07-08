// This is the code for the calculator. It must be loaded after jquery and jquery ui because it depends on both of them.
$( function() {

	// This is for clearing out the display after we add operators or finish calculating things
	clearOnNext = true;
	outputWindow = $("#calc_result");
	// This is what displays the string to the user
	calcString = "";
	// This is for memory functions
	memString = "";
	// This is for logic behind the scenes
	calcFn = 0;

	$("#calculator").find("input").click(function() {
		var printC = $(this).val();
		
		switch(printC){
			case "C":
				// If user presses the "C" button, then clear the console
				memString = outputWindow.text() + ";";
				outputWindow.text(0);
				calcString = 0;
				calcFn = 0;
				// This tells the display to get rid of the leading 0 after it's been cleared once
				clearOnNext = true;
				console.log(calcFn);
				break;
			case  "+":
				// This adds the appropriate operator, adds it to the calcFn string, and sets the display to clear on the next button push.
				calcString += "+";
				calcFn += "+";
				clearOnNext = true;
				console.log(calcFn);
				break;
			case  "-":
				// This adds the appropriate operator, adds it to the calcFn string, and sets the display to clear on the next button push.
				calcString += "-";
				calcFn += "-";
				clearOnNext = true;
				console.log(calcFn);
				break;
			case  "x":
				// This adds the appropriate operator, adds it to the calcFn string, and sets the display to clear on the next button push.
				calcString += "*";
				calcFn += "*";
				clearOnNext = true;
				console.log(calcFn);
				break;
			case  ".":
				// This adds the appropriate operator, adds it to the calcFn string, and sets the display to clear on the next button push.
				calcString += ".";
				calcFn += ".";
				clearOnNext = true;
				console.log(calcFn);	
				break;
			case "=":
				// Evaluate the function
				result = eval(calcFn);
				console.log("result: " + result);
				calcFn = result;
				outputWindow.text(result);
				break;
				
			default:
				if(clearOnNext){
					// This tells the display to get rid of the leading 0 when the calculator is first used
					outputWindow.text(printC);
					clearOnNext = false;
				}
				else
					outputWindow.text(outputWindow.text() + printC);
				calcString += printC;
				if(calcFn == 0){
					// Don't add that leading zero! If you do, it throws off the eval() function
					calcFn = printC;
				}
				else
					calcFn += printC;
				console.log(calcFn);
				break;				
		}
	});

});