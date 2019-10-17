function startQuiz() {
  //var quiz = new Quiz(questions);
  render();
  document.querySelector("#start").innerHTML = "This is the simple math quiz that I created for Milestone 1 of Project 2. The first element introduced on my page is the START quiz button, which when clicked will render my quiz and begin displaying the first question. My quiz includes four different types of questions, including multiple choice number questions, narrative questions with text answers, an image question, and a question with image answer choices.<br/>Depending on whether or not the user selects the correct answer choice, an alert window will pop up with a message of either INCORRECT or CORRECT - and a scoreboard at the bottom of the page will keep track of their total score.<br/>Also noted at the bottom of the page is the user's progress, letting them know how many questions out of the total number of questions they have already completed. <br/>When the quiz has ended and the user answers all questions, their final score and percentage grade will appear. A RETRY button will also appear, that will reload the page and allow the user to take the quiz again. <br/>If the user has scored anything below a 50%, they will be notified that they have failed the quiz. Similarly, if the user scores a grade higher than 50%, they will notified that they have passed!";

}

function refreshPage(){
  window.location.reload();
}


function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer))
    {
        this.score++;
        window.alert("CORRECT!");
        this.questionIndex++;
    }
    else {
    window.alert("INCORRECT!");
    this.questionIndex++;
  }
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function render() {
    if(quiz.isEnded()) {
        finalScore();
        retryButtonAppear();

    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
        showScores();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        render();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var scores = "<h1>SCOREBOARD</h1>";
    scores += "<h2 id='score'> Your Score Is: " + quiz.score + "</h2>";
    var element = document.getElementById("score");
    element.innerHTML = scores;
};

function finalScore(){
  var finalScore = "<h1>FINAL SCORE:</h1>";
  finalScore += quiz.score;
  var element = document.getElementById("score");
  element.innerHTML = finalScore;
  var grade = document.getElementById("failOrpass");
  grade.innerHTML = percentage(quiz.score, quiz.questions.length);

};

function percentage(currentScore, totalQuestions){
  var grade = Math.round((currentScore/totalQuestions)  * 100);
  if (grade < 50)
  {
    return "You scored a " + grade + "%...YOU FAILED"
  }
  else
  {
    return "You scored a " + grade + "%...YOU PASSED!";
  }
};

function retryButtonAppear(){
     document.getElementById("tryagain").innerHTML = '<button onclick="refreshPage()" type="button" class="btn btn-success"">RETRY</button>';
}

var questions = [
    new Question("Where is the digit 2 in the number 2,079?", ["Ones place", "Hundreds place","Thousands place", "Tens place"], "Thousands place"),
    new Question("What is the sum of 5 and 7?", ["10", "13","12", "14"], "12"),
    new Question("Lisa has been traveling back and forth for work. Her house is 6.5 miles away from her work. She also travels 2 miles back and forth to a restaurant for lunch. Lisa works out that she travels 20 miles in a day. Does that sound right?", ["Yes, that is right.", "No, that is too high.","No, that is too low.", "None of the Above"], "No, that is too high."),
    new Question("Jeremy just got a new job. He will work approximately 25 hours a week, and make $10 an hour. Jeremy decides he needs to save exactly half of that money each week if he wants to buy himself a new phone. Jeremy figures out that he will save $100 a week. Does this accurately reflect half of Jeremy's weekly earnings?",["Yes, that is accurate.","No, that is less than half.","No, that is more than half.", "None of the Above"], "No, that is less than half."),
    new Question("<img src='https://github.com/AmandaCapobianco/CUS1172_Project2/blob/master/quiz_images/mathquiz1.jpg?raw=true'/><br/>What is the total amount of money shown in the picture? ", ["$1.00","$0.50","$1.25", "None of these"], "$1.25"),
    new Question("Which one of these shows a total amount of $2.00?", ["Both of these", "Neither of These", "<img src='https://github.com/AmandaCapobianco/CUS1172_Project2/blob/master/quiz_images/mathquiz2.jpg?raw=true'/>Picture 1","<img src='https://github.com/AmandaCapobianco/CUS1172_Project2/blob/master/quiz_images/mathquiz3.jpg?raw=true'/>Picture 2"], "Neither of These"),
];


var quiz = new Quiz(questions);
var retryquiz = new Quiz(questions);

render();
