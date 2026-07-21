import { useRef, useState } from "react";

type WindowProps = {
  id: string;
  title: string;
  pos: { x: number; y: number };
  size: { w: number; h: number };
  onMove: (id: string, pos: { x: number; y: number }) => void;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  onResize: (id: string, size: { w: number; h: number }) => void;
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
  const pointerOffset = useRef({ x: 0, y: 0 });
  const resizeOffset = useRef({ x: 0, y: 0 });

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
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
            width: size.w,
            height: size.h,
            background: "#4a5568",
            borderRadius: 6,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "white",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: zIndex,
          }}
          onMouseDown={handleFocus}
        >
          <div
            style={{
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 8px",
              background: "#2d3748",
              userSelect: "none",
              touchAction: "none",
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerDown={handlePointerDown}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </span>
            <div
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleCloseWindow}
              style={{ userSelect: "none", cursor: "pointer" }}
            >
              [X]
            </div>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: 8 }}>
            {children}
          </div>
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: 16,
              height: 16,
              cursor: "nwse-resize",
              touchAction: "none",
              background:
                "linear-gradient(135deg, transparent 50%, #a0aec0 50%)",
            }}
            onPointerDown={handleResizeDown}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeUp}
          ></div>
        </div>
      }
    </>
  );
}
