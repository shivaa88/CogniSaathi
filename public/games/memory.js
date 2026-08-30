/* =====================================================
   CogniSaathi - MEMORY MATCH
   ===================================================== */

const params = new URLSearchParams(window.location.search);
const selectedLanguage = params.get("lang") || "en";

const language =
    selectedLanguage === "assamese" ? "assamese" : "english";

const translations = {
    en: {
        memoryTitle: "Memory Match",
        intro: "Match the familiar symbols and strengthen memory through playful recall.",
        chooseDifficulty: "Choose Difficulty",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        pairs: "pairs"
    },

    assamese: {
        memoryTitle: "স্মৃতি মিলোৱা",
        intro: "চিনাকি চিহ্নবোৰ মিলাই খেলৰ মাজেৰে স্মৃতিশক্তিৰ অনুশীলন কৰক।",
        chooseDifficulty: "কঠিনতাৰ স্তৰ বাছনি কৰক",
        easy: "সহজ",
        medium: "মধ্যম",
        hard: "কঠিন",
        pairs: "যোৰ"
    }
};

const text = translations[selectedLanguage] || translations.en;

/* ================= AUDIO ================= */

let currentAudio = null;

function stopCurrentAudio() {
    try {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
    } catch {}
}

function playGameAudio(audioName) {
        stopCurrentAudio();

    currentAudio = new Audio(
        `../audio/${language}/${audioName}.mp3`
    );

    currentAudio.volume = 1;

    currentAudio.play().catch(error => {
        console.log("Audio error:", error);
    });
}

document.documentElement.lang =
    selectedLanguage === "assamese" ? "as" : "en";

document.getElementById("memory-title").textContent =
    text.memoryTitle;

document.getElementById("memory-intro").textContent =
    text.intro;

document.getElementById("difficulty-title").textContent =
    text.chooseDifficulty;


const memoryDifficultyButtons =
    document.querySelectorAll(".difficulty-btn");

memoryDifficultyButtons.forEach(button => {
    const level = button.dataset.level;

    const title = button.querySelector("strong");
    const subtitle = button.querySelector("small");

    if (level === "easy") {
        title.textContent = text.easy;
        subtitle.textContent =
            selectedLanguage === "assamese"
                ? "4 যোৰ"
                : "4 pairs";
    }

    if (level === "medium") {
        title.textContent = text.medium;
        subtitle.textContent =
            selectedLanguage === "assamese"
                ? "6 যোৰ"
                : "6 pairs";
    }

    if (level === "hard") {
        title.textContent = text.hard;
        subtitle.textContent =
            selectedLanguage === "assamese"
                ? "8 যোৰ"
                : "8 pairs";
    }
});

/* ================= DOM ELEMENTS ================= */

const gameBoard = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const pairsDisplay = document.getElementById("pairs");
const restartButton = document.getElementById("restart-btn");
const winMessage = document.getElementById("win-message");
const finalScore = document.getElementById("final-score");
const finalPairs = document.getElementById("final-pairs");
const finalMoves = document.getElementById("final-moves");
const finalTime = document.getElementById("final-time");
const performanceMessage =
    document.getElementById("performance-message");

const playAgainButton =
    document.getElementById("play-again");

const difficultyButtons =
    document.querySelectorAll(".difficulty-btn");


/* ================= GAME DATA ================= */

const allSymbols = [
    { name: "Rhino", emoji: "🦏" },
    { name: "Tea", emoji: "🍃" },
    { name: "Mountains", emoji: "🏔️" },
    { name: "Orchid", emoji: "🌸" },
    { name: "Elephant", emoji: "🐘" },
    { name: "Bamboo", emoji: "🎋" },
    { name: "Traditional House", emoji: "🏡" },
    { name: "Drum", emoji: "🥁" }
];

const levels = {
    easy: 4,
    medium: 6,
    hard: 8
};


/* ================= GAME STATE ================= */

let currentLevel = "easy";

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let moves = 0;
let matchedPairs = 0;
let totalPairs = 4;

let seconds = 0;
let timer = null;

let gameStarted = false;
let hasChosenLevel = false;


/* ================= START GAME ================= */

