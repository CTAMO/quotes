var APP_PORT = 8124;
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
//var morgan = require('morgan');
var database = require("./app/config/database");
var mongoose = require("mongoose");
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require("path");


var app = express();

app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

//app.use(morgan('dev'));
//app.use(express.static(path.resolve('./public')));

app.use(express.static(__dirname + "/public"));
//app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.engine("html", require("ejs").renderFile);

//app.set("view engine", "html");
app.set('views', path.join(__dirname, '/public/views'));


app.set("port", (process.env.PORT || APP_PORT));

mongoose.connect(database.url);
require('./app/config/passport')(passport);
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

require("./app/routes")(app, passport);

app.listen(app.get("port"));