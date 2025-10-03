import React, { useRef } from "react";

type Props = {
  onFiles: (files: File[]) => void;
  hasFiles: boolean;
};

export default function FileDropzone({ onFiles, hasFiles }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function openPicker() {
    inputRef.current?.click();
  }

  function onSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const arr = Array.from(e.target.files).filter((f) => f.type === "application/pdf");
    if (arr.length) onFiles(arr);
    e.currentTarget.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const items = Array.from(e.dataTransfer.files).filter((f) => f.type === "application/pdf");
    if (items.length) onFiles(items);
  }

  if (!hasFiles) {
    // big centered hero CTA (matches your first screenshot)
    return (
      <div className="w-full flex flex-col items-center">
        <div
          className="mt-8 bg-white py-10 px-8 rounded-xl shadow-md text-center w-full max-w-xl"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <h2 className="text-3xl font-semibold mb-2">Merge PDF files</h2>
          <p className="text-gray-500 mb-6">Combine PDFs in the order you want with the easiest PDF merger available.</p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={openPicker}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-lg shadow-lg"
            >
              Select PDF files
            </button>

            {/* small round action icons (placeholders) */}
            <div className="flex flex-col gap-2">
              <button className="w-10 h-10 rounded-full bg-red-600 text-white shadow flex items-center justify-center">▲</button>
              <button className="w-10 h-10 rounded-full bg-red-600 text-white shadow flex items-center justify-center">☐</button>
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-400">or drop PDFs here</div>
        </div>

        <input ref={inputRef} type="file" accept="application/pdf" multiple className="hidden" onChange={onSelect} />
      </div>
    );
  }

  // compact top strip (when files present)
  return (
    <div
      className="flex items-center justify-between gap-4 p-3 bg-white rounded-md shadow-sm"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={openPicker}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm"
        >
          Add files
        </button>
       
      </div>

      <input ref={inputRef} type="file" accept="application/pdf" multiple className="hidden" onChange={onSelect} />
    </div>
  );
}
