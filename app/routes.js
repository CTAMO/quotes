(function() {
    "use strict";

    var User = require("./models/User");
    var Message = require("./models/Message");

    module.exports = function(app, passport) {

        app.get("/login", function(request, response) {

            // render the page and pass in any flash data if it exists
            response.render("login.html", {
                message: request.flash("loginMessage")
            });
        });

        //app.get("/logout", function(request, response) {
        //    request.logout();
        //    response.redirect("/");
        //});

        app.get("/signup", function(request, response) {

            // render the page and pass in any flash data if it exists
            response.render("signup.html", {
                message: request.flash("signupMessage")
            });
        });

        app.get("/profile", isLoggedIn, function(request, response) {
            response.render("profile.html", {
                user : request.user // get the user out of session and pass to template
            });
        });

        app.get("/auth/twitter", passport.authenticate("twitter"));

        // handle the callback after twitter has authenticated the user
        app.get("/auth/twitter/callback",
            passport.authenticate("twitter", {
                //successRedirect : "/profile",
                successRedirect : "/",
                failureRedirect : "/login"
            })
        );

        app.get("/api/messages", function(request, response) {

            Message.find(function(error, data) {
                if (error) {
                    console.log("an error has occurred");
                }
                else {
                    //console.log("data is retrieved");
                    response.send({
                        messages: data
                    });
                }
            });

            //response.send({
            //    data: [{
            //        text: "stamo message"
            //    }]
            //});
        });

        app.post("/api/messages/add", function(request, response) {
            var messageText = request.body.messageText.trim();

            if (messageText) {
                Message.add(messageText);
            }
        });

        app.post("/api/messages/voteup", function(request, response) {
            var messageId = request.body.messageId;

            Message.voteUp(messageId);
            console.log("server message voted up " + messageId);
        });


        app.get("/api/user", function(request, response){
            if (request.isAuthenticated()) {
                response.send({
                    user: request.user
                });
            }
            else {
                var a = 10;
            }
        });

        app.get("/api/user/logout", function(request, response) {
            request.logout();
            response.redirect("/");
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
            var newUser = new user({
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
        //
        //
        //    //Message.find(function(error, data) {
        //    //    if (error) {
        //    //        console.log("an error has occurred");
        //    //    }
        //    //    else {
        //    //        console.log("data is retrieved");
        //    //        response.send({
        //    //            data: data
        //    //        });
        //    //    }
        //    //});
        //
        //    //response.sendFile("./public/index.html"); // load the single view file (angular will handle the page changes on the front-end)
        //});

        app.get("/", function(request, response) {
            response.render("index.html");
        });
    };

    // route middleware to make sure a user is logged in
    function isLoggedIn(request, response, next) {

        // if user is authenticated in the session, carry on
        if (request.isAuthenticated()) {
            return next();
        }

        // if they aren"t redirect them to the home page
        response.redirect("/");
    }
})();

