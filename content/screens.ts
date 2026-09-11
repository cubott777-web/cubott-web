import type { StaticImageData } from "next/image"

export interface Screen {
  src: StaticImageData
  alt: string
  caption?: string
}

/**
 * Real Dealer Management screens captured from the running application.
 * Keys match `journey` station keys and product page sections.
 * Nothing here is mocked: if a screen has not been captured yet, the key is absent
 * and the UI renders a labelled placeholder frame.
 */
export const screens: Partial<Record<string, Screen>> = {}
