var socket = io.connect("http://localhost");
var username;

function sendMessage()
{
if ($("#textField").val() != "")
{
	socket.emit("userMessage", {"message":$("#textField").val(), "username":username});
}
else
{
	console.log("Error.");
}
		
	$("#textField").val("");
}

function checkKeyCode()
{
	if (event.keyCode == 13)
	{
		sendMessage();
	}
	if (event.keyCode == 18 && event.keyCode == 67)
	{
		$("#chatView").val("");
	}
}
socket.on("welcome", function(welcomeMessageWrapper){
	addMessageToView(welcomeMessageWrapper.welcomeMessage, welcomeMessageWrapper.username);
	$("#onlineUsers").text("Online users: " + welcomeMessageWrapper.onlineUsers);
});
socket.on("users", function(allUsers){
	for (i = 0; i < allUsers.userArray.length; i++)
	{
		console.log(allUsers.userArray[i]);
	}
});
socket.on("broadcast", function(recievedBroadcast){
	addMessageToView(recievedBroadcast.broadcastToAll, recievedBroadcast.username);
	var objDiv = document.getElementById("chatView");
	objDiv.scrollTop = objDiv.scrollHeight;
	var timeSent = new Date();
	var dateSent = timeSent.getDate(timeSent.getMonth(), timeSent.getDate(), timeSent.getYear());
	console.log(dateSent);

});

function addMessageToView(message, username)
{
	
	$("#chatView").append('<div class="message"><p><username id="user">' + username + ": " + '</username><message id="mess">' + message + '</message></p></div>');

}
function clearView()
{
	$("#chatView").text("");
}

function login()
{
	var textFieldInput = $("#username").val();
	if(textFieldInput != "")
	{
		$("#login").hide();
		username = textFieldInput;
		socket.emit("newUser", {"user" : username});
		$("#chatView").show();
		$("#textField").show();
		$("#sendbutton").show();
		$("#clear").show();
	}
	else
	{
		alert("Wrong password!");
	}
}
socket.on("onlineUsers", function(users){
	$("#onlineUsers").text("Online users: " + users.numberOfUsers);
});


$(document).ready(function(){
	$("#chatView").hide();
	$("#textField").hide();
	$("#sendbutton").hide();
	$("#clear").hide();
});
window.onload=function () {
		
}
