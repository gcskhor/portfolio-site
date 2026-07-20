import { useRef, useState } from "react";

type WindowProps = {
  id: string;
  title: string;
  pos: { x: number; y: number };
  onMove: (id: string, pos: { x: number; y: number }) => void;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  children: React.ReactNode;
  zIndex: number;
};

export default function Window({
  id,
  title,
  pos,
  onMove,
  onFocus,
  onClose,
  children,
  zIndex,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const pointerOffset = useRef({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(true);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(true);
    onFocus(id);
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
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
            width: 400,
            height: 300,
            background: "#4a5568",
            borderRadius: 6,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: zIndex,
          }}
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
            {title}
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
        </div>
      )}
    </>
  );
}
