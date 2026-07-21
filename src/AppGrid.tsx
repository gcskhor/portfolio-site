import { type App as AppType } from "./apps";
import AppIcon from "./AppIcon";

export default function AppGrid({
  apps,
  onOpenApp,
}: {
  onOpenApp: (app: AppType) => void;
  apps: AppType[];
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
      {apps.map((app) => (
        <AppIcon key={app.id} app={app} onOpenApp={onOpenApp} />
      ))}
    </div>
  );
}
