/* =====================================================
   CogniSaathi - ROUTINE RECALL
   ===================================================== */


/* ================= GAME DATA ================= */

const routines = {

    easy: [
        {
            sequence: [
                { emoji: "🌅", activity: "Wake up" },
                { emoji: "🪥", activity: "Brush teeth" },
                { emoji: "🍵", activity: "Have tea" }
            ]
        },

        {
            sequence: [
                { emoji: "🌅", activity: "Wake up" },
                { emoji: "🧼", activity: "Wash face" },
                { emoji: "🍚", activity: "Have breakfast" }
            ]
        },

        {
            sequence: [
                { emoji: "🌱", activity: "Water plants" },
                { emoji: "🍵", activity: "Drink tea" },
                { emoji: "📖", activity: "Read a book" }
            ]
        }
    ],

    medium: [
        {
            sequence: [
                { emoji: "🌅", activity: "Wake up" },
                { emoji: "🪥", activity: "Brush teeth" },
                { emoji: "🍵", activity: "Have tea" },
                { emoji: "🌱", activity: "Water plants" }
            ]
        },

        {
            sequence: [
                { emoji: "🌅", activity: "Wake up" },
                { emoji: "🧼", activity: "Wash face" },
                { emoji: "🍚", activity: "Have breakfast" },
                { emoji: "📖", activity: "Read the newspaper" }
            ]
        },

        {
            sequence: [
                { emoji: "🎋", activity: "Work with bamboo" },
                { emoji: "🍵", activity: "Drink tea" },
                { emoji: "🧵", activity: "Do some weaving" },
                { emoji: "🌺", activity: "Water orchids" }
            ]
        }
    ],

    hard: [
        {
            sequence: [
                { emoji: "🌅", activity: "Wake up" },
                { emoji: "🪥", activity: "Brush teeth" },
                { emoji: "🍵", activity: "Have tea" },
                { emoji: "🌱", activity: "Water plants" },
                { emoji: "📖", activity: "Read a book" }
            ]
        },

        {
            sequence: [
                { emoji: "🌅", activity: "Wake up" },
                { emoji: "🧼", activity: "Wash face" },
                { emoji: "🍚", activity: "Have breakfast" },
                { emoji: "🎋", activity: "Work with bamboo" },
                { emoji: "🍵", activity: "Have evening tea" }
            ]
        },

        {
            sequence: [
                { emoji: "🍵", activity: "Have tea" },
                { emoji: "🌺", activity: "Water orchids" },
                { emoji: "🧵", activity: "Do some weaving" },
                { emoji: "📖", activity: "Read" },
                { emoji: "🌙", activity: "Prepare for bed" }
            ]
        }
    ]

};


/* ================= GAME STATE ================= */

const GAME_AUDIO = {
    easy: "easy",
    medium: "medium",
    hard: "hard"
};

function playGameAudio(name) {
    const language =
        localStorage.getItem("CogniSaathiLanguage") || "english";

    const audio = new Audio(
        `../audio/${language}/${name}.mp3`
    );

    audio.play().catch(error => {
        console.log("Audio error:", error);
    });
}

let currentDifficulty = "easy";
let currentRoutine = null;

let score = 0;
let currentQuestion = 0;
let correctAnswers = 0;

let gameStartTime = null;
let sequenceStartTime = null;

let questions = [];


/* ================= DOM ELEMENTS ================= */

const introScreen = document.getElementById("introScreen");
const sequenceScreen = document.getElementById("sequenceScreen");
const questionScreen = document.getElementById("questionScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const readyBtn = document.getElementById("readyBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const sequenceContainer =
    document.getElementById("sequenceContainer");

const questionText =
    document.getElementById("questionText");

const optionsContainer =
    document.getElementById("optionsContainer");

const feedback =
    document.getElementById("feedback");

const scoreDisplay =
    document.getElementById("scoreDisplay");

const questionNumber =
    document.getElementById("questionNumber");

const finalScore =
    document.getElementById("finalScore");

const finalCorrect =
    document.getElementById("finalCorrect");

const finalTime =
    document.getElementById("finalTime");

const sequenceTimer =
    document.getElementById("sequenceTimer");

const sequenceProgress =
    document.getElementById("sequenceProgress");


/* ================= DIFFICULTY ================= */

document.querySelectorAll(".difficulty-btn").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".difficulty-btn")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentDifficulty =
            button.dataset.difficulty;
            playGameAudio(currentDifficulty);
    });

});


/* ================= START GAME ================= */

startBtn.addEventListener("click", startGame);


function startGame() {

    score = 0;
    currentQuestion = 0;
    correctAnswers = 0;

    gameStartTime = Date.now();

    const availableRoutines =
        routines[currentDifficulty];

    currentRoutine =
        availableRoutines[
            Math.floor(
                Math.random() * availableRoutines.length
            )
        ];

    createQuestions();

    showSequence();

}


/* ================= CREATE QUESTIONS ================= */

function createQuestions() {

    const sequence =
        currentRoutine.sequence;

    questions = [];

    /* Question 1: What happened first? */

    questions.push({
        type: "first",
        text: "What happened first?",
        answer: sequence[0].activity
    });


    /* Question 2: What happened last? */

    questions.push({
        type: "last",
        text: "What happened last?",
        answer: sequence[sequence.length - 1].activity
    });


    /* Question 3: What came next? */

    if (sequence.length >= 3) {

        questions.push({
            type: "next",
            text: `What came after "${sequence[0].activity}"?`,
            answer: sequence[1].activity
        });

    }


    /* Question 4: Position */

    if (sequence.length >= 4) {

        questions.push({
            type: "position",
            text: `What was the 3rd activity?`,
            answer: sequence[2].activity
        });

    }


    /* Question 5 */

    if (sequence.length >= 5) {

        questions.push({
            type: "next2",
            text: `What happened after "${sequence[2].activity}"?`,
            answer: sequence[3].activity
        });

    }

}


