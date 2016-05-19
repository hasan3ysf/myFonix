var url = require('url');

var SoH = require("./SoH.js");

module.exports =  function (request, response) {
    var path = url.parse(request.url).pathname;

    var data="";
    request.on('data', function(chunk){ data += chunk; });

    switch (path) {
        case '/api/mlSoH':
        console.log('ML check');
            request.on('end',function(){ //var input = JSON.parse(data);
                SoH.ML(response);
            });
        break;
        default:
        break;
    }
}
