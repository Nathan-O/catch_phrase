/*
//////////////////////////////////////////////////////////////////

						Catchphrase.ly
						  -Frontend-
					   Javascript/jQuery

//////////////////////////////////////////////////////////////////
*/


$(document).ready(function(){
  	   //sanity check
  	console.log("Works! We're up and running");
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
	
		  //render words
		  renderWords(words);
	});
};

function renderWords(words) {
    var template = _.template($("#words-template").html());
	
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
  if (turns < 9) {
      var answerPicked = $('input[name="answerRadio"]:checked').val();
        // 2nd (nested) if statment
      if (answerPicked === correctAnswer) { 
          $("#right-alert").slideToggle();
          score += 1;
          turns += 1;
          closeAlert("#right-alert", 1500);
      } else if (answerPicked !== correctAnswer){
          $("#wrong-alert").slideToggle();
          turns += 1;
          closeAlert("#wrong-alert", 1500);
      };
      getGameWords();

  } else if (turns === 9) {
    var answerPicked = $('input[name="answerRadio"]:checked').val();
      //alert("Pick: " + answerPicked + " | Answer: " + correctAnswer);
        // 3rd (nested) if statment
      if (answerPicked === correctAnswer) {           
          //$("#right-alert").slideToggle();      //same as above statment minus the getGameWords();
          score += 1;
          turns += 1;
          //closeAlert("#right-alert", 1500);
      } else if (answerPicked !== correctAnswer){
          //$("#wrong-alert").slideToggle();
          turns += 1;
          //closeAlert("#wrong-alert", 1500);
      };
      $('#question-placeholder').html('');
      $("#gameOver-alert").slideToggle();
      closeAlert("#gameOver-alert", 6500);
      alert("Yay all done. Your score is: " + score);
  }; /*else if (turns === 10) {
      //var gameData = score;
      //renderEndScreen();
  };*/
};


function getGameWords(){
	var phrases = words;
	randoQuestion(phrases);
};

function randoQuestion(phrases){
	var randomGet = {};
	randomGet = phrases[_.random(phrases.length-1)];
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

    // get wrong answers
  var wrong1 = wrongAnswer[_.random(wrongAnswer.length-1)];
  var wrong2 = wrongAnswer[_.random(wrongAnswer.length-1)];
  var wrong3 = wrongAnswer[_.random(wrongAnswer.length-1)];
 
    //get random number between 1 & 4
  var amount = 4;
  var randomNum = Math.floor(Math.random()*amount)+1

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

	var questionTemplate = _.template($("#question-template").html());
	var questionHTML = questionTemplate(questionInfo);
	
	$('#question-placeholder').html('');
	$('#question-placeholder').append(questionHTML);
};

/*function renderEndScreen() {
  //console.log(gameData);
  var gameData = {points: ""};
  scoreStr = score.toString();        // **** Could now get this block of code to work **** //
  gameData.points = scoreStr;
  console.log(gameData);

  alert("Finished. Your score is: " + score);

  var endScreenTemplate = _.template($("#game-end-template").html());
  console.log(endScreenTemplate);
  var endScreenHTML = endScreenTemplate(gameData);  // <<<<---------- where my issue is.
  console.log(endScreenHTML);
  //$('#game-end-placeholder').html('');
  $("#game-end-placeholder").append(endScreenHTML);
};*/

////////////////////////////////////////////

// Array of possible wrong answers //

// hardcoded now, would like to add to database
// and potentially add to the contribution section

var wrongAnswer = ["Byte",
				"jQuery",
				"URL",
				"Terminal",
				"Database",
				"WWW",
				"Protocol",
				"ISP",
				"Bootstrap",
				"MongoDB",
				"Node",
				"R-E-S-P-E-C-T",
				"HTML",
				"Javascript",
				"Ruby",
				"Rails",
				"Tardis",
				"localhost:3000",
				"Property",
				"Git",
				"DOM",
				"RAM",
				"Infinite Loop",
				"Method",
				"Attribute",
				"NCC-1701-D",
				"Toggle Class",
				"Underscore",
        "Sushirrito",
        "Computer",
        "Computer",
        "Computer",
        "competer",
				];

/*
///////////////////////////////////////////////////////////////////////////

/////////// Notes


//////////////////////////////////////////////////////////////////////////

////////// Snippets



//////////////////////////////////////////////////////////////////////////
*/

