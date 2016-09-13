"use strict";

app.controller("ToDoController", function ($state, $scope, $cordovaDialogs, $cordovaVibration, User, ToDo) {

    $scope.toDosArr = User.GetInstance().arrToDo;

    $scope.imputTodo = new ToDo();

    //checks if user is loged in
    if (!User._IsLogedin) {
        $state.go('login');
    }

    /**
     * display a notification with the todo title and the due date
     * does a vibration with patern 200 100 200
     * @param {toDo}
     */
    var alertMessage = function (toDo) {
        $cordovaVibration.vibrate([200, 100, 200]);
        $cordovaDialogs.alert(toDo.text + "is due since " + toDo.dueDate,
             "Todo Reminder", "close").then(function () {
                toDo.dueDate = null;
                User.GetInstance().update();
            });
    };

    /**
     * loop throw the todo array and check for the reminder
     * calling alertMessage to display the notification when due date is due
     */
    var Alert = function () {
        for (var i in $scope.toDosArr) {
            $scope.toDosArr[i].alertTimeRemainig(alertMessage);
        }
    };
    Alert();

    /**
     * add a new to do item to database using scope and 2 way data binding
     */
    $scope.Add = function () {
        $scope.imputTodo.creatDate = new Date();
        $scope.imputTodo.alertTimeRemainig(alertMessage);

        $scope.toDosArr.push($scope.imputTodo);
        User.GetInstance().update();

        $scope.imputTodo = new ToDo();
    }

    /**
     * add a new to do item to database
     * @param {int} ToDoinex the index to be deleted from the array
     */
    $scope.Delete = function (ToDoindex) {
        var x = $scope;
        $cordovaDialogs.confirm("are you sure you want to delete ?", "CONFIRM", ["YES", "NO"]).then(function (buttonIndex) {
                if (buttonIndex == 1) {
                  //  $scope.$apply(function () {
                        User.GetInstance().arrToDo.splice(ToDoindex, 1);
                        User.GetInstance().update();
                   // });
                }
            });
    };

    /**
     * add a new to do item to databas
     * @param {int} ToDoinex the index to be Modified from the array
     * @param {DOM Element} isChecked the checkbox itself
     */
    $scope.Check = function (ToDoindex, isChecked) {
        return User.GetInstance().update();
    };
});