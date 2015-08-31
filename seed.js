var db = require("./models/models.js");

//seed data
var phrase_list = [{
			word: "jQuery",
			definition: "A script language that wraps selectors in $."
		},{
			word: "Binary",
			definition: "Root language that all computers speak."
		},{
			word: "External Style Sheet Placement",
			definition: "(< / head />   < /link rel='/stylesheet/' type='/ text/css/' href='/mystyle.css'/> < / head / >.)"
		},{
			word: "Border Individual Sides",
			definition: "p {   border-top-style: dotted;   border-right-style: solid;   border-bottom-style:  dotted;   border-left-style:solid;  }."
		},{
			word: "Function Declaration",
			definition: "The spell book."
		},{
			word: "CSS",
			definition: "Stylesheet language used to 'make it pretty'."
		},{
			word: "API",
			definition: "Application Program Interface"
		},{
			word: "Nested Loops",
			definition: "A loop which is contained in another loop."
		},{
			word: "Variable",
			definition: "A symbol which identifies a storage 'folder' that contains different values."
		},{
			word: "Instance",
			definition: "A variable defined in a class for which every object in the class has its own value."
		},{
			word: "Dependency",
			definition: "One class needs services provided by another class."
		},{
			word: "School",
			definition: "A place where kids, like Eden, go to learn."
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