import fs from "node:fs";
import path from "node:path";

/**
 * Build-time check for the approved founder headshot.
 * Keep the path statically scoped under public/images.
 */
export function isFounderPhotoAvailable() {
  const photoPath = path.join(
    /* turbopackIgnore: true */ process.cwd(),
    "public",
    "images",
    "paul-dent.jpg",
  );
  return fs.existsSync(photoPath);
}
