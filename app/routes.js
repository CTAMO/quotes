(function() {
    "use strict";

    var User = require("./models/User");
    var Message = require("./models/Message");

    module.exports = function(app) {
            app.get("/api/messages", function(request, response) {

            Message.find(function(error, data) {
                if (error) {
                    console.log("an error has occurred");
                }
                else {
                    console.log("data is retrieved");
                    response.send({
                        data: data
                    });
                }
            });

            //response.send({
            //    data: [{
            //        text: "stamo message"
            //    }]
            //});
        });


        app.post("/send", function(request, response) {
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

        app.get("*", function(request, response) {
            //User.find(function(error, data) {
            //    if (error) {
            //        console.log("an error has occurred");
            //    }
            //    else {
            //        console.log("data is retrieved");
            //         response.send({
            //            users: data
            //        });
            //    }
            //});


            //Message.find(function(error, data) {
            //    if (error) {
            //        console.log("an error has occurred");
            //    }
            //    else {
            //        console.log("data is retrieved");
            //        response.send({
            //            data: data
            //        });
            //    }
            //});

            //response.sendFile("./public/index.html"); // load the single view file (angular will handle the page changes on the front-end)
        });
    };
})();

