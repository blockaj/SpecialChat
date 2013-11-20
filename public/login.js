function login()
		{
			var textFieldInput = $("#username").val();
			if(textFieldInput != "" )
			{
				$("#login").hide();
				username = textFieldInput;
				socket.emit("newUser", {"user" : username});
				$("#chatView").show();
				$("#textField").show();
				$("#sendbutton").show();
				$("#clear").show();
			}
		}

		$(document).ready(function(){
			createCookie();
			checkCookie();
		});
function createCookie()
{
	var expiredate = new Date();
	expiredate.setHours(expiredate.getHours() + 5);
	var textFieldInput = $("#username").val();
	var cookieValue; 
	if (textFieldInput != "")
	{
		cookieValue = textFieldInput;
		document.cookie = "cookieName=" + cookieValue + "; expires=" + expiredate.toUTCString();

	}
}
function getCookie()
{
	var cookieValue = document.cookie; 
	var cookieStart = 10; 
	var cookieEnd; 
	for (i = 0; i < cookieValue.length; i++)
	{
		if (cookieValue.indexOf(i) == ';')
		{
			cookieEnd = i;
		}
	}
	cookieValue = cookieValue.substring(cookieStart, cookieEnd);
	return cookieValue; 
}
function checkCookie()
{
	var cookieUsername = getCookie();
	if (cookieUsername != null && cookieUsername != "")
	{
		var username; 
		$("#login").hide();
		username = cookieUsername;
		socket.emit("newUser", {"user" : username});
		$("#chatView").show();
		$("#textField").show();
		$("#sendbutton").show();
		$("#clear").show();	
	}
	else
	{
		var textFieldInput = $("#username").val();
		$("#chatView").hide();
		$("#textField").hide();
		$("#sendbutton").hide();
		$("#clear").hide();
		if(textFieldInput != "" )
			{
				$("#login").hide();
				username = textFieldInput;
				socket.emit("newUser", {"user" : username});
				$("#chatView").show();
				$("#textField").show();
				$("#sendbutton").show();
				$("#clear").show();
			}
		}
	}
}