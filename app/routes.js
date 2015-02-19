(function() {
    "use strict";

    var User = require("./models/User");
    var Message = require("./models/Message");
    var configAuth = require("./config/auth");
    var Twit = require('twit');
    var NOT_FOUND = -1;

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

        //app.get("/signup", function(request, response) {
        //
        //    // render the page and pass in any flash data if it exists
        //    response.render("signup.html", {
        //        message: request.flash("signupMessage")
        //    });
        //});

        //app.get("/profile", isLoggedIn, function(request, response) {
        //    response.render("profile.html", {
        //        user : request.user // get the user out of session and pass to template
        //    });
        //});

        app.get("/auth/twitter", passport.authenticate("twitter"));

        // handle the callback after twitter has authenticated the user
        app.get("/auth/twitter/callback",
            passport.authenticate("twitter", {
                successRedirect : "/",
                failureRedirect : "/login"
            })
        );

        app.get("/api/messages", function(request, response) {
            var currentUser = request.user;
            var messages = [];
            var messagesSortedByDate = [];
            var mutedUsernames = [];

            if (!currentUser) {
                Message.find(function(error, data) {
                    if (error) {
                        console.log("an error has occurred");
                    }
                    else {
                        var messagesSortedByDate = data.sort(function(message1, message2) {
                            return ((-1) * (message1.DateCreated - message2.DateCreated));
                        });

                        response.send({
                            messages: messagesSortedByDate
                        });
                    }
                });
            }
            else {
                mutedUsernames = currentUser.MutedUsernames;
                Message
                    .find(function(error, allMessages) {
                        if (!error && allMessages && allMessages.length > 0) {
                            messages = allMessages.filter(function (message) {
                                    var test =
                                        (mutedUsernames.indexOf(message.AuthorUsername) === NOT_FOUND ||
                                        (mutedUsernames.indexOf(message.AuthorUsername) >= 0 &&
                                        message.DateCreated < currentUser.MutedDates[mutedUsernames.indexOf(message.AuthorUsername)]));
                                    return test;
                                });

                            messagesSortedByDate = messages.sort(function(message1, message2) {
                                return ((-1) * (message1.DateCreated - message2.DateCreated));
                            });

                            response.send({
                                messages: messagesSortedByDate
                            });
                        }
                    });

                //Message
                //    .find()
                //    .$where(function() {
                //            return mutedUsernames.indexOf(this.AuthorUsername) === NOT_FOUND;
                //        }
                //    )
                //    .exec(function(error, data) {
                //        if (error) {
                //            console.log("an error has occurred");
                //        }
                //        else {
                //            var messagesSortedByDate = data.sort(function(message1, message2) {
                //                return ((-1) * (message1.DateCreated - message2.DateCreated));
                //            });
                //
                //            response.send({
                //                messages: messagesSortedByDate
                //            });
                //        }
                //    });

            }

        });

        app.post("/api/messages/add", isLoggedIn, function(request, response) {
            var messageText = request.body.messageText.trim();

            if (messageText) {
                Message.add(messageText, request.user.Username);

                var newTweet = new Twit({
                    consumer_key: configAuth.twitterAuth.consumerKey,
                    consumer_secret: configAuth.twitterAuth.consumerSecret,
                    access_token: configAuth.twitterAuth.accessToken,
                    access_token_secret: configAuth.twitterAuth.accessTokenSecret
                });

                //newTweet.post('statuses/update', { status: messageText }, function(error, data, response) {
                //    if (error) {
                //        console.log(error);
                //    }
                //});
            }
        });

        app.post("/api/messages/voteup", isLoggedIn, function(request, response) {
            var messageId = request.body.messageId;

            Message.voteUp(messageId, request.user.Username);
            console.log("server message voted up " + messageId);
        });

        app.post("/api/messages/votedown", isLoggedIn, function(request, response) {
            var messageId = request.body.messageId;

            Message.voteDown(messageId, request.user.Username);
            //console.log("server message voted down " + messageId);
        });

        app.get("/api/bestmessages", function(request, response) {
            Message
                .find()
                .sort({
                    "LikesCount": -1
                })
                .limit(3)
                .exec(function(error, data) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        response.send({
                            bestMessages: data
                        });
                    }
                });
        });

        app.get("/api/users", function(request, response){
            if (request.isAuthenticated()) {
                response.send({
                    user: request.user
                });
            }
        });

        app.get("/api/users/logout", isLoggedIn, function(request, response) {
            request.logout();
            response.redirect("/");
        });

        app.post("/api/users/mute", isLoggedIn, function(request, response) {
            var username = request.body.username;

            if (username) {
                User.mute(request.user._id, username);
            }
        });

        app.post("/api/users/unmute", isLoggedIn, function(request, response) {
            var username = request.body.username;

            if (username) {
                User.unmute(request.user._id, username);
            }
        });

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

