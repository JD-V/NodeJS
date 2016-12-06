const http = require('http');

//var weather =  require("./weather.js");
//console.dir(process.argv);
//var hostURL = "http://api.openweathermap.org/data/2.5/weather?";
//var key = "2e106dee318f2ef4734a1815ecc46ece";
// var city = "London,uk";
//var country = process.argv[3];
//var zip = process.argv[2];
//weather.GetWeatherReport(hostURL,zip,country,key);

var port = process.env.PORT || 1337;

http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end('Hello World\n');
}).listen(port,function(){
	console.log("server running at http://oursite:"+port+"/");
});
