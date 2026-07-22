import { type App as AppType } from "../apps";
import { useState } from "react";

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

const POS_X_OFFSET = 30;
const POS_Y_OFFSET = 30;

export function useWindows(apps: AppType[]) {
  const [windows, setWindows] = useState<WindowState[]>(
    apps.map((app) => ({
      id: app.id,
      title: app.title,
      pos: POS_DEFAULT,
      size: SIZE_DEFAULT,
    })),
  );

  const [windowOrder, setWindowOrder] = useState<string[]>(
    apps.map((app) => app.id),
  ); // last item in array is displayed on top

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

  function offsetPos(count: number): { x: number; y: number } {
    const offsetX = count * POS_X_OFFSET;
    const offsetY = count * POS_Y_OFFSET;
    return {
      x: POS_DEFAULT.x + offsetX,
      y: POS_DEFAULT.y + offsetY,
    };
  }

  function handleOpenApp(app: AppType): void {
    setWindows((prev) => {
      const target = prev.find((w) => w.id === app.id);
      if (target) return prev;
      const windowPos = offsetPos(prev.length);
      return [
        ...prev,
        {
          id: app.id,
          title: app.title,
          pos: windowPos,
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

  return {
    windows,
    windowOrder,
    handleClose,
    handleFocus,
    handleMove,
    handleOpenApp,
    handleResize,
  };
}
