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
    <div className="grid h-full w-full auto-cols-[80px] grid-flow-col grid-rows-[repeat(auto-fill,80px)] justify-start gap-4">
      {apps.map((app) => (
        <AppIcon key={app.id} app={app} onOpenApp={onOpenApp} />
      ))}
    </div>
  );
}
