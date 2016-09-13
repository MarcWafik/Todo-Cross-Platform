/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Responce = function (req, res) {
	this.res = res;
	this.req = req;

	this.Send = function (err, rows, fields) {
		var status = true;
		if (err) {
			status = false;
			console.log(err);
		}
		res.json({data: rows, status: status});
	};
};

module.exports = Responce;