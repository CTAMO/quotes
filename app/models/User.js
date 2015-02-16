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

    function mute(userIdThatMutes, usernameToBeMuted) {
        var userModel = this;
        userModel.findById(userIdThatMutes, function(error, userThatMutes) {
            if (userThatMutes) {
                userModel.findOne({Username: usernameToBeMuted}, function(error, userTobeMuted) {
                    var a = 10;
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


    module.exports = mongoose.model('User', userSchema);
})();



