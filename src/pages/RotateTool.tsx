import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import FileDropzone from "../components/FileDropzone";
import { rotatePdf } from "../utils/pdfUtils";
import { saveAs } from "file-saver";

export default function RotateTool() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(90);
  const [busy, setBusy] = useState(false);

  return (
    <ToolLayout title="Rotate PDF">
      {!file ? (
        <FileDropzone onFiles={(f) => setFile(f[0])} multiple={false} />
      ) : (
        <div className="bg-white p-3 rounded shadow">
          <div className="font-medium">{file.name}</div>
          <div className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
        </div>
      )}

      <div>
        <label className="block mb-1">Angle</label>
        <select value={angle} onChange={(e) => setAngle(parseInt(e.target.value, 10))} className="p-2 border rounded">
          <option value={90}>90°</option>
          <option value={180}>180°</option>
          <option value={270}>270°</option>
        </select>
      </div>

      <div>
        <button
          disabled={!file || busy}
          className="px-4 py-2 bg-[var(--brand)] text-white rounded disabled:opacity-60"
          onClick={async () => {
            if (!file) return;
            setBusy(true);
            try {
              const out = await rotatePdf(file, angle, "all");
              saveAs(new Blob([out], { type: "application/pdf" }), "rotated.pdf");
            } catch (err) {
              console.error(err);
              alert("Rotate failed: " + (err as any).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          {busy ? "Rotating..." : "Rotate & Download"}
        </button>
      </div>
    </ToolLayout>
  );
}
