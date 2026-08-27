GAME LOGIC DESIGN
GAME 1 — MEMORY MATCH
1️⃣ Objective
Match identical pairs of cards using the fewest attempts possible.
2️⃣What happens when the game starts.
START Show instructions Display cards Player presses START Game Begins
3️⃣ Player Action
Player selects Card 1  Card flips  Player selects Card 2  Card flips
4️⃣ Decision Logic
What happens if the two cards match?
                                        Card 1 == Card 2?
                                                /           \
                                            YES       NO
                                              ↓             ↓
                                    +10 points     0 points
                                       ↓                           ↓
                      Keep cards visible            Flip cards back
                                          \                         /
                                                Next turn
                                                      ↓                           
                                          All pairs found?
                                                  /       \
                                            NO         YES
                                             ↓              ↓                           
                                    Continue     Calculate score  Save results   END
5️⃣Difficulty Levels
--Eventually make the difficulty adaptive.
--increase level if progress is +ve
Level 1                               Level 2                                   Level 3 
4 cards                                6 cards                                    8 cards
🦋 🐶                            🦋 🐶 🍎                          🦋 🐶 🍎 🚗
🦋 🐶                              🦋 🐶 🍎                           🦋 🐶 🍎 🚗 
6️⃣Decide When the Game Ends
10 questions completed
        ↓
   Calculate:            
    • Score 
    • Accuracy   Display results  Save performance  Recommend Nxt lvl
    • Time
    • Hints used 
GAME 2 — ROUTINE RECALL
1️⃣Game Objective
Remember a short sequence of everyday activities and answer questions about what happened, in what order, or what came next.
The sequence should preferably use familiar, simple activities.
2️⃣Game Setup
START  Show instructions  Show daily routine  Give player time to observe/remember  Hide routine  Ask questions
3️⃣ Player Actions
After the routine disappears, the player could receive different types of questions.
Type A — What came next?
What did you do after brushing your teeth?
Get dressed 
Have breakfast 
Leave home 
Type B — What came first?
Which activity happened first?
Have breakfast
Wake up 
Get dressed
Type C — Ordering
Give the activities in a mixed order:
Breakfast           Leave home            Wake up           Brush teeth             Get dressed
Player arranges them correctly.
4️⃣Decision Logic-  (Avoid making mistakes feel like failures)
                                       Answer
                                            ↓
                                   Is it correct?
                                      /          \
                                 YES           NO
                                  ↓                  ↓
                           +10 points       0 points
                               ↓                         ↓
                    Positive feedback    Gentle feedback
                               \                        /
                                 Next question
5️⃣Difficulty Levels
🟢 Easy - 3 activities                                      🟡 Medium- 5 activities                  
🔴 Hard - 6–7 activities + more similar-looking options.

6️⃣End Condition
For the MVP: 5 questions = 1 round
5 questions completed
        ↓
Calculate:
• Accuracy
• Score              Display result  Store performance  END
• Hints used
• Difficulty 
GAME 3 — PATTERN RECOGNITION
1️⃣Game Objective
Identify what comes next in a sequence or identify the item that does not follow a pattern.
2️⃣Game Setup
Display a sequence  ask what comes next?  give options  let the player choose
3️⃣Types of Patterns
Type A — Color
🔵🔴🔵🔴…?
Type B — Shape
● ■ ● ■ ❓
Type C — Size
small → medium → large → small → ?
Type D — Object
🍎 → 🍌 → 🍎 → 🍌 → ?
Type E — Simple numerical pattern
2 → 4 → 6 → 8 → ?
4️⃣Decision Logic
             Player answers
                    ↓
             Is answer correct?
              /           \
            YES            NO
             ↓              ↓
        +10 points       0 points         Positive feedback Next turn
5️⃣Difficulty Levels
🟢 Easy- Simple alternating pattern:
🟡 Medium-Three-element pattern:
🔴 Hard- More complex/repeating patterns:
-can also combine shape + size.
Increase difficulty by:
Adding more pattern elements 
Increasing pattern length 
Introducing a third object/color 
Making the sequence less obvious 
Reducing visual clues 
Decrease difficulty by:
Using fewer elements 
Using only two colors/shapes 
Showing a longer portion of the pattern 
Providing fewer answer choices 
6️⃣End Condition-For 5 patterns per round.
5 patterns completed  Calculate performance  Show result  Save data  Recommend next difficulty  END
COMMON SCORING SYSTEM FOR EACH GAME
Action                    
Points
Correct 
+10
Wrong 
0
Completing level
+20
For dementia-related games, don't make the scoring too punishing.
The goal should be engagement and cognitive exercise rather than making the player feel like they're failing.
COMMON ADAPTIVE LOGIC 
                     Player completes round  Calculate performance  
                  ↓                                      ↓                                            ↓
  Accuracy <50%                      Accuracy 50–79%                 Accuracy >=80%
                   ↓                                      ↓                                             ↓
Reduce difficulty /                 Keep same difficulty               Increase Difficulty
    provide hint                                                          
IF accuracy >= 80%
      difficulty = difficulty + 1
ELSE IF accuracy >= 50%
      difficulty = same
ELSE
      difficulty = difficulty - 1
What Happens When the Player Makes a Mistake
Don't design: ❌ WRONG! GAME OVER!
Do: “Good try! Let's try another one.”      Or      “Almost! Here's a hint.”
Wrong answer  Give encouraging feedback  Offer hint  Continue game