function startGame() {
    // Reset state
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    moves = 0;
    matchedPairs = 0;
    seconds = 0;

    gameStarted = false;

    clearInterval(timer);

    // Clear old cards before creating new ones
    gameBoard.innerHTML = "";

    totalPairs = levels[currentLevel];

    movesDisplay.textContent = "0";
    timerDisplay.textContent = "00:00";
    pairsDisplay.textContent =
        `0 / ${totalPairs}`;

    winMessage.classList.add("hidden");

    // Play level audio ONLY when user has chosen level
    if (hasChosenLevel) {
        playGameAudio(currentLevel);
    }

    // Select symbols
    const selectedSymbols =
        allSymbols.slice(0, totalPairs);

    const cards =
        [...selectedSymbols, ...selectedSymbols];

    shuffle(cards);

    // Create cards
    cards.forEach(function (symbol) {
        const card = document.createElement("button");

        card.classList.add("card");

        card.dataset.name = symbol.name;
        card.dataset.emoji = symbol.emoji;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    ${symbol.emoji}
                </div>
                <div class="card-back">
                    ❓
                </div>
            </div>
        `;

        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });

    // Grid
    gameBoard.style.gridTemplateColumns = "repeat(4, 1fr)";
}


/* ================= SHUFFLE ================= */

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


/* ================= FLIP CARD ================= */

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (this.classList.contains("matched")) return;

    if (!gameStarted) {
        startTimer();
        gameStarted = true;

        // Game instruction audio
        playGameAudio("matching-pairs");
    }

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    moves++;

    movesDisplay.textContent = moves;
    checkMatch();
}


/* ================= CHECK MATCH ================= */

function checkMatch() {
    const isMatch =
        firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableMatchedCards();
    } else {
        unflipCards();
    }
}


/* ================= MATCH ================= */

function disableMatchedCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    matchedPairs++;

    pairsDisplay.textContent = `${matchedPairs} / ${totalPairs}`;

    resetTurn();

    if (matchedPairs === totalPairs) {
        gameWon();
    }
}


/* ================= WRONG MATCH ================= */

function unflipCards() {
    playGameAudio("try-again");

    setTimeout(function () {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        resetTurn();
    }, 900);
}


/* ================= RESET TURN ================= */

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}


/* ================= TIMER ================= */

function startTimer() {
    clearInterval(timer);

    timer = setInterval(function () {
        seconds++;

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        timerDisplay.textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(remainingSeconds).padStart(2, "0");
    }, 1000);
}


/* ================= SCORE ================= */

function calculateScore() {
    let baseScore;

    if (currentLevel === "easy") baseScore = 500;
    else if (currentLevel === "medium") baseScore = 750;
    else baseScore = 1000;

    const idealMoves = totalPairs * 2;

    const moveBonus =
        Math.max(0, (idealMoves + 4 - moves) * 20);

    const timeBonus =
        Math.max(0, 300 - seconds * 3);

    return baseScore + moveBonus + timeBonus;
}


/* ================= SAVE RESULT ================= */

function saveGameResult(score) {
    const gameResult = {
        score: score,
        game: "Memory Game",
        time: seconds,
        difficulty: currentLevel,
        date: new Date().toLocaleDateString()
    };

    let gameResults =
        JSON.parse(localStorage.getItem("gameResults")) || [];

    gameResults.push(gameResult);
    localStorage.setItem("gameResults", JSON.stringify(gameResults));
}


/* ================= GAME WON ================= */

function gameWon() {
    clearInterval(timer);

    const score = calculateScore();
    saveGameResult(score);

    // Success audio (won’t overlap with others due to stopCurrentAudio())
    playGameAudio("well-done");

    finalScore.textContent = score;
    finalPairs.textContent = `${matchedPairs} / ${totalPairs}`;
    finalMoves.textContent = moves;
    finalTime.textContent = timerDisplay.textContent;

    if (score >= (currentLevel === "easy" ? 700 : currentLevel === "medium" ? 950 : 1200)) {
        performanceMessage.textContent = "Excellent memory performance!";
    } else if (score >= (currentLevel === "easy" ? 600 : currentLevel === "medium" ? 850 : 1100)) {
        performanceMessage.textContent = "Great job! Keep practicing!";
    } else {
        performanceMessage.textContent = "Well done! You completed the game!";
    }

    setTimeout(function () {
        winMessage.classList.remove("hidden");
    }, 600);
}


/* ================= DIFFICULTY ================= */

difficultyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        difficultyButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentLevel = button.dataset.level;

        // user chose level now
        hasChosenLevel = true;

        // start game (with level audio)
        startGame();

        // Optional: hide difficulty section after selection
        const diffSection = document.querySelector(".difficulty-section");
        if (diffSection) diffSection.style.display = "none";
    });
});


/* ================= RESTART ================= */

restartButton.addEventListener("click", function () {
    // unhide difficulty section on restart
    const diffSection = document.querySelector(".difficulty-section");
    if (diffSection) diffSection.style.display = "";

    // prevent overlaps: play restart sound only
    playGameAudio("restart-game");

    // keep chosen level; re-start game
    startGame();
});


/* ================= PLAY AGAIN ================= */

playAgainButton.addEventListener("click", function () {
    // keep difficulty chosen; also hide difficulty section again
    const diffSection = document.querySelector(".difficulty-section");
    if (diffSection) diffSection.style.display = "none";

    playGameAudio("play-again");
    startGame();
});


/* ================= START ================= */
// IMPORTANT: do not auto-start here anymore.
// startGame();
