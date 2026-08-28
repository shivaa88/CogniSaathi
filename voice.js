// ======================================================
// COGNISAATHI VOICE SYSTEM
// ======================================================

const VoiceSystem = {
    currentLanguage:
        localStorage.getItem("CogniSaathiLanguage") || "english",

    lastAudio: null,

    play: function (audioName) {
        this.lastAudio = audioName;

        const isGamePage = window.location.pathname.includes("/games/");
        const basePath = isGamePage ? "../audio" : "./audio";

        const audioPath =
            `${basePath}/${this.currentLanguage}/${audioName}.mp3`;

        const audio = new Audio(audioPath);

        audio.play().catch(error => {
            console.log("Audio could not be played:", error);
        });
    },

    repeat: function () {
        if (this.lastAudio) {
            this.play(this.lastAudio);
        }
    },

    setLanguage: function (language) {
        this.currentLanguage = language;

        localStorage.setItem(
            "CogniSaathiLanguage",
            language
        );
    }
};

window.VoiceSystem = VoiceSystem;
