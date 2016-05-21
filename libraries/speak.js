
/*
      var voices = speechSynthesis.getVoices();
      for(var i = 0; i < voices.length; i++ ) {
        console.log("Voice " + i.toString() + ' ' + voices[i].name + ' ' + voices[i].uri);
      }
  */
  
  /*
 * Check for browser support
 */

if ('speechSynthesis' in window) {
	console.log('Your browser supports speech synthesis.');
 // speak('hi');
} else {
	alert('Sorry your browser does not support speech synthesis. Try this in <a href="https://www.google.com/chrome/browser/desktop/index.html">Google Chrome</a>.');
}

function speak(text) {
  // Create a new instance of SpeechSynthesisUtterance.
	var msg = new SpeechSynthesisUtterance();

  // Set the text.
	msg.text = text;
  
  // Set the attributes.
    msg.lang = 'en-US';
   // msg.voice = 'native'; msg.voice = 'Google US English'; //  'Google UK English Female' 
    msg.voice = 'Google US English' 
	msg.volume = 1;
	msg.rate = 1;
	msg.pitch = 1;
  //  msg.onend = function(event) { console.log('Speech complete'); }
  
  // Queue this utterance.
	window.speechSynthesis.speak(msg);
}