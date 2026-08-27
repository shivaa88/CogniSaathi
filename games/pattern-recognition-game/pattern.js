/*
    SmritiCare
    Pattern Recognition Game

    Cultural theme:
    Symbols are inspired by nature, tea, weaving,
    bamboo and musical traditions associated with
    North-Eastern India.
*/


/* =========================
   QUESTION SETS
========================= */

const questionSets = {

    easy: [

        {
            pattern: ["🌿", "🍃", "🌿", "🍃"],
            options: ["🌿", "🥁", "🍃", "🧵"],
            answer: "🌿"
        },

        {
            pattern: ["🍵", "🌿", "🍵", "🌿"],
            options: ["🧵", "🌿", "🍵", "🥁"],
            answer: "🍵"
        },

        {
            pattern: ["🧵", "🌿", "🧵", "🌿"],
            options: ["🍃", "🧵", "🥁", "🍵"],
            answer: "🧵"
        },

        {
            pattern: ["🎋", "🥁", "🎋", "🥁"],
            options: ["🥁", "🎋", "🍃", "🧵"],
            answer: "🎋"
        },

        {
            pattern: ["🍃", "🍵", "🍃", "🍵"],
            options: ["🥁", "🍃", "🎋", "🍵"],
            answer: "🍃"
        }

    ],


    medium: [

        {
            pattern: ["🌿", "🍵", "🧵", "🌿", "🍵", "🧵"],
            options: ["🥁", "🌿", "🍵", "🧵"],
            answer: "🌿"
        },

        {
            pattern: ["🎋", "🎋", "🥁", "🎋", "🎋", "🥁"],
            options: ["🧵", "🥁", "🎋", "🍃"],
            answer: "🎋"
        },

        {
            pattern: ["🍵", "🍃", "🍃", "🍵", "🍃", "🍃"],
            options: ["🍵", "🧵", "🥁", "🍃"],
            answer: "🍵"
        },

        {
            pattern: ["🧵", "🌿", "🍵", "🧵", "🌿", "🍵"],
            options: ["🌿", "🍃", "🍵", "🧵"],
            answer: "🧵"
        },

        {
            pattern: ["🥁", "🎋", "🎋", "🥁", "🎋", "🎋"],
            options: ["🍵", "🎋", "🥁", "🧵"],
            answer: "🥁"
        }

    ],


    hard: [

        {
            pattern: ["🌿", "🍵", "🧵", "🥁", "🌿", "🍵", "🧵", "🥁"],
            options: ["🍃", "🌿", "🥁", "🧵"],
            answer: "🌿"
        },

        {
            pattern: ["🎋", "🥁", "🍵", "🎋", "🥁", "🍵"],
            options: ["🧵", "🎋", "🍃", "🥁"],
            answer: "🎋"
        },

        {
            pattern: ["🧵", "🍃", "🍃", "🥁", "🧵", "🍃", "🍃", "🥁"],
            options: ["🥁", "🧵", "🍵", "🎋"],
            answer: "🧵"
        },

        {
            pattern: ["🍵", "🌿", "🥁", "🍵", "🌿", "🥁"],
            options: ["🍃", "🥁", "🧵", "🍵"],
            answer: "🍵"
        },

        {
            pattern: ["🎋", "🧵", "🌿", "🎋", "🧵", "🌿"],
            options: ["🥁", "🌿", "🎋", "🍵"],
            answer: "🎋"
        }

    ]

};


/* =========================
   GAME STATE
========================= */

let currentDifficulty = "easy";

let questions = questionSets[currentDifficulty];

let currentQuestion = 0;

let correctAnswers = 0;

let wrongAnswers = 0;

let attempts = 0;

let score = 0;

let gameStartTime = Date.now();


/* =========================
   HTML ELEMENTS
========================= */

const patternElement =
    document.getElementById("pattern");

const optionsElement =
    document.getElementById("options");

const questionNumberElement =
    document.getElementById("questionNumber");

const totalQuestionsElement =
    document.getElementById("totalQuestions");

const feedbackElement =
    document.getElementById("feedback");

const nextButton =
    document.getElementById("nextButton");

const completionScreen =
    document.getElementById("completionScreen");

const correctCountElement =
    document.getElementById("correctCount");

const restartButton =
    document.getElementById("restartButton");

const scoreElement =
    document.getElementById("score");

const correctScoreElement =
    document.getElementById("correctScore");

const attemptsScoreElement =
    document.getElementById("attemptsScore");

const finalScoreElement =
    document.getElementById("finalScore");


/* =========================
   DIFFICULTY BUTTONS
========================= */

const difficultyButtons =
    document.querySelectorAll(".difficulty-button");


difficultyButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedLevel =
            button.dataset.level;

        currentDifficulty = selectedLevel;

        questions =
            questionSets[currentDifficulty];

        currentQuestion = 0;

        correctAnswers = 0;

        wrongAnswers = 0;

        attempts = 0;

        score = 0;

        gameStartTime = Date.now();

        difficultyButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        completionScreen.hidden = true;

        document.querySelector(".pattern-box").hidden = false;

        document.querySelector(".options-section").hidden = false;

        feedbackElement.hidden = false;

        updateScoreboard();

        loadQuestion();

    });

});


