// Builds horizontal lockups for the concept symbols: symbol + "Cubott" in Inter Bold (outlined to paths).
// Usage: node brand-concepts/lockups.mjs
import fs from "node:fs"
import opentype from "opentype.js"

const ttf = fs.readFileSync("scripts/Inter-Bold.ttf")
const font = (opentype.parse ?? opentype.default.parse)(ttf.buffer.slice(ttf.byteOffset, ttf.byteOffset + ttf.byteLength))
const SIZE = 150
const TRACK = -0.02 * SIZE
const capH = (font.tables.os2.sCapHeight / font.unitsPerEm) * SIZE

function word() {
  const glyphs = [..."Cubott"].map((c) => font.charToGlyph(c))
  let x = 0
  const d = []
  glyphs.forEach((g, i) => {
    d.push(g.getPath(x, 0, SIZE).toPathData(2))
    x += (g.advanceWidth / font.unitsPerEm) * SIZE + TRACK
    if (i < glyphs.length - 1) x += (font.getKerningValue(g, glyphs[i + 1]) / font.unitsPerEm) * SIZE
  })
  return { d: d.join(" "), width: x - TRACK }
}

const w = word()
for (const k of ["a", "b", "c", "d", "e", "f"]) {
  const svg = fs.readFileSync(`brand-concepts/${k}-symbol.svg`, "utf8")
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/<title[\s\S]*?<\/title>/, "")
  const gap = 40
  const W = Math.ceil(256 + gap + w.width + 16)
  const textY = 128 + capH / 2 // vertically centre the caps on the symbol's centre
  fs.writeFileSync(
    `brand-concepts/${k}-lockup.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} 256" width="${W}" height="256" role="img" aria-label="Cubott">\n<g id="symbol">${inner}</g>\n<g id="wordmark" transform="translate(${256 + gap},${textY})"><path fill="#111" d="${w.d}"/></g>\n</svg>\n`
  )
}
console.log("lockups written")