/* ================= SHOW SEQUENCE ================= */

function showSequence() {

    introScreen.classList.add("hidden");
    questionScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");

    sequenceScreen.classList.remove("hidden");

    sequenceContainer.innerHTML = "";

    const sequence =
        currentRoutine.sequence;

    sequenceStartTime = Date.now();

    sequence.forEach((item, index) => {

        const card =
            document.createElement("div");

        card.className = "sequence-item";

        card.innerHTML = `
            <div class="emoji">${item.emoji}</div>

            <div class="activity">
                ${index + 1}. ${item.activity}
            </div>
        `;

        sequenceContainer.appendChild(card);

    });


    startSequenceTimer();

}


/* ================= SEQUENCE TIMER ================= */

function startSequenceTimer() {

    let seconds = 10;

    sequenceTimer.textContent = seconds;

    sequenceProgress.style.width = "0%";

    const totalSeconds = 10;

    const timer =
        setInterval(() => {

            seconds--;

            sequenceTimer.textContent = seconds;

            const progress =
                ((totalSeconds - seconds) /
                    totalSeconds) * 100;

            sequenceProgress.style.width =
                `${progress}%`;

            if (seconds <= 0) {

                clearInterval(timer);

                sequenceTimer.textContent = "Ready";

            }

        }, 1000);

}


/* ================= READY BUTTON ================= */

readyBtn.addEventListener("click", () => {

    playGameAudio("matching-card");

    showQuestion();

});


/* ================= SHOW QUESTION ================= */

function showQuestion() {

    sequenceScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");

    const question =
        questions[currentQuestion];

    questionNumber.textContent =
        currentQuestion + 1;

    questionText.textContent =
        question.text;

    scoreDisplay.textContent =
        score;

    feedback.className =
        "feedback hidden";

    feedback.textContent = "";

    nextBtn.classList.add("hidden");

    createOptions(question);

}


/* ================= CREATE OPTIONS ================= */

function createOptions(question) {

    optionsContainer.innerHTML = "";

    const correctAnswer =
        question.answer;

    const allActivities =
        currentRoutine.sequence
            .map(item => item.activity);


    let wrongAnswers =
        allActivities.filter(
            activity => activity !== correctAnswer
        );


    wrongAnswers =
        shuffleArray(wrongAnswers)
            .slice(0, 3);


    let options =
        shuffleArray([
            correctAnswer,
            ...wrongAnswers
        ]);


    options.forEach(option => {

        const button =
            document.createElement("button");

        button.className =
            "option-btn";

        button.textContent =
            option;

        button.addEventListener(
            "click",
            () => checkAnswer(button, option)
        );

        optionsContainer.appendChild(button);

    });

}


/* ================= CHECK ANSWER ================= */

function checkAnswer(button, selectedAnswer) {

    const correctAnswer =
        questions[currentQuestion].answer;

    document
        .querySelectorAll(".option-btn")
        .forEach(btn => {
            btn.disabled = true;
        });


    if (selectedAnswer === correctAnswer) {
        playGameAudio("well-done");

        button.classList.add("correct");

        score += 10;

        correctAnswers++;

        feedback.className =
            "feedback correct";

        feedback.textContent =
            "✓ Correct! Well remembered.";

    } else {
playGameAudio("try-again");
        button.classList.add("wrong");

        document
            .querySelectorAll(".option-btn")
            .forEach(btn => {

                if (btn.textContent === correctAnswer) {
                    btn.classList.add("correct");
                }

            });

        feedback.className =
            "feedback wrong";

        feedback.textContent =
            `The correct answer was "${correctAnswer}".`;

    }


    scoreDisplay.textContent =
        score;

    nextBtn.classList.remove("hidden");

}


/* ================= NEXT QUESTION ================= */

nextBtn.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        finishGame();

    } else {

        showQuestion();

    }

});


/* ================= FINISH GAME ================= */

function finishGame() {

    questionScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");

    const timeTaken =
        Math.round(
            (Date.now() - gameStartTime) / 1000
        );


    finalScore.textContent =
        score;

    finalCorrect.textContent =
        `${correctAnswers}/${questions.length}`;

    finalTime.textContent =
        `${timeTaken}s`;


    saveGameResult(
        score,
        timeTaken
    );

}


/* ================= LOCAL STORAGE ================= */

function saveGameResult(score, timeTaken) {

    const result = {

        score: score,

        game: "Routine Recall",

        time: timeTaken,

        difficulty: currentDifficulty,

        date: new Date().toLocaleDateString()

    };


    let results =
        JSON.parse(
            localStorage.getItem("gameResults")
        ) || [];


    results.push(result);


    localStorage.setItem(
        "gameResults",
        JSON.stringify(results)
    );

}


/* ================= RESTART ================= */

restartBtn.addEventListener("click", () => {

    resultScreen.classList.add("hidden");

    introScreen.classList.remove("hidden");

    score = 0;

    currentQuestion = 0;

    correctAnswers = 0;

});


/* ================= SHUFFLE ================= */

function shuffleArray(array) {

    const newArray =
        [...array];

    for (
        let i = newArray.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            newArray[i],
            newArray[j]
        ] =
        [
            newArray[j],
            newArray[i]
        ];

    }

    return newArray;

}
