var chai = require("chai");
var expect = chai.expect;
var exports = require("../../app/server-generator.js");
var numberGenerator = exports.numberGenerator;

describe("Server suite", function() {
    it("Expect 5 to be 5", function() {
        expect(numberGenerator.getNumber()).to.equal(5); 
    });
});
