(function() {
    "use strict";

    var mongoose = require("mongoose");
    var bcrypt = require('bcrypt-nodejs');

    var userSchema = mongoose.Schema({
        Username: String,
        Password: String
    });

    module.exports = mongoose.model('User', userSchema);
})();



