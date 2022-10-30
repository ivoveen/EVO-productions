// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > (screen.height / 2) || document.documentElement.scrollTop > (screen.height / 2)) {
    var output = ` 
        <a href="#top" class="topButton">Top</a>
        `

        var myElement = document.getElementById("topButton");
        myElement.innerHTML = output

  } 
  else {
    var output = `
        
        `

        var myElement = document.getElementById("topButton");
        myElement.innerHTML = output
  }
}

