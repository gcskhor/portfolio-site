import { useRef, useState } from "react";

import "./App.css";

function App() {
  const [boxPos, setBoxPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const pointerOffset = useRef({ x: 0, y: 0 });

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(true);
    console.log("clientPos", e.clientX, e.clientY);
    console.log("boxPos", boxPos.x, boxPos.y);
    e.currentTarget.setPointerCapture(e.pointerId);
    pointerOffset.current = {
      x: e.clientX - boxPos.x, // pointer position minus box position
      y: e.clientY - boxPos.y,
    };
    console.log(
      "pointerOffset",
      pointerOffset.current.x,
      pointerOffset.current.y,
    );
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setBoxPos({
      x: e.clientX - pointerOffset.current.x,
      y: e.clientY - pointerOffset.current.y,
    });
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  }

  return (
    <>
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: `translate3d(${boxPos.x}px, ${boxPos.y}px, 0)`,
            width: 200,
            height: 120,
            background: "#4a5568",
            borderRadius: 6,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div
            style={{
              height: 32,
              flex: 1,
              alignItems: "start",
              userSelect: "none",
              touchAction: "none",
            }}
          >
            My Window
          </div>
          <div style={{/* content */}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
