/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Responce = function (req, res) {

	/**
	 * respond with a json file with {data , status}
	 * @param {type} err
	 * @param {type} rows
	 * @param {type} fields
	 */
	this.Send = function (err, rows, fields) {
		var status = true;
		if (err) {
			status = false;
			console.log(err);
			console.log("ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR");
		}
		console.log(rows);
		console.log("===================================================================================");
		res.json({data: rows, status: status});
	};
};

module.exports = Responce;