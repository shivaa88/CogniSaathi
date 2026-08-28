console.log("--- Starting CogniSaathi 3-Game Engine Test ---");

if (typeof DifficultyEngine !== "undefined") {
  DifficultyEngine.resetEngine(1);

  let patternResult = DifficultyEngine.processGameResult(90, 12);
  console.log("Pattern Recognition Result:", patternResult);

  let memoryResult = DifficultyEngine.processGameResult(85, 15);
  console.log("Memory Match Result:", memoryResult);

  let routineResult = DifficultyEngine.processGameResult(70, 20);
  console.log("Routine Recall Result:", routineResult);
} else {
  console.log("DifficultyEngine is not defined");
}
