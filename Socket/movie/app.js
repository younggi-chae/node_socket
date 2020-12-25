var socketio = require('socket.io');
var express = require('express');
var http = require('http');
var fs = require('fs');

var seats  = [
    [1,1,0,1,1,0,0,0,0,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1]          
 ];

//웹서버생성
var app = express();

//미들웨어(라우터) 설정
app.get('/', function(request, response){
	 fs.readFile('HTMLPage.html', function(error, data){
		 response.send(data.toString());
	 });
});


//웹서버 실행
var server = http.createServer(app);
server.listen(5000, function(){
	console.log('Server running...');
});


//웹소켓생성, 실행
var io = socketio.listen(server);
io.sockets.on('connection', function(socket){
	
	socket.on('seates', function(){
		io.sockets.emit('seatesResponse', seats);
	});
	
	socket.on('reserve', function(data){
		seats[data.y][data.x] = 2;
		io.sockets.emit('reserve', data);
	});
	
});
















