var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/catch_phrase_app");

module.exports.Phrases = require("./phrases");