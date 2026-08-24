// ==========================================
// SCORING & DIFFICULTY ENGINE MODULE
// ==========================================

const DifficultyEngine = (() => {
  const CONFIG = {
    minDifficulty: 1,
    maxDifficulty: 10,
    windowSize: 3,
    levelUpThreshold: 80,
    levelDownThreshold: 40
  };

  let currentDifficulty = 1;
  let scoreHistory = [];

  function calculateScore(accuracy, timeTaken, maxTimeAllowed = 30) {
    const clampedAccuracy = Math.min(100, Math.max(0, accuracy));

    const speedRatio = Math.max(
      0,
      (maxTimeAllowed - timeTaken) / maxTimeAllowed
    );

    const speedScore = speedRatio * 100;

    const finalScore =
      (clampedAccuracy * 0.7) + (speedScore * 0.3);

    return Math.round(finalScore);
  }

  function updateDifficulty(latestScore) {
    scoreHistory.push(latestScore);

    if (scoreHistory.length > CONFIG.windowSize) {
      scoreHistory.shift();
    }

    if (scoreHistory.length === CONFIG.windowSize) {
      const averageScore =
        scoreHistory.reduce((a, b) => a + b, 0) / CONFIG.windowSize;

      if (
        averageScore >= CONFIG.levelUpThreshold &&
        currentDifficulty < CONFIG.maxDifficulty
      ) {
        currentDifficulty++;
        scoreHistory = [];
      } 
      else if (
        averageScore <= CONFIG.levelDownThreshold &&
        currentDifficulty > CONFIG.minDifficulty
      ) {
        currentDifficulty--;
        scoreHistory = [];
      }
    }

    return currentDifficulty;
  }

  function processGameResult(
    accuracy,
    timeTaken,
    maxTimeAllowed = 30
  ) {
    const sessionScore =
      calculateScore(accuracy, timeTaken, maxTimeAllowed);

    const newDifficulty =
      updateDifficulty(sessionScore);

    return {
      sessionScore,
      newDifficulty
    };
  }

  function resetEngine(initialDifficulty = 1) {
    currentDifficulty = initialDifficulty;
    scoreHistory = [];
  }

  return {
    processGameResult,
    resetEngine
  };
})();
// ==========================================
// TEST SUITE - REMOVE/COMMENT OUT AFTER TESTING
// ==========================================

console.log("--- Starting Engine Test ---");

DifficultyEngine.resetEngine(1);

let result1 = DifficultyEngine.processGameResult(100, 10);

console.log("Game 1 Result:", result1);
let result2 = DifficultyEngine.processGameResult(90, 8);

console.log("Game 2 Result:", result2);
let result3 = DifficultyEngine.processGameResult(95, 5);

console.log("Game 3 Result:", result3);
let result4 = DifficultyEngine.processGameResult(30, 25);
console.log("Game 4 Result:", result4);

let result5 = DifficultyEngine.processGameResult(20, 28);
console.log("Game 5 Result:", result5);

let result6 = DifficultyEngine.processGameResult(40, 22);
console.log("Game 6 Result:", result6);
let slowTest = DifficultyEngine.processGameResult(80, 40);
console.log("Slow Test:", slowTest);
let fastTest = DifficultyEngine.processGameResult(80, 0);
console.log("Fast Test:", fastTest);