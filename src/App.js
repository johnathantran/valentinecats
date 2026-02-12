import './App.css';
import { useRef, useState } from "react";
import orangeCatSitting from "./images/orangeCatSitting.png";
import dirtyCat from "./images/dirtyCat.png";

const CAT_SIZE = 140;

function App(props) {

  const areaRef = useRef(null);
  const [yesCatSize, setYesCatSize] = useState(140);
  const [noClickCounts, setNoClickCounts] = useState(0)
  const [yesPos, setYesPos] = useState({ x: 10, y: 140 });
  const [noPos, setNoPos] = useState({ x: 200, y: 140 });
  const [noFacing, setNoFacing] = useState("right"); // "left" | "right"
  const [yesText, setYesText] = useState("");
  const [noText, setNoText] = useState("");
  const [subText, setSubText] = useState("");

  const yesTextOptions = ["Pick me!", "Over here!", "Meow pick me!"];
  const noTextOptions = ["go away", "i'm actually gonna bite you", "HISS", "leave me alone", "meow I hate you", "f off"];
  const subtextOptions = ["(just pick yes)", "(why tho?)", "(no is not the answer)", "(pls pick yes)"];


  const moveNoCat = () => {

    const area = areaRef.current;

    if (!area) return;
 
    const rect = area.getBoundingClientRect();
    const padding = 10;
    const maxX = Math.max(padding, rect.width - CAT_SIZE - padding);
    const maxY = Math.max(padding, rect.height - (CAT_SIZE + 60) - padding);
    const newX = Math.floor(Math.random() * (maxX - padding + 1)) + padding;
    const newY = Math.floor(Math.random() * (maxY - padding + 1)) + padding;

    // Determine direction based on horizontal movement
    //setNoPos({ x: newX, y: newY });
    setNoText(noTextOptions[Math.floor(Math.random() * noTextOptions.length)]);
    setYesText(yesTextOptions[Math.floor(Math.random() * yesTextOptions.length)]);
    setSubText(subtextOptions[Math.floor(Math.random() * subtextOptions.length)]);
    //setYesCatSize(yesCatSize + 10);
    //setYesPos({ x: yesPos.x - 10, y: yesPos.y - 10 }); // Move yes cat slightly to the right
    /*
    setTimeout(() => {
      setNoText("");
    }, 1500);
    */
    setNoClickCounts(noClickCounts + 1);
  }

  return (
    <div className="App">
      <header className="App-header">
      <div maxWidth="xl" style={{ backgroundColor: "#f3b4b4", height: "100vh", position: "relative", overflow: "hidden" }}>
      <div className={props.fixedHeightdiv} style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', padding: 30, marginTop: 1 }}>
        dana, will you be my valentine? <span style={{ fontSize: "1.5rem" }}>❤️</span>
        <br />
        <br />
        pick a cat 🐱 for your answer
      </div>
      <div
        ref={areaRef}
        style={{
          position: "relative",
          height: 520,
          marginTop: 100,
          borderRadius: 12,
          overflow: "visible", // changed from "hidden" to "visible"
          left: yesPos.x,
          top: yesPos.y
        }}

      >
        <div style={{ position: "absolute", left: 80, top: 120, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {yesText && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                bottom: CAT_SIZE + 80, // bumped up from CAT_SIZE + 24
                transform: "translateX(-50%)",
                minWidth: 60,
                maxWidth: 120,
                padding: "8px 12px",
                background: "#fff",
                borderRadius: 16,
                border: "2px solid #eee",
                divShadow: "0 2px 8px rgba(0,0,0,0.08)",
                fontSize: 18,
                color: "#333",
                zIndex: 2,
                whiteSpace: "pre-line"
              }}
            >
              {yesText}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "100%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: "12px solid #fff",
                }}
              />
            </div>
          )}
          <img height={yesCatSize} width={yesCatSize} src={orangeCatSitting} alt="Yes Cat" />
          <button
            style={{ fontSize: 30, marginTop: 1, backgroundColor: '#d13333', borderRadius: 4, px: 3, py: 1, color: '#ffffff'}}
            onClick={() => alert("Yay! Happy Valentine's Day! ❤️")}
          >
            Yes
          </button>
        </div>

        <div style={{
          position: "relative", display: "flex", flexDirection: "column", alignItems: "center", position: "absolute",
          left: noPos.x,
          top: noPos.y
          }}
        >
            {noText && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: CAT_SIZE + 80, // bumped up from CAT_SIZE + 24
                  transform: "translateX(-50%)",
                  minWidth: 60,
                  maxWidth: 120,
                  padding: "8px 12px",
                  background: "#fff",
                  borderRadius: 16,
                  border: "2px solid #eee",
                  divShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  fontSize: 18,
                  color: "#333",
                  zIndex: 2,
                  whiteSpace: "pre-line",
                }}
              >
                {noText}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "100%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderTop: "12px solid #fff",
                  }}
                />
              </div>
            )}
            <img
              height={CAT_SIZE}
              width={CAT_SIZE}
              src={dirtyCat}
              alt="No Cat"
            />
              <button
                style={{ fontSize: 15, marginTop: 1, backgroundColor: '#adabab', borderRadius: 4, px: 3, py: 1, color: '#ffffff'}}
                onClick={moveNoCat}
              >
                No
              </button>
          </div>
      </div>
      {
          noClickCounts > 0 &&
          <div className={props.fixedHeightdiv} style={{ p: 1, mt: 1, textAlign: 'center',  fontStyle: 'italic' }}>
            {subText}
          </div>
        }
      </div>
      </header>
    </div>
  );
}

export default App;
