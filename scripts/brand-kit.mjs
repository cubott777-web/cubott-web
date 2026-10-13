// Builds every logo file from ONE source: public/brand/cubott-mark.svg (vector mark) + Inter Bold (wordmark).
// Writes SVG + PNG variants to public/brand/logo and the site icons. Usage: node scripts/brand-kit.mjs
import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"
import opentype from "opentype.js"

const OUT = "public/brand/logo"
const FONT = "scripts/Inter-Bold.ttf"
const NAVY = "#0A2F47"
const BLUE = "#379ECF"
const WHITE = "#FFFFFF"

fs.mkdirSync(OUT, { recursive: true })

// Inter Bold as TTF (Google serves TTF when there is no browser user agent). Cached next to this script.
if (!fs.existsSync(FONT)) {
  const css = await fetch("https://fonts.googleapis.com/css2?family=Inter:wght@700", { headers: { "User-Agent": "" } }).then((r) => r.text())
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
  if (!url) throw new Error("Could not resolve Inter Bold TTF")
  fs.writeFileSync(FONT, Buffer.from(await fetch(url).then((r) => r.arrayBuffer())))
}
const ttf = fs.readFileSync(FONT)
const font = (opentype.parse ?? opentype.default.parse)(ttf.buffer.slice(ttf.byteOffset, ttf.byteOffset + ttf.byteLength))

// ---- the mark: strip the outer <svg> so it can be placed inside other files
const strip = (svg) => svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/<title[\s\S]*?<\/title>/, "").replace(/<!--[\s\S]*?-->/g, "")
const markInner = strip(fs.readFileSync("public/brand/cubott-mark.svg", "utf8"))
const MARK_W = 400
const MARK_H = 512

/** Mono mark: everything in one colour; faces stay open except the shadow face at 25%. */
function monoInner(color) {
  return markInner
    .replace(/stroke="#0A2F47"/g, `stroke="${color}"`)
    .replace(/fill="#0A2F47"/g, `fill="${color}"`)
    .replace(/fill="#0A3F5E"/g, `fill="${color}" fill-opacity="0.25"`)
    .replace(/fill="#379ECF"/g, `fill="none"`)
    .replace(/fill="#3AA5D8"/g, `fill="none"`)
}

// ---- the wordmark: "Cubott" in Inter Bold, -0.02em tracking, first "o" in Cubott Blue
const SIZE = 400
const TRACK = -0.02 * SIZE
function wordmark(color, accent) {
  // charToGlyph per character: Inter's GSUB tables trip opentype.js's shaper, and "Cubott" needs no ligatures
  const glyphs = [..."Cubott"].map((c) => font.charToGlyph(c))
  let x = 0
  const parts = []
  glyphs.forEach((g, i) => {
    const p = g.getPath(x, 0, SIZE)
    const fill = i === 3 ? accent : color // C u b [o] t t
    parts.push(`<path fill="${fill}" d="${p.toPathData(2)}"/>`)
    x += (g.advanceWidth / font.unitsPerEm) * SIZE + TRACK
    if (i < glyphs.length - 1) x += (font.getKerningValue(g, glyphs[i + 1]) / font.unitsPerEm) * SIZE
  })
  const capH = (font.tables.os2.sCapHeight / font.unitsPerEm) * SIZE
  const descender = (-font.descender / font.unitsPerEm) * SIZE
  return { svg: parts.join(""), width: x - TRACK, capH, descender }
}

function file(name, w, h, body) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Cubott">\n${body}\n</svg>\n`
  fs.writeFileSync(path.join(OUT, `${name}.svg`), svg)
  return svg
}

const files = {}

// mark variants
files["cubott-mark"] = file("cubott-mark", MARK_W, MARK_H, markInner.trim())
files["cubott-mark-mono-navy"] = file("cubott-mark-mono-navy", MARK_W, MARK_H, monoInner(NAVY).trim())
files["cubott-mark-mono-white"] = file("cubott-mark-mono-white", MARK_W, MARK_H, monoInner(WHITE).trim())

// wordmark variants (padding = 10% of cap height so nothing clips)
for (const [name, color] of [
  ["cubott-wordmark", NAVY],
  ["cubott-wordmark-white", WHITE],
]) {
  const w = wordmark(color, BLUE)
  const pad = w.capH * 0.1
  const H = w.capH + w.descender + pad * 2
  files[name] = file(name, Math.ceil(w.width + pad * 2), Math.ceil(H), `<g transform="translate(${pad},${pad + w.capH})">${w.svg}</g>`)
}

