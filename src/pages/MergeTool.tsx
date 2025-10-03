// src/pages/MergeTool.tsx
import { useCallback, useState } from "react";
import ToolLayout from "../components/ToolLayout";
import FileDropzone from "../components/FileDropzone";
import FileCard from "../components/FileCard";
import SidebarMerge from "../components/SidebarMerge";
import { mergePdfs } from "../utils/pdfUtils";
import { saveAs } from "file-saver";

type FileMeta = {
  id: string;
  file: File;
  rotate?: number;
};

export default function MergeTool() {
  const [files, setFiles] = useState<FileMeta[]>([]);
  const [busy, setBusy] = useState(false);

  // Add files (preserve existing order)
  const handleAdd = useCallback((incoming: File[]) => {
    const metas = incoming.map((f) => ({
      id: `${Date.now()}_${f.name}_${Math.random().toString(36).slice(2, 7)}`,
      file: f,
    }));
    setFiles((s: FileMeta[]) => [...s, ...metas]);
  }, []);

  // Remove file by id
  function handleRemove(id: string) {
    setFiles((s) => s.filter((it) => it.id !== id));
  }

  // Rotate file (update local rotation)
  function handleRotate(id: string, deltaDeg: number) {
    setFiles((s) => s.map((it) => (it.id === id ? { ...it, rotate: ((it.rotate ?? 0) + deltaDeg) % 360 } : it)));
  }

  // Reorder (drag drop)
  function handleReorder(fromIndex: number, toIndex: number) {
    setFiles((arr) => {
      const copy = arr.slice();
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  }

  async function handleMerge() {
    if (files.length < 2) return alert("Select at least 2 PDFs to merge.");
    setBusy(true);
    try {
      // mergePdfs expects File[] from pdfUtils
      const fileObjs = files.map((f) => f.file);
      const merged = await mergePdfs(fileObjs);
      saveAs(new Blob([merged], { type: "application/pdf" }), "merged.pdf");
    } catch (err) {
      console.error(err);
      alert("Merge failed: " + (err as any).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolLayout title="Merge PDF" className="pt-6">
      <div className="flex gap-8 relative">
        {/* Left/main area */}
        <div className={`flex-1 transition-all duration-200 ${files.length === 0 ? "flex items-center justify-center" : ""}`}>
          {/* Dropzone - we pass hasFiles so it can switch between hero CTA and compact strip */}
          <div className="absolute  right-[30%]">
          <FileDropzone onFiles={handleAdd} hasFiles={files.length > 0} /></div>

          {/* file list */}
          <div className="mt-6 w-full">
            {files.length === 0 ? null : (
              <div className="flex gap-4 overflow-x-auto py-2">
                {files.map((f, idx) => (
                  <FileCard
                    key={f.id}
                    meta={f}
                    index={idx}
                    onRemove={() => handleRemove(f.id)}
                    onRotate={(deg) => handleRotate(f.id, deg)}
                    onReorder={handleReorder}
                  />
                ))}
              </div>
            )}
          </div>

          {/* actions (kept in main for responsive/sm screens) */}
         
        </div>

        {/* Right sidebar - ONLY render when one or more files are present */}
        {files.length > 0 && (
          <div className="w-[360px]">
            {/* SidebarMerge receives props so it can show file count / disable merge etc. */}
            <SidebarMerge
              filesCount={files.length}
              onMerge={handleMerge}
              busy={busy}
              onClear={() => setFiles([])}
              disabled={files.length < 2 || busy}
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
