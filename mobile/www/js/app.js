// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

"use strict";
//  _____  ______  _____ _______            _____ _____    _    _ _____  _      
// |  __ \|  ____|/ ____|__   __|     /\   |  __ \_   _|  | |  | |  __ \| |     
// | |__) | |__  | (___    | |       /  \  | |__) || |    | |  | | |__) | |     
// |  _  /|  __|  \___ \   | |      / /\ \ |  ___/ | |    | |  | |  _  /| |     
// | | \ \| |____ ____) |  | |     / ____ \| |    _| |_   | |__| | | \ \| |____ 
// |_|  \_\______|_____/   |_|    /_/    \_\_|   |_____|   \____/|_|  \_\_____|
const RESTURL = "http://localhost:3000/";
//  /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ 
// |/\|/\|/\|/\|/\|/\|/\|/\|/\|/\|/\|/\|/\|/\|/\|/\|/\|/\|/\|/\|/\|/\|/\|/\|/\|

var app = angular.module('starter', ['ionic', 'ngCordova']);

app.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

app.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
			.state('todo', {
				url: '/todo',
				templateUrl: "templates/todo.html",
				controller: "ToDoController"
			})

			.state('signin', {
				url: '/signin',
				templateUrl: "templates/signin.html",
				controller: "SignInController"
			})

			.state('signup', {
				url: '/signup',
				templateUrl: "templates/signup.html",
				controller: "SignUpController"
			})

	$urlRouterProvider.otherwise('/signin');

});
