import {useEffect, useMemo, useState} from "react";
import "./App.css";

type Role = "patient" | "caregiver";
type Screen = "home" | "games" | "reminders" | "voice" | "call";
type Lang = "en" | "assamese";

const GAME_FILES = [
  { key: "memory", en: "Memory Match", as: "মেচ মেমৰি", file: "memory.html", emoji: "🎴", tag: "PAIRS GAME", level: "Easy" },
  { key: "pattern", en: "Pattern Recognition", as: "পেটাৰ্ণ চিনাক্তকৰণ", file: "pattern.html", emoji: "🔮", tag: "WHAT COMES NEXT?", level: "Easy" },
  { key: "routine", en: "Routine Recall", as: "ৰুটিন ৰিকল", file: "routine.html", emoji: "📋", tag: "ORDER THE DAY", level: "Easy" },
] as const;

function formatTime() {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

let currentAudio: HTMLAudioElement | null = null;

function playAudioBySrc(src: string) {
  try {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(src);
    currentAudio.volume = 1;
    currentAudio.currentTime = 0;

    const p = currentAudio.play();
    if (p && typeof (p as any).catch === "function") (p as any).catch(() => {});
  } catch {
    // ignore
  }
}


export default function App() {
  const [role, setRole] = useState<Role>("patient");
  const [screen, setScreen] = useState<Screen>("home");
  const [lang, setLang] = useState<Lang>("en");

  const [time, setTime] = useState(formatTime);
  const [activeGameFile, setActiveGameFile] = useState<string | null>(null);

  // Update time for the “status bar” like the sample
  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime()), 20_000);
    return () => window.clearInterval(id);
  }, []);

  const t = useMemo(() => {
    const dict = {
      en: {
        back: "Back",
        dashboard: "Dashboard",
        caregiver: "Caregiver",
        chooseGame: "Choose a game to play",
        playGames: "Play Games",
        home: "Home",
        games: "Games",
        reminders: "Remind",
        voice: "Voice",
        call: "Call",
        caregiverDashTitle: "Caregiver Dashboard",
        caregiverSub: "Demo: add your charts/cards later",
        switchToPatient: "Switch to Patient View",

        language: "Language",
        english: "English",
        assamese: "Assamese",

        // home cards
        remindersTitle: "My Reminders",
        remindersSub: "Medicine & tasks",
        voiceTitle: "Voice Assistant",
        voiceSub: "Ask and respond",
        callTitle: "Call Family",
        callSub: "Tap a name to call",

        // game overlay
        backToHome: "Back to Home",
      },
      assamese: {
        back: "পিছলৈ",
        dashboard: "ডেশব'ৰ্ড",
        caregiver: "মগাই",
        chooseGame: "খেলা এটা বাচি লওঁক",
        playGames: "খেলা খেলক",
        home: "হোম",
        games: "খেলা",
        reminders: "মনত ৰাখক",
        voice: "ভয়চ",
        call: "কল",
        caregiverDashTitle: "মগাই ডেশব'ৰ্ড",
        caregiverSub: "ডেম’ : পাছত আপোনাৰ কাৰ্ড/চাৰ্ট যোগ কৰক",
        switchToPatient: "পেছেন্টলৈ সলনি কৰক",

        language: "ভাষা",
        english: "ইংৰাজী",
        assamese: "অসমীয়া",

        remindersTitle: "মোৰ মনত",
        remindersSub: "মেডিচিন আৰু কাম",
        voiceTitle: "ভয়চ সহায়",
        voiceSub: "প্ৰশ্ন কৰক আৰু উত্তৰ পাওক",
        callTitle: "পৰিয়ালক কল কৰক",
        callSub: "নাম এটাত টেপ কৰক",

        backToHome: "হোমলৈ ঘূৰি যাওক",
      },
    } as const;

    return dict[lang];
  }, [lang]);

  const go = (next: Screen) => {
    playAudioBySrc("/audio/choose-to-play.mp3");
    setActiveGameFile(null);
    setScreen(next);
  };

  const openGameInShell = (file: string) => {
    playAudioBySrc("/audio/choose-to-play.mp3");
    setActiveGameFile(file);
    setScreen("games");
  };

  const toggleRole = () => {
    playAudioBySrc("/audio/choose-to-play.mp3");
    setRole((r) => (r === "patient" ? "caregiver" : "patient"));
    setActiveGameFile(null);
    setScreen("home");
  };

  const TopStatusBar = () => {
    return (
      <div
        className="statusBar"
        style={{
          background: "white",
        }}
      >
        <span className="statusTime">{time}</span>

        <button
  className="statusBrandLink"
  onClick={() => go("home")}
  type="button"
>
  CogniSaathi
</button>


        <div className="statusRight">
          <button className="miniPill" onClick={toggleRole}>
            {t.caregiver}
          </button>
        </div>
      </div>
    );
  };

  const LanguageRow = () => {
    return (
      <div className="langRow">
        <div className="langLabel">{t.language}</div>
        <div className="langButtons">
          <button
            className={"langBtn " + (lang === "en" ? "active" : "")}
            onClick={() => {
              playAudioBySrc("/audio/choose-to-play.mp3");
              setLang("en");
            }}
          >
            {t.english}
          </button>
          <button
            className={"langBtn " + (lang === "assamese" ? "active" : "")}
            onClick={() => {
              playAudioBySrc("/audio/choose-to-play.mp3");
              setLang("assamese");
            }}
          >
            {t.assamese}
          </button>
        </div>
      </div>
    );
  };

  const BottomNav = () => {
    const navItems: { key: Screen; label: string; emoji: string }[] = [
      { key: "home", label: t.home, emoji: "🏠" },
      { key: "games", label: t.games, emoji: "🎮" },
      { key: "reminders", label: t.reminders, emoji: "🔔" },
      { key: "voice", label: t.voice, emoji: "🎤" },
      { key: "call", label: t.call, emoji: "📞" },
    ];

    return (
      <nav className="bottomNav">
        {navItems.map((it) => {
          const active = screen === it.key && !activeGameFile;
          return (
            <button
              key={it.key}
              className={"navItem " + (active ? "active" : "")}
              onClick={() => go(it.key)}
            >
              <div className="navEmoji">{it.emoji}</div>
              <div className="navLabel">{it.label}</div>
            </button>
          );
        })}
      </nav>
    );
  };

  const Home = () => {
    return (
      <div className="content">
        <div className="cardShell">
          <LanguageRow />

          <div className="homeHeader">
            <div className="homeIcon">🌿</div>
            <div>
              <div className="homeTitle">Good Evening</div>
              <div className="homeSub">What would you like to do?</div>
            </div>
          </div>

          <h2 className="homeSectionTitle">{t.playGames}</h2>

          <div className="grid3">
            <button className="homeTile" onClick={() => go("reminders")}>
              <div className="tileEmoji">💊</div>
              <div className="tileTitle">{t.remindersTitle}</div>
              <div className="tileSub">{t.remindersSub}</div>
            </button>

            <button className="homeTile" onClick={() => go("voice")}>
              <div className="tileEmoji">🎙️</div>
              <div className="tileTitle">{t.voiceTitle}</div>
              <div className="tileSub">{t.voiceSub}</div>
            </button>

            <button className="homeTile" onClick={() => go("call")}>
              <div className="tileEmoji">📱</div>
              <div className="tileTitle">{t.callTitle}</div>
              <div className="tileSub">{t.callSub}</div>
            </button>
          </div>

          <div className="primaryWideRow">
            <button className="homeTile" onClick={() => openGameInShell("select")}>
  <div className="tileEmoji">🎴</div>
  <div className="tileTitle">Play Games</div>
  <div className="tileSub">{t.chooseGame}</div>
</button>

          </div>

          <div className="miniHint">Demo cards are clickable; games load inside phone shell via iframe.</div>
        </div>
      </div>
    );
  };

  const Games = () => {
    return (
      <div className="content">
        <div className="cardShell">
          <div className="gamesTopRow">
            <button className="backLink" onClick={() => go("home")}>
              ← {t.backToHome}
            </button>
            <div className="pillTitle">{t.chooseGame}</div>
          </div>

          {activeGameFile === null || activeGameFile === "select" ? (
            <>
              <div className="streakCard">
                <div className="flame">🔥</div>
                <div className="streakMid">
                  <div className="streakTitle">5-Day Streak!</div>
                  <div className="streakSub">You played every day this week</div>
                </div>
                <div className="streakRight">
                  <div className="streakNum">12</div>
                  <div className="streakNumSub">games</div>
                </div>
              </div>

              <div className="gameCards">
                {GAME_FILES.map((g) => (
                  <button
                    key={g.key}
                    className="gameCard"
                    onClick={() => openGameInShell(g.file)}
                  >
                    <div className="gameCardLeft">
                      <div className="gameCardEmoji">{g.emoji}</div>
                    </div>
                    <div className="gameCardMid">
                      <div className="gameCardTag">{g.tag}</div>
                      <div className="gameCardTitle">{lang === "en" ? g.en : g.as}</div>
                      <div className="gameCardLevel">
                        <span className="levelPill">{g.level}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="iframeWrap">
              <div className="iframeHeader">
                <div className="iframeTitle">
                  {GAME_FILES.find((x) => x.file === activeGameFile)?.emoji}{" "}
                  {GAME_FILES.find((x) => x.file === activeGameFile)
                    ? lang === "en"
                      ? GAME_FILES.find((x) => x.file === activeGameFile)!.en
                      : GAME_FILES.find((x) => x.file === activeGameFile)!.as
                    : ""}
                </div>
              </div>

              {/* Load game inside the shell (this fixes phone issues from full navigation) */}
              <iframe
                className="gameIframe"
                title="game"
                src={`/games/${activeGameFile}`}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const PlaceholderScreen = ({ title }: { title: string }) => {
    return (
      <div className="content">
        <div className="cardShell">
          <h2 className="bigTitle">{title}</h2>
          <p className="mutedP">Demo screen. Replace this with your real component later.</p>
          <button className="primaryBtn" onClick={() => go("home")}>
            ← {t.backToHome}
          </button>
        </div>
      </div>
    );
  };

  const Caregiver = () => {
    return (
      <div className="content">
        <div className="cardShell">
          {/* This is the red-circled style header look: back button + top header + bottom nav */}
          <LanguageRow />

          <div className="careHeader">
            <button className="backLink" onClick={toggleRole}>
              ← {t.switchToPatient}
            </button>

            <div className="careTitleWrap">
              <div className="careTitle">{t.caregiverDashTitle}</div>
              <div className="careSub">{t.caregiverSub}</div>
            </div>
          </div>

          <div className="careCards">
            <div className="statCard">
              <div className="statTop">Today’s Progress</div>
              <div className="statBig">2 / 9</div>
              <div className="statBar">
                <div className="statFill" style={{ width: "22%" }} />
              </div>
            </div>

            <div className="tagRow">
              <span className="tagPill">Medicine</span>
              <span className="tagPill">Hydration</span>
              <span className="tagPill">Activity</span>
              <span className="tagPill">Appointment</span>
            </div>

            <div className="simpleList">
              <div className="listItem">
                <div className="listIcon">💊</div>
                <div>
                  <div className="listTitle">Morning Medicine</div>
                  <div className="listSub">2 tablets with water</div>
                </div>
                <div className="listCheck">✓</div>
              </div>

              <div className="listItem">
                <div className="listIcon">🚶</div>
                <div>
                  <div className="listTitle">Morning Walk</div>
                  <div className="listSub">15 minutes, gentle pace</div>
                </div>
                <div className="listCheck">✓</div>
              </div>

              <div className="listItem">
                <div className="listIcon">💧</div>
                <div>
                  <div className="listTitle">Drink Water</div>
                  <div className="listSub">1 glass (250ml)</div>
                </div>
                <div className="listCheck">✓</div>
              </div>
            </div>
          </div>

          <button className="primaryBtn" onClick={() => toggleRole()}>
            ← {t.switchToPatient}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="phoneShell">
      <TopStatusBar />

      {role === "caregiver" ? (
        <>
          <Caregiver />
          <BottomNav />
        </>
      ) : (
        <>
          {screen === "home" && <Home />}
          {screen === "games" && <Games />}
          {screen === "reminders" && <PlaceholderScreen title={t.remindersTitle} />}
          {screen === "voice" && <PlaceholderScreen title={t.voiceTitle} />}
          {screen === "call" && <PlaceholderScreen title={t.callTitle} />}
          <BottomNav />
        </>
      )}
    </div>
  );
}
