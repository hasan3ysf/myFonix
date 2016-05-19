 /*  
       var files = ['model', 'view', 'controller'];      
 */

(function loadScript() {
  var head = document.getElementsByTagName("head")[0];
  var done = false;
  console.log('test');
   var directory = 'libraries/';
   var extension = '.js';
   var files = ['functions', 'speak', 'commands', 'wsBrowser', 'main']; 
   
   
      for (var file of files){ 
            var path = directory + file + extension; 
            var script = document.createElement("script");
            script.src = path;
            
         script.onload = script.onreadystatechange = function() {
        // attach to both events for cross browser finish detection:
        if ( !done && (!this.readyState ||
          this.readyState == "loaded" || this.readyState == "complete") ) {
          done = true;
          // cleans up a little memory:
          script.onload = script.onreadystatechange = null;
          // to avoid douple loading
          head.removeChild(script);
        }
      };
      head.appendChild(script); 
      done = false;
   }
 })();