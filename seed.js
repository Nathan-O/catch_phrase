var db = require("./models/models.js");

//seed data
var phrase_list = [{
			word: "Beer",
			definition: "Like Bread, to drink"
		},{
			word: "Pants",
			definition: "Clothes worn on the lower body."
		},{
			word: "Guitar",
			definition: "Musical instrument that uses six strings"
		},{
			word: "Lamp",
			definition: "Device used to illuminate a room."
		},{
			word: "Island",
			definition: "A section of land surrounded on all sides by water."
		}];

console.log("It goes...");

db.Phrases.remove({}, function (err, phrases){

	console.log("Stil goes...");

  db.Phrases.create(phrase_list, function (err, phrases){
    if (err) { 
    	return console.log("So many fails!") 
    };
    console.log("created", phrases.length, "phrases")
    process.exit();
  });
});