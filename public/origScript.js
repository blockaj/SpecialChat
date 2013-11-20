var socket = io.connect();
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
}
socket.on("welcome", function(welcomeMessageWrapper){
	addMessageToView(welcomeMessageWrapper.welcomeMessage, welcomeMessageWrapper.username);
});
socket.on("broadcast", function(recievedBroadcast){
	addMessageToView(recievedBroadcast.broadcastToAll, recievedBroadcast.username);
});

function addMessageToView(message, username)
{
	if (username == "Server")
	{
		$("#mess").css("background-color", "yellow");
	}
	$("#chatView").append('<div class="message"><p><username id="user">' + username + ": " + '</username><message id="mess">' + message + '</message></p></div>');
	$("#chatView").scrollTop() = $("#chatView").scrollHeight();

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

$(document).ready(function(){
	$("#chatView").hide();
	$("#textField").hide();
	$("#sendbutton").hide();
	$("#clear").hide();
	$("#chatView").scrollTop() = $("#chatView").scrollHeight();
});
window.onload=function () {
		var objDiv = document.getElementById("chatView");
		objDiv.scrollTop = objDiv.scrollHeight;
}
