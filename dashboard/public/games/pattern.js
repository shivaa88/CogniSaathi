/*
    CogniSaathi
    Pattern Recognition Game
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
let questionAnswered = false;

/* =========================
   HTML ELEMENTS
========================= */

const patternElement = document.getElementById("pattern");
const optionsElement = document.getElementById("options");
const questionNumberElement = document.getElementById("questionNumber");
const totalQuestionsElement = document.getElementById("totalQuestions");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");
const completionScreen = document.getElementById("completionScreen");
const correctCountElement = document.getElementById("correctCount");
const restartButton = document.getElementById("restartButton");
const scoreElement = document.getElementById("score");
const correctScoreElement = document.getElementById("correctScore");
const attemptsScoreElement = document.getElementById("attemptsScore");
const finalScoreElement = document.getElementById("finalScore");

const difficultyButtons = document.querySelectorAll(".difficulty-btn");
const patternBox = document.querySelector(".pattern-box");
const optionsSection = document.querySelector(".options-section");
const difficultySection = document.querySelector(".difficulty-section");

/* =========================
   DIFFICULTY BUTTONS
========================= */

difficultyButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedLevel = button.dataset.level;

        currentDifficulty = selectedLevel;
        questions = questionSets[currentDifficulty];
        currentQuestion = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        attempts = 0;
        score = 0;
        gameStartTime = Date.now();
        questionAnswered = false;

        difficultyButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Start: hide difficulty bar until restart
        if (difficultySection) difficultySection.style.display = "none";

        completionScreen.classList.add("hidden");
        patternBox.classList.remove("hidden");
        optionsSection.classList.remove("hidden");
        feedbackElement.classList.remove("hidden");

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
        const span = document.createElement("span");
        span.textContent = item;
        span.classList.add("pattern-item");
        patternElement.appendChild(span);
    });

    const questionMark = document.createElement("span");
    questionMark.textContent = "?";
    questionMark.classList.add("pattern-item", "question-mark");
    patternElement.appendChild(questionMark);
}

/* =========================
   DISPLAY OPTIONS
========================= */

function displayOptions(question) {
    optionsElement.innerHTML = "";

    question.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("answer-button");

        button.addEventListener("click", () => checkAnswer(option, button));

        optionsElement.appendChild(button);
    });
}

/* =========================
   CHECK ANSWER
========================= */

function checkAnswer(selectedAnswer, selectedButton) {
    if (questionAnswered) return;

    attempts++;

    const question = questions[currentQuestion];
    const allButtons = optionsElement.querySelectorAll("button");

    if (selectedAnswer === question.answer) {
        questionAnswered = true;
        correctAnswers++;
        score += 10;

        feedbackElement.textContent = "✓ Well done! That's correct.";
        feedbackElement.className = "feedback correct";

        selectedButton.classList.add("correct");

        disableOptions();
        nextButton.hidden = false;

        dispatchCorrectEvent();
    } else {
        wrongAnswers++;

        feedbackElement.textContent = "Good try! Have another look.";
        feedbackElement.className = "feedback wrong";

        selectedButton.classList.add("wrong");

        setTimeout(() => {
            selectedButton.classList.remove("wrong");
        }, 500);

        dispatchWrongEvent();
    }

    allButtons.forEach(button => {
        if (button.textContent === question.answer && questionAnswered) {
            button.classList.add("correct");
        }
    });

    updateScoreboard();
}

/* =========================
   SCOREBOARD
========================= */

function updateScoreboard() {
    scoreElement.textContent = score;
    correctScoreElement.textContent = correctAnswers;
    attemptsScoreElement.textContent = attempts;
}

/* =========================
   DISABLE OPTIONS
========================= */

function disableOptions() {
    const buttons = optionsElement.querySelectorAll("button");
    buttons.forEach(button => {
        button.disabled = true;
    });
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
    const question = questions[currentQuestion];

    questionAnswered = false;

    questionNumberElement.textContent = currentQuestion + 1;
    totalQuestionsElement.textContent = questions.length;

    feedbackElement.textContent = "";
    feedbackElement.className = "feedback";

    nextButton.hidden = true;

    displayPattern(question);
    displayOptions(question);
}

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
        JSON.parse(localStorage.getItem("gameResults")) || [];

    gameResults.push(gameResult);

    localStorage.setItem("gameResults", JSON.stringify(gameResults));
}

/* =========================
   COMPLETE GAME
========================= */

function completeGame() {
    const timeTaken = Math.round((Date.now() - gameStartTime) / 1000);

    saveGameResult(timeTaken);

    patternBox.classList.add("hidden");
    optionsSection.classList.add("hidden");
    feedbackElement.classList.add("hidden");
    nextButton.hidden = true;
    completionScreen.classList.remove("hidden");

    correctCountElement.textContent = correctAnswers;
    finalScoreElement.textContent = score;

    dispatchCompleteEvent(timeTaken);
}

/* =========================
   RESTART
========================= */

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    attempts = 0;
    score = 0;
    gameStartTime = Date.now();
    questionAnswered = false;

    // show difficulty section only after restart
    if (difficultySection) difficultySection.style.display = "";

    completionScreen.classList.add("hidden");
    patternBox.classList.remove("hidden");
    optionsSection.classList.remove("hidden");
    feedbackElement.classList.remove("hidden");

    updateScoreboard();
    loadQuestion();
});

/* =========================
   EVENTS
========================= */

function dispatchCorrectEvent() {
    window.dispatchEvent(
        new CustomEvent("patternCorrect", {
            detail: { question: currentQuestion + 1 }
        })
    );
}

function dispatchWrongEvent() {
    window.dispatchEvent(
        new CustomEvent("patternWrong", {
            detail: { question: currentQuestion + 1 }
        })
    );
}

function dispatchCompleteEvent(timeTaken) {
    window.dispatchEvent(
        new CustomEvent("patternComplete", {
            detail: {
                correctAnswers: correctAnswers,
                wrongAnswers: wrongAnswers,
                attempts: attempts,
                timeTaken: timeTaken
            }
        })
    );
}

/* =========================
   START (NO AUTO LOAD)
========================= */

// loadQuestion(); // IMPORTANT: do not start until user selects difficulty

/* =========================
   AUDIO (NO OVERLAP)
========================= */

// Audio behavior:
// - level audio plays on difficulty button click only
// - restart audio plays on restart click only
// - answers/next do NOT play audio (prevents overlaps/jumpcare)
document.addEventListener("click", function (event) {
    const diffBtn = event.target.closest(".difficulty-btn");
    const restart = event.target.closest("#restartButton");

    if (restart) {
        const a = new Audio("/audio/restart-game.mp3");
        a.currentTime = 0;
        a.play().catch(() => {});
        return;
    }

    if (diffBtn) {
        const lvl = diffBtn.dataset.level; // easy | medium | hard
        const src =
            lvl === "easy" ? "/audio/easy.mp3" :
            lvl === "medium" ? "/audio/medium.mp3" :
            "/audio/hard.mp3";

        const a = new Audio(src);
        a.currentTime = 0;
        a.play().catch(() => {});
        return;
    }
});

updateScoreboard();
