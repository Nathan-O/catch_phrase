var db = require("./models/models.js");

db.Phrases.create({word: "", definition: ""}, function (err, phrases){
	if (err) {
		return consoel.log("");
	};
	console.log(phrases);
});

db.Phrases.find({}), function (err, phrases){
	if (err){
		return console.log("");
	};
	console.log(phrases);
};
