// This is the code for the csvEditor. It must be loaded after jquery and jquery ui because it depends on both of them.
$( function() {
	// these variables are for keeping track of the rows & cells I've added so that I can easily remove them later
	var rcounter = 0;
	var ccounter = 5;
	var evenClass = "";
	
	$("#csv-modalDialogue").dialog({
		autoOpen: false
	}); 

// This is where row manipulation functions go

	// Binds a click event to the insert row button that...adds a row. I've marked it with a unique class for easy removal later
	$("#insert-row").click(function insertRow(){
		// This is so I can match the existing classes and make sure the counts are right
		realCount = rcounter+5;
		// This checks if we're on an even row, and if we are, adds a class for special styling
		if(realCount % 2 == 0)
			evenClass = " even";
		else
			evenClass = "";
		
		$(".csvDisplay").append('<tr class="added-tr' + rcounter + evenClass + '"> <td><input type="text" name="csv-text-r' + realCount + 'c1"></td> <td><input type="text" name="csv-text-r' + realCount + 'c2"></td> <td><input type="text" name="csv-text-r' + realCount + 'c3"></td> <td class="csv-td-r' + realCount + 'c4"><input type="text" name="csv-text-r' + realCount + 'c4"></td> </tr>');
		++rcounter;
	});

	// Bind remove row event to remove row button
	$("#remove-row").click(function removeRow(){
		// Since the counter is incremented each time I add a row, we'll need to subtract one to get the number of the rows I added last
		rowN = rcounter-1;

		$(".added-tr" + rowN).remove();
		// This just makes sure the counter never goes below zero
		if(rcounter > 0)
			--rcounter;
		else
			rcounter = 0;
	});

// This is where cell manipulation functions go
	
	// This is the code for the Clear button
	$("#csvEdit .new").click(function(){
		// Open a modal dialog asking if we're sure
		$("#csv-modalDialogue").dialog("open");
		// Binds a clear textarea function to the "Yes" modal dialogue button
		$("#csvEdit_ybtn").on("click", function(){
				$("#csvEdit .csvDisplay input").val("");
		});
	});
	
	// Binds a close modal window event to both of the buttons on that dialogue. It feels weird to
	// do it this way but it works
	$("#csv-modalDialogue .dialogueBtn" ).click(function() {
		$("#csv-modalDialogue").dialog("close");
	});
	
	
	
	// Binds a click event to the insert cell button that...adds a row. I've marked it with a unique class for easy removal later
	$("#insert-cell").click(function insertCell(){
		// Adding a cell is more compliated. First we'll need to get the number of rows that are on screen. 
		var rowCount = $(".csvDisplay tr").length;

		// Then we'll loop through them and add an additional cell to the last child of each row, and mark it with a class for easy retrieval
		for(i = 0; i <= rowCount; i++){
			var className = ".csv-td-r" + i + "c4";

			$(".csvDisplay " + className).parent().append('<td class="added-td-r' + i + 'c' + ccounter + '"> <input type="text" name="csv-text-r' + i + 'c' + ccounter + '"> </td>');
		};
		// Increment the counter for which cell we've added
		++ccounter;
	});

	// Bind remove cell event to remove cell button
	$("#remove-cell").click(function removeCell(){
		// Since the counter is incremented each time I add a cell, we'll need to subtract one to get the number of the cells I added last
		cellN = ccounter;
		var rowCount = $(".csvDisplay tr").length;

		for(i = 0; i <= rowCount; i++){
			$(".added-td-r" + i + "c" + cellN).remove();
		};
		
		// This just makes sure the counter never goes below zero
		if(ccounter > 5)
			--ccounter;
		else
			ccounter = 5;
	});
	
	// This is where save & load functions go
	function getCSVContents() {
		// Get the total number of rows we'll be looping through
		var totalRows = $(".csvDisplay tr").length;
		var totalCells = $(".csvDisplay td").length;
		
		// This is the string we'll be writing to the file
		var csvContent = "";
		
		// Loop through the table and grab each input
		for(i = 0; i <= totalRows; ++i){
			for(j = 0; j <= totalCells; ++j){
				inputClass = ".csv-text-r" + i + "c" + j;
				// This just keeps us from writing "undefined" for every blank input
				if($(inputClass).val() == undefined && j != 0)
					csvContent += ",";
				else if($(inputClass).val() == undefined && j == 0)
					csvContent += "";
				else
					csvContent += $(inputClass).val() + ",";
			};
			csvContent += "\n";
		};
		// Return the string to whatever called it
		return csvContent;
	};
	
	// Binds the save function to the save menu option and calls the necessary functions
	$("#csvEdit .save").click(function() {		
		var filename = "Download.csv";
		var fetch = getCSVContents();
		
		console.log(getCSVContents());
		downloadFile(filename,fetch)
		});
	
		// This grabs the menu link and, when clicked, simulates a click on the input button
		// that triggers the file submit input (hidden)
		$("#csvEdit .open").click(function(){
			$("#csvEdit-open").trigger("click");
		});
});

// Parse a CSV row, accounting for commas inside quotes
// From here: https://stackoverflow.com/questions/7431268/how-to-read-data-from-csv-file-using-javascript/22850815#22850815               
function parse(row){
  var insideQuote = false,                                             
      entries = [],                                                    
      entry = [];
  row.split('').forEach(function (character) {                         
    if(character === '"') {
      insideQuote = !insideQuote;                                      
    } else {
      if(character == "," && !insideQuote) {                           
        entries.push(entry.join(''));                                  
        entry = [];                                                    
      } else {
        entry.push(character);                                         
      }                                                                
    }                                                                  
  });
  entries.push(entry.join(''));                                        
  return entries;                                                      
}

function loadCsvFile() {
  const data = document.querySelector(".csvDisplay");
  const [file] = document.querySelector("#csvEdit-open").files;
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      // This loops through the file and prints the data in it to our table	  
      var data = reader.result;
	  
	  console.log(data);
	  
	  // Get the total number of rows currently on screen
		var totalRows = $(".csvDisplay tr").length;
		var totalCells = ($(".csvDisplay td").length)/totalRows;
		var fileLength = data.length;
		var charIndex = 0;
		console.log("Rows: " + totalRows + " | Cells: " + totalCells);
		
		// Row counter
		for(i = 0; i <= totalRows; ++i){

			// Cell counter
			for(j = 0; j <= totalCells; ++j){
				inputClass = ".csv-text-r" + i + "c" + j;
				
				while(data.charAt(charIndex) != ','){
					$(inputClass).val($(inputClass).val() + data.charAt(charIndex));
					++charIndex;
				};
				++charIndex;

			};
		};
    },
    false
  );

  if (file) {
    reader.readAsText(file);
  }
}