import { getHostname } from './url'

/**
 * URL d'un favicon via le service public Google S2.
 * Robuste et sans clé d'API. En cas d'échec, la carte affiche un badge lettre.
 */
export function faviconUrl(siteUrl: string, size = 64): string {
  const host = getHostname(siteUrl)
  if (!host) return ''
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=${size}`
}

/** Couleur stable dérivée du nom, pour le badge de repli. */
export function colorFromName(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 55%, 45%)`
}
