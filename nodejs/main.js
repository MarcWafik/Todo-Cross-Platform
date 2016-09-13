
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var Responce = require('./models/responce')
var Todo = require('./models/todo');
var User = require('./models/user')
var app = express();

app.use(bodyParser.json({type: 'application/x-www-form-urlencoded'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use(function (req, res, next) {
	console.log("=======================================================================");
	console.log("Method: " + req.method + "\t URL: " + req.url);
	console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -")
	next();
});
//===================================================================================
app.post("/todo/create/", function (req, res) {
	Todo.Create(req.body, new Responce(req, res).Send);
});

app.put("/todo/update/", function (req, res) {
	Todo.Update(req.body, new Responce(req, res).Send);
});

app.get("/todo/readall/:id", function (req, res) {
	Todo.ReadAll(req.params.id, new Responce(req, res).Send);
});

app.delete("/todo/delete/:id", function (req, res) {
	Todo.Delete(req.params.id, new Responce(req, res).Send);
});
//===================================================================================
app.post("/user/login/", function (req, res) {
	User.SignIn(req.body, new Responce(req, res).Send);
});

app.post("/user/create/", function (req, res) {
	User.SignUp(req.body, new Responce(req, res).Send);
});
//===================================================================================

//app.use(express.static(""));
app.listen(3000, function () {
	console.log("Server started listening on port:3000 \t URL: http://localhost:3000/");
});
module.exports = app;