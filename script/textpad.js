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
	$("#aboutDialogue").dialog({
		autoOpen: false
	});
	
	$("#textpad-about-menu").click(function() {
		$("#aboutDialogue").dialog("open");
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
				formatting = "#";
				break;
			case "H2":
				formatting = "##";
				break;
			case "H3":
				formatting = "###";
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
		}
		
		const txtToAdd = formatting;

		element.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
		//$("textpad_wa").selectionStart = caretPos + txtToAdd.length;
	});
	
});