"use strict";

app.controller("ToDoController", function ($location, $scope, currentUser) {


    $scope.toDosArr = currentUser.arrToDo;
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
        x.alertTimeRemainig($scope.alertMessage);

        $scope.toDosArr.push(x);
        currentUser.update();

        $scope.todoTimeString = "";
        $scope.todoTitle = "";

        return x;
    };

    /**
     * add a new to do item to database
     * @param {int} ToDoinex the index to be deleted from the array
     */
    $scope.Delete = function (ToDoindex) {
        var x = $scope;
        navigator.notification.confirm("are you sure you want to delete ?",
            function (buttonIndex) {
                if (buttonIndex == 1) {

                    $scope.$apply(function () {
                        currentUser.arrToDo.splice(ToDoindex, 1);
                        currentUser.update();
                    }
                        );
                }
            }, "CONFIRM", ["YES", "NO"]);
    };

    /**
     * add a new to do item to databas
     * @param {int} ToDoinex the index to be Modified from the array
     * @param {DOM Element} isChecked the checkbox itself
     */
    $scope.Check = function (ToDoindex, isChecked) {
        return currentUser.update();
    };
    $scope.alertMessage =function (toDo) {
        console.log(toDo);
        console.log("this was inside todoalertmessage");
        window.navigator.vibrate([200, 100, 200]);
        navigator.notification.alert(toDo.text + "is due since " + toDo.dueDate,
            function () {
                toDo.dueDate = null;
                User.GetInstance().update();
            }, "Todo Reminder", "close");
    }
    /**
     * loop throw the todo array and check for the reminder
     */
    $scope.Alert = function () {
        for (var i in $scope.toDosArr) {
            $scope.toDosArr[i].alertTimeRemainig($scope.alertMessage);
        }
    };
    $scope.Alert();
});