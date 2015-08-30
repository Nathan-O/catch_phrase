//original question get set up

function getQuestion(phrase, wrong){
  var clue = phrase.definition;
  var answer = phrase.word;
    // get wrong answers
  console.log(wrong);
  console.log(clue);
  console.log(answer);
}

function randoAnswers(){
  var a;
  var b;
  var c;
  var d;
    //grab three random wrong answers
  var wrong1 = wrongAnswer[_.random(wrongAnswer.length-1)];
  var wrong2 = wrongAnswer[_.random(wrongAnswer.length-1)];
  var wrong3 = wrongAnswer[_.random(wrongAnswer.length-1)];
    console.log(wrong1, wrong2, wrong3);
    //get random number between 1 & 4
  var amount = 4;
  var randomNum = Math.floor(Math.random()*amount)+1
      console.log(randomNum);
      //set answer list
  if (randomNum === 1) {
    a = wrong1;
    b = wrong2;
    c = "Correct";
    d = wrong3;
  } else if (randomNum === 2) {
    a = wrong1;
    b = "Correct";
    c = wrong2;
    d = wrong3;
  } else if (randomNum === 3) {
    a = wrong1;
    b = wrong2;
    c = wrong3;
    d = "Correct";
  } else if (randomNum === 4) {
    a = "Correct";
    b = wrong1;
    c = wrong2;
    d = wrong3;
  };
    renderAnswers(a, b, c, d);
};

function renderQuestion(){
  //code
};
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

// make a question

function getQuestion(phrase, wrong){
  var a;
  var b;
  var c;
  var d;
    //set question and right answer
  var clue = phrase.definition;
  var answer = phrase.word; 
  console.log(clue);
  console.log(answer);
    // get wrong answers
    var wrong1 = wrongAnswer[_.random(wrongAnswer.length-1)];
  var wrong2 = wrongAnswer[_.random(wrongAnswer.length-1)];
  var wrong3 = wrongAnswer[_.random(wrongAnswer.length-1)];
    console.log(wrong1, wrong2, wrong3);
    //get random number between 1 & 4
  var amount = 4;
  var randomNum = Math.floor(Math.random()*amount)+1
      console.log(randomNum);
      //randomize and set answer list
  if (randomNum === 1) {
    a = wrong1;
    b = wrong2;
    c = answer; //correct
    d = wrong3;
  } else if (randomNum === 2) {
    a = wrong1;
    b = answer; //correct
    c = wrong2;
    d = wrong3;
  } else if (randomNum === 3) {
    a = wrong1;
    b = wrong2;
    c = wrong3;
    d = answer; //correct
  } else if (randomNum === 4) {
    a = answer; //correct
    b = wrong1;
    c = wrong2;
    d = wrong3;
  };
  renderAnswers(a, b, c, d);
};







/////////////////////////////////////////////////////

 // For Multiple Choice //

var currentQuestion = null;
var questionIndex = 0;

// Your list of questions. Each question has an answer (either a,b or c)
// and then a set of "options" in the question
var questions = [
  { 
      'answer': 'c',
      'question': 'What doesn\'t fit?',
      options: ['Dog', 'Capybara', 'Pizza']
  },
  { 
      'answer': 'b',
      'question': 'What is 9*9',
      options: ['9', '81', '99']
  }
];

// Detect when the submit button is clicked and check if the question
// was answered correctly
$('input[type="submit"]').click(function() {
    var val = $('#questions').find('input:checked').val();
    if(currentQuestion) {
        if(currentQuestion.answer == val) {
            alert("Nice work!");
            showQuestion();
        } else {
            alert("Nope!");
        }
    }
    return false;
});

// Set the value of an option in the question
function setRadioLabel(radioId, text) {
     $('label[for="' + radioId + '"]').find('span.ui-btn-text').text(text);
};

// Show a random question
function showQuestion() {
    // Grab next question, and increment so we get a new one next time
    var random = questions[questionIndex++ % questions.length];
    
    $('#question').text(random.question);
    
    $('input[type="radio"]').attr('checked', false).checkboxradio('refresh');
    
    setRadioLabel('radio1', random.options[0]);
    setRadioLabel('radio2', random.options[1]);
    setRadioLabel('radio3', random.options[2]);
    currentQuestion = random;
};

// Start the question stuff off
showQuestion();