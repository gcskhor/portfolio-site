import { useRef, useState } from "react";
import Window from "./Window";

import "./App.css";

type WindowState = {
  id: string;
  title: string;
  pos: { x: number; y: number };
  size: { w: number; h: number };
};

function App() {
  const [windows, setWindows] = useState<WindowState[]>([
    { id: "w1", title: "One", pos: { x: 40, y: 40 }, size: { w: 400, h: 200 } },
    {
      id: "w2",
      title: "Two",
      pos: { x: 120, y: 100 },
      size: { w: 300, h: 100 },
    },
    {
      id: "w3",
      title: "Three",
      pos: { x: 200, y: 160 },
      size: { w: 350, h: 150 },
    },
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
        size: {
          w: 400,
          h: 250,
        },
      },
    ]);
    setWindowOrder((prev) => [...prev, id]);
  }

  function handleResize(id: string, size: { w: number; h: number }) {
    setWindows((prev) => {
      return prev.map((w) => (w.id === id ? { ...w, size } : w));
    });
  }

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "clip",
        }}
      >
        <button
          onClick={() => {
            handleAddWindow(`window ${crypto.randomUUID().slice(0, 10)}`);
          }}
        >
          New Window
        </button>
        {windows.map((window) => (
          <Window
            id={window.id}
            key={window.id}
            title={window.title}
            onMove={handleMove}
            onFocus={handleFocus}
            onClose={handleClose}
            onResize={handleResize}
            pos={window.pos}
            size={window.size}
            children=<></>
            zIndex={windowOrder.indexOf(window.id)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
