/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
function Event(sender) {
	this.sender = sender;
	this.arrlisteners = [];

	this.addEventListener = function () {
		this.arrlisteners.push(listener);
	}
	;
	this.notify = function (args) {

		for (var i = 0; i < this.arrlisteners.length; i++) {
			this.arrlisteners[i](this.sender, args);
		}
	};
}