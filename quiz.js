// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const selectA = document.getElementById("A");
const selectB = document.getElementById("B");
const selectC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const userName = document.getElementsByName("userName")

//questions
let questions = [
    {
        question : "What are the three primary colors?",
        selectA : "Blue, Yellow, Red",
        selectB : "Green, White, Orange",
        selectC : "Blue, Green, Purple",
        correct : "A"
    },{
        question : "There are more public airports than private airports?",
        selectA : "False",
        selectB : "True",
        selectC : "There are equal amount of airports in the US of A",
        correct : "B"
    },{
        question : "How many constellations are known?",
        selectA : "There are no more than 100 constellations in the sky",
        selectB : "12 constellations, one for every month",
        selectC : "There are 88 costellations grouped by the IAU",
        correct : "C"
    },{
        question : "What is the closest star to the Earth?",
        selectA : "Sun",
        selectB : "Pluto",
        selectC : "George",
        correct : "A"
    }];

// time variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;

const questionTime = 5; // 5s
const gaugeWidth = 160; // 150px
const gaugeUnit = gaugeWidth / questionTime;

let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    selectA.innerHTML = q.selectA;
    selectB.innerHTML = q.selectB;
    selectC.innerHTML = q.selectC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnswer
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#b5e7a0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#e06377";
} 
// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

//  I can save my initials and score
