import './App.css';
import { useRef, useState, useEffect } from "react";
import orangeCatSitting from "./images/orangeCatSitting.png";
import dirtyCat from "./images/dirtyCat.png";
import catParty from "./images/catParty.gif";
import catHissing from "./images/catHissing.png";
import loveLetter from "./images/loveLetter.gif";

const CAT_SIZE = 140;

function App(props) {
  const areaRef = useRef(null);
  const noCatTimerRef = useRef(null);
  const [noCatSrc, setNoCatSrc] = useState(dirtyCat);
  const [yesCatSize, setYesCatSize] = useState(140);
  const [noClickCounts, setNoClickCounts] = useState(0);
  const [yesText, setYesText] = useState("");
  const [noText, setNoText] = useState("");
  const [subText, setSubText] = useState("");
  const [showPartyCat, setShowPartyCat] = useState(false);
  const [showNextScreen, setShowNextScreen] = useState(false);
  const [shakeYes, setShakeYes] = useState(false);

  const [showScreen, setShowScreen] = useState("home"); // options: home, partyCat, loveLetter, openedLetter

  const yesTextOptions = ["Pick me!", "Over here!", "Meow pick me!"];
  const noTextOptions = ["go away", "i'm actually gonna bite you", "HISS", "leave me alone", "meow I hate you", "f off"];
  const subtextOptions = ["(just pick yes)", "(why tho?)", "(no is not the answer)", "(pls pick yes)"];

  const handleYesCatClick = (e) => {
    setShowScreen("partyCat");
  };

  const handleNoCatClick = () => {
    setNoText(noTextOptions[Math.floor(Math.random() * noTextOptions.length)]);
    setYesText(yesTextOptions[Math.floor(Math.random() * yesTextOptions.length)]);
    setSubText(subtextOptions[Math.floor(Math.random() * subtextOptions.length)]);

    setShakeYes(true);

    // swap No cat to hissing for 3 seconds
    setNoCatSrc(catHissing);
    setTimeout(() => {
      setNoCatSrc(dirtyCat);
    }, 3000);

    setTimeout(() => {
      setYesText("");
      setNoText("");
    }, 3000);

    setNoCatSrc(catHissing);
    if (noCatTimerRef.current) clearTimeout(noCatTimerRef.current);

    noCatTimerRef.current = setTimeout(() => {
      setNoCatSrc(dirtyCat);
      noCatTimerRef.current = null;
    }, 3000);

    setNoClickCounts(c => c + 1);
  };

  useEffect(() => {
    if (!shakeYes) return;
    const t = setTimeout(() => setShakeYes(false), 450);
    return () => clearTimeout(t);
  }, [shakeYes]);

  return (
    <div className="App">
      <div style={{ backgroundColor: "#f3b4b4", height: "100vh", width: '100%', position: "relative", overflow: "hidden" }}>
        <div style={{ textAlign: 'center', backgroundColor: '#ffffff', color: 'black', fontSize: 20, fontWeight: 'bold', padding: 30, margin: 30, borderRadius: 5}}>
          {
            showScreen === "home" ?
            <div>
              dana, will you be my valentine? <span style={{ fontSize: "1.5rem" }}>❤️</span>
              <br /><br />
              pick a cat 🐱 for your answer
            </div>
            :
            showScreen === "loveLetter" ?
            <p>open the letter! <span style={{ fontSize: "1.5rem" }}>❤️</span></p>
            :
            <p style={{fontSize: 30}}>YAAAYYYYY ❤️</p>
          }
        </div>
        {
          showScreen === "loveLetter" && (
            <div style={{ textAlign: 'center', color: 'black', fontSize: 20, fontWeight: 'bold', borderRadius: 5}}>
              <img
                height={200}
                width={200}
                src={loveLetter}
                onClick={() => setShowScreen("openedLetter")}
              />
            </div>
          )
        }
        {
          showScreen === "partyCat" &&
          <div>
            <img
                height={'50%'}
                width={'50%'}
                src={catParty}
                alt="Yes Cat"
            />
            <br />
            <br />
            <button
              style={{ fontSize: 30, marginTop: 1, backgroundColor: '#d13333', marginRight: 20, borderRadius: 4, padding: 20, color: '#ffffff'}}
              onClick={() => setShowScreen("home")}
            >
              go back
            </button>
            <button
              style={{ fontSize: 30, marginTop: 1, backgroundColor: '#d13333', borderRadius: 4, padding: 20, color: '#ffffff'}}
              onClick={() => setShowScreen("loveLetter")}
            >
              wait, click for more...
            </button>
          </div>
        }
        {
          showScreen === "home" &&
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
                height: 520,
                marginTop: 100,
                borderRadius: 12,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
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
                    maxWidth: 120,
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
                />
                <button
                  style={{ fontSize: 30, marginTop: 1, backgroundColor: '#d13333', borderRadius: 4, px: 3, py: 1, color: '#ffffff'}}
                  onClick={handleYesCatClick}
                >
                  Yes
                </button>
              </div>

              {/* NO CAT */}
              <div style={{ display: "flex", marginLeft: 50, flexDirection: "column", alignItems: "center" }}>
                {noText && (
                  <div style={{
                    minWidth: 60,
                    maxWidth: 120,
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
                  style={{ fontSize: 15, marginTop: 1, backgroundColor: '#adabab', borderRadius: 4, px: 3, py: 1, color: '#ffffff'}}
                  onClick={handleNoCatClick}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        }
        {
          showScreen === "openedLetter" && (
            <div style={{ fontSize: 15, backgroundColor: '#ffffff', textAlign: 'center', margin: 30, padding: 30, borderRadius: 5}}>
              dana, i love you so much and i'm so excited to get engaged this year.
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;