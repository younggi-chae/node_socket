var fs = require('fs');
var http = require('http');
var socketio = require('socket.io');

function Sockets(){
	this.sockets = {};
}

Sockets.prototype.set = function(id, data){
	this.sockets[id] = data;
}

Sockets.prototype.get = function(id, callback){
	if(this.sockets[id] != undefined){
		callback(true, this.sockets[id]);
	}else{
		callback(false, this.sockets[id]);
	}
}

//웹서버 생성
var server = http.createServer(function(request, response){
	fs.readFile('htmlPage03.html', function(error, data){
		response.writeHead('200', {'Content-Type' : 'text/html'});
		response.end(data);
	});
}).listen(5000, function(){
	console.log('Server running....');
});

//server Socket 생성
var io = socketio.listen(server);
var roomList = [];

io.sockets.on('connection', function(socket){
	console.log('connected...');
	
	socket.on('roomRequest', function(){
		io.sockets.emit('roomResponse', roomList);
	});
	
	socket.on('create', function(data){
		roomList.push(data);
		io.sockets.emit('roomResponse', roomList);
	});
	
	socket.on('join', function(data){
		socket.join(data);
	});
	
	socket.on('message', function(data){
		io.sockets.in(data.room).emit('message', data);
	});
	
	
});

















