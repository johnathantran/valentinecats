import './App.css';
import { useRef, useState, useEffect } from "react";
import orangeCatSitting from "./images/orangeCatSitting.png";
import dirtyCat from "./images/dirtyCat.png";
import catParty from "./images/catParty.gif";
import catHissing from "./images/catHissing.png";
import loveLetter from "./images/loveLetter.gif";
import us from "./images/us.jpg";

const CAT_SIZE = 140;

function App(props) {
  const areaRef = useRef(null);
  const noCatTimerRef = useRef(null);

  const [areaWidth, setAreaWidth] = useState(0);

  const [noCatSrc, setNoCatSrc] = useState(dirtyCat);
  const [yesCatSize, setYesCatSize] = useState(140);
  const [noClickCounts, setNoClickCounts] = useState(0);
  const [shakeYes, setShakeYes] = useState(false);
  const [showScreen, setShowScreen] = useState("home"); // home, partyCat, loveLetter, openedLetter

  // cat dialogs
  const [yesText, setYesText] = useState("");
  const [noText, setNoText] = useState("");
  const [subText, setSubText] = useState("");
  const [yesTextIndex, setYesTextIndex] = useState(0);
  const [noTextIndex, setNoTextIndex] = useState(0);
  const [subTextIndex, setSubTextIndex] = useState(0);

  const yesTextOptions = ["Pick me!", "Over here!", "Meow pick me!"];
  const noTextOptions = ["HISS", "meow I hate you", "f off", "i'm literally gonna bite you"];
  const subtextOptions = ["(just pick yes)", "(no is not the answer)", "(pls pick yes)", "(girl quit playin)"];

  // measure width of the play area
  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;

    const update = () => setAreaWidth(el.getBoundingClientRect().width);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleYesCatClick = () => setShowScreen("partyCat");

  const handleNoCatClick = () => {
    // loop texts
    setYesText(yesTextOptions[yesTextIndex]);
    setYesTextIndex(i => (i + 1) % yesTextOptions.length);

    setNoText(noTextOptions[noTextIndex]);
    setNoTextIndex(i => (i + 1) % noTextOptions.length);

    setSubText(subtextOptions[subTextIndex]);
    setSubTextIndex(i => (i + 1) % subtextOptions.length);

    setShakeYes(true);

    // Grow YES cat, but stop when it would push NO cat off-screen
    const STEP = 30;
    const PADDING = 16; // must match the padding used on the area
    const MIN_GAP = 8;

    setYesCatSize(s => {
      if (!areaWidth) return s + STEP; // before measuring, just grow once

      const maxYesSize = areaWidth - (PADDING * 2) - MIN_GAP - CAT_SIZE;
      const next = s + STEP;

      // clamp to safe max (and never shrink)
      return Math.max(s, Math.min(next, maxYesSize));
    });

    // Hiss for 3 seconds (no stacked timers)
    setNoCatSrc(catHissing);
    if (noCatTimerRef.current) clearTimeout(noCatTimerRef.current);
    noCatTimerRef.current = setTimeout(() => {
      setNoCatSrc(dirtyCat);
      noCatTimerRef.current = null;
    }, 3000);

    // Clear bubbles
    setTimeout(() => {
      setYesText("");
      setNoText("");
    }, 3000);

    setNoClickCounts(c => c + 1);
  };

  useEffect(() => {
    if (!shakeYes) return;
    const t = setTimeout(() => setShakeYes(false), 450);
    return () => clearTimeout(t);
  }, [shakeYes]);

  // Keep some space between cats, but allow it to shrink
  const PADDING = 16;
  const MIN_GAP = 8;
  const MAX_GAP = 50;

  const availableForGap = areaWidth - (PADDING * 2) - yesCatSize - CAT_SIZE;
  const gap = areaWidth > 0
    ? Math.max(MIN_GAP, Math.min(MAX_GAP, availableForGap))
    : MAX_GAP;

  return (
    <div className="App">
      <div
        style={{
          backgroundColor: "#f3b4b4",
          minHeight: "100dvh",     // better than 100vh on mobile
          width: "100%",
          position: "relative",
          overflowY: "auto",       // allow vertical scroll
          overflowX: "hidden",     // prevent sideways scroll
          WebkitOverflowScrolling: "touch", // smoother iOS scrolling
        }}
      >
        <div style={{ textAlign: 'center', backgroundColor: '#ffffff', color: 'black', fontSize: 20, fontWeight: 'bold', padding: 30, margin: 30, borderRadius: 5 }}>
          {showScreen === "home" ? (
            <div>
              dana, will you be my valentine? <span style={{ fontSize: "1.5rem" }}>❤️</span>
              <br /><br />
              pick a cat 🐱 for your answer
            </div>
          ) : showScreen === "loveLetter" ? (
            <p>open the letter! <span style={{ fontSize: "1.5rem" }}>❤️</span></p>
          ) : showScreen === "openedLetter" ? (
            <p>ty for being my valentine<span style={{ fontSize: "1.5rem" }}>❤️</span></p>
          )
          : (
            <p style={{ fontSize: 30 }}>YAAAYYYYY ❤️</p>
          )}
        </div>

        {showScreen === "loveLetter" && (
          <div style={{ textAlign: 'center', color: 'black', fontSize: 20, fontWeight: 'bold', borderRadius: 5 }}>
            <br />
            <img
              height={200}
              width={200}
              src={loveLetter}
              alt="Love letter"
              style={{ cursor: "pointer" }}
              onClick={() => setShowScreen("openedLetter")}
            />
          </div>
        )}

        {showScreen === "partyCat" && (
          <div style={{ textAlign: "center" }}>
            <img height={'50%'} width={'50%'} src={catParty} alt="Party Cat" />
            <br /><br />
            <button
              style={{ fontSize: 30, marginTop: 1, backgroundColor: '#d13333', marginRight: 20, borderRadius: 4, padding: 20, color: '#ffffff' }}
              onClick={() => setShowScreen("home")}
            >
              go back
            </button>
            <button
              style={{ fontSize: 30, marginTop: 1, backgroundColor: '#d13333', borderRadius: 4, padding: 20, color: '#ffffff' }}
              onClick={() => setShowScreen("loveLetter")}
            >
              wait, click for more...
            </button>
          </div>
        )}

        {showScreen === "home" && (
          <div>
            {noClickCounts > 0 && (
              <div className={props.fixedHeightdiv} style={{ p: 1, mt: 1, textAlign: 'center', color: 'white', fontStyle: 'italic' }}>
                {subText}
              </div>
            )}

            <div
              ref={areaRef}
              style={{
                position: "relative",
                marginTop: 90,
                borderRadius: 12,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                columnGap: gap,
                padding: `0 ${PADDING}px`,
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {/* YES CAT */}
              <div
                className={shakeYes ? "shakeX" : ""}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                {yesText && (
                  <div style={{
                    minWidth: 60,
                    maxWidth: 140,
                    padding: "8px 12px",
                    background: "#fff",
                    borderRadius: 16,
                    border: "2px solid #eee",
                    fontSize: 18,
                    color: "#333",
                    zIndex: 2,
                    whiteSpace: "pre-line"
                  }}>
                    {yesText}
                  </div>
                )}
                <img
                  height={yesCatSize}
                  width={yesCatSize}
                  src={orangeCatSitting}
                  alt="Yes Cat"
                  style={{ cursor: "pointer" }}
                  onClick={handleYesCatClick}
                />
                <button
                  style={{ fontSize: 30, marginTop: 1, backgroundColor: '#d13333', borderRadius: 4, color: '#ffffff' }}
                  onClick={handleYesCatClick}
                >
                  Yes
                </button>
              </div>

              {/* NO CAT */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {noText && (
                  <div style={{
                    minWidth: 60,
                    maxWidth: 160,
                    padding: "8px 12px",
                    background: "#fff",
                    borderRadius: 16,
                    border: "2px solid #eee",
                    fontSize: 18,
                    color: "#333",
                    zIndex: 2,
                    whiteSpace: "pre-line"
                  }}>
                    {noText}
                  </div>
                )}
                <img height={CAT_SIZE} width={CAT_SIZE} src={noCatSrc} alt="No Cat" />
                <button
                  style={{ fontSize: 15, marginTop: 1, backgroundColor: '#adabab', borderRadius: 4, color: '#ffffff' }}
                  onClick={handleNoCatClick}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {showScreen === "openedLetter" && (
          <div style={{ fontSize: 15, backgroundColor: '#ffffff', textAlign: 'center', margin: 30, padding: 30, borderRadius: 5 }}>
            <img
              width={'90%'}
              src={us}
              alt="us"
              style={{ borderRadius: 12 }}
            />
            <br />
            happy valentines day! ❤️
            <br /><br />
            dana, i love you so much and i'm so excited to get engaged this year. its a big year for us and i wouldn't want to do it
            with anyone else but you. i love the life we've built together. little things like coming home to you and how excited you are
            to see me. that's probably one of my favorite times of the day. i love how you lift me up with your energy since i am such a low energy person.
            that's what you get for dating an introvert.
            <br /><br />
            i like how you take care of your snails and how they're barely alive. you're also definitely the funnier partner. it's funny when you ragebait yourself
            but you should probably stop doing that. it's also funny how you're lactose intolerant now.
            <br /><br />
            anyway, i want you to know i will always support you in your goals the way you always
            support me. thank you for making my life 10000000x better. we're gonna get married :)
            <br /><br />
            love,
            <br />
            johnathan
          </div>
        )}
      </div>
    </div>
  );
}

export default App;