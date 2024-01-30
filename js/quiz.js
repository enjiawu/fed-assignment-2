//Start quiz function
const startButton = document.getElementById("start-button"); //Getting start button
const quizContent = document.getElementById("quiz-content"); //Getting quiz content
var question = document.getElementById("question"); //Getting question
var pointsEarned = document.getElementById("points-earned"); //Getting points earned
var optionA = document.getElementById("option-a"); //Getting option A
var optionB = document.getElementById("option-b"); //Getting option B
var optionC = document.getElementById("option-c"); //Getting option C
var optionD = document.getElementById("option-d"); //Getting option D
var quitButtons = document.getElementsByClassName("quit-button"); //Getting quit button
var currentQuestionNumber = document.getElementById("current-question-number"); //Getting current question number
var endContent = document.getElementById("end-content"); //Getting end content
var finalScore = document.getElementById("final-score-points"); //Getting final score
var restart = document.getElementById("restart-button"); //Getting restart button

quitButtons[0].addEventListener("click", function() { //Function for when the quit button gets clicked
    quit = true; //quit variable is set to true
    window.location.href = "/fed-assignment-2/index.html"; //Redirect the user back to index.html
});

quitButtons[1].addEventListener("click", function() { //Function for when the quit button gets clicked
    quit = true; //quit variable is set to true
    window.location.href = "/fed-assignment-2/index.html"; //Redirect the user back to index.html
});

quitButtons[2].addEventListener("click", function() { //Function for when the quit button gets clicked
    quit = true; //quit variable is set to true
    window.location.href = "/fed-assignment-2/index.html"; //Redirect the user back to index.html
});

restart.addEventListener("click", function() { //Function for when the restart button gets clicked
    window.location.href = "quiz.html"; //Redirect the user back to quiz start page
});


var url = "https://opentdb.com/api.php?amount=10&category=17&type=multiple";
let count = 1;

