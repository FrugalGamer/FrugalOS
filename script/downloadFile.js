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