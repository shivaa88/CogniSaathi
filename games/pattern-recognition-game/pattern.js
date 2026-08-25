const questions = [
    {
        pattern: ["🔴", "🔵", "🔴", "🔵"],
        options: ["🔴", "🟢", "🔵", "🟡"],
        answer: "🔴"
    },

    {
        pattern: ["⭐", "🌙", "⭐", "🌙"],
        options: ["☀️", "⭐", "🌙", "❤️"],
        answer: "⭐"
    },

    {
        pattern: ["🍎", "🍌", "🍎", "🍌"],
        options: ["🍎", "🍇", "🍌", "🍊"],
        answer: "🍎"
    },

    {
        pattern: ["⬆️", "⬇️", "⬆️", "⬇️"],
        options: ["⬆️", "⬅️", "➡️", "⬇️"],
        answer: "⬆️"
    },

    {
        pattern: ["●", "■", "●", "■"],
        options: ["▲", "■", "●", "◆"],
        answer: "●"
    }
];

let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let attempts = 0;

const startTime = Date.now();

const patternElement = document.getElementById("pattern");
const optionsElement = document.getElementById("options");

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

function displayPattern(question) {

    patternElement.innerHTML = "";

    question.pattern.forEach(item => {

        const span = document.createElement("span");

        span.textContent = item;

        span.classList.add("pattern-item");

        patternElement.appendChild(span);
    });
}

function displayOptions(question) {

    optionsElement.innerHTML = "";

    question.options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;

        button.classList.add("answer-button");

        button.addEventListener("click", () => {
            checkAnswer(option);
        });

        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {

    attempts++;

    const question = questions[currentQuestion];

    if (selectedAnswer === question.answer) {

        correctAnswers++;

        feedbackElement.textContent = "Well done!";

        disableOptions();

        dispatchCorrectEvent();

    } else {

        wrongAnswers++;

        feedbackElement.textContent =
            "Good try! Let's try again.";

        dispatchWrongEvent();
    }
}

function disableOptions() {

    const buttons =
        optionsElement.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    nextButton.hidden = false;
}

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        completeGame();
    }
});

function loadQuestion() {

    const question = questions[currentQuestion];

    questionNumberElement.textContent =
        currentQuestion + 1;

    totalQuestionsElement.textContent =
        questions.length;

    feedbackElement.textContent = "";

    nextButton.hidden = true;

    displayPattern(question);

    displayOptions(question);
}

function completeGame() {

    const timeTaken =
        Math.round((Date.now() - startTime) / 1000);

    document.querySelector(".pattern-box").hidden = true;

    document.querySelector(".options-section").hidden = true;

    feedbackElement.hidden = true;

    nextButton.hidden = true;

    completionScreen.hidden = false;

    correctCountElement.textContent =
        correctAnswers;

    dispatchCompleteEvent(timeTaken);
}

restartButton.addEventListener("click", () => {

    currentQuestion = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    attempts = 0;

    completionScreen.hidden = true;

    document.querySelector(".pattern-box").hidden = false;

    document.querySelector(".options-section").hidden = false;

    feedbackElement.hidden = false;

    loadQuestion();
});

function dispatchCorrectEvent() {

    window.dispatchEvent(
        new CustomEvent("patternCorrect", {
            detail: {
                question: currentQuestion + 1
            }
        })
    );
}

function dispatchWrongEvent() {

    window.dispatchEvent(
        new CustomEvent("patternWrong", {
            detail: {
                question: currentQuestion + 1
            }
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

loadQuestion();