startButton.addEventListener("click", function() {
  document.getElementById("start-content").style.display = "none";
  document.getElementById("quiz-content-header").style.display = "flex";
  quizContent.style.display = "flex";

  fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var questions = data.results;
        let optionChosen =false;
        /*
        optionA.addEventListener("click", function() {
            if (optionA.innerHTML == questions[q].correct_answer) {
                pointsEarned.innerHTML = parseInt(pointsEarned.innerHTML) + 1000; //If the answer is correct, the points earned are increased by 1000
                optionA.style.backgroundColor = "green"; //The correct option gets a green background color
            }
            else if (optionB.innerHTML == questions[q].correct_answer) {
                optionB.style.backgroundColor = "green"; //The correct option gets a green background color
                optionA.style.backgroundColor = "red"; //The incorrect option gets a red background color
            }
            else if (optionC.innerHTML == questions[q].correct_answer) {
                optionC.style.backgroundColor = "green"; //The correct option gets a green background color
                optionA.style.backgroundColor = "red"; //The incorrect option gets a red background color
            }
            else if (optionD.innerHTML == questions[q].correct_answer) {
                optionD.style.backgroundColor = "green"; //The correct option gets a green background color
                optionA.style.backgroundColor = "red"; //The incorrect option gets a red background color
            }
            optionChosen = true; 
        });

        optionB.addEventListener("click", function() {
            if (optionB.innerHTML == questions[q].correct_answer) {
                pointsEarned.innerHTML = parseInt(pointsEarned.innerHTML) + 1000; //If the answer is correct, the points earned are increased by 1000
                optionB.style.backgroundColor = "green"; //The correct option gets a green background color
            }
            else if (optionA.innerHTML == questions[q].correct_answer) {
                optionA.style.backgroundColor = "green"; //The correct option gets a green background color
                optionB.style.backgroundColor = "red"; //The incorrect option gets a red background color
            }
            else if (optionC.innerHTML == questions[q].correct_answer) {
                optionC.style.backgroundColor = "green"; //The correct option gets a green background color
                optionB.style.backgroundColor = "red"; //The incorrect option gets a red background color
            }
            else if (optionD.innerHTML == questions[q].correct_answer) {
                optionD.style.backgroundColor = "green"; //The correct option gets a green background color
                optionB.style.backgroundColor = "red"; //The incorrect option gets a red background color
            }
            optionChosen = true; 
        });

        optionC.addEventListener("click", function() {
            if (optionC.innerHTML == questions[q].correct_answer) {
                pointsEarned.innerHTML = parseInt(pointsEarned.innerHTML) + 1000; //If the answer is correct, the points earned are increased by 1000
                optionC.style.backgroundColor = "green"; //The correct option gets a green background color
            }
            else if (optionA.innerHTML == questions[q].correct_answer) {
                optionA.style.backgroundColor = "green"; //The correct option gets a green background color
                optionC.style.backgroundColor = "red"; //The incorrect option gets a red background color
            }
            else if (optionB.innerHTML == questions[q].correct_answer) {
                optionB.style.backgroundColor = "green"; //The correct option gets a green background color
                optionC.style.backgroundColor = "red"; //The incorrect option gets a red background color
            }
            else if (optionD.innerHTML == questions[q].correct_answer) {
                optionD.style.backgroundColor = "green"; //The correct option gets a green background color
                optionC.style.backgroundColor = "red"; //The incorrect option gets a red background color
            }
            optionChosen = true; 
        });

        optionD.addEventListener("click", function() {
            if (optionD.innerHTML == questions[q].correct_answer) {
                pointsEarned.innerHTML = parseInt(pointsEarned.innerHTML) + 1000; //If the answer is correct, the points earned are increased by 1000
                optionD.style.backgroundColor = "green"; //The correct option gets a green background color
            }
            else if (optionA.innerHTML == questions[q].correct_answer) {
                optionA.style.backgroundColor = "green"; //The correct option gets a green background color
                optionD.style.backgroundColor = "red"; //The incorrect option gets a red background color
            }
            else if (optionB.innerHTML == questions[q].correct_answer) {
                optionB.style.backgroundColor = "green"; //The correct option gets a green background color
                optionD.style.backgroundColor = "red"; //The incorrect option gets a red background color
            }
            else if (optionC.innerHTML == questions[q].correct_answer) {
                optionC.style.backgroundColor = "green"; //The correct option gets a green background color
                optionD.style.backgroundColor = "red"; //The incorrect option gets a red background color
            }
            optionChosen = true; 
        });

        for (var q in questions) {
            if (pointsEarned >= 10000) 
            {
                break;
            }   
            let nextQuestion = false;
            displayQuestion(questions[q], count);
            /*
            while (!nextQuestion){
                if (optionChosen == true) {
                    optionChosen = false;
                    nextQuestion = true;
                }
            }
            count++;
        }*/


    });
});

function displayQuestion(questionData, questionNumber) {
  currentQuestionNumber.innerHTML = questionNumber;
  question.innerHTML = questionData.question;
  let correctOption = Math.floor(Math.random() * 4) + 1;

  if (correctOption == 1) {
      optionA.innerHTML = questionData.correct_answer;
      optionB.innerHTML = questionData.incorrect_answers[0];
      optionC.innerHTML = questionData.incorrect_answers[1];
      optionD.innerHTML = questionData.incorrect_answers[2];
  } else if (correctOption == 2) {
      optionA.innerHTML = questionData.incorrect_answers[0];
      optionB.innerHTML = questionData.correct_answer;
      optionC.innerHTML = questionData.incorrect_answers[1];
      optionD.innerHTML = questionData.incorrect_answers[2];
  } else if (correctOption == 3) {
      optionA.innerHTML = questionData.incorrect_answers[0];
      optionB.innerHTML = questionData.incorrect_answers[1];
      optionC.innerHTML = questionData.correct_answer;
      optionD.innerHTML = questionData.incorrect_answers[2];
  } else {
      optionA.innerHTML = questionData.incorrect_answers[0];
      optionB.innerHTML = questionData.incorrect_answers[1];
      optionC.innerHTML = questionData.incorrect_answers[2];
      optionD.innerHTML = questionData.correct_answer;
  }
}
