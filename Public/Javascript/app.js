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
    //render words in review tab
	getWords();

  $("#user-add-phrase").on("submit", function (e){
    e.preventDefault();
        //slide away form and pop out alert
    $("#contribute-form").slideToggle();
    $("#thanks-alert").slideToggle();
      //add new phrase
    $.post("/phrases", $(this).serialize()) 
      //clear form
    $("#user-add-phrase")[0].reset();  
    getWords();    //render new phrase to review tab
    closeAlert("#thanks-alert", 2500); //closes alert
  });

  $("#contribute-button").on("click", function (e) {
      e.preventDefault();
      $("#contribute-form").slideToggle(); 
  });

  $("#word-add-cancel").on("click", function (e) {
      e.preventDefault();
      $("#contribute-form").slideToggle(); 
  });

  $("#game-start").on("click", function(){
    getGameWords();
  });

});
 
  

// *** test nav js *** //
$('#myTabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});

function closeAlert(selector, delay) {
   var alert = $(selector).alert();
   window.setTimeout(function() { alert.slideToggle() }, delay);
   
};

function getWords() {
	$.get("/phrases", function (res){
		words = res.reverse();
		console.log(words);
		//render words
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

function deletePhrase(context){
  var phraseID = $(context).data()._id;
  $.ajax({
      url: "/phrases/" + phraseID,
      type: "DELETE",
      success: function(res){
        $("#delete-alert").slideToggle();
        closeAlert("#delete-alert", 2500);
        getWords();
      }
  });
};


////////////////////////////////////////////////////////
// For Gameboard //
var turns = 0;
var score = 0;
var correctAnswer;

function getAnswer(e){
  e.preventDefault();
  $("#answer-list").submit(function (e){
    e.preventDefault();
  });
      // 1st if statment
  if (turns < 10) {

      console.log("< 10");

      var answerPicked = $('input[name="answerRadio"]:checked').val();
      alert("Pick: " + answerPicked + " | Answer: " + correctAnswer);
        // 2nd (nested) if statment
      if (answerPicked === correctAnswer) { 
          alert("You're right!");
          score += 1;
          turns += 1;
      } else if (answerPicked !== correctAnswer){
          alert("Opps not quite. The answer was: " + answer);
          turns += 1;
      };

      getGameWords();

  } else if (turns >= 10) {
      alert("Finished. Your score is: " + score);
  };
};


function getGameWords(){
	var phrases = words;
	console.log(phrases);
	randoQuestion(phrases);
};

function randoQuestion(phrases){
	var randomGet = {};
	randomGet = phrases[_.random(phrases.length-1)];
	console.log(randomGet);

	getQuestion(randomGet);
};

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
    correctAnswer = "3";
  } else if (randomNum === 2) {
    aA = wrong1;
    bB = answer; //correct
    cC = wrong2;
    dD = wrong3;
    correctAnswer = "2";
  } else if (randomNum === 3) {
    aA = wrong1;
    bB = wrong2;
    cC = wrong3;
    dD = answer; //correct
    correctAnswer = "4";
  } else if (randomNum === 4) {
    aA = answer; //correct
    bB = wrong1;
    cC = wrong2;
    dD = wrong3;
    correctAnswer = "1";
  };
  renderAnswers(clue, aA, bB, cC, dD);
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
	var questionHTML = questionTemplate(questionInfo);
	console.log(questionHTML);  // qClue, answerA, answerB, answerC, answerD
	$('#question-placeholder').html('');
	$('#question-placeholder').append(questionHTML);
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



//////////////////////////////////////////////////////////////////////////

////////// Snippets



//////////////////////////////////////////////////////////////////////////
*/

