"use strict";

app.factory('Entity', function ($http) {
	var Entity = augment.defclass({
		constructor: function () {
			this.id = 0;
			this.timeCreated = new Date();
			this.timeUpdated = new Date();
		},
		/**
		 * used like a copy constructor to copy the json object
		 * @param {Entity} obj the user to be copied to the current one
		 */
		copy: function (obj) {
			this.id = obj.id;
			this.timeCreated = this.setDate(obj.timeCreated);
			this.timeUpdated = this.setDate(obj.timeUpdated);
		},
		/**
		 * used to set a date
		 * @param {mixed} obj the user to be copied to the current one
		 * @return {mixed} a date object with the correct time maped or null if imput is null
		 */
		setDate: function (imput) {
			var ret = null;
			if (imput != undefined && imput != null) {
				if (typeof imput == 'string') {
					ret = new Date(imput);
				} else if (imput.date != undefined && imput.date != null) {
					ret = new Date(String(imput.date));
				} else if (typeof imput == 'object') {
					ret = imput;
				}
			}
			return ret;
		}
	})
	return Entity;
});
