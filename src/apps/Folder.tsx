import AppGrid from "../AppGrid";
import { type App as AppType } from "../apps";

export default function Folder({
  app,
  onOpenApp,
}: {
  app: AppType;
  onOpenApp: (app: AppType) => void;
}) {
  let containedApps: AppType[] = [];

  if (app.containsApps && app.containsApps.length > 0) {
    containedApps = app.containsApps;
  }

  return <AppGrid apps={containedApps} onOpenApp={onOpenApp}></AppGrid>;
}
