// The akii demos show no third-party logos. The kit's brand registry (about
// 110 KB of SVG artwork) is swapped for this empty one at build time.
export type BrandAsset = {
  name: string
  category: 'Payments' | 'Banks' | 'Apps' | 'Crypto'
  light: string
  dark: string
  tileArtwork?: string
  tileBackground?: string
  proportion: number
  scale: number
}
export const brandMarks: Record<string, BrandAsset> = {}
export type BrandName = string
