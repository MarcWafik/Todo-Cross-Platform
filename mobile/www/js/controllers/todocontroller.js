"use strict";

app.controller("ToDoController", function ($state, $scope, $cordovaDialogs, $cordovaVibration, User, ToDo) {
    ionic.Platform.ready(function () {
        $scope.toDosArr = [];
        $scope.imputTodo = new ToDo();

        if (!User._IsLogedin) {
            $state.go('login');
        }

        ToDo.UserConnect(User.GetInstance().id, function () {
            $scope.toDosArr = [];
            return $scope.toDosArr;
        });
        for (var i in $scope.toDosArr) {
            $scope.toDosArr[i].alertTimeRemainig(alertMessage);
        }
    });
	/**
	 * add a new todo item to database using scope and 2 way data binding
	 */
	$scope.Add = function () {
		$scope.imputTodo.userID = User.GetInstance().id;
		$scope.imputTodo.alertTimeRemainig(alertMessage);
		$scope.toDosArr.push($scope.imputTodo);
		$scope.imputTodo.create();
		$scope.imputTodo = new ToDo();
	};

	/**
	 * add a new to do item to database
	 * @param {int} ToDoinex the index to be deleted from the array
	 */
	$scope.Delete = function (ToDoindex) {
		$cordovaDialogs.confirm("are you sure you want to delete ?", "CONFIRM", ["YES", "NO"])
				.then(function (buttonIndex) {
					if (buttonIndex == 1) {
						$scope.toDosArr[ToDoindex].delete();
						$scope.toDosArr.splice(ToDoindex, 1);
					}
				});
	};

	/**
	 * add a new to do item to databas
	 * @param {int} ToDoinex the index to be Modified from the array
	 */
	$scope.Check = function (ToDoindex) {
		$scope.toDosArr[ToDoindex].update();
	};
	/**
	 * to be called if message due date is over to display a message and vibrate
	 * @param {ToDo} toDo
	 */
	var alertMessage = function (toDo) {
		$cordovaVibration.vibrate([200, 100, 200]);
		$cordovaDialogs.alert(toDo.text + "is due since " + toDo.dueDate,
				function () {
					toDo.dueDate = null;
					User.GetInstance().update();
				}, "Todo Reminder", "close");
	};

});