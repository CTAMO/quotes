
(function() {
    "use strict";

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;

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
            if (message) {
                message.Likes.push("gundars");
                message.save();
            }
            else {
                console.log("Error: " + error);
            }
        });


    };
    module.exports = mongoose.model("Message", messageSchema);
})();
