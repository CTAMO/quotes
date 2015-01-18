var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var path = require("path");
var User = require("./users/User");

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.get("/", function(request, response) {
    "use strict";
    //response.send({
    //    text: "sqqrqwr "
    //});

    User.find(function(error, data) {
        if (error) {
            console.log("an error has occurred");
        }
        else {
            console.log("data is retrieved");
            response.send({
                users: data
            });
        }
    });
});

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

app.listen(8124);