import { APPS, type App as AppType } from "./apps";
import DesktopApp from "./DesktopApp";

export default function Desktop({
  onOpenApp,
}: {
  onOpenApp: (app: AppType) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        height: "100vh",
        gap: "16px",
        justifyContent: "start",
        gridAutoFlow: "column",
        gridAutoColumns: "80px",
        gridTemplateRows: "repeat(auto-fill, 80px)",
      }}
    >
      {APPS.map((app) => (
        <DesktopApp key={app.id} app={app} onOpenApp={onOpenApp} />
      ))}
    </div>
  );
}
