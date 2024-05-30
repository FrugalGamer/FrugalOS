"use strict"

let addNew = document.getElementById("todo-addNew");
let dialogW = document.querySelector("#universal-modularWindow");
let mainWindow = document.querySelector("#todo");
let itemsArray = Array();
let completedArray = Array();

let k = 0;

// This is the code for the textpad. It must be loaded after jquery and jquery ui because it depends on both of them.
$( function() {
	// Since this is a unversal dialog box, this initialization should be moved to another document. Either way, this code intiallizes it on pageload and sets it to not auto open
	$("#universal-modularWindow").dialog({
		autoOpen: false
	});

	// This is the update/complete item function. Note we have to bind the "on change" to the :checkbox element so that it grabs it after they've been created dynamically
	$("#todo-items").on("change", ":checkbox", function() {
		 if($(this).is(':checked')) {
			completeItem($(this));
		}
		else{
			rollbackItem($(this));
		}
	});

	// Restores items that are stored in local storage
	if(localStorage.todoItems){
		// Take string from local storage and split it wherever there are semicolons
		let temp = localStorage.todoItems.split(";");
		// It seems that the way I'm splitting the array always leaves a blank at the end, so I'm just chopping it off
		for(let x = 0; x < temp.length-1; x++){
			// Add the item to an array
			itemsArray.push(temp[x]);

			// print the item on the page. Note that I have this code in three different places in this document and I need to consolidate it somehow otherwise it's going to cause issues in the future
			$("#todo-items ul").append("<li id='todo-list-" + k + "'><input type='checkbox' id='todo-items-check-" + k + "' class='todo-input-checkbox'> <span class='text'>" + temp[x] + "</span> | <a href='#' class='todo-editLink' onClick='editItem(" + k + ")'>[edit]</a> | <a href='#' class='todo-deleteLink' onClick='removeItem(" + k + ")'>[del]</a></li>");
			k++;
		}


		// Restores completed items and dates
		if(localStorage.todoCompleted){
			// This splits the data up by each entry
			let temp = localStorage.todoCompleted.split(";");

			for(let x = 0; x < temp.length-1; x++){

				// Now we'll need to split each entry up into id, date, and time
				let dtTemp = temp[x].split(",");
				// Grab the li element
				let elemTemp = document.querySelector("#" + dtTemp[0]);
				// Add the completed class and check the checkbox
				$(elemTemp).addClass("completed");
				document.querySelector("#" + dtTemp[0] + " input").checked = true;

				// Add the completed datestamp
				$(elemTemp).append(" <span class='completeDate'>" + dtTemp[1] + ", " + dtTemp[2] + "</span>");
			}
		}
	}

	addNew.onclick = function() {
		// Change the title in the popup window
		$("#universal-modularWindow").dialog( { title: "Add new to-do item"} );
		let classname = "todo-item-" + k;
		// Puts an input in the window for collecting the next to do item
		$("#universal-modularWindow #univ-text").html(
			"<input type='text' id='todo-item-input' value=''><br>" +
			"<input type='button' id='todo-add' value='Add' onClick='addItem()'> <input type='button' id='todo-cancel' onClick='closeDialogue()' value='Cancel'>"
		);
		// Use jQuery to open the dialogue
		$("#universal-modularWindow").dialog("open");
	};

	let importButton = document.getElementById("todo-import");
	importButton.onclick = function() {
		// Change the title in the popup window
		$("#universal-modularWindow").dialog( { title: "Import file"} );

		// Puts an input in the window for collecting the file to be uploaded
		$("#universal-modularWindow #univ-text").html(
			"<input type='file' id='todo-import-file' value=''><br>" +
			"<input type='button' id='todo-import-confirm' value='Import' onClick='loadTodo()'> <input type='button' id='todo-cancel' onClick='closeDialogue()' value='Cancel'><br>Note: new items will be appended to current list"
		);
		// Use jQuery to open the dialogue
		$("#universal-modularWindow").dialog("open");
	};

	// This is the code for the edit link on each to-do item
	$("#todo-items").on("click", ".todo-editLink", function (passedItem) {
		// This grabs the text of the item we clicked "edit" on
		let editText = passedItem.currentTarget.parentElement.querySelector(".text").innerText;
		// This grabs the parent element's id, which holds the index
		let editID = passedItem.currentTarget.parentElement.id;
		// And this strips out everything except the number we need
		let editIndex = editID.replace(/^\D+/g, '');

		// Print to and open the window
		$("#universal-modularWindow #univ-text").html(
			"<input type='text' id='todo-item-input' value='" + editText + "'><br>" +
			"<input type='button' id='todo-add' value='Edit' onClick='editItem(" + editIndex + ")'> <input type='button' id='todo-cancel' onClick='closeDialogue()' value='Cancel'>"
			);

		// Use jQuery to open the dialogue
		$("#universal-modularWindow").dialog("open");
	});

});

