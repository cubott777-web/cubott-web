/** One motion vocabulary for the whole site: the same curve and rhythm everywhere. */
export const EASE = [0.16, 1, 0.3, 1] as const

export const DUR = { fast: 0.4, base: 0.7, slow: 1 } as const

export const STAGGER = { word: 0.035, item: 0.07 } as const

/** Trigger a little before the element is fully in view, so motion is already settling as it arrives. */
export const VIEW = { once: true, margin: "-80px 0px -60px 0px" } as const
