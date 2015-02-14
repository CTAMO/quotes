
(function() {
    "use strict";

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var NOT_FOUND = -1;
    var username = "gundars";

    var messageSchema = mongoose.Schema({
        _id: Schema.ObjectId,
        AuthorUsername: String,
        Text: String,
        DateCreated: {
            type: Date,
            default: Date.now
        },
        Likes: Array
    });

    messageSchema.statics.voteUp = function(messageId) {
        this.findById(messageId, function(error, message) {
            if (message && message.Likes && message.Likes.indexOf(username) === NOT_FOUND) {
                message.Likes.push(username);
                message.save();
            }
        });


    };
    module.exports = mongoose.model("Message", messageSchema);
})();