// Built a datestamp. This is used for a variety of things
var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var hour = d.getHours();
var period = "";
	if(hour > 12) { period = "PM"; }
	else { period = "AM"; }
var minute = d.getMinutes();

// This happens when the submit button gets clicked.
function addItem() {
	let input = $("#todo-item-input").val();
	// Note: need to sanitize input
	// Adds the item to the window list
	$("#todo-items ul").append("<li id='todo-list-" + k + "'><input type='checkbox' id='todo-items-check-" + k + "' class='todo-input-checkbox'> <span class='text'>" + input + "</span> | <a href='#' class='todo-editLink' onClick='editItem(" + k + ")'>[edit]</a> | <a href='#' class='todo-deleteLink' onClick='removeItem(" + k + ")'>[del]</a></li>");
	// This adds the item to an array with all the todo data for saving and manipulation
	itemsArray.push(input);

	// Automatically saves the items to local storage
	saveToLocal()

	// Increment the list counter
	k++;
	// Close the window and clear it out
	$("#universal-modularWindow").dialog("close");
	$("#universal-modularWindow #univ-text").html("");
};

function editItem(itemIndex) {
	let itemToChange = "todo-list-" + itemIndex;
	let newText = document.querySelector("#todo-item-input").value;
	let inputToChange = document.getElementById(itemToChange);

	// Update the text in the window
	inputToChange.querySelector("span.text").innerText = newText;
	// Save it to the array
	itemsArray[itemIndex] = newText;
	// Save changes to localStorage
	saveToLocal();

	// Close the window and clear it out
	$("#universal-modularWindow").dialog("close");
	$("#universal-modularWindow #univ-text").html("");
}

function removeItem(itemIndex) {
	// Remove the item from the array
	itemsArray.splice(itemsArray, 1);

	//Remove the item from the window
	$("#todo-list-" + itemIndex).remove();
	// Decrement the list counter
	k--;

	// Save changes to localStorage
	saveToLocal();
}

function saveToLocal() {
	// Save the todo items themselves
	let itemsString = "";
	for(let y = 0; y < itemsArray.length; y++){
		itemsString += itemsArray[y] + ";";
	}
	localStorage.setItem("todoItems", itemsString);

	// Save which ones have been checked + completion dates
	let itemDates = "";
	let doneItems = document.querySelectorAll("#todo-items .completed");
	for(let z = 0;z < doneItems.length; z++){
		itemDates += doneItems[z].id + ", " + doneItems[z].querySelector(".completeDate").innerText + ";";
	}
	localStorage.setItem("todoCompleted", itemDates);
}

