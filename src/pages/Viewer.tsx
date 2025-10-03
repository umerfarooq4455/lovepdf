import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Viewer() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            setFile(f);
          }}
        />
      </div>

      {!file ? (
        <div className="text-gray-500">Upload a PDF to preview its pages.</div>
      ) : (
        <div className="bg-white p-4 rounded shadow">
          <Document
            file={file}
            onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
          >
            {Array.from(new Array(numPages), (_v, i) => (
              <div key={i} className="mb-6">
                <Page pageNumber={i + 1} width={800} />
              </div>
            ))}
          </Document>
        </div>
      )}
    </div>
  );
}
