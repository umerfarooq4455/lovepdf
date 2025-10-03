import  { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import FileDropzone from "../components/FileDropzone";
import { splitPdf } from "../utils/pdfUtils";
import { saveAs } from "file-saver";

export default function SplitTool() {
  const [file, setFile] = useState<File | null>(null);
  const [rangesText, setRangesText] = useState("1-1");
  const [busy, setBusy] = useState(false);

  function parseRanges(text: string) {
    return text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((tok) => {
        const [a, b] = tok.split("-").map((x) => parseInt(x, 10));
        return { from: a, to: b ?? a };
      });
  }

  return (
    <ToolLayout title="Split PDF">
      {!file ? (
        <FileDropzone onFiles={(f) => setFile(f[0])} multiple={false} />
      ) : (
        <div className="bg-white p-3 rounded shadow">
          <div className="font-medium">{file.name}</div>
          <div className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
          <button className="text-sm text-blue-600 mt-2" onClick={() => setFile(null)}>Change file</button>
        </div>
      )}

      <div>
        <label className="block text-sm mb-1">Ranges (comma separated, e.g. 1-1,2-3)</label>
        <input value={rangesText} onChange={(e) => setRangesText(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div>
        <button
          disabled={busy}
          className="px-4 py-2 bg-[var(--brand)] text-white rounded disabled:opacity-60"
          onClick={async () => {
            if (!file) return alert("Upload a PDF first");
            setBusy(true);
            try {
              const ranges = parseRanges(rangesText);
              const results = await splitPdf(file, ranges);
              results.forEach((r) => saveAs(new Blob([r.data], { type: "application/pdf" }), r.name));
            } catch (err) {
              console.error(err);
              alert("Split failed: " + (err as any).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          {busy ? "Processing..." : "Split & Download"}
        </button>
      </div>
    </ToolLayout>
  );
}
