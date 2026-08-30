import {useEffect, useMemo, useState} from "react";
import "./App.css";

type Role = "patient" | "caregiver";
type Screen = "home" | "games" | "reminders" | "voice" | "call";
type Lang = "en" | "assamese";

const GAME_FILES = [
  { key: "memory", en: "Memory Match", as: "মেচ মেমৰি", file: "memory.html", emoji: "🎴", tagEn: "PAIRS GAME", tagAs: "যোৰ মিলোৱা খেল", levelEn: "Easy", levelAs: "সহজ" },
{ key: "pattern", en: "Pattern Recognition", as: "পেটাৰ্ণ চিনাক্তকৰণ", file: "pattern.html", emoji: "🔮", tagEn: "WHAT COMES NEXT?", tagAs: "ইয়াৰ পিছত কি আহিব?", levelEn: "Easy", levelAs: "সহজ" },
{ key: "routine", en: "Routine Recall", as: "ৰুটিন ৰিকল", file: "routine.html", emoji: "📋", tagEn: "ORDER THE DAY", tagAs: "দিনটোৰ ক্ৰম", levelEn: "Easy", levelAs: "সহজ" },
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
        streakTitle: "5-Day Streak!",
        streakSub: "You played every day this week",
        gamesPlayedLabel: "games",
        lostStreak: "Oh no! You lost the streak",

        language: "Language",
        english: "English",
        assamese: "Assamese",

        // home cards
        remindersTitle: "My Reminders",
        remindersSub: "Medicine & tasks",
        voiceTitle: "Voice Assistant",
        voiceSub: "Ask and respond",
        goodMorning: "Good Morning",
        goodAfternoon: "Good Afternoon",
        goodEvening: "Good Evening",
        sleepingTime: "It's sleeping time",
        whatWouldYouLike: "What would you like to do?",
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
        streakTitle: "৫ দিনৰ ধাৰাবাহিকতা!",
        streakSub: "আপুনি এই সপ্তাহত প্ৰতিদিনে খেলিছে",
        gamesPlayedLabel: "খেল",
        lostStreak: "অ' নহয়! আপোনাৰ ধাৰাবাহিকতা ভাঙি গ'ল",

        language: "ভাষা",
        english: "ইংৰাজী",
        assamese: "অসমীয়া",

        
        remindersTitle: "মোৰ মনত",
        remindersSub: "মেডিচিন আৰু কাম",
        goodMorning: "সুপ্ৰভাত",
        goodAfternoon: "শুভ দুপৰীয়া",
        goodEvening: "শুভ সন্ধিয়া",
        sleepingTime: "এতিয়া শোৱাৰ সময়",
        whatWouldYouLike: "আপুনি কি কৰিব বিচাৰে?",
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
              
<div className="homeTitle">
  {(() => {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) return t.goodMorning;
    if (hour >= 12 && hour < 17) return t.goodAfternoon;
    if (hour >= 17 && hour < 22) return t.goodEvening;
    return t.sleepingTime;
  })()}
</div>

