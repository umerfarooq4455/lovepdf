// src/utils/pdfUtils.ts
import { PDFDocument, degrees } from "pdf-lib";

/**
 * Merge multiple PDFs (File objects) into a single PDF bytes
 */
export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuf = await file.arrayBuffer();
    const src = await PDFDocument.load(arrayBuf);
    const copied = await mergedPdf.copyPages(src, src.getPageIndices());
    copied.forEach((p) => mergedPdf.addPage(p));
  }

  // pdf-lib SaveOptions: removed 'compress' — keep useObjectStreams if needed
  const bytes = await mergedPdf.save({ useObjectStreams: true });
  return bytes;
}

/**
 * Split PDF by ranges. Ranges are 1-based inclusive.
 */
export async function splitPdf(file: File, ranges: { from: number; to: number }[]) {
  const buf = await file.arrayBuffer();
  const src = await PDFDocument.load(buf);

  const results: { name: string; data: Uint8Array }[] = [];

  for (const r of ranges) {
    const out = await PDFDocument.create();
    const indices: number[] = [];
    for (let i = r.from - 1; i <= r.to - 1; i++) indices.push(i);
    const copied = await out.copyPages(src, indices);
    copied.forEach((p) => out.addPage(p));
    const data = await out.save({ useObjectStreams: true });
    results.push({ name: `split_${r.from}_${r.to}.pdf`, data });
  }
  return results;
}

/**
 * Rotate pages by angleDeg (90, 180, 270) on given pages or all
 */
export async function rotatePdf(file: File, angleDeg = 90, pages: number[] | "all" = "all") {
  const buf = await file.arrayBuffer();
  const doc = await PDFDocument.load(buf);
  const pageIndices = pages === "all" ? doc.getPageIndices() : pages.map((p) => p - 1);

  pageIndices.forEach((i) => {
    const page = doc.getPage(i);
    // get current rotation angle (Rotation object -> .angle), fallback to 0
    const currentAngle = page.getRotation()?.angle ?? 0;
    // setRotation expects a Rotation-like object; use degrees(...)
    page.setRotation(degrees(currentAngle + angleDeg));
  });

  return await doc.save({ useObjectStreams: true });
}

/**
 * Simple recompression: load & save with object streams flag.
 * Note: This is not equivalent to server-side Ghostscript compression.
 */
export async function compressPdf(file: File): Promise<Uint8Array> {
  const buf = await file.arrayBuffer();
  const doc = await PDFDocument.load(buf);
  return await doc.save({ useObjectStreams: true });
}

/**
 * Add PNG signature (data URL) to a given page (pageIndex 0-based)
 */
export async function addImageSignature(
  file: File,
  signatureDataUrl: string,
  options?: { x?: number; y?: number; scale?: number; page?: number }
): Promise<Uint8Array> {
  const buf = await file.arrayBuffer();
  const doc = await PDFDocument.load(buf);
  const pngBytes = await (await fetch(signatureDataUrl)).arrayBuffer();
  const png = await doc.embedPng(pngBytes);

  const { x = 50, y = 50, scale = 0.5, page = 0 } = options || {};
  const p = doc.getPage(page);
  const imgW = png.width * scale;
  const imgH = png.height * scale;
  p.drawImage(png, {
    x,
    y,
    width: imgW,
    height: imgH,
  });

  return await doc.save({ useObjectStreams: true });
}
