import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import path from "node:path"

export const alt = "Cubott — We build systems that turn complexity into clarity"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Load a Google Fonts weight as TTF for satori (it cannot use woff2). Falls back to the default font if offline. */
async function loadInter(weight: 400 | 700, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(text)}`,
      // No browser UA: Google serves TTF, which satori can read.
      { headers: { "User-Agent": "" } }
    ).then((r) => r.text())
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
    if (!url) return null
    return await fetch(url).then((r) => r.arrayBuffer())
  } catch {
    return null
  }
}

export default async function OpenGraphImage() {
  const headline = "We build systems that turn complexity into clarity."
  const sub = "Technology for businesses that don't fit inside a template."
  const [bold, regular, markPng] = await Promise.all([
    loadInter(700, headline + "Cubott"),
    loadInter(400, sub),
    readFile(path.join(process.cwd(), "public/brand/cubott-mark.png")).catch(() => null),
  ])
  const markSrc = markPng ? `data:image/png;base64,${markPng.toString("base64")}` : null
  const fonts = [
    bold && { name: "Inter", data: bold, weight: 700 as const, style: "normal" as const },
    regular && { name: "Inter", data: regular, weight: 400 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" }[]

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #071427 0%, #0B1F3B 100%)",
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- satori renders plain img */}
          {markSrc && <img src={markSrc} width={64} height={78} alt="" />}
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>Cubott</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2.5, maxWidth: 980 }}>{headline}</div>
          <div style={{ fontSize: 28, color: "#BFDBFE", fontWeight: 400 }}>{sub}</div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  )
}
