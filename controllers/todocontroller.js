"use strict";

app.controller("ToDoController", function ($location , $scope) {

    $scope.toDosArr = User.GetInstance().arrToDo;
    $scope.todoTitle;
    $scope.todoTimeString;



    if (!User._IsLogedin) {
          $location.path('/login');
    }

    /**
     * add a new to do item to database using scope and 2 way data binding
     */
    $scope.Add = function () {
        var x = new ToDo();
        x.setDueDate($scope.todoTimeString);
        x.text = $scope.todoTitle;
        x.notes = "";
        $scope.toDosArr.push(x);
        User.GetInstance().update();

        x.alertTimeRemainig();
        $scope.todoTimeString = "";
        $scope.todoTitle = "";
        return x;
    };

    /**
     * add a new to do item to database
     * @param {int} ToDoinex the index to be deleted from the array
     */
    $scope.Delete = function (ToDoindex) {
		$scope.toDosArr.splice(ToDoindex, 1);
		User.GetInstance().update();
    };

    /**
     * add a new to do item to databas
     * @param {int} ToDoinex the index to be Modified from the array
     * @param {DOM Element} isChecked the checkbox itself
     */
    $scope.Check = function (ToDoindex, isChecked) {
        return User.GetInstance().update();
    };

    /**
     * loop throw the todo array and check for the reminder
     */
    $scope.Alert = function () {
        for (var i in $scope.toDosArr) {
            $scope.toDosArr[i].alertTimeRemainig();
        }
    };
    $scope.Alert();
});