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
      className="flex cursor-pointer flex-col items-center text-center"
      onDoubleClick={() => {
        onOpenApp(app);
      }}
    >
      <div className="text-[42px] leading-none">{app.icon}</div>
      <div>{app.title}</div>
    </div>
  );
}
