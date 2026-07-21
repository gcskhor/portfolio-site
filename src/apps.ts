import AboutMe from "./apps/AboutMe";
import Portfolio from "./apps/Portfolio";

export type App = {
  title: string;
  id: string;
  component: React.ComponentType;
  icon: string;
};

export const APPS: App[] = [
  { title: "About Me", id: "am", component: AboutMe, icon: "😂" },
  { title: "Portfolio", id: "pf", component: Portfolio, icon: "🥹" },
  { title: "Terminal", id: "term", component: AboutMe, icon: "🖥️" },
  { title: "Files", id: "files", component: Portfolio, icon: "📁" },
  { title: "Browser", id: "browser", component: AboutMe, icon: "🌐" },
  { title: "Mail", id: "mail", component: Portfolio, icon: "✉️" },
  { title: "Calendar", id: "cal", component: AboutMe, icon: "📅" },
  { title: "Notes", id: "notes", component: Portfolio, icon: "📝" },
  { title: "Music", id: "music", component: AboutMe, icon: "🎵" },
  { title: "Photos", id: "photos", component: Portfolio, icon: "🖼️" },
  { title: "Camera", id: "cam", component: AboutMe, icon: "📷" },
  { title: "Settings", id: "settings", component: Portfolio, icon: "⚙️" },
  { title: "Calculator", id: "calc", component: AboutMe, icon: "🧮" },
  { title: "Weather", id: "weather", component: Portfolio, icon: "⛅" },
  { title: "Maps", id: "maps", component: AboutMe, icon: "🗺️" },
  { title: "Clock", id: "clock", component: Portfolio, icon: "⏰" },
  { title: "Games", id: "games", component: AboutMe, icon: "🎮" },
  { title: "Contacts", id: "contacts", component: Portfolio, icon: "👥" },
  { title: "Store", id: "store", component: AboutMe, icon: "🛍️" },
  { title: "Trash", id: "trash", component: Portfolio, icon: "🗑️" },
];
