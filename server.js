var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var User = require("./app/models/User");
//var morgan = require('morgan');
var database = require("./app/database");
var mongoose = require("mongoose");
var APP_PORT = 8124;

var app = express();


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
//app.use(morgan('dev'));
//app.use(express.static(path.resolve('./public')));

app.use(express.static(__dirname + "/public"));
//app.use('/bower_components',  express.static(__dirname + '/bower_components'));
//app.engine("html", require("ejs").renderFile);
//app.set("view engine", "html");

app.set("port", (process.env.PORT || APP_PORT));

mongoose.connect(database.url);

require("./app/routes")(app);

app.listen(app.get("port"), function() {
});