import { type App } from "./apps";

export default function AppIcon({
  app,
  onOpenApp,
}: {
  app: App;
  onOpenApp: (app: App) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
      }}
      onDoubleClick={() => {
        onOpenApp(app);
      }}
    >
      <div>{app.icon}</div>
      <div>{app.title}</div>
    </div>
  );
}
