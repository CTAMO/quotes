(function() {
    "use strict";

    var User = require("./models/User");
    var Message = require("./models/Message");

    module.exports = function(app, passport) {

        app.get('/login', function(req, res) {

            // render the page and pass in any flash data if it exists
            res.render('login.html', {
                message: req.flash('loginMessage')
            });
        });

        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });

        app.get('/signup', function(req, res) {

            // render the page and pass in any flash data if it exists
            res.render('signup.ejs', {
                message: req.flash('signupMessage')
            });
        });

        app.get('/profile', isLoggedIn, function(request, response) {
            response.render('profile.html', {
                user : request.user // get the user out of session and pass to template
            });
        });

        app.get('/auth/twitter', passport.authenticate('twitter'));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/profile',
                //successRedirect : '/api/messages',
                failureRedirect : '/'
            })
        );

        app.get("/api/messages", function(request, response) {

            Message.find(function(error, data) {
                if (error) {
                    console.log("an error has occurred");
                }
                else {
                    console.log("data is retrieved");
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

    // route middleware to make sure a user is logged in
    function isLoggedIn(request, response, next) {

        // if user is authenticated in the session, carry on
        if (request.isAuthenticated()) {
            return next();
        }

        // if they aren't redirect them to the home page
        response.redirect('/');
    }
})();

