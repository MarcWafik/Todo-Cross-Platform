
var app = angular.module("app", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
            .when("/todo", {
                templateUrl: "todo.html"
            })
            .when("/login", {
                templateUrl: "login.html"
            })
            .when("/signin", {
                templateUrl: "login.html"
            })
            .when("/signup", {
                templateUrl: "signup.html"
            })
            .otherwise({
                templateUrl: "login.html"
            });
});