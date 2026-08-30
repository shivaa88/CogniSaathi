

// ======================================================
// SHARED GAME UI TRANSLATION
// English <-> Assamese
// Numbers remain 0-9
// ======================================================

const gameParams = new URLSearchParams(window.location.search);
const gameLang = gameParams.get("lang") || "en";

if (gameLang === "assamese") {

    const exactTranslations = {

        // ---------- GENERAL ----------
        "Choose Difficulty": "কঠিনতাৰ স্তৰ বাছনি কৰক",
        "Easy": "সহজ",
        "Medium": "মধ্যম",
        "Hard": "কঠিন",

        "Score": "স্ক'ৰ",
        "Correct": "শুদ্ধ",
        "Attempts": "চেষ্টা",
        "Moves": "চাল",
        "Time": "সময়",
        "Pairs": "যোৰ",

        "Ready": "সাজু",

        "Restart Game": "খেল পুনৰ আৰম্ভ কৰক",
        "🔄 Restart Game": "🔄 খেল পুনৰ আৰম্ভ কৰক",

        "Play Again": "আকৌ খেলক",
        "Play Again ↻": "আকৌ খেলক ↻",
        "🔄 Play Again": "🔄 আকৌ খেলক",

        // ---------- ROUTINE ----------
        "Routine Recall": "দৈনন্দিন ক্ৰম মনত পেলোৱা",

        "Remember the Routine":
            "দৈনন্দিন ক্ৰমটো মনত ৰাখক",

        "Remember this routine":
            "এই ক্ৰমটো মনত ৰাখক",

        "What happened during the routine?":
            "দৈনন্দিন ক্ৰমটোত কি ঘটিছিল?",

        "Take your time and remember the order.":
            "সময় লৈ কামবোৰৰ ক্ৰমটো মনত ৰাখক।",

        "I'm Ready →":
            "মই সাজু →",

        "Question":
            "প্ৰশ্ন",

        "What happened first?":
            "প্ৰথমে কি ঘটিছিল?",

        "What happened last?":
            "শেষত কি ঘটিছিল?",

        "Next Question →":
            "পৰৱৰ্তী প্ৰশ্ন →",

        "Routine Complete!":
            "দৈনন্দিন ক্ৰম সম্পূৰ্ণ!",

        "Great job remembering the routine.":
            "ক্ৰমটো মনত ৰখাৰ বাবে খুব ভাল।",

        "🍵 Take a moment to relax and enjoy the day 🌿":
            "🍵 অলপ জিৰণি লওক আৰু দিনটো উপভোগ কৰক 🌿",

        // ---------- MEMORY ----------
        "Memory Match":
            "স্মৃতি মিলোৱা",

        "Match the familiar symbols and strengthen memory through playful recall.":
            "চিনাকি চিহ্নবোৰ মিলাই খেলৰ মাজেৰে স্মৃতিশক্তিৰ অনুশীলন কৰক।",

        // difficulty descriptions / pair counts
        "4 pairs":
            "4 যোৰ",

        "6 pairs":
            "6 যোৰ",

        "8 pairs":
            "8 যোৰ",

        // ---------- PATTERN ----------
        "Pattern Recognition":
            "পেটাৰ্ণ চিনাক্তকৰণ",

        "Notice the pattern and choose what comes next.":
            "পেটাৰ্ণটো লক্ষ্য কৰক আৰু ইয়াৰ পিছত কি আহিব বাছনি কৰক।",

        "Simple repeating patterns":
            "সহজ পুনৰাবৃত্ত পেটাৰ্ণ",

        "Moderate symbol sequences":
            "মধ্যম প্ৰতীকৰ ক্ৰম",

        "Longer challenging patterns":
            "দীঘল আৰু কঠিন পেটাৰ্ণ",

        "What comes next?":
            "ইয়াৰ পিছত কি আহিব?",

        "Choose an answer":
            "এটা উত্তৰ বাছনি কৰক",

        "Great Job!":
            "খুব ভাল!",

        "You completed the pattern challenge.":
            "আপুনি পেটাৰ্ণৰ খেলটো সম্পূৰ্ণ কৰিলে।",

        // ---------- FOOTERS ----------
        "Inspired by Northeast India":
            "উত্তৰ-পূব ভাৰতৰ পৰা অনুপ্ৰাণিত",

        "Inspired by the rich natural and cultural heritage of North-Eastern India":
            "উত্তৰ-পূব ভাৰতৰ সমৃদ্ধ প্ৰাকৃতিক আৰু সাংস্কৃতিক ঐতিহ্যৰ পৰা অনুপ্ৰাণিত",

        "Inspired by the natural beauty and cultural traditions of North-Eastern India":
            "উত্তৰ-পূব ভাৰতৰ প্ৰাকৃতিক সৌন্দৰ্য আৰু সাংস্কৃতিক পৰম্পৰাৰ পৰা অনুপ্ৰাণিত",

        "CogniSaathi - Cognitive wellness through familiar experiences":
            "CogniSaathi - চিনাকি অভিজ্ঞতাৰ মাজেৰে মানসিক সুস্থতা",

        "CogniSaathi • Routine Recall":
            "CogniSaathi • দৈনন্দিন ক্ৰম মনত পেলোৱা"
    };


    // --------------------------------------------------
    // Handles dynamic text such as:
    // Question 1 of 5
    // 3 activities
    // 4 pairs
    // --------------------------------------------------

    function translateDynamicText(value) {

        let text = value.trim();

        if (!text) return value;


        // Exact translation first
        if (exactTranslations[text]) {
            return value.replace(
                text,
                exactTranslations[text]
            );
        }


        // Question 1 of 5
        let questionMatch =
            text.match(/^Question\s+(\d+)\s+of\s+(\d+)$/i);

        if (questionMatch) {
            return value.replace(
                text,
                `প্ৰশ্ন ${questionMatch[1]} ৰ ভিতৰত ${questionMatch[2]}`
            );
        }


        // 3 activities / 4 activities / 5 activities
        let activityMatch =
            text.match(/^(\d+)\s+activities$/i);

        if (activityMatch) {
            return value.replace(
                text,
                `${activityMatch[1]}টা কাম`
            );
        }


        // 4 pairs / 6 pairs / 8 pairs
        let pairsMatch =
            text.match(/^(\d+)\s+pairs$/i);

        if (pairsMatch) {
            return value.replace(
                text,
                `${pairsMatch[1]} যোৰ`
            );
        }


        return value;
    }


// --------------------------------------------------
    // Translate every visible text node
    // --------------------------------------------------

    function translateNode(node) {

        if (node.nodeType === Node.TEXT_NODE) {

            const original = node.nodeValue;

            const translated =
                translateDynamicText(original);

            if (translated !== original) {
                node.nodeValue = translated;
            }

            return;
        }


        if (node.nodeType !== Node.ELEMENT_NODE) {
            return;
        }


        // Don't touch JS/CSS code
        if (
            node.tagName === "SCRIPT" ||
            node.tagName === "STYLE"
        ) {
            return;
        }


        node.childNodes.forEach(child => {
            translateNode(child);
        });
    }


    // Translate current page
    function translateGamePage() {
        translateNode(document.body);
    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            translateGamePage
        );

    } else {

        translateGamePage();

    }


    // --------------------------------------------------
    // Watch for text created later by game JS
    // --------------------------------------------------

    const gameTranslationObserver =
        new MutationObserver(mutations => {

            mutations.forEach(mutation => {

                mutation.addedNodes.forEach(node => {
                    translateNode(node);
                });


                if (
                    mutation.type === "characterData" &&
                    mutation.target
                ) {
                    translateNode(mutation.target);
                }

            });

        });


    document.addEventListener(
        "DOMContentLoaded",
        () => {

            gameTranslationObserver.observe(
                document.body,
                {
                    childList: true,
                    subtree: true,
                    characterData: true
                }
            );

        }
    );


    // Browser tab title
    document.title = document.title
        .replace(
            "Routine Recall",
            "দৈনন্দিন ক্ৰম মনত পেলোৱা"
        )
        .replace(
            "Memory Match",
            "স্মৃতি মিলোৱা"
        )
        .replace(
            "Pattern Recognition",
            "পেটাৰ্ণ চিনাক্তকৰণ"
        );
