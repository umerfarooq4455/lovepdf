import { useEffect, useRef, useState } from "react";
import SignaturePad from "signature_pad";
import ToolLayout from "../components/ToolLayout";
import FileDropzone from "../components/FileDropzone";
import { addImageSignature } from "../utils/pdfUtils";
import { saveAs } from "file-saver";

export default function SignTool() {
  const [file, setFile] = useState<File | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const padRef = useRef<SignaturePad | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const pad = new SignaturePad(canvas, { backgroundColor: "rgba(0,0,0,0)" });
    padRef.current = pad;

    const resize = () => {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * ratio;
      canvas.height = h * ratio;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(ratio, ratio);
      pad.clear();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      pad.off();
    };
  }, []);

  async function handleSign() {
    if (!file) return alert("Upload a PDF first");
    if (!padRef.current || padRef.current.isEmpty()) return alert("Draw signature first");

    setBusy(true);
    try {
      const dataUrl = padRef.current.toDataURL("image/png");
      const out = await addImageSignature(file, dataUrl, { x: 150, y: 100, scale: 0.5, page: 0 });
      saveAs(new Blob([out], { type: "application/pdf" }), "signed.pdf");
    } catch (err) {
      console.error(err);
      alert("Sign failed: " + (err as any).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolLayout title="Sign PDF">
      {!file ? <FileDropzone onFiles={(f) => setFile(f[0])} multiple={false} /> : (
        <div className="bg-white p-3 rounded shadow">
          <div className="font-medium">{file.name}</div>
          <div className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
        </div>
      )}

      <div className="bg-white p-3 rounded shadow">
        <div className="border p-2 h-48">
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="mt-3 flex gap-2">
          <button className="px-3 py-1 border rounded" onClick={() => padRef.current?.clear()}>Clear</button>
          <button className="px-3 py-1 bg-[var(--brand)] text-white rounded" onClick={handleSign} disabled={busy}>
            {busy ? "Signing..." : "Sign & Download"}
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}
