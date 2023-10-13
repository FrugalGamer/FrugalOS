	// Here is code for the ePub Reader app
  var book = ePub();
  var rendition;

  var inputElement = document.getElementById("epubLoad");

  inputElement.addEventListener('change', function (e) {
        var file = e.target.files[0];
        if (window.FileReader) {
            var reader = new FileReader();
            reader.onload = openBook;
            reader.readAsArrayBuffer(file);
        }
    });

  function openBook(e){
    //book.destroy();
    var bookData = e.target.result;
    //var title = document.getElementById("title");
    var next = document.getElementById("next");
    var prev = document.getElementById("prev");

    book.open(bookData);

    rendition = book.renderTo("bookArea", {
      width: "100%",
      height: 600
    });

    rendition.display();

    // Navigation loaded
    book.loaded.navigation.then(function(toc){
      // console.log(toc);
    });

    var next = document.getElementById("next");
    next.addEventListener("click", function(){
      rendition.next();
    }, false);

    var prev = document.getElementById("prev");
    prev.addEventListener("click", function(){
      rendition.prev();
    }, false);

    document.addEventListener("keyup", function(e){

      // Left Key
      if ((e.keyCode || e.which) == 37) {
        rendition.prev();
      }

      // Right Key
      if ((e.keyCode || e.which) == 39) {
        rendition.next();
      }

    }, false);

    $(window).on( "swipeleft", function( event ) {
      rendition.next();
    });

    $(window).on( "swiperight", function( event ) {
      rendition.prev();
    });


    //document.addEventListener("keyup", keyListener, false);
  }