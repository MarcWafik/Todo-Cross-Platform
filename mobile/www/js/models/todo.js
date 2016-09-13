"use strict";

app.factory('ToDo', function (Entity, $http) {
	var ToDo = augment(Entity, function (parent) {

		this.constructor = function () {
			parent.constructor.call(this);
			this.dueDate = null;
			this.text = "";
			this.description = "";
			this.isChecked = false;
			this.userID = 0;
		};
		/**
		 * used like a copy constructor to copy the json object
		 * @param {ToDo} toDo the user to be copied to the current one
		 */
		this.copy = function (toDO) {
			parent.copy.call(this, toDO);
			this.dueDate = this.setDate(toDO.dueDate);
			this.text = toDO.text;
			this.notes = toDO.notes;
			this.isChecked = toDO.isChecked == true;
			this.description = toDO.description;
			this.userID = toDO.userID;
		};
		/**
		 * sets the timeout if there is time remaing or call it at once if expired
		 * @return {function} callback the action to be done if the todo is expired calledback take a pramater ToDo
		 */
		this.alertTimeRemainig = function (callback) {
			var x = this;
			this.dueDate = this.setDate(this.dueDate);
			if (this.dueDate != null && this.dueDate != 'undefined' && this.dueDate != "" && this.dueDate != 0) {
				var result = this.dueDate.getTime() - new Date().getTime();
				if (result < 2147483647) {
					setTimeout(function () {
						callback(x);
					}, result);
				}
			}
		};
		/**
		 * uses the data in object and send a request to creat a new todo 
		 * override the object data on responce succses
		 * @param {function} callback a function to be called on responce succses or failure and pass a boolean true on succses false on failure
		 */
		this.creat = function (callback) {
			var self = this;
			$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
			$http.post(RESTURL + "todo/create/", JSON.stringify(self))
					.then(function (response) {
					    if (response.data.status == true) {
							self.copy(response.data.data);
							//callback(true);
						} else {
							//callback(false);
						}
					});
		};
		/**
		 * uses the data in object and send a request to update a todo 
		 * override the object data on responce succses
		 * @param {function} callback a function to be called on responce succses or failure and pass a boolean true on succses false on failure
		 */
		this.update = function (callback) {
		    console.log($http.defaults.headers);
			var self = this;
			$http.defaults.headers.put["Content-Type"] = "application/x-www-form-urlencoded";
			$http.put(RESTURL + "todo/update/", JSON.stringify(self))
					.then(function (response) {
					    if (response.data.status == true) {
					        self.copy(response.data.data);
							//callback(true);
						} else {
							//callback(false);
						}
					});
		};
		/**
		 * send a delete request using the object id
		 * override the object data on responce succses
		 * @param {function} callback a function to be called on responce succses or failure and pass a boolean true on succses false on failure
		 */
		this.delete = function (callback) {
		    //delete $http.defaults.headers.common['X-Requested-With'];
		  //  $http.defaults.headers.delete["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
			$http.delete(RESTURL + "todo/delete/" + this.id)
					.then(function (response) {
					    if (response.data.status == true) {
							//callback(true);
						} else {
							//callback(false);
						}
					});
		};
	});
	/**
	 * send a readall request
	 * @param {int} userID the loged in user id
	 * @param {array ToDo} arrToDo the result will be added to this array on responce succses
	 */
	ToDo.ReadAll = function (userID, arrToDo) {
		$http.get(RESTURL + "todo/readall/" + userID)
				.then(function (response) {
				    if (response.data.status == true) {
				        for (var index in response.data.data) {
							var x = new ToDo();
							x.copy(response.data.data[index]);
							arrToDo.push(x);
						}
					}
				});
	};

	return ToDo;
});