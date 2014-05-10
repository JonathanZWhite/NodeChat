window.onload = function() {

	// Stores messages
	var messages = [];
	// DOM shortcuts
	var socket = io.connect('http://localhost:3700');
	var field = document.getElementById('field');
	var sendButton = document.getElementById('send');
	var content = document.getElementById('content');
	var name = document.getElementById('name');

	// Binds event message, receives object - data with property message
	socket.on('message', function(data) {
		if(data.message) {
			messages.push(data);
			var html = '';
			for(var i = 0; i < messages.length; i++) {
				html += (messages[i].username ? '<br>' + messages[i].username : 'Welcome') + ': </b>';
				html += messages[i].message + '<br />';
			}
			content.innerHTML = html;
			content.scrollTop = content.scrollHeight;
		} else {
			console.log('There is a problem:', data);
		}
	});

	sendButton.onclick = sendMessage = function() {
        if(name.value == '') {
        	alert('Please type in your name!');
        } else {
        	var text = field.value;
        	socket.emit('send', { message: text, username: name.value });
        	field.value = '';
        }
    };

	$(document).ready(function() {
	    $("#field").keyup(function(e) {
	        if(e.keyCode == 13) {
	            sendMessage();
	        }
	    });
	});
}