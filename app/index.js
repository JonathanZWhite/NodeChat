var express = require('express');
var app = express();
var port = 3700;

/* Configuration */

app.set('views', __dirname + '/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public')); 

/* Routes */

app.get('/', function(req, res) {
	res.render('page');
});

/* Server setup */

// Socket.io configuration - passes express server to socket.io
var io = require('socket.io').listen(app.listen(port));
console.log('Listening on port ' + port);

/* Connection handler */

// Socket is the connection between server and browser
io.sockets.on('connection', function(socket) {
	// On successful connect, send out welcome to chat
	socket.emit('message', { message: 'Feel free to start a chat!' });
	// Handler to catch user sent message
	socket.on('send', function(data) {
		io.sockets.emit('message', data);
	});
});
