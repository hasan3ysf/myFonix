//document.addEventListener("DOMContentLoaded", startSpeach);

document.addEventListener('DOMContentLoaded', function () {
 
//var s = document.querySelector('input');
var s = document.createElement("input");
s.setAttribute('type',"search");
s.setAttribute('class',"unexpand");
s.setAttribute('placeholder',"Speak (or write here) your question..");
//s.type = "text";
//s.className = "css-class-name"; // set the CSS class
document.querySelector('#view').appendChild(s); // put it into the DOM

var audio = new Audio('sound.mp3');

//Voice recognition
var recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = true;

s.addEventListener("click", function(){
  s.classList.add("expand");
  audio.play();
  //startSpeach();
  recognition.start();
});

s.addEventListener('keypress', function (e) {
        recognition.stop();
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      redirect(s.value);
      s.classList.remove("expand");
      s.value='';
//      s.removeAttribute('placeholder');
    }
});

s.addEventListener("blur", function(e) {
      s.classList.remove("expand");
      s.value='';

});


function redirect(spokentext) {
  annyang.executeCommand(spokentext);

}

recognition.onstart = function () {
    recognizing = true;
    s.disable=true;
};

recognition.onresult = function (event) {
  var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            var result = event.results[i][0].transcript;
            s.value = result;
            s.disable=false;
            redirect(result);
        //    recognition.stop();

          } else {
              interim_transcript += event.results[i][0].transcript;
              s.value = interim_transcript;
          }
        }
};

recognition.onerror = function (event) {
    s.value = "Something went wrong. Try reloading the page.";
}

recognition.onnomatch = function (event) {
    s.value = "no match";
}

window.onresize = displayWindowSize;
window.onload = displayWindowSize;
function displayWindowSize() {
  var w, h;
            w = window.innerWidth; //other browsers
          h = window.innerHeight;
    // your size calculation code here
    if(w/h < 1.5786) alert('pls do not resize your screen further');
    console.log(w + "x" + h);
};

//chrome.windows.update({width: '157.86px', height: '100px'});

})
