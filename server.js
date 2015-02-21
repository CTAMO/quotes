var APP_PORT = 8124;
var express = require("express");
var bodyParser = require("body-parser");
var database = require("./app/config/database");
var mongoose = require("mongoose");
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require("path");
var http = require("http");
var https = require("https");
var app = express();


http.globalAgent.maxSockets = 50;
https.globalAgent.maxSockets = 100;

app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + "/public"));
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

http.globalAgent.maxSockets = 50;
https.globalAgent.maxSockets = 100;


app.listen(app.get("port"));