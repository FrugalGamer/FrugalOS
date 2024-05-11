$(document).ready( function() {
	// This is for starting one of the games (Cycloa emulator). This should probably be moved to some place more logical

	$("#cycloaLink").click(function(){
	  	$.ajax({
		    url: "files/CycloaJS-magistra/index.html",

		    dataType: "jsonp",
		 
		    // Work with the response
	        success: function(dataWeGotViaJsonp){
	            var text = dataWeGotViaJsonp;

	            $('#progWindow').html(text);
	        }
		});
  	});

	$("#henryLink").click(function(){
	  	$.ajax({
		    url: "../henryishungry/index.html",

		    dataType: "jsonp",
		 
		    // Work with the response
	        success: function(dataWeGotViaJsonp){
	            var text = dataWeGotViaJsonp;

	            $('#progWindow').html(text);
	        }
		});
	});
});