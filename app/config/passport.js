var TwitterStrategy = require("passport-twitter").Strategy;
var User = require("../models/User");
var configAuth = require("./auth");

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new TwitterStrategy({
            consumerKey: configAuth.twitterAuth.consumerKey,
            consumerSecret: configAuth.twitterAuth.consumerSecret,
            callbackURL: configAuth.twitterAuth.callbackURL
        },
        function(token, tokenSecret, profile, done) {

            // make the code asynchronous
            // User.findOne won"t fire until we have all our data back from Twitter
            process.nextTick(function() {

                User.findOne({"Username": profile.username}, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err) {
                        return done(err);
                    }

                    // if the user is found then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    }
                    else {
                        var newUser = new User();

                        newUser.Username = profile.username;
                        //newUser.displayName = profile.displayName;

                        newUser.save(function(err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });

            });

        }));

};