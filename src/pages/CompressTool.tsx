import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import FileDropzone from "../components/FileDropzone";
import { compressPdf } from "../utils/pdfUtils";
import { saveAs } from "file-saver";

export default function CompressTool() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <ToolLayout title="Compress PDF">
      {!file ? (
        <FileDropzone onFiles={(f) => setFile(f[0])} multiple={false} />
      ) : (
        <div className="bg-white p-3 rounded shadow">
          <div className="font-medium">{file.name}</div>
          <div className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
        </div>
      )}

      <div>
        <button
          disabled={!file || busy}
          className="px-4 py-2 bg-[var(--brand)] text-white rounded disabled:opacity-60"
          onClick={async () => {
            if (!file) return;
            setBusy(true);
            try {
              const out = await compressPdf(file);
              saveAs(new Blob([out], { type: "application/pdf" }), "compressed.pdf");
            } catch (err) {
              console.error(err);
              alert("Compression failed: " + (err as any).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          {busy ? "Compressing..." : "Compress & Download"}
        </button>
      </div>
    </ToolLayout>
  );
}
