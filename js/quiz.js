const quitButtons = Array.from(document.getElementsByClassName("quit-button")); //Getting quit button and changing to array so i can use array functions
const startButton = document.getElementById("start-button"); //Getting start button

//Making the quit button work when clicked
quitButtons.forEach(button => { //For each choice
    button.addEventListener("click", () => { //When the quit button is clicked
        window.location.href = "/fed-assignment-2/index.html"; //Redirect the user back to index.html
    });
});

var restart = document.getElementById("restart-button"); //Getting restart button
restart.addEventListener("click", function() { //Function for when the restart button gets clicked
    window.location.href = "quiz.html"; //Redirect the user back to quiz start page
});

const question = document.getElementById("question");
const options = Array.from(document.getElementsByClassName("option-info")); //Convert to array to use array functions
console.log(options)

let currentQuestion = {}; //Object to hold current question
let acceptingAnswers = false; //To create a delay before the user answers the next question
let score = 0; //To keep track of the score
var pointsEarned = document.getElementById("points-earned"); //To keep track of the score shown on the screen
let questionCounter = 0; //To keep track of the question number
let availableQuestions = []; //Array to hold the questions that are available

const maxQuestions = 10; //Maximum number of questions    
var questionNumber = document.getElementById("current-question-number"); //To keep track of the question number
var questionTrackerInner = document.getElementById("question-tracker-inner"); //To keep track of the progress bar

var url = "https://opentdb.com/api.php?amount=10&category=17&type=multiple";
let questions = [];

function lottieLoading(){
    document.getElementById("loading-screen").style.display = "flex"; //Showing the lottie animation
    document.getElementsByTagName("body")[0].style.backgroundColor = "#061f37"; //Changing the background color 
    document.getElementsByTagName("main")[0].style.display = "none"; //Hiding the quiz content

    setTimeout(() => { //Change back after 3 seconds
        document.getElementById("loading-screen").style.display = "none"; //Hiding the lottie animation
        document.getElementsByTagName("body")[0].style.backgroundColor = "white"; //Changing background back to white
        document.getElementsByTagName("main")[0].style.display = "flex"; //Showing the quiz content
    }, 3000);
}

//When the start button is clicked
startButton.addEventListener("click", function(){ //Add an event listener for when the start button is clicked
    lottieLoading(); //Showing the lottie animation while the quiz loads
    document.getElementById("start-content").style.display = "none"; //Hide the start content
    document.getElementById("quiz-content-header").style.display = "flex"; //Show the quiz content header
    document.getElementById("quiz-content").style.display = "flex"; //Show the quiz content

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then((loadedQuestions) => {
            questions = loadedQuestions.results.map((loadedQuestion) => {
                const formattedQuestion = {
                    question: loadedQuestion.question,
                };
    
                const answerChoices = [...loadedQuestion.incorrect_answers];
                formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
                answerChoices.splice(
                    formattedQuestion.answer - 1,
                    0,
                    loadedQuestion.correct_answer
                );
    
                answerChoices.forEach((choice, index) => {
                    formattedQuestion['choice' + (index + 1)] = choice;
                });
    
                return formattedQuestion;
            });
            startGame();
        })
    });

//Create a function to start game
function startGame(){
    questionCounter = 0; //Make sure it is 0
    score = 0; //Make sure it is 0
    availableQuestions = [...questions]; //Copy the questions to the available questions array
    getNewQuestion(); //Get a new question
}

//Create a function to get a new question
function getNewQuestion(){
    if (availableQuestions.length === 0 || questionCounter > maxQuestions){ //If there are no more questions or the question counter is greater than the max questions
        document.getElementById("quiz-content-header").style.display = "none"; //Show the quiz content header
        document.getElementById("quiz-content").style.display = "none"; //Show the quiz content
        document.getElementById("end-content").style.display = "flex"; //Show the quiz results
    }
    questionTrackerInner.style.width = `${(questionCounter/maxQuestions) * 100}%`; //Set the width of the quiz tracker to the percentage of the question counter divided by the max questions
    
    if(questionCounter === maxQuestions){ //If the question counter is equal to the max questions
        questionTrackerInner.style.borderRadius = "10px 10px 0 0"; //Make the quiz tracker rounded
        document.getElementById("final-score-points").innerHTML = score; //Set the final score to the score
    }
    
    questionCounter ++; //increment question counter
    questionNumber.innerText = questionCounter; //Set the question number to the question counter


    const questionIndex = Math.floor(Math.random() * availableQuestions.length); //Get a random question
    currentQuestion = availableQuestions[questionIndex]; //Set the current question to the question in the available questions array
    question.innerText = currentQuestion.question; //Set the question text to the current question's question

    options.forEach(option => { //For each choice
        const number = option.dataset["number"]; //Get the number of the choice
        option.innerText = currentQuestion["choice" + number]; //Set the choice text to the current question's choice text
    });

    availableQuestions.splice(questionIndex, 1); //Remove the current question from the available questions array

    acceptingAnswers = true; //Set accepting answers to true to allow them to answer
}

options.forEach(option => { //For each choice
    option.addEventListener("click", e => { //Add an event listener for when the choice is clicked
        if (!acceptingAnswers) {
            return; //If accepting answers is false, return
        }

        acceptingAnswers = false; //Set accepting answers to false to stop them from answering
        const selectedOption = e.target; //Get the selected option
        const selectedAnswer = selectedOption.dataset["number"]; //Get the selected answer

        if (selectedAnswer == currentQuestion.answer) { //If the selected answer is the same as the current question's answer
            score += 1000; //Add correct points
            document.getElementById("points-popup").style.display = "block"; //Show the points popup
            pointsEarned.innerHTML = score; //Set the points earned to the score
            selectedOption.parentElement.classList.add("correct"); //Add the correct class to the selected option's parent element

            setTimeout(() => { //Wait for a second
                selectedOption.parentElement.classList.remove("correct"); //Remove the correct class to the selected option's parent element
                document.getElementById("points-popup").style.display = "none"; //Hide the points popup
                getNewQuestion(); //Get a new question
            }, 1000);
        }
        else { //If the selected answer is not the same as the current question's answer
            selectedOption.parentElement.classList.add("wrong"); //Add the wrong class to the selected option's parent element
            //selectedAnswer.parentElement.classList.add("correct"); //Add the correct class to the selected answer's parent element
            setTimeout(() => {//Wait for a second
                selectedOption.parentElement.classList.remove("wrong"); //Remove the correct class to the selected option's parent element
                //selectedAnswer.parentElement.classList.remove("correct"); //Remove the correct class to the selected answer's parent element
                document.getElementById("points-popup").style.display = "none"; //Hide the points popup
                getNewQuestion(); //Get a new question
            },1000)
        }
    });
});


