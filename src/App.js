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


  const handleNoCatClick = () => {

    // Determine direction based on horizontal movement
    //setNoPos({ x: newX, y: newY });
    setNoText(noTextOptions[Math.floor(Math.random() * noTextOptions.length)]);
    setYesText(yesTextOptions[Math.floor(Math.random() * yesTextOptions.length)]);
    setSubText(subtextOptions[Math.floor(Math.random() * subtextOptions.length)]);
    //setYesCatSize(yesCatSize + 10);
    //setYesPos({ x: yesPos.x - 10, y: yesPos.y - 10 }); // Move yes cat slightly to the right
    
    setTimeout(() => {
      setYesText("");
      setNoText("");
    }, 3000);
    
    setNoClickCounts(noClickCounts + 1);
  }

  return (
    <div className="App">
      <header className="App-header">
      <div style={{ backgroundColor: "#f3b4b4", height: "100vh", width: '100%', position: "relative", overflow: "hidden" }}>
      <div style={{ textAlign: 'center', backgroundColor: '#ffffff', color: 'black', fontSize: 20, fontWeight: 'bold', padding: 30, margin: 30, borderRadius: 5}}>
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
          display: "flex",
          justifyContent: "center", // Center the cats horizontally
          alignItems: "center" // Center the cats vertically
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {yesText && (
          <div
            style={{
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

        <div style={{ display: "flex", marginLeft: 50, flexDirection: "column", alignItems: "center" }}>
          {noText && (
            <div
               style={{
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
              {noText}
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
            onClick={handleNoCatClick}
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
