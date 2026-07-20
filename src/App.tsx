import { useRef, useState } from "react";
import Window from "./Window";

import "./App.css";

type WindowState = {
  id: string;
  title: string;
  pos: { x: number; y: number };
};

function App() {
  const [windows, setWindows] = useState<WindowState[]>([
    { id: "w1", title: "One", pos: { x: 40, y: 40 } },
    { id: "w2", title: "Two", pos: { x: 120, y: 100 } },
    { id: "w3", title: "Three", pos: { x: 200, y: 160 } },
  ]);

  const [windowOrder, setWindowOrder] = useState<string[]>(["w1", "w2", "w3"]); // last item in array is displayed on top

  function handleMove(id: string, pos: { x: number; y: number }) {
    setWindows((prev) => {
      return prev.map((w) => (w.id === id ? { ...w, pos } : w));
    });
  }

  function handleFocus(id: string) {
    setWindowOrder((prev) => [...prev.filter((x) => x !== id), id]);
  }

  function handleClose(id: string) {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setWindowOrder((prev) => prev.filter((x) => x !== id));
  }

  function handleAddWindow(title: string) {
    const id = crypto.randomUUID();
    setWindows((prev) => [
      ...prev,
      {
        id,
        pos: {
          x: 120,
          y: 100,
        },
        title,
      },
    ]);
    setWindowOrder((prev) => [...prev, id]);
  }

  return (
    <>
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        {windows.map((window) => (
          <Window
            id={window.id}
            key={window.id}
            title={window.title}
            onMove={handleMove}
            onFocus={handleFocus}
            onClose={handleClose}
            pos={window.pos}
            children=<></>
            zIndex={windowOrder.indexOf(window.id)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
