/**
 * Normalise une saisie utilisateur en URL exploitable.
 * Ajoute https:// si le protocole est absent.
 */
export function normalizeUrl(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

/** Retourne un objet URL si la chaîne est une URL http(s) valide, sinon null. */
export function parseUrl(input: string): URL | null {
  try {
    const url = new URL(normalizeUrl(input))
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
    if (!url.hostname.includes('.')) return null
    return url
  } catch {
    return null
  }
}

export function isValidUrl(input: string): boolean {
  return parseUrl(input) !== null
}

/** Extrait le nom d'hôte (sans www.) — utile pour les favicons et la déduplication. */
export function getHostname(input: string): string {
  const url = parseUrl(input)
  return url ? url.hostname.replace(/^www\./, '') : ''
}

/**
 * Clé de déduplication : hostname + chemin, sans slash final ni casse.
 * Permet de repérer un doublon même si le protocole ou www. diffèrent.
 */
export function dedupeKey(input: string): string {
  const url = parseUrl(input)
  if (!url) return input.trim().toLowerCase()
  const path = url.pathname.replace(/\/+$/, '')
  return `${url.hostname.replace(/^www\./, '')}${path}`.toLowerCase()
}

/**
 * Suggère un nom de site lisible à partir du domaine.
 * ex. https://make.powerautomate.com → "Powerautomate"
 */
export function suggestNameFromUrl(input: string): string {
  const host = getHostname(input)
  if (!host) return ''
  const parts = host.split('.')
  // On prend le label le plus significatif (avant le TLD).
  const core = parts.length >= 2 ? parts[parts.length - 2] : parts[0]
  return core
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