// horizontal lockup: mark height = 1.45 × cap height, gap = 0.45 × cap height, baseline-aligned to the cube's bottom edge
for (const [name, color, mono] of [
  ["cubott-logo-horizontal", NAVY, null],
  ["cubott-logo-horizontal-white", WHITE, null],
  ["cubott-logo-horizontal-mono-navy", NAVY, NAVY],
  ["cubott-logo-horizontal-mono-white", WHITE, WHITE],
]) {
  const w = wordmark(color, mono ?? BLUE)
  const markH = w.capH * 1.45
  const scale = markH / MARK_H
  const gap = w.capH * 0.45
  const pad = w.capH * 0.2
  const W = pad + MARK_W * scale + gap + w.width + pad
  const H = pad + markH + pad
  const textY = pad + markH - MARK_H * scale * 0.07 // sit the baseline just above the cube's bottom vertex
  const inner = mono ? monoInner(mono) : markInner
  files[name] = file(
    name,
    Math.ceil(W),
    Math.ceil(H),
    `<g transform="translate(${pad},${pad}) scale(${scale})">${inner}</g><g transform="translate(${pad + MARK_W * scale + gap},${textY})">${w.svg}</g>`
  )
}

// stacked lockup: mark centred above the wordmark
for (const [name, color] of [
  ["cubott-logo-stacked", NAVY],
  ["cubott-logo-stacked-white", WHITE],
]) {
  const w = wordmark(color, BLUE)
  const markH = w.capH * 2.6
  const scale = markH / MARK_H
  const gap = w.capH * 0.6
  const pad = w.capH * 0.3
  const W = Math.max(w.width, MARK_W * scale) + pad * 2
  const H = pad + markH + gap + w.capH + w.descender + pad
  files[name] = file(
    name,
    Math.ceil(W),
    Math.ceil(H),
    `<g transform="translate(${(W - MARK_W * scale) / 2},${pad}) scale(${scale})">${markInner}</g><g transform="translate(${(W - w.width) / 2},${pad + markH + gap + w.capH})">${w.svg}</g>`
  )
}

// ---- rasters: every SVG at 1024px on its longest side, transparent
for (const [name, svg] of Object.entries(files)) {
  const buf = Buffer.from(svg)
  await sharp(buf, { density: 300 }).resize({ width: 1024, height: 1024, fit: "inside" }).png().toFile(path.join(OUT, `${name}.png`))
}

// ---- icons (mark only)
const mark = Buffer.from(files["cubott-mark"])
const navyBg = { r: 11, g: 31, b: 59, alpha: 1 }
const clear = { r: 0, g: 0, b: 0, alpha: 0 }
for (const s of [16, 32, 48, 192, 512]) {
  await sharp({ create: { width: s, height: s, channels: 4, background: clear } })
    .composite([{ input: await sharp(mark, { density: 300 }).resize(s, s, { fit: "inside" }).png().toBuffer(), gravity: "centre" }])
    .png()
    .toFile(path.join(OUT, `icon-${s}.png`))
}
// Apple touch icon and maskable icon: mark on navy with safe padding
for (const [name, s, padRatio] of [
  ["apple-touch-icon", 180, 0.16],
  ["icon-maskable-512", 512, 0.2],
]) {
  const inner = Math.round(s * (1 - padRatio * 2))
  await sharp({ create: { width: s, height: s, channels: 4, background: navyBg } })
    .composite([{ input: await sharp(mark, { density: 300 }).resize(inner, inner, { fit: "inside" }).png().toBuffer(), gravity: "centre" }])
    .png()
    .toFile(path.join(OUT, `${name}.png`))
}

// ---- the site's own icons, from the same source
await sharp(mark, { density: 300 }).resize(64, 64, { fit: "inside" }).png().toFile("app/icon.png")
fs.copyFileSync(path.join(OUT, "apple-touch-icon.png"), "app/apple-icon.png")
await sharp(mark, { density: 300 }).resize({ height: 512 }).png().toFile("public/brand/cubott-mark.png")
await sharp(mark, { density: 300 }).resize({ height: 512 }).webp({ quality: 92 }).toFile("public/brand/cubott-mark.webp")

console.log(`brand kit written: ${Object.keys(files).length} SVGs + PNGs in ${OUT}`)
