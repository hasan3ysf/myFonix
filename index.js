/*\       
|*| Define Variables
\*/
var  // serveHTML = require("./Modules/staticServer.js"),
     // serveAPI  = require("./Modules/apiServer.js"),
     ess  = require("./Modules/sse.js")

var WebSocket = require('faye-websocket'),
    fs        = require('fs'),
    http      = require('http'),
    https     = require('https');

var host = '172.0.0.1',
    port    = process.argv[2] || 7000,
    secure  = process.argv[3] === 'tls',
    stock,
    connection=0;

// increase pool size
http.globalAgent.maxSockets = 20; // or whatever
https.globalAgent.maxSockets = 20; // or whatever

// disable agent
//http.get({agent : false });
/*\       
|*| Web Socket
\*/
var upgradeHandler = function(request, socket, head) {
 if (WebSocket.isWebSocket(request)) {
      console.log('socket');
    var ws = new WebSocket(request, socket, head, ['irc', 'xmpp']);
    console.log('[open]', ws.url, ws.version, ws.protocol, request.headers);
    
    ws.on('message', function(event) {
      ws.send(event.data);
    });
    
    ws.on('close', function(event) {  // or => ws.onclose = function(event) {
      console.log('close', event.code, event.reason);
      ws = null;
    });
  }
};
/*\       
|*| Server request
\*/
var requestHandler = function(request, response) {   
    if (request.method === "OPTIONS") {
       console.log('!OPTIONS');
       var headers = {};
       // IE8 does not allow domains to be specified, just the *
       // headers["Access-Control-Allow-Origin"] = req.headers.origin;
       headers["Access-Control-Allow-Origin"] = "*";
       headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
       headers["Access-Control-Allow-Credentials"] = false;
       headers["Access-Control-Max-Age"] = '86400'; // 24 hours
       headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
       response.writeHead(200, headers);
       response.end();
   }    
      
  if (!WebSocket.EventSource.isEventSource(request))
    return staticHandler(request, response);
  else
   return essHandler(request, response);
};
/*\       
|*| Static Server
\*/
var staticHandler = function(request, response) {
  var path = request.url;

       switch (path.indexOf("api")){
        case 1:
              serveAPI(request, response);
        break;
        default:
              serveHTML(request, response);
        break;           
        } 
};
/*\       
|*|  EvenSource Server / Server-Sent Events (SSE)
\*/
var essHandler = function(request, response) {    
     var es   = new WebSocket.EventSource(request, response, {
                                                            headers: {
                                                                    'Access-Control-Allow-Origin': '*'
                                                                    }
                                                               }
                                          );

     connection++;  
     if(connection === 1){
          var floop = setInterval(function() {
          	ess.fetchStock();
            //  ess.displayStock(es);
          }, 1000);
      }

      ess.displayStock(es);
      es.onclose = function() {
         connection--;
         if(connection === 0)clearInterval(floop);
         es = null;
      };
};
/*\       
|*| Create Server
\*/
var server = secure
           ? https.createServer({
               key:  fs.readFileSync(__dirname + '/../spec/server.key'),
               cert: fs.readFileSync(__dirname + '/../spec/server.crt')
             })
           : http.createServer();
/*\       
|*| Server Startup
\*/
var startServer = function () { 
	console.log('Listening on ' + server.address().port);  
}
/*\       
|*| Listen to Server
\*/
server.on('request', requestHandler);
server.on('upgrade', upgradeHandler);
server.listen(port, startServer);
