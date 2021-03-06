/*
//////////////////////////////////////////////////////////////////

						Catchphrase.ly
						   -Backend-
					   Javascript/jQuery

//////////////////////////////////////////////////////////////////
*/
// Requierments //
var db = require("./models/models.js");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
//var _ = require("underscore");
var app = express();
var views = path.join(process.cwd(), "Views/");

app.use("/static", express.static("Public"));
app.use("/vender", express.static("bower_components"));
app.use(bodyParser.urlencoded({extended: true}));

// Routes //
app.get("/", function (req, res){
	res.sendFile(path.join(views + "index.html"));
});

app.get("/phrases", function (req, res){
	//res.send(phrase);
	db.Phrases.find({}, function (err, phrases){
		if (err) {
			console.log("I can't do that Dave");
			return res.sendStaus(400);
		};
		res.send(phrases);
	});
});

app.post("/phrases", function (req, res){
	var newPhrase = req.body;
	db.Phrases.create(newPhrase, function (err, phrase){
		if (err){
			console.log("He died, Jim");
			return res.sendStatus(400);
		};
		return (phrase);
	});
});

app.delete("/phrases/:id", function (req, res){
	var id = req.params.id;
	db.Phrases.remove({_id: id}, function (err, phrase){
		if (err){
			console.log("It's still here...zombie data.");
			return res.sendStatus(400);
		};
		res.sendStatus(200);
	});
});


app.listen(3000, function(){
	console.log("Up and running!");
});
/*
///////////////////////////////////////////////////////////////////////////

/////////// Notes
 


//////////////////////////////////////////////////////////////////////////

////////// Snippets



//////////////////////////////////////////////////////////////////////////
*/

