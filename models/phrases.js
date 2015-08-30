var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var PhrasesSchema = new Schema ({
						word: String,
						definition: String,
					});

var Phrases = mongoose.model("Phrases", PhrasesSchema);

module.exports = Phrases;

// Is there a way to set up multiple sections of a data base? 
// so as to make a "hard" "medium" & "easy" mode for the game. 
// Also for keeping a list of wrong answers for the multiple 
// choice section of the game (the form could add one wrong 
// word for each word added to the db, thus growing both).

/*
	*** For Morning ***

	- Mongo db and server both work. Start them.
	- All underscore templates work.
	- Ask question above about parsing off sectinos of a DB.
	- Still need to have form add entries to data base.
	- Need to start on css and set up of the actual game. 
		Although thus far I think I have accomplished all 
		for the sprint reqs. 
	- ** REMEMBER - Entry addition form should be contained 
					in a 'contribute' button on the nav bar. 
					Button will trigger toggle of a div that 
					animates down from the nav bar and goes 
					back up when submitted.

	- You got this. You're almost done!! ***

	- (Let Eden add a couple words to the database, 
		she'll love it!)
*/