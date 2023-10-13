// This is the code for the calculator. It must be loaded after jquery and jquery ui because it depends on both of them.
$( function() {

	// This is for clearing out the display after we add operators or finish calculating things
	clearOnNext = true;
	outputWindow = $("#calc_result");
	// This is what displays the string to the user
	calcString = "";
	// This is for memory functions
	memString = 0;
	// This is for logic behind the scenes
	calcFn = 0;

	$("#calculator").find("input").click(function() {
		var printC = $(this).val();
		
		switch(printC){
			case "C":
				// If user presses the "C" button, then clear the console
				outputWindow.text(0);
				calcString = 0;
				calcFn = 0;
				// This tells the display to get rid of the leading 0 after it's been cleared once
				clearOnNext = true;
				memString = 0;
				break;
			case  "+":
				// This adds the appropriate operator, adds it to the calcFn string, and sets the display to clear on the next button push.
				calcString += "+";
				calcFn += "+";
				memString += "+";
				clearOnNext = true;
				break;
			case  "-":
				// This adds the appropriate operator, adds it to the calcFn string, and sets the display to clear on the next button push.
				calcString += "-";
				calcFn += "-";
				memString += "-";
				clearOnNext = true;
				break;
			case  "x":
				// This adds the appropriate operator, adds it to the calcFn string, and sets the display to clear on the next button push.
				calcString += "*";
				calcFn += "*";
				memString += "*";
				clearOnNext = true;
				break;
			case  ".":
				// This adds the appropriate operator, adds it to the calcFn string, and sets the display to clear on the next button push.
				calcString += ".";
				calcFn += ".";
				memString += ".";
				clearOnNext = true;
				break;
			case "=":
				// Evaluate the function
				result = eval(calcFn);
				calcFn = result;
				memString += "=" + result;
				outputWindow.text(result);
				
				// This saves the input and then prints it to the memory section
				$("#calc-mem-display").append(memString + "<br>");
				memString = "";
				break;
				
			default:
				if(clearOnNext){
					// This tells the display to get rid of the leading 0 when the calculator is first used
					outputWindow.text(printC);
					clearOnNext = false;
				}
				else{
					outputWindow.text(outputWindow.text() + printC);
				}
				calcString += printC;
				if(calcFn == 0){
					// Don't add that leading zero! If you do, it throws off the eval() function
					calcFn = printC;
					memString = calcFn;
				}
				else{
					calcFn += printC;
					memString += printC;
				}
				break;				
		}
	});
	
	$("#calc-show-mem").click(function(){
		$("#calc-memory").toggle();
	});
	
	$("#calculator .calc-clear").click(function() {
		$("#calc-mem-display").empty();
	});

});