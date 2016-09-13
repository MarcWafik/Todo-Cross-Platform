
var app = angular.module("app", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
            .when("/todo", {
                templateUrl: "template/todo.html",
                controller: "ToDoController"
            })
            .when("/login", {
                templateUrl: "template/login.html",
                controller: "UserController"
            })
            .when("/signin", {
                templateUrl: "template/login.html",
                controller: "UserController"
            })
            .when("/signup", {
                templateUrl: "template/signup.html",
                controller: "UserController"
            })
            .otherwise({
                templateUrl: "template/login.html",
                controller: "UserController"
            });
});

app.factory("currentUser", function () {
    return User.GetInstance();
});