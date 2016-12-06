const http = require('http');

function printError(e) {
	console.log(`Found error: ${e.message}`);
}

function GetWeatherReport(hostURL,zip,country,key) {

	var request = http.request(hostURL + "zip=" + zip + "," + country +"&APPID=" + key, function(response) {

		var responseBody = "";

		// in case of large data server responds in chuncks of data
		// Which we have to merge chunk by chunk
		response.on('data',function(chunk){
			responseBody += chunk;
		});

		// when we finshed receiving all the chuncks server will fire response.end event
		response.on('end', function(){
			// HTTP status code 200 means everything is 'ok' just execute the code
			if(response.statusCode === 200) {
			// YaY.! Now we got the complete data

			// We'll parse the data now and see what it contains..!
			// CAUTION there me be some data other than json, JOSN.parse may throw an error.
			try {
				var data = JSON.parse(responseBody);
				console.log("City: " + data.name);
				var weatherArray = data.weather;

				weatherArray.forEach(function (item){
					console.log("Weather: " + item.main);
					console.log("Detailed: " + item.description);
				});

			} catch (error) {
				printError(error);
			}
		}
		else{
			printError({message: "There was an error getting the weather for location: " + city + " (" + http.STATUS_CODES[response.statusCode] +")"});
		}
		});


	}).on('error', (error) => {
	  printError(error);
	});


	//Always end the request.
	request.end();

}

// To expose GetWeatherReport method to outer world
module.exports.GetWeatherReport = GetWeatherReport;