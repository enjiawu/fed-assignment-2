//Start quiz function
const startButton = document.getElementById("start-button"); //Getting start button
const quizContent = document.getElementById("quiz-content"); //Getting quiz content
var question = document.getElementById("question"); //Getting question
var pointsEarned = document.getElementById("points-earned"); //Getting points earned
var optionA = document.getElementById("option-a"); //Getting option A
var optionB = document.getElementById("option-b"); //Getting option B
var optionC = document.getElementById("option-c"); //Getting option C
var optionD = document.getElementById("option-d"); //Getting option D
var quitButton = document.getElementsByClassName("quit-button"); //Getting quit button
var currentQuestionNumber = document.getElementById("current-question-number"); //Getting current question number


var url = "https://opentdb.com/api.php?amount=10&category=17&type=multiple"; //API link to generate quiz questions and answers
let count = 1; //Count variable for the amount of questions asked


startButton.addEventListener("click", function() { //Function for when the start button gets clicked, the questions start to appear
    document.getElementById("start-content").style.display = "none";
    quizContent.style.display = "flex";

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var questions = data.results; //Getting the questions from the API
        console.log(questions);

        for (var q in questions)
        {
            while (count != 11){
                currentQuestionNumber.innerHTML = count; //Setting the current question number
                question.innerHTML = questions[q].question; //Setting the question
                let correctOption = Math.floor(Math.random() * 4) + 1; //generating a random number to place the correct answer in //generating a random number to place the correct answer in
    
                if (correctOption == 1){
                    optionA.innerHTML = questions[q].correct_answer;
                    optionB.innerHTML = questions[q].incorrect_answers[0];
                    optionC.innerHTML = questions[q].incorrect_answers[1];
                    optionD.innerHTML = questions[q].incorrect_answers[2];
                }
                else if (correctOption == 2){
                    optionA.innerHTML = questions[q].incorrect_answers[0];
                    optionB.innerHTML = questions[q].correct_answer;
                    optionC.innerHTML = questions[q].incorrect_answers[1];
                    optionD.innerHTML = questions[q].incorrect_answers[2];
                }
                else if (correctOption == 3){
                    optionA.innerHTML = questions[q].incorrect_answers[0];
                    optionB.innerHTML = questions[q].incorrect_answers[1];
                    optionC.innerHTML = questions[q].correct_answer;
                    optionD.innerHTML = questions[q].incorrect_answers[2];
                }
                else{
                    optionA.innerHTML = questions[q].incorrect_answers[0];
                    optionB.innerHTML = questions[q].incorrect_answers[1];
                    optionC.innerHTML = questions[q].incorrect_answers[2];
                    optionD.innerHTML = questions[q].correct_answer;
                }
                
                var optionClicked = false; //Variable for when an option is clicked
                if (!optionClicked){
                    optionA.addEventListener("click", function() {
                        if (optionA.innerHTML == questions[q].correct_answer) {
                            pointsEarned.innerHTML = (parseInt(pointsEarned.innerHTML) + 1000).toString; //If the answer is correct, the points earned are increased by 1000
                            optionClicked = true; //breaks the loop
                        }
                    });
        
                    optionB.addEventListener("click", function() {
                        if (optionB.innerHTML == questions[q].correct_answer) {
                            pointsEarned.innerHTML = (parseInt(pointsEarned.innerHTML) + 1000).toString; //If the answer is correct, the points earned are increased by 1000
                            optionClicked = true; //breaks the loop
                        }
                    });
        
                    optionC.addEventListener("click", function() {
                        if (optionC.innerHTML == questions[q].correct_answer) {
                            pointsEarned.innerHTML = (parseInt(pointsEarned.innerHTML) + 1000).toString; //If the answer is correct, the points earned are increased by 1000
                            optionClicked = true; //breaks the loop
                        }
                    });
        
                    optionD.addEventListener("click", function() {
                            if (optionD.innerHTML == questions[q].correct_answer) {
                            pointsEarned.innerHTML = (parseInt(pointsEarned.innerHTML) + 1000).toString; //If the answer is correct, the points earned are increased by 1000
                            optionClicked = true; //breaks the loop
                        }
                    });
                }
                count++; //Incrementing the count variable
            }    
        }


    })
    .catch(function(error) {
    console.error(error);
    });
});
