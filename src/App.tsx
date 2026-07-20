import { useRef, useState } from "react";

import "./App.css";

function App() {
  const [boxPos, setBoxPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const pointerOffset = useRef({ x: 0, y: 0 });

  const [isOpen, setIsOpen] = useState(true);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    pointerOffset.current = {
      x: e.clientX - boxPos.x, // pointer position minus box position
      y: e.clientY - boxPos.y,
    };
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

  function handleCloseWindow() {
    setIsOpen(false);
  }

  return (
    <>
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        {isOpen && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translate3d(${boxPos.x}px, ${boxPos.y}px, 0)`,
              width: 400,
              height: 300,
              background: "#4a5568",
              borderRadius: 6,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 8px",
                background: "#2d3748",
                userSelect: "none",
                touchAction: "none",
                cursor: isDragging ? "grabbing" : "grab",
              }}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerDown={handlePointerDown}
            >
              My Window
              <div
                onPointerDown={(e) => e.stopPropagation()}
                onClick={handleCloseWindow}
                style={{ userSelect: "none", cursor: "pointer" }}
              >
                [X]
              </div>
            </div>
            <div style={{ flex: 1, overflow: "auto", padding: 8 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
