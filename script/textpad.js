
// From here: https://foolishdeveloper.com/save-textarea-text-to-a-file-using-javascript/
function downloadFile(filename, content) {
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

function loadTxtFile() {
  const content = document.querySelector("#textpad_wa");
  const [file] = document.querySelector("#textpad-open").files;
  const reader = new FileReader();
  console.log(reader.result);

  reader.addEventListener(
    "load",
    () => {
      // this will then display a text file
      content.value = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsText(file);
  }
}

// This is the code for the textpad. It must be loaded after jquery and jquery ui because it depends on both of them.
$( function() {
	$("#modalDialogue").dialog({
		autoOpen: false
	}); 

	// This is a blank dialog box that can be used for different things
	$("#blankDialogue").dialog({
		autoOpen: false
	});
	
	$("#textpad-about-menu").click(function() {
		$("#blankDialogue p").html("<p>TextPad is a simple plain text and markdown editor that I've put together as a programming learning tool. You can currently use it to create, open, and edit plain text files.</p>" +
			"<p>The spellchecker tool uses Typo.js by Chris Finke and is available on Github here:<br>" +
			"<a href='https://github.com/cfinke/Typo.js/'>https://github.com/cfinke/Typo.js/</a>");
		
		$("#blankDialogue").dialog("option", "title", "About Textpad");
		$("#blankDialogue").dialog("open");
	});

	$("#textpad-spellcheck").click(function() {
		$("#blankDialogue p").html("<p>testing testing</p>");
		
		$("#blankDialogue").dialog("option", "title", "Spellcheck");
		$("#blankDialogue").dialog("open");
	});
	
	// This is the code for the Clear button
	$("#textpad-clear").click(function(){
		// Open a modal dialog asking if we're sure
		$("#modalDialogue").dialog("open");
		// Binds a clear textarea function to the "Yes" modal dialogue button
		$("#textpad_ybtn").on("click", function(){
				$("#textpad #textpad_wa").val("");
		});
	});
	
	// Binds a close modal window event to both of the buttons on that dialogue. It feels weird to
	// do it this way but it works
	$("#modalDialogue .dialogueBtn" ).click(function() {
		$("#modalDialogue").dialog("close");
	});
	
	$("#textpad-save, #textpad-save-menu").click(function() {
		textpadContent = $("#textpad_wa").val();
		var filename = "Download.txt";
		downloadFile(filename,textpadContent);
	});

	$("#textpad-wordcount").click(function() {
		var textVal = $("#textpad #textpad_wa").val();
		var count = WordCount(textVal);

		var result = "<b>Characters:</b> " + textVal.length + "<br><b>Words:</b>" + count;
		// Print the result to the window
		$("#blankDialogue p").html(result);

		// Make sure to change the window title!
		$("#blankDialogue").dialog("option", "title", "Word count");
		$("#blankDialogue").dialog("open");
	});

	// This grabs the menu link and, when clicked, simulates a click on the input button
	// that triggers the file submit input (hidden)
	$("#textpad-open-menu").click(function(){
		$("#textpad-open").trigger("click");
	});
	
	// This is for the Markdown buttons at the top and will add formatting when clicked.
	$('.markdown').click(function() {
		const element = $('#textpad_wa');
		const caretPos = element[0].selectionStart;
		const textAreaTxt = element.val();
		const id = $(this).attr("id");
		var formatting = "";
		
		switch(id){
			case "H1":
				formatting = "# ";
				break;
			case "H2":
				formatting = "## ";
				break;
			case "H3":
				formatting = "### ";
				break;
			case "bold":
				formatting = "**";
				break;
			case "italic":
				formatting = "*";
				break;
			case "hr":
				formatting = "---";
				break;
			case "ulist":
				formatting = "+ ";
				break;
			case "olist":
				formatting = "1. ";
				break;
			case "check":
				formatting = "[] ";
				break;
		}
		
		const txtToAdd = formatting;

		element.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
		//$("textpad_wa").selectionStart = caretPos + txtToAdd.length;
	});
	
});

function WordCount(str) { 
  return str.split(" ").length;
}