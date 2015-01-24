
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");

var userSchema = mongoose.Schema({
    name: String,
    age: Number
});

var User = mongoose.model("User", userSchema);


module.exports = User;


