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

var url = "https://opentdb.com/api.php?amount=10&category=17&type=multiple"; //API link to generate quiz questions and answers
let count = 1; //Count variable for the amount of questions asked
var quit = false; //To check if quit button has been clicked

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
    window.location.href = "quiz.html"; //Redirect the user back to index.html
});


startButton.addEventListener("click", async function() { //Function for when the start button gets clicked, the questions start to appear
    document.getElementById("start-content").style.display = "none";
    quizContent.style.display = "flex";

    fetch(url)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
        var questions = data.results; //Getting the questions from the API
        console.log(questions);

        for (var q in questions) {
            if (pointsEarned >= 10000){
                break;
            }
            
            /*
            if (questions.length == 10) {
                quizContent.style.display = "none"; //Hides the quiz content
                endContent.style.display = "flex"; //Displays the end content
                finalScore.innerHTML = pointsEarned.innerHTML; //Displaying the final score on the page
            }*/
        
            var optionClicked = false;

            currentQuestionNumber.innerHTML = count; //Setting the current question number
            question.innerHTML = questions[q].question; //Setting the question
            let correctOption = Math.floor(Math.random() * 4) + 1; //generating a random number to place the correct answer in

            if (correctOption == 1) {
                optionA.innerHTML = questions[q].correct_answer;
                optionB.innerHTML = questions[q].incorrect_answers[0];
                optionC.innerHTML = questions[q].incorrect_answers[1];
                optionD.innerHTML = questions[q].incorrect_answers[2];
            } else if (correctOption == 2) {
                optionA.innerHTML = questions[q].incorrect_answers[0];
                optionB.innerHTML = questions[q].correct_answer;
                optionC.innerHTML = questions[q].incorrect_answers[1];
                optionD.innerHTML = questions[q].incorrect_answers[2];
            } else if (correctOption == 3) {
                optionA.innerHTML = questions[q].incorrect_answers[0];
                optionB.innerHTML = questions[q].incorrect_answers[1];
                optionC.innerHTML = questions[q].correct_answer;
                optionD.innerHTML = questions[q].incorrect_answers[2];
            } else {
                optionA.innerHTML = questions[q].incorrect_answers[0];
                optionB.innerHTML = questions[q].incorrect_answers[1];
                optionC.innerHTML = questions[q].incorrect_answers[2];
                optionD.innerHTML = questions[q].correct_answer;
            }


            if (!quit && !optionClicked) { //While loop to check if quit button has been clicked, if the option has been clicked or if the points earned is less than 10000
                
                while (!optionClicked){
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
                    });
                    optionClicked = true; //breaks the loop
                }
            
                count++; //Incrementing the count variable for the next question
            }
        }
    });
});

