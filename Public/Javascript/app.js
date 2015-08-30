/*
//////////////////////////////////////////////////////////////////

						Catchphrase.ly
						  -Frontend-
					   Javascript/jQuery

//////////////////////////////////////////////////////////////////
*/


$(document).ready(function(){
	//sanity check
	console.log("Works!");
	getWords();

  $("#user-add-phrase").on("submit", function (e){
    //e.preventDefault();
    $("#contribute-alert").alert();
    $.post("/phrases", $(this).serialize())

      .done(function (res){

        console.log("posted");
        console.log("Now render");

        getWords();
        $("#user-add-phrase")[0].reset();

      });
  });

    /*$("#user-add-phrase").on("submit", function (e){
        //e.preventDefault();
        $.post("/phrases", $(this).serialize(function (res){
            
            
            console.log("posted");
            console.log("Now render");

            
            $("#user-add-phrase")[0].reset();
          }));
          getWords();
      });
    */

});

function getWords() {
	$.get("/phrases", function (res){
		words = res.reverse();
		console.log(words);
		//return words
		renderWords(words);
	});
};

function renderWords(words) {
	var template = _.template($("#words-template").html());
	console.log(template);
	var wordListItem = words.map(function (word){
		return template(word);
	});
	$('#phrase-list').html('');
	$('#phrase-list').append(wordListItem);
};

////////////////////////////////////////////////////////
// For Gameboard //

function getGameWords(){
	var phrases = words;
	console.log(phrases);
	randoQuestion(phrases);
};

function randoQuestion(phrases){
	var randomGet = {};
	randomGet = phrases[_.random(phrases.length-1)];
	//var getWrong = wrongAnswer[_.random(wrongAnswer.length-1)];
	console.log(randomGet);
	//console.log(getWrong);
	getQuestion(randomGet);
};

function renderAnswers(clue, a, b, c, d){
	console.log("Clue: " + clue + ", A: " + a + ", B: " + b + ", C: " + c + ", D: " + d);
	var questionInfo = { hint: "",
						answerA: "",
						answerB: "",
						answerC: "",
						answerD: ""
						};

	questionInfo.hint = clue;
	questionInfo.answerA = a;
	questionInfo.answerB = b;
	questionInfo.answerC = c;
	questionInfo.answerD = d;
	console.log(questionInfo);

	var questionTemplate = _.template($("#question-template").html());
	console.log(questionTemplate);
	/*var wordListItem = words.map(function (word){
		return template(word);
	});*/
	var questionHTML = questionTemplate(questionInfo);
	console.log(questionHTML);  // qClue, answerA, answerB, answerC, answerD
	//$('#question-placeholder').html('');
	$('#question-placeholder').append(questionHTML);
	//console.log(a, b, c, d);
};

////////////////////////////////////////////

// test question render
function getQuestion(phrase){
  var aA;
  var bB;
  var cC;
  var dD;
    //set question and right answer
  clue = phrase.definition;
  answer = phrase.word; 
  console.log("Clue: " + clue);
  console.log("Answer: " + answer);
    // get wrong answers
  var wrong1 = wrongAnswer[_.random(wrongAnswer.length-1)];
  var wrong2 = wrongAnswer[_.random(wrongAnswer.length-1)];
  var wrong3 = wrongAnswer[_.random(wrongAnswer.length-1)];
    console.log("1: " + wrong1 + ", 2: " + wrong2 + ", 3: " + wrong3);
    //get random number between 1 & 4
  var amount = 4;
  var randomNum = Math.floor(Math.random()*amount)+1
      console.log(randomNum);
      //randomize and set answer list
  if (randomNum === 1) {
    aA = wrong1;
    bB = wrong2;
    cC = answer; //correct
    dD = wrong3;
  } else if (randomNum === 2) {
    aA = wrong1;
    bB = answer; //correct
    cC = wrong2;
    dD = wrong3;
  } else if (randomNum === 3) {
    aA = wrong1;
    bB = wrong2;
    cC = wrong3;
    dD = answer; //correct
  } else if (randomNum === 4) {
    aA = answer; //correct
    bB = wrong1;
    cC = wrong2;
    dD = wrong3;
  };
  renderAnswers(clue, aA, bB, cC, dD);
};

////////////////////////////////////////////

// Array of possible wrong answers //

var wrongAnswer = ["Fish",
				"Tool",
				"Ardvark",
				"Fan",
				"Street",
				"Breath",
				"Pirate",
				"Gold",
				"Silver",
				"Heat",
				"Quail",
				"Pencil",
				"Rupture",
				"Price",
				"Block",
				"Movie",
				"Shoe",
				"Enrage",
				"Chivalry",
				"Ocean",
				"Pride",
				"Muscle",
				"Sheep",
				"Fleece",
				"Warning",
				"Power",
				"Electricity",
				"Computer"
				];

/*
///////////////////////////////////////////////////////////////////////////

/////////// Notes

I need to write a list of wrong words that can be picked at 
random and set as the wrong answers for each question.

 


//////////////////////////////////////////////////////////////////////////

////////// Snippets

// eat.ly app.js (solution)
// On page load
$(function() {
  pageLoad();
});

// function definitions

function pageLoad() {
  // load foods
  getFoods();
  // set event listeners
  $("#new-food-form").on("submit", function(e){
    // prevent form submission
    e.preventDefault();
    // post to food#create
    $.post("/foods", $(this).serialize())
      .done(function(res){
        // append new food to the page
        getFoods();
        $("#new-food-form")[0].reset();
      });
  });
}

function getFoods() {
  $.get("/foods", function(res){
    var foods = res.reverse();
    // grab foods template
    renderFoods(foods)
  });
}

function renderFoods(foods) {
  template = _.template($("#foods-template").html());
  // input foods into template and append to parent
  foodItems = foods.map(function(food) {
    return template(food);
  });
  // clear content (for repeated use)
  $("#food-ul").html("");
  // append foods to ul
  $("#food-ul").append(foodItems);
}

function deleteFood(context) {
  var foodId = $(context).data()._id;
  $.ajax({
    url: '/foods/' + foodId,
    type: 'DELETE',
    success: function(res) {
      // once successfull, re-render all foods
      getFoods();
    }
  });
}
////////////////////////////////
////////////////////////////////
////////////////////////////////

//random array element with underscore
var randomElement = randomArray[_.random(randomArray.length-1)];

random number 1-4

var amount = 4;
for(i = 0;i <amount; i++)
{
    var randomnumber=Math.floor(Math.random()*amount)+1
    console.log(randomnumber);
};

//////////////////////////////////////////////////////////////////////////
*/

