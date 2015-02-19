(function() {
    "use strict";

    var mongoose = require("mongoose");
    var NOT_FOUND = -1;

    var userSchema = mongoose.Schema({
        Username: String,
        MutedUsernames: Array,
        MutedDates: Array
    });

    userSchema.statics.mute = mute;
    userSchema.statics.unmute = unmute;

    function mute(userIdThatMutes, usernameToBeMuted) {
        var userModel = this;

        userModel.findById(userIdThatMutes, function(error, userThatMutes) {
            if (userThatMutes) {
                userModel.findOne({Username: usernameToBeMuted}, function(error, userTobeMuted) {
                    if (userThatMutes.Username !== usernameToBeMuted && userTobeMuted &&
                        userThatMutes.MutedUsernames.indexOf(userTobeMuted.Username) === NOT_FOUND) {
                        userThatMutes.MutedUsernames.push(userTobeMuted.Username);
                        userThatMutes.MutedDates.push(new Date());
                        userThatMutes.save();
                    }
                });
            }
        });
    }

    function unmute(userIdThatUnmutes, usernameToBeUnmuted) {
        var userModel = this;

        userModel.findById(userIdThatUnmutes, function(error, userThatUnmutes) {
            if (userThatUnmutes) {
                userModel.findOne({Username: usernameToBeUnmuted}, function(error, userToBeUnmuted) {
                    var userToBeUnmutedIndex = null;

                    if (userToBeUnmuted && userThatUnmutes.Username !== userToBeUnmuted.Username &&
                        userThatUnmutes.MutedUsernames.indexOf(userToBeUnmuted.Username) !== NOT_FOUND) {
                        userToBeUnmutedIndex = userThatUnmutes.MutedUsernames.indexOf(userThatUnmutes.Username);
                        userThatUnmutes.MutedUsernames.splice(userToBeUnmutedIndex, 1);
                        userThatUnmutes.MutedDates.splice(userToBeUnmutedIndex, 1);
                        userThatUnmutes.save();
                    }
                });
            }
        });
    }

    module.exports = mongoose.model('User', userSchema);
})();



