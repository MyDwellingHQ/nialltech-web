/**
 * Serializes a rendered <svg> DOM node into a standalone .svg file and triggers
 * a browser download. The masters therefore come straight from the exact vector
 * geometry shown in the previews — no raster, no base64.
 */
export function downloadSvgElement(svg: SVGSVGElement | null, filename: string) {
  if (!svg) return;

  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.removeAttribute("class");
  clone.removeAttribute("aria-label");
  clone.removeAttribute("role");

  const serialized = new XMLSerializer().serializeToString(clone);
  const doc = `<?xml version="1.0" encoding="UTF-8"?>\n${serialized}\n`;

  const blob = new Blob([doc], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
