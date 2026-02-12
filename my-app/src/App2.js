import './App.css';
import { useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import orangeCatSitting from "./images/orangeCatSitting.png";
import dirtyCat from "./images/dirtyCat.png";

const CAT_SIZE = 100;

const App = (props) => {

  const areaRef = useRef(null);
  const [noClickCounts, setNoClickCounts] = useState(0)
  const [noPos, setNoPos] = useState({ x: 420, y: 140 });
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
    setNoFacing(newX < noPos.x ? "left" : "right");
    setNoPos({ x: newX, y: newY });
    setNoText(noTextOptions[Math.floor(Math.random() * noTextOptions.length)]);
    setYesText(yesTextOptions[Math.floor(Math.random() * yesTextOptions.length)]);
    setSubText(subtextOptions[Math.floor(Math.random() * subtextOptions.length)]);

    setTimeout(() => {
      setNoText("");
    }, 1500);

    setNoClickCounts(noClickCounts + 1);
  }

  useEffect(() => {}, []);

  return (

    <Container maxWidth="xl" sx={{ backgroundColor: "#f3b4b4", height: "100vh", position: "relative", overflow: "hidden" }}>
      <Paper className={props.fixedHeightPaper} sx={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', p: 3, mt: 1 }}>
        dana, will you be my valentine? <span style={{ fontSize: "1.5rem" }}>❤️</span>
        <br />
        <br />
        pick a cat 🐱 for your answer
      </Paper>
        {
          noClickCounts > 0 &&
          <Paper className={props.fixedHeightPaper} sx={{ p: 1, mt: 1, textAlign: 'center', backgroundColor: '#f7f7f7', fontStyle: 'italic' }}>
            {subText}
          </Paper>
        }
      <div
        ref={areaRef}
        style={{
          position: "relative",
          height: 520,
          marginTop: 100,
          borderRadius: 12,
          overflow: "visible", // changed from "hidden" to "visible"
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
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
          <img height={CAT_SIZE} width={CAT_SIZE} src={orangeCatSitting} alt="Yes Cat" />
          <Button
            sx={{ fontSize: 30, marginTop: 1, backgroundColor: '#d13333', borderRadius: 4, px: 3, py: 1, color: '#ffffff'}}
            onClick={() => alert("Yay! Happy Valentine's Day! ❤️")}
          >
            Yes
          </Button>
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
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
              src={noFacing === "left" ? dirtyCat : dirtyCat}
              alt="No Cat"
            />
              <Button
                sx={{ fontSize: 15, marginTop: 1, backgroundColor: '#adabab', borderRadius: 4, px: 3, py: 1, color: '#ffffff'}}
                onClick={moveNoCat}
              >
                No
              </Button>
          </div>
      </div>
    </Container>
  );
};

export default App;