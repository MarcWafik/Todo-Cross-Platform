var express = require('express');
var http = require('http');
var socketio = require('socket.io');

var SocketResponce = require('./models/socket_responce');
var Todo = require('./models/todo');

var app = express();
var server = http.createServer(app).listen(3001, function () {
	console.log("\tSOCKET server listening on port:3001 \t\t URL: http://localhost:3001/");
});
var io = socketio(server);

io.on("connection", function (socket) {

	socket.on("create", function (todoSTR) {
		Todo.Create(JSON.parse(todoSTR), function (err, rows, fields) {
			if (err) {
				return console.log(err);
			}
			Todo.Read(rows.insertId, function (err, rows, fields) {
				if (err) {
					return console.log(err);
				}
				new SocketResponce(socket, "create", JSON.stringify(rows[0])).SendBack(err, rows, fields);
			});
		});
	});

	socket.on("update", function (todoSTR) {
		Todo.Update(JSON.parse(todoSTR), new SocketResponce(socket, "update", todoSTR).Send);
	});

	socket.on("delete", function (todoSTR) {
		Todo.Delete(todoSTR, new SocketResponce(socket, "delete", todoSTR).Send);
	});

	console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
	console.log('New connection from ' + socket.handshake.address + '\t\tSocket ID: ' + socket.id);
	console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

	Todo.ReadAll(0, function (err, rows, fields) {
		if (err) {
			console.log(err);
		} else {
			socket.emit("all", JSON.stringify(rows));
		}
	});
});
