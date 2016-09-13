/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var SocketResponce = function (socket, event, data) {

	/**
	 * broadcast the event and data back to the client upon succsess
	 * @param {type} err
	 * @param {type} rows
	 * @param {type} fields
	 */
	this.Send = function (err, rows, fields) {
		console.log("");
		console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		if (err) {
			console.log(err);
			console.log("ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR");
		} else {
			console.log(event + '\tdata: ' + data);

			socket.broadcast.emit(event, data);
		}
		console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
	};
	this.SendBack = function (err, rows, fields) {
		console.log("");
		console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		if (err) {
			console.log(err);
			console.log("ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR");
		} else {
			console.log(event + '\tdata: ' + data);
			socket.emit(event, data);
			socket.broadcast.emit(event, data);
		}
		console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
	};
};

module.exports = SocketResponce;