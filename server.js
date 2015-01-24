var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var User = require("./app/models/User");
//var morgan = require('morgan');
var path = require("path");
var APP_PORT = 8124;
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
//app.use(morgan('dev'));
app.use(express.static(path.resolve('./public')));

//app.use(express.static(__dirname + "/public"));
//app.use('/bower_components',  express.static(__dirname + '/bower_components'));
//app.engine("html", require("ejs").renderFile);
//app.set("view engine", "html");

app.set("port", (process.env.PORT || APP_PORT));



app.post("/send", function(request, response) {
    "use strict";
    var name = request.param("name");

    //response.send({
    //    information: name
    //});
    console.log(name);

    response.send({
        info: name
    });
});

app.post("/addUser", function(request, response) {
    "use strict";

    var name = request.param("name");
    var age = request.param("age");
    var newUser = new User({
        name: name,
        age: age
    });

    newUser.save(function(error, newUser) {
        if (error) {
            console.log(error);
        }
        else {
            response.send({
                newUser: newUser
            });
        }
    });


    console.log("updated");

});

//app.get("*", function(request, response) {
//    "use strict";
//    //response.send({
//    //    text: "sqqrqwr "
//    //});
//
//    //User.find(function(error, data) {
//    //    if (error) {
//    //        console.log("an error has occurred");
//    //    }
//    //    else {
//    //        console.log("data is retrieved");
//    //         response.send({
//    //            users: data
//    //        });
//    //    }
//    //});
//    response.render('./public/views/aindex.html');
//});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/aindex.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(app.get("port"), function() {
});