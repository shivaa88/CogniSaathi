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
