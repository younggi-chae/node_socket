var http = require('http');
var fs = require('fs');
var socketIo = require('socket.io');

function Sockets2(){
	this.sockets2= {};
}

Sockets2.prototype.set = function(id, data){
	this.sockets2[id] = data;
}

Sockets2.prototype.get = function(id, callback){
	if(this.sockets2[id] != undefined){
		callback(true, this.sockets2[id]);
	}else{
		callback(false, this.sockets2[id]);
	}
}



//웹서버 생성
var server = http.createServer(function(request, response){
	fs.readFile('htmlPage02.html', function(error, data){
		response.writeHead("200", {"Content-Type" : "text/html"});
		response.end(data);
	});
}).listen(5000, function(){
	console.log('Server running...');
});

//server Socket 생성
var io = socketIo.listen(server);
io.sockets.on('connection', function(socket){
	console.log('connected...');
	var mySocket = new Sockets2();
	
	socket.on('setname', function(data){
		mySocket.set("name", data);
	});
	
	socket.on('getname', function(){
		mySocket.get("name", function(error, data){
			socket.emit('response', data);
		});
	});
	
});
















