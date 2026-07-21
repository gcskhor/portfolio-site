import AboutMe from "./apps/AboutMe";
import Folder from "./apps/Folder";
import Portfolio from "./apps/Portfolio";

export type App = {
  title: string;
  id: string;
  component: React.ComponentType<{
    app: App;
    onOpenApp: (app: App) => void;
  }>;
  icon: string;
  containsApps?: App[];
};

export const APPS: App[] = [
  { title: "About Me", id: "am", component: AboutMe, icon: "😂" },
  { title: "Portfolio", id: "pf", component: Portfolio, icon: "🥹" },
  { title: "Terminal", id: "term", component: AboutMe, icon: "🖥️" },
  { title: "Files", id: "files", component: Portfolio, icon: "📁" },
  { title: "Browser", id: "browser", component: AboutMe, icon: "🌐" },
  {
    title: "Projects",
    id: "projects",
    component: Folder,
    icon: "📁",
    containsApps: [
      { title: "Maps", id: "maps", component: AboutMe, icon: "🗺️" },
      {
        title: "Projects1",
        id: "projects1",
        component: Folder,
        icon: "📁",
        containsApps: [
          { title: "Maps2", id: "maps2", component: AboutMe, icon: "🗺️" },
          { title: "Clock", id: "clock", component: Portfolio, icon: "⏰" },
        ],
      },
    ],
  },
];

// flattens the array of APPS into an object for fast lookup, since folders can be nested indefinitely
function buildRegistry(apps: App[]): Record<string, App> {
  const registry: Record<string, App> = {};

  function register(app: App) {
    if (app.id in registry) throw new Error(`Duplicate app id: ${app.id}`);
    registry[app.id] = app;
    app.containsApps?.forEach(register);
  }

  apps.forEach(register);
  return registry;
}

export const APP_REGISTRY: Record<string, App> = buildRegistry(APPS);
