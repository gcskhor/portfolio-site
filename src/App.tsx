import Window from "./Window";
import { APP_REGISTRY, APPS, type App as AppType } from "./apps";
import "./App.css";
import AppGrid from "./AppGrid";
import { useWindows } from "./hooks/useWindows";

function App() {
  const {
    windows,
    windowOrder,
    handleClose,
    handleFocus,
    handleMove,
    handleOpenApp,
    handleResize,
  } = useWindows([APPS[0]]);

  function getApp(id: string): AppType {
    const app = APP_REGISTRY[id];
    if (!app) throw new Error("App not found");
    return app;
  }

  return (
    <>
      <div className="bg-desktop-bg relative h-screen w-screen overflow-clip">
        <AppGrid apps={APPS} onOpenApp={handleOpenApp} />
        {windows.map((window) => {
          const app = getApp(window.id);
          const AppComponent = app.component;
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
              <AppComponent app={app} onOpenApp={handleOpenApp} />
            </Window>
          );
        })}
      </div>
    </>
  );
}

export default App;
