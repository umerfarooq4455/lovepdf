import React, { useEffect, useRef, useState } from "react";

export type FileMeta = {
  id: string;
  file: File;
  rotate?: number; // degrees
};

export default function FileCard({
  meta,
  index,
  onRemove,
  onRotate,
  onReorder,
}: {
  meta: FileMeta;
  index: number;
  onRemove: () => void;
  onRotate: (deg: number) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}) {
  const [url, setUrl] = useState<string | null>(null);
  const [isHover, setIsHover] = useState(false);
  const dragRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const u = URL.createObjectURL(meta.file);
    setUrl(u);
    return () => {
      URL.revokeObjectURL(u);
    };
  }, [meta.file]);

  // DnD handlers
  function onDragStart(e: React.DragEvent) {
    e.dataTransfer.setData("text/plain", String(index));
    e.dataTransfer.effectAllowed = "move";
    // small ghost
    const crt = document.createElement("div");
    crt.style.padding = "6px 10px";
    crt.style.background = "#fff";
    crt.style.border = "1px solid rgba(0,0,0,0.1)";
    crt.style.borderRadius = "6px";
    crt.innerText = meta.file.name;
    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(crt, 10, 10);
    setTimeout(() => document.body.removeChild(crt), 0);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const from = Number(e.dataTransfer.getData("text/plain"));
    const to = index;
    if (!isNaN(from)) onReorder(from, to);
  }

  // simple view in new tab
  function handleView() {
    if (!url) return;
    window.open(url, "_blank");
  }

  return (
    <div
      ref={dragRef}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="min-w-[200px] w-[200px] rounded-lg bg-white shadow-sm p-3 relative"
    >
      <div className="h-44 w-full bg-gray-50 rounded flex items-center justify-center overflow-hidden">
        {/* Preview: object/embed shows first page in many browsers */}
        {url ? (
          <object
            data={url}
            type="application/pdf"
            width="100%"
            height="100%"
            style={{
              transform: `rotate(${meta.rotate ?? 0}deg)`,
              transformOrigin: "center center",
            }}
          >
            <div className="text-center text-sm text-gray-500">Preview not available</div>
          </object>
        ) : (
          <div className="text-gray-400">loading…</div>
        )}
      </div>

      <div className="mt-3 text-sm text-center text-gray-700 truncate">{meta.file.name}</div>

      {/* hover controls */}
      <div
        className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity ${
          isHover ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => onRotate(90)}
          className="w-9 h-9 flex items-center justify-center bg-white shadow rounded-full border"
          title="Rotate 90°"
          aria-label="Rotate"
        >
          ↻
        </button>
        <button
          onClick={handleView}
          className="w-9 h-9 flex items-center justify-center bg-white shadow rounded-full border"
          title="View"
        >
          🔍
        </button>
        <button
          onClick={onRemove}
          className="w-9 h-9 flex items-center justify-center bg-white shadow rounded-full border text-red-600"
          title="Delete"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