function completeItem(item) {
	let text = item.parent();

	// Adds a class to the item so we can target it with css
	$(text).addClass("completed");

	// Build the returned date
	dateOutput = hour + ":" + (minute<10 ? '0' : '') + minute + " " + period + ", " + (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day + "/" + d.getFullYear();
	
	// Adds the date to a span at the end of the li item
	$(text).append(" <span class='completeDate'>" + dateOutput + "</span>");

	//Save the info
	saveToLocal();
}

function rollbackItem(item) {
	let text = item.parent();

	//Removes the completed class
	$(text).removeClass("completed");
	// Deletes the datestamp
	$(text.children(".completeDate")).remove();

	//Save the info
	saveToLocal();
}

function exportTodo() {
	// Build the export string
	let exportString = "";
	let exported = document.querySelectorAll("#todo-items li");
	for(let x = 0; x < exported.length; x++){
		// Grab the text in the element
		let string = exported[x].querySelector(".text").innerText;
		// Replace any commas with HTML entities
		let cleanString = string.replace(",", "&#44;")

		exportString += cleanString + ",";
		// Grab the completion date
		if(exported[x].querySelector(".completeDate")){
			exportString += exported[x].querySelector(".completeDate").innerText + ";"
		}
		else{
			exportString += "NULL, NULL;";
		}
	}

	// This part creates and downloads the file. Many of my apps use similar code, so I will consolidate it in the future at some point
	const element = document.createElement("a");

	let fileName = "todo-" + day + month + d.getFullYear() + ".csv";
	//A blob is a data type that can store binary data
	// “type” is a MIME type
	// It can have a different value, based on a file you want to save
	const blob = new Blob([exportString], { type: "plain/text" });
	//createObjectURL() static method creates a DOMString containing a URL representing the object given in the parameter.
	const fileUrl = window.URL.createObjectURL(blob);
	  
	//setAttribute() Sets the value of an attribute on the specified element.
	element.setAttribute("href", window.URL.createObjectURL(blob)); //file location
	element.setAttribute("download", fileName); // file name
	element.style.display = "none";
	  
	//use appendChild() method to move an element from one element to another
	document.body.appendChild(element);
	element.click();
	  
	//The removeChild() method of the Node interface removes a child node from the DOM and returns the removed node
	//Release fileURL object for memory reasons
	URL.revokeObjectURL(blob.URL);
}

function loadTodo() {
  const content = document.querySelector("#todo");
  const [file] = document.querySelector("#todo-import-file").files;
  // Need to add a check for .csv file here
  const reader = new FileReader();
  let string = "";

  reader.addEventListener(
    "load",
    () => {
      // this will load in the csv as text and then process it
      let fetched = reader.result;
      let fetchedItems = fetched.split(";");
      for(let x = 0; x < fetchedItems.length; x++){
  	    let itemComponents = fetchedItems[x].split(",");
  	      
  	    // Here we just throw out any completely empty items
      	if(itemComponents[0] != ""){
  	      	// Build the string to insert into the list. There will be different formats depending on whether or not the item has been marked as completed
  	      	if(itemComponents[1] == "NULL" || itemComponents[1] == undefined){
  	      		// If the item has not been marked as completed...
  	      		string = "<li id='todo-list-" + (x+k)+ "'><input type='checkbox' id='todo-items-check-" + (x+k) + "' class='todo-input-checkbox'> <span class='text'>" + itemComponents[0] + "</span> | <a href='#' class='todo-editLink' onClick='editItem(" + k + ")'>[edit]</a> | <a href='#' class='todo-deleteLink' onClick='removeItem(" + (x+k) + ")'>[del]</a></li>";
  	      	}
  	      	else {
  	      		// this is if the items have been marked as completed
  				string = "<li id='todo-list-" + (x+k) + "' class='completed'><input type='checkbox' id='todo-items-check-" + (x+k) + "' checked class='todo-input-checkbox'> <span class='text'>" + itemComponents[0] + "</span> | <a href='#' class='todo-editLink' onClick='editItem(" + k + ")'>[edit]</a> | <a href='#' class='todo-deleteLink' onClick='removeItem(" + (x+k) + ")'>[del]</a> <span class='completeDate'>" + itemComponents[1] + ", " +  itemComponents[2] + "</span></li>";
  	      	}
  	
  			// Push the item into the tracking array. IMPORTANT
  			itemsArray.push(itemComponents[0]);
  	      	content.querySelector("#todo-items ul").innerHTML += string;
  	    }

  	    closeDialogue();
  		}
    },
    false
  );

  if (file) {
    reader.readAsText(file);
  }
}

// This happens when the user clicks cancel in the modular window
function closeDialogue() {
	$("#universal-modularWindow").dialog("close");
	$("#universal-modularWindow #univ-text").html("");
};