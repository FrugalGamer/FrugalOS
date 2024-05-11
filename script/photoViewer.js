$(document).ready(function() {
	
  // This is for photo viewing functions
  $('#openFile').on("change", function(){
	const file = this.files[0];
	var imgData = "";
	if (file){
	  let reader = new FileReader();
	  reader.onload = function(event){
		$('#exifData p').append(event.target.result);
		$('#staticImage').attr('src', event.target.result);
		imgData = event.target.result;
	  }
	  reader.readAsDataURL(file);
	}
  });
  
  // This is for the clockwise rotate button
  $("#rotateright").on("click", function(){
	  var currentRotation = $("#staticImage").css("transform");
	  switch(currentRotation){
		  case "matrix(0, 1, -1, 0, 0, 0)":
		    $("#staticImage").css("transform", "matrix(-1, 0, 0, -1, 0, 0)");
			break;
		  case "matrix(-1, 0, 0, -1, 0, 0)":
		    $("#staticImage").css("transform", "matrix(0, -1, 1, 0, 0, 0)");
			break;
		  case "matrix(0, -1, 1, 0, 0, 0)":
		    $("#staticImage").css("transform", "matrix(1, 0, 0, 1, 0, 0)");
			break;
		  default:
			$("#staticImage").css("transform", "matrix(0, 1, -1, 0, 0, 0)");
	  }
	  $("#staticImage").css("height", "auto");
  })
  
  // This is for the counter-clockwise rotate button
    $("#rotateleft").on("click", function(){
	  var currentRotation = $("#staticImage").css("transform");
	  switch(currentRotation){
		  case "matrix(0, -1, -1, 0, 0, 0)":
		    $("#staticImage").css("transform", "matrix(-1, 0, 0, -1, 0, 0)");
			break;
		  case "matrix(-1, 0, 0, -1, 0, 0)":
		    $("#staticImage").css("transform", "matrix(0, 1, -1, 0, 0, 0)");
			break;
		  case "matrix(0, -1, 1, 0, 0, 0)":
		    $("#staticImage").css("transform", "matrix(-1, 0, 0, -1, 0, 0)");
			break;
		  case "matrix(0, 1, -1, 0, 0, 0)":
		    $("#staticImage").css("transform", "matrix(1, 0, 0, 1, 0, 0)");
		    break;
		  default:
			$("#staticImage").css("transform", "matrix(0, -1, 1, 0, 0, 0)");
	  }
	  $("#staticImage").css("height", "auto");
  })
  
    // This is for the flip y button
    $("#flipx").on("click", function(){
	  if($("#imageViewer #imgContainer").hasClass("flippedx"))
		  $("#imageViewer #imgContainer").removeClass("flippedx");
	  else
		$("#imageViewer #imgContainer").addClass("flippedx");
	})
	
    // This is for the flip x button
    $("#flipy").on("click", function(){
	  if($("#imageViewer #imgContainer").hasClass("flippedy"))
		  $("#imageViewer #imgContainer").removeClass("flippedy");
	  else
		$("#imageViewer #imgContainer").addClass("flippedy");
	})
})