<div className="homeSub">{t.whatWouldYouLike}</div>
            </div>

          </div>


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

  <button className="homeTile" onClick={() => openGameInShell("select")}>
    <div className="tileEmoji">🎴</div>
    <div className="tileTitle">{t.playGames}</div>
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
                  <div className="streakTitle">{t.streakTitle}</div>
                    <div className="streakSub">{t.streakSub}</div>
                </div>
                <div className="streakRight">
                  <div className="streakNum">12</div>
                  <div className="streakNumSub">{t.gamesPlayedLabel}</div>
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
                      <div className="gameCardTag">{lang === "en" ? g.tagEn : g.tagAs}</div>
                      <div className="gameCardTitle">{lang === "en" ? g.en : g.as}</div>
                      <div className="gameCardLevel">
                        <span className="levelPill">{lang === "en" ? g.levelEn : g.levelAs}</span>
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
                src={`/games/${activeGameFile}?lang=${lang}`}
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
  }

  const Caregiver = () => {
    const gameResults = JSON.parse(
      localStorage.getItem("gameResults") || "[]"
    );

    const totalGames = gameResults.length;

    const averageScore =
      totalGames > 0
        ? Math.round(
            gameResults.reduce(
              (sum: number, result: any) =>
                sum + Number(result.score || 0),
              0
            ) / totalGames
          )
        : 0;

    const averageTime =
      totalGames > 0
        ? Math.round(
            gameResults.reduce(
              (sum: number, result: any) =>
                sum + Number(result.time || 0),
              0
            ) / totalGames
          )
        : 0;

    const minutes = Math.floor(averageTime / 60);
    const seconds = averageTime % 60;

    return (
      <div className="content">
        <div className="cardShell">

          <LanguageRow />

          <div className="careHeader">
            <button
              className="backLink"
              onClick={toggleRole}
            >
              ← {t.switchToPatient}
            </button>

            <div className="careTitleWrap">
              <div className="careTitle">
                {t.caregiverDashTitle}
              </div>

              <div className="careSub">
                Patient game performance
              </div>
            </div>
          </div>

          {/* =========================
              REAL GAME STATISTICS
          ========================== */}

          <div className="careCards">

            <div className="statCard">
              <div className="statTop">
                Games Played
              </div>

              <div className="statBig">
                {totalGames}
              </div>

              <div className="statSub">
                Completed cognitive games
              </div>
            </div>

            <div className="statCard">
              <div className="statTop">
                Average Score
              </div>

              <div className="statBig">
                {averageScore}%
              </div>

              <div className="statSub">
                Across all games
              </div>
            </div>

            <div className="statCard">
              <div className="statTop">
                Average Time
              </div>

              <div className="statBig">
                {minutes}m {seconds}s
              </div>

              <div className="statSub">
                Average completion time
              </div>
            </div>

          </div>

          {/* =========================
              RECENT GAME RESULTS
          ========================== */}

          <div className="careSection">
            <h3>Recent Game Performance</h3>

            {totalGames === 0 ? (
              <p className="mutedP">
                No games completed yet.
              </p>
            ) : (
              <div className="simpleList">

                {gameResults
                  .slice()
                  .reverse()
                  .slice(0, 7)
                  .map((result: any, index: number) => (

                    <div
                      className="listItem"
                      key={index}
                    >

                      <div className="listIcon">
                        🎮
                      </div>

                      <div>
                        <div className="listTitle">
                          {result.game}
                        </div>

                        <div className="listSub">
                          Score: {result.score}%
                          {" • "}
                          Time: {result.time}s
                          {" • "}
                          Level: {result.difficulty}
                        </div>

                        <div className="listSub">
                          {result.date}
                        </div>
                      </div>

                    </div>

                  ))}

              </div>
            )}
          </div>

          {/* =========================
              PERFORMANCE SUMMARY
          ========================== */}

          <div className="careSection">

            <h3>Performance Summary</h3>

            {totalGames === 0 ? (
              <p className="mutedP">
                Play a cognitive game to see performance here.
              </p>
            ) : (
              <div className="simpleList">

                <div className="listItem">
                  <div className="listIcon">
                    🧠
                  </div>

                  <div>
                    <div className="listTitle">
                      Cognitive Activity
                    </div>

                    <div className="listSub">
                      {totalGames} game
                      {totalGames !== 1 ? "s" : ""} completed
                    </div>
                  </div>
                </div>

                <div className="listItem">
                  <div className="listIcon">
                    ⭐
                  </div>

                  <div>
                    <div className="listTitle">
                      Average Score
                    </div>

                    <div className="listSub">
                      {averageScore}% across completed games
                    </div>
                  </div>
                </div>

                <div className="listItem">
                  <div className="listIcon">
                    ⏱️
                  </div>

                  <div>
                    <div className="listTitle">
                      Average Completion Time
                    </div>

                    <div className="listSub">
                      {minutes}m {seconds}s
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

          <button
            className="primaryBtn"
            onClick={toggleRole}
          >
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
