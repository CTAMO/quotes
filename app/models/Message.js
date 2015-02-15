
(function() {
    "use strict";

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var NOT_FOUND = -1;
    var username = "gundars";

    var messageSchema = new Schema({
        _id: Schema.ObjectId,
        AuthorUsername: String,
        Text: String,
        DateCreated: {
            type: Date,
            default: Date.now
        },
        Likes: Array
    });

    messageSchema.statics.add = add;
    messageSchema.statics.voteUp = voteUp;

    function add(messageText, authorUsername) {
        var newMessage = new this();
        newMessage._id = new mongoose.Types.ObjectId();
        newMessage.Text = messageText;
        newMessage.AuthorUsername = authorUsername;
        newMessage.save(function(error) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("message added: " + messageText);
                return newMessage;
            }
        });
    }

    function voteUp(messageId) {
        this.findById(messageId, function(error, message) {
            if (message && message.Likes && message.Likes.indexOf(username) === NOT_FOUND) {
                message.Likes.push(username);
                message.save();
            }
        });
    }



    module.exports = mongoose.model("Message", messageSchema);
})();
