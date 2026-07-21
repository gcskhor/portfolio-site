import { useState } from "react";
import Window from "./Window";
import { APPS, type App as AppType } from "./apps";

import "./App.css";
import Desktop from "./Desktop";

type WindowState = {
  id: string;
  title: string;
  pos: { x: number; y: number };
  size: { w: number; h: number };
};

const POS_DEFAULT = {
  x: 120,
  y: 100,
};

const SIZE_DEFAULT = {
  w: 400,
  h: 250,
};

function App() {
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: APPS[0].id,
      title: APPS[0].title,
      pos: { x: 40, y: 40 },
      size: { w: 400, h: 200 },
    },
  ]);

  const [windowOrder, setWindowOrder] = useState<string[]>([APPS[0].id]); // last item in array is displayed on top

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

  function handleOpenApp(app: AppType): void {
    setWindows((prev) => {
      const target = prev.find((w) => w.id === app.id);
      if (target) return prev;
      return [
        ...prev,
        {
          id: app.id,
          title: app.title,
          pos: POS_DEFAULT,
          size: SIZE_DEFAULT,
        },
      ];
    });

    setWindowOrder((prev) => {
      const target = prev.find((wId) => wId === app.id);
      const rest = prev.filter((wId) => wId !== app.id);
      if (target) return [...rest, target];
      return [...prev, app.id];
    });
  }

  function handleResize(id: string, size: { w: number; h: number }) {
    setWindows((prev) => {
      return prev.map((w) => (w.id === id ? { ...w, size } : w));
    });
  }

  function getWindowComponent(id: string): React.ComponentType {
    const app = APPS.find((app) => app.id === id);
    if (!app) throw new Error("App not found");
    return app.component;
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
        <Desktop onOpenApp={handleOpenApp} />
        {windows.map((window) => {
          const AppComponent = getWindowComponent(window.id);
          return (
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
              zIndex={windowOrder.indexOf(window.id)}
            >
              <AppComponent />
            </Window>
          );
        })}
      </div>
    </>
  );
}

export default App;
