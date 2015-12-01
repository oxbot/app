//setup Express
var app = require('./models/express.js'); //Makes this an html server

//npm install mongoose (just like for react hw)

//mongo runs as socket



//start the server
var server = app.listen(3000, function() {
	console.log("Started on port 3000");
	var host = server.address().address;
	var port = server.address().port;
});
