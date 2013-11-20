var express = require("express");
var app = express();
var io = require("socket.io").listen(app.listen(80));
var fs = require("fs");
var sp = require("serialport").SerialPort;
var serialPort = new sp("/dev/tty.usbmodem1421", {baudrade: 9600});



app.get("/", function(request, response){
	response.sendfile("./views/index.html");
});
app.use(express.static(__dirname + "/public"));
io.sockets.on("connection", function(socket){
	socket.on("newUser", function(user){
		var welcomeMessage = "Welcome " + user.user + " to the chat!"; 
		io.sockets.emit("welcome", {"welcomeMessage": welcomeMessage, "username" : "Server"});

	});

	socket.on("userMessage", function(sent){
		console.log(sent.username + ": " + sent.message);
		var sendDate = new Date();
		fs.appendFile("./chatlog.txt", sent.username + ": " + sent.message + "\n");
		console.log("Hello!");
		serialPort.open(function(){
			serialPort.write(new Buffer([sent.message]));
		});
		if (sent.message == "nod")
		{
			serialPort.open(function(){
				serialPort.write(new Buffer([3.34223324]));
			});
		}
		io.sockets.emit("broadcast", {"broadcastToAll" : "Light toggled.", "username": "Server"});

		io.sockets.emit("broadcast", {"broadcastToAll" : sent.message, "username" : sent.username});
	});
});
