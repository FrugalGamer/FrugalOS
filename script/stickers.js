var img = "";
var offset = 0;

function mouse(evt){
	var center_x = (offset.left) + (img.width()/2);
	var center_y = (offset.top) + (img.height()/2);
	var mouse_x = evt.pageX; var mouse_y = evt.pageY;
	var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
	var degree = (radians * (180 / Math.PI) * -1) + 90; 
	img.css('-moz-transform', 'rotate('+degree+'deg)');
	img.css('-webkit-transform', 'rotate('+degree+'deg)');
	img.css('-o-transform', 'rotate('+degree+'deg)');
	img.css('-ms-transform', 'rotate('+degree+'deg)');
}

$(document).ready(function(){

	$("#stickerImages img").on("click", function(){
		var stick = "<div class='stickers'><a href='#' class='rotate'>Rotate</a> <a href='#' class='resize'>Resize</a> <a href='#' class='close'>X</a><br>";
		stick += "<img src='" + $(this).attr("src") + "' style='z-index: 0;'></div>";
		$("#stickersCanvas").append(stick);
		// This makes the stickers draggable
		$(".stickers").draggable();
		// This is the delete function
		$(".stickers .close").on("click", function() { $(this).closest("div").remove(); } );
		// This is the rotate function
		$(".stickers .rotate").mousedown(function() { 
			img = $(this).closest("div");
			if(img.length > 0 ){
				offset = $(this).offset();
			$(document).mousemove(mouse);
			}
		});
	})
	
	// Disables rotate and resize
	$(document).mouseup(function() {
		$(document).off("mousemove");
	})
})