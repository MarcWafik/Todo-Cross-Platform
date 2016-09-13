"use strict";

app.controller("AnonymousToDoController", function ($state, $scope, $cordovaDialogs, $cordovaVibration, ToDo) {
    ionic.Platform.ready(function () {
        $scope.toDosArr = [];
        $scope.imputTodo = new ToDo();

        ToDo.SocketConnect(function () {
            $scope.toDosArr = [];
            return $scope.toDosArr;
        });
    });
    /**
	 * add a new to do item to the anonymous list
	 */
    $scope.Add = function () {
        $scope.imputTodo.socketCreate();
        $scope.imputTodo = new ToDo();
    };

    /**
	 * add a new todo item to the anonymous list
	 * @param {int} ToDoinex the index to be deleted from the array
	 */
    $scope.Delete = function (ToDoindex) {
        $cordovaDialogs.confirm("are you sure you want to delete ?", "CONFIRM", ["YES", "NO"])
				.then(function (buttonIndex) {
				    if (buttonIndex == 1) {
				        $scope.toDosArr[ToDoindex].socketDelete();
				        $scope.toDosArr.splice(ToDoindex, 1);
				    }
				});
    };

    /**
	 * add a new to do item to the anonymous list
	 * @param {int} ToDoinex the index to be Modified from the array
	 */
    $scope.Check = function (ToDoindex) {
        $scope.toDosArr[ToDoindex].socketUpdate();
    };
});