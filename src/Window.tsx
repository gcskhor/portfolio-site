import { useRef, useState } from "react";
import { type Position, type Size } from "./types";

type WindowProps = {
  id: string;
  title: string;
  pos: Position;
  size: Size;
  onMove: (id: string, pos: Position) => void;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  onResize: (id: string, size: Size) => void;
  children: React.ReactNode;
  zIndex: number;
};

export default function Window({
  id,
  title,
  pos,
  size,
  onMove,
  onFocus,
  onClose,
  onResize,
  children,
  zIndex,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const pointerOffset = useRef<Position>({ x: 0, y: 0 });
  const resizeOffset = useRef<Position>({ x: 0, y: 0 });

  function handleFocus() {
    onFocus(id);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(true);
    handleFocus();
    e.currentTarget.setPointerCapture(e.pointerId);
    pointerOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    onMove(id, {
      x: e.clientX - pointerOffset.current.x,
      y: e.clientY - pointerOffset.current.y,
    });
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  }

  function handleCloseWindow() {
    onClose(id);
  }

  function handleResizeDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    resizeOffset.current = {
      x: e.clientX - size.w,
      y: e.clientY - size.h,
    };
  }

  function handleResizeMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    if (size.h < 70) return;
    if (size.w < 100) return;
    onResize(id, {
      w: Math.max(100, e.clientX - resizeOffset.current.x),
      h: Math.max(70, e.clientY - resizeOffset.current.y),
    });
  }

  function handleResizeUp(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  return (
    <>
      {
        <div
          className="border-window-border bg-window-body shadow-window absolute top-0 left-0 flex flex-col overflow-hidden rounded-md border"
          style={{
            transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
            width: size.w,
            height: size.h,
            zIndex: zIndex,
          }}
          onMouseDown={handleFocus}
        >
          <div
            className={`border-divider bg-title-bar flex h-8 touch-none items-center justify-between border-b px-2 select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerDown={handlePointerDown}
          >
            <span className="text-heading truncate">{title}</span>
            <div
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleCloseWindow}
              className="text-muted cursor-pointer font-mono select-none"
            >
              [X]
            </div>
          </div>
          <div className="text-fg flex-1 overflow-auto p-2">{children}</div>
          <div
            className="absolute right-0 bottom-0 h-4 w-4 cursor-nwse-resize touch-none bg-[linear-gradient(135deg,transparent_50%,var(--muted)_50%)]"
            onPointerDown={handleResizeDown}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeUp}
          ></div>
        </div>
      }
    </>
  );
}