/* =========================
   DISPLAY PATTERN
========================= */

function displayPattern(question) {

    patternElement.innerHTML = "";

    question.pattern.forEach(item => {

        const span =
            document.createElement("span");

        span.textContent = item;

        span.classList.add("pattern-item");

        patternElement.appendChild(span);

    });


    /*
        Add the missing position.
        This makes it visually obvious
        what the player needs to choose.
    */

    const questionMark =
        document.createElement("span");

    questionMark.textContent = "?";

    questionMark.classList.add(
        "pattern-item",
        "question-mark"
    );

    patternElement.appendChild(questionMark);
}


/* =========================
   DISPLAY OPTIONS
========================= */

function displayOptions(question) {

    optionsElement.innerHTML = "";

    question.options.forEach(option => {

        const button =
            document.createElement("button");

        button.textContent = option;

        button.classList.add(
            "answer-button"
        );

        button.addEventListener(
            "click",
            () => checkAnswer(option)
        );

        optionsElement.appendChild(button);

    });
}


/* =========================
   CHECK ANSWER
========================= */

function checkAnswer(selectedAnswer) {

    attempts++;

    attemptsScoreElement.textContent =
        attempts;

    const question =
        questions[currentQuestion];


    if (selectedAnswer === question.answer) {

        correctAnswers++;

        score += 10;

        feedbackElement.textContent =
            "✓ Well done! That's correct.";

        disableOptions();

        dispatchCorrectEvent();

    } else {

        wrongAnswers++;

        feedbackElement.textContent =
            "Good try! Have another look.";

        dispatchWrongEvent();

    }


    updateScoreboard();
}


/* =========================
   SCOREBOARD
========================= */

function updateScoreboard() {

    scoreElement.textContent = score;

    correctScoreElement.textContent =
        correctAnswers;

    attemptsScoreElement.textContent =
        attempts;

}


/* =========================
   DISABLE OPTIONS
========================= */

function disableOptions() {

    const buttons =
        optionsElement.querySelectorAll("button");

    buttons.forEach(button => {

        button.disabled = true;

    });

    nextButton.hidden = false;
}


/* =========================
   NEXT QUESTION
========================= */

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        completeGame();

    }

});


/* =========================
   LOAD QUESTION
========================= */

function loadQuestion() {

    const question =
        questions[currentQuestion];


    questionNumberElement.textContent =
        currentQuestion + 1;

    totalQuestionsElement.textContent =
        questions.length;

    feedbackElement.textContent = "";

    nextButton.hidden = true;


    displayPattern(question);

    displayOptions(question);

}


/* =========================
   COMPLETE GAME
========================= */

/* =========================
   SAVE GAME RESULT
========================= */

function saveGameResult(timeTaken) {

    const gameResult = {

        score: score,

        game: "Pattern Recognition",

        time: timeTaken,

        difficulty: currentDifficulty,

        date: new Date().toLocaleDateString()

    };


    let gameResults =
        JSON.parse(
            localStorage.getItem("gameResults")
        ) || [];


    gameResults.push(gameResult);


    localStorage.setItem(
        "gameResults",
        JSON.stringify(gameResults)
    );

}

function completeGame() {

    const timeTaken =
        Math.round(
            (Date.now() - gameStartTime) / 1000
        );
    
    saveGameResult(timeTaken);


    document.querySelector(
        ".pattern-box"
    ).hidden = true;

    document.querySelector(
        ".options-section"
    ).hidden = true;

    feedbackElement.hidden = true;

    nextButton.hidden = true;

    completionScreen.hidden = false;


    correctCountElement.textContent =
        correctAnswers;

    finalScoreElement.textContent =
        score;


    dispatchCompleteEvent(timeTaken);

}


/* =========================
   RESTART
========================= */

restartButton.addEventListener(
    "click",
    () => {

        currentQuestion = 0;

        correctAnswers = 0;

        wrongAnswers = 0;

        attempts = 0;

        score = 0;

        gameStartTime = Date.now();


        completionScreen.hidden = true;

        document.querySelector(
            ".pattern-box"
        ).hidden = false;

        document.querySelector(
            ".options-section"
        ).hidden = false;

        feedbackElement.hidden = false;


        updateScoreboard();

        loadQuestion();

    }
);


/* =========================
   EVENTS FOR PERSON 3
========================= */

function dispatchCorrectEvent() {

    window.dispatchEvent(
        new CustomEvent(
            "patternCorrect",
            {
                detail: {
                    question:
                        currentQuestion + 1
                }
            }
        )
    );

}


function dispatchWrongEvent() {

    window.dispatchEvent(
        new CustomEvent(
            "patternWrong",
            {
                detail: {
                    question:
                        currentQuestion + 1
                }
            }
        )
    );

}


function dispatchCompleteEvent(
    timeTaken
) {

    window.dispatchEvent(
        new CustomEvent(
            "patternComplete",
            {
                detail: {

                    correctAnswers:
                        correctAnswers,

                    wrongAnswers:
                        wrongAnswers,

                    attempts:
                        attempts,

                    timeTaken:
                        timeTaken

                }
            }
        )
    );

}


/* =========================
   START GAME
========================= */

loadQuestion();

updateScoreboard();
