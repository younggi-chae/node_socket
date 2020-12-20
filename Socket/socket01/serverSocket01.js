var http = require('http');
var fs = require('fs');
var socketIo = require('socket.io');

//웹서버 생성
var server = http.createServer(function(request, response){
	fs.readFile('htmlPage01.html', function(error, data){
		response.writeHead("200", {"Content-Type" : "text/html"});
		response.end(data);
	});
}).listen(5000, function(){
	console.log('server running...');
});

//server Socket 생성
var id = 0;
var io = socketIo.listen(server);
io.sockets.on('connection', function(socket){
	console.log('connected...');
	id = socket.id;
	
	socket.on('kosta', function(data){
		console.log('Client Send Data: ' + data);
		//io.sockets.emit('response', data);//public 통신
		socket.broadcast.emit('response', data);//broadcast 통신
		//io.sockets.sockets[id].emit('response', data);//private 통신
	})
	
});















