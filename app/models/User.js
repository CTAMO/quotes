(function() {
    "use strict";

    var mongoose = require("mongoose");

    var userSchema = mongoose.Schema({
        name: String,
        age: Number
    });

    var User = mongoose.model("User", userSchema);


    module.exports = User;
})();



