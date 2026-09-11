// Builds the brand raster assets from the supplied logo artwork.
// Source priority: public/brand/cubott-mark-src.png (the clean square mark) → the robot cropped from the lockup.
// Usage: node scripts/brand-assets.mjs
import sharp from "sharp"
import fs from "node:fs"

const clean = "public/brand/cubott-mark-src.png"
const lockup = "public/brand/cubott-logo-full-src.png"

let src
if (fs.existsSync(clean)) {
  src = sharp(clean)
} else {
  // Robot occupies the left ~38% of the lockup.
  const meta = await sharp(lockup).metadata()
  const buf = await sharp(lockup).extract({ left: 0, top: 0, width: Math.round(meta.width * 0.38), height: meta.height }).png().toBuffer()
  src = sharp(buf)
}
const trimmed = await src.trim().png().toBuffer()

await sharp(trimmed).resize({ height: 512, withoutEnlargement: false }).png().toFile("public/brand/cubott-mark.png")
await sharp(trimmed).resize({ height: 512 }).webp({ quality: 92 }).toFile("public/brand/cubott-mark.webp")
await sharp(trimmed).resize(64, 64, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile("app/icon.png")
await sharp(trimmed)
  .resize(132, 132, { fit: "contain", background: { r: 11, g: 31, b: 59, alpha: 1 } })
  .extend({ top: 24, bottom: 24, left: 24, right: 24, background: { r: 11, g: 31, b: 59, alpha: 1 } })
  .png()
  .toFile("app/apple-icon.png")
console.log("brand assets written")
