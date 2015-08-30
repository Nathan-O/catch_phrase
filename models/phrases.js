var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var PhrasesSchema = new Schema ({
						word: String,
						definition: String
					});

var Phrases = mongoose.model("Phrases", PhrasesSchema);

module.exports = Phrases;