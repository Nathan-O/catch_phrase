var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var PhrasesSchema = new Schema ({
						word: String,
						definition: String
					});

var Phrases = mongoose.model("Phrases", PhrasesSchema);

module.exports = Phrases;

// Is there a way to set up multiple sections of a data base? 
// so as to make a "hard" "medium" & "easy" mode for the game. 
// Also for keeping a list of wrong answers for the multiple 
// choice section of the game (the form could add one wrong 
// word for each word added to the db, thus growing both).