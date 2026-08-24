console.log("Testing Difficulty Engine...");

DifficultyEngine.resetEngine(1);

// Game 1
let game1 = DifficultyEngine.processGameResult(100, 10);
console.log("Game 1:", game1);

// Game 2
let game2 = DifficultyEngine.processGameResult(90, 8);
console.log("Game 2:", game2);

// Game 3 → should level up
let game3 = DifficultyEngine.processGameResult(95, 5);
console.log("Game 3:", game3);

// Games 4-6 → should level down
let game4 = DifficultyEngine.processGameResult(30, 25);
console.log("Game 4:", game4);

let game5 = DifficultyEngine.processGameResult(20, 28);
console.log("Game 5:", game5);

let game6 = DifficultyEngine.processGameResult(40, 22);
console.log("Game 6:", game6);