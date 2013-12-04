var express = require("express");
var app = express();
var io = require("socket.io").listen(app.listen(80));
var fs = require("fs");
var numberOfUsers; 
var users = [
		{"id" : 2, "username" : "blockaj", "password" : "zx3zc3jk", "email" : "ajblock@gmail.com"},
		{"id" : 1, "username" : "Admin", "password" : ""}
]

app.get("/", function(request, response){
	response.sendfile("./views/index.html");
});
app.use(express.static(__dirname + "/public"));

io.sockets.on("connection", function(socket){
	numberOfUsers = numberOfUsers + 1;
	io.sockets.emit("onlineUsers", {"numberOfUsers" : numberOfUsers});

	socket.on("newUser", function(user){
		var welcomeMessage = user.user + " joined the chat."; 
		io.sockets.emit("welcome", {"welcomeMessage": welcomeMessage, "username" : "Server"});
		fs.appendFile("./onlineUsers.txt", user.user + "\n");
	});
	socket.on("userMessage", function(sent){
		console.log(sent.username + ": " + sent.message);
		var sendDate = new Date();
		fs.appendFile("./chatlog.txt", sent.username + ": " + sent.message + "\n");
		io.sockets.emit("broadcast", {"broadcastToAll" : sent.message, "username" : sent.username});
	});
	socket.on("disconnect", function(){
		numberOfUsers = numberOfUsers - 1;
		io.sockets.emit("onlineUsers", {numberOfUsers: numberOfUsers});
	});
});
