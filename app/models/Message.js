
(function() {
    "use strict";
    var mongoose = require("mongoose");

    var messageSchema = mongoose.Schema({
        authorUsername: String
    });

    var Message = mongoose.model("Message", messageSchema);


    module.exports = Message;
})();
