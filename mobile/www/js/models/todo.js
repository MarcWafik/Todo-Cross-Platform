"use strict";

app.factory('ToDo', function (Entity, $http, mySocket) {
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
        this.create = function (callback) {
            this.timeCreated = new Date();
            this.timeUpdated = new Date();
            var self = this;
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $http.post(RESTURL + "todo/create/", JSON.stringify(self))
					.then(function (response) {
					    var ret;
					    if (response.data.status == true) {
					        self.id = response.data.data.insertId;
					        ret = true;
					    } else {
					        ret = false;
					    }
					    if (typeof callback == 'function') {
					        callback(ret);
					    }
					});
        };
        /**
		 * uses the data in object and send a request to update a todo 
		 * override the object data on responce succses
		 * @param {function} callback a function to be called on responce succses or failure and pass a boolean true on succses false on failure
		 */
        this.update = function (callback) {
            this.timeUpdated = new Date();
            var self = this;
            $http.defaults.headers.put["Content-Type"] = "application/x-www-form-urlencoded";
            $http.put(RESTURL + "todo/update/", JSON.stringify(self))
					.then(function (response) {
					    var ret;
					    if (response.data.status == true) {
					        ret = true;
					    } else {
					        ret = false;
					    }
					    if (typeof callback == 'function') {
					        callback(ret);
					    }
					});
        };
        /**
		 * send a delete request using the object id
		 * override the object data on responce succses
		 * @param {function} callback a function to be called on responce succses or failure and pass a boolean true on succses false on failure
		 */
        this.delete = function (callback) {
            $http.delete(RESTURL + "todo/" + this.id)
					.then(function (response) {
					    var ret;
					    if (response.data.status == true) {
					        ret = true;
					    } else {
					        ret = false;
					    }
					    if (typeof callback == 'function') {
					        callback(ret);
					    }
					});
        };

        /**
         * send a delete event to the socket using the object id
         */
        this.socketDelete = function () {
            mySocket.emit("delete", this.id);
        };

        /**
         * send a update event to the socket using the object data
         */
        this.socketUpdate = function () {
            this.timeUpdated = new Date();
            this.userID = 0;
            mySocket.emit("update", JSON.stringify(this));
        };
        /**
         * send a create event to the socket using the object data
         */
        this.socketCreate = function () {
            this.timeCreated = new Date();
            this.timeUpdated = new Date();
            this.userID = 0;
            mySocket.emit("create", JSON.stringify(this));
        };
    });
    ToDo._annonymousTodos = [];
    ToDo._userTodos = [];

    /**
     * send a readall request
     * @param {int} userID the loged in user id
     * @param {function} a function that clear an array and link it to the singleton
     */
    ToDo.UserConnect = function (userID, callbackResetArr) {
        ToDo._userTodos = callbackResetArr();
        $http.get(RESTURL + "todo/all/" + userID)
                .then(function (response) {
                    if (response.data.status == true) {
                        for (var index in response.data.data) {
                            var x = new ToDo();
                            x.copy(response.data.data[index]);
                            ToDo._userTodos.push(x);
                        }
                    }
                });
    };

    /**
     * send a readall event to the socket
     * @param {function} a function that clear an array and link it to the singleton
     */
    ToDo.SocketConnect = function (callbackResetArr) {
        ToDo._annonymousTodos = callbackResetArr();

        mySocket.on("connect", function () {
            console.log("connected");
        });

        mySocket.on("all", function (data) {
            ToDo._annonymousTodos = callbackResetArr();
            var jTodosArr = JSON.parse(data);
            for (var index in jTodosArr) {
                var x = new ToDo();
                x.copy(jTodosArr[index]);
                ToDo._annonymousTodos.push(x);
            }
        });

        mySocket.on("create", function (data) {
            var x = new ToDo();
            x.copy(JSON.parse(data));
            ToDo._annonymousTodos.push(x);
        });

        mySocket.on("delete", function (data) {
            var y = binarySearch(ToDo._annonymousTodos, data, function (index, obj) {
                return index - obj.id;
            });
            if (y != false) {
                ToDo._annonymousTodos.splice(y, 1);
            } else {
                console.log("element not found , delete failed");
            }
        });

        mySocket.on("update", function (data) {
            var temptodo = new ToDo();
            temptodo.copy(JSON.parse(data));

            var y = binarySearch(ToDo._annonymousTodos, temptodo.id, function (index, obj) {
                return index - obj.id;
            });
            if (y !== false) {
                ToDo._annonymousTodos[y] = temptodo;
            } else {
                console.log("element not found , update failed");
            }
        });
    };

    return ToDo;
});