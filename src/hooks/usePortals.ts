import { useCallback, useMemo } from 'react'
import type { Portal } from '../types'
import { DEFAULT_PORTALS } from '../data/portals'
import { useLocalStorage } from './useLocalStorage'
import { dedupeKey } from '../utils/url'

const CUSTOM_KEY = 'ms-portals:custom'
const FAV_KEY = 'ms-portals:favorites'

/**
 * Source de vérité de l'application :
 *  - la liste complète des sites (défaut + ajouts utilisateur),
 *  - l'ensemble des favoris,
 *  - les actions d'ajout / suppression / bascule de favori.
 * Ajouts et favoris sont persistés dans localStorage.
 */
export function usePortals() {
  const [customPortals, setCustomPortals] = useLocalStorage<Portal[]>(CUSTOM_KEY, [])
  const [favorites, setFavorites] = useLocalStorage<string[]>(FAV_KEY, [])

  const portals = useMemo<Portal[]>(
    () => [...DEFAULT_PORTALS, ...customPortals],
    [customPortals],
  )

  const favoriteSet = useMemo(() => new Set(favorites), [favorites])

  const isFavorite = useCallback((id: string) => favoriteSet.has(id), [favoriteSet])

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
      )
    },
    [setFavorites],
  )

  /** Détecte un doublon d'URL (défaut ou personnalisé) avant l'ajout. */
  const isDuplicate = useCallback(
    (url: string) => {
      const key = dedupeKey(url)
      return portals.some((p) => dedupeKey(p.url) === key)
    },
    [portals],
  )

  /**
   * Ajoute un site personnalisé. Retourne false si c'est un doublon.
   */
  const addPortal = useCallback(
    (input: Omit<Portal, 'id' | 'custom'>): boolean => {
      if (isDuplicate(input.url)) return false
      const portal: Portal = {
        ...input,
        id:
          typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : `custom-${Date.now()}`,
        custom: true,
      }
      setCustomPortals((prev) => [...prev, portal])
      return true
    },
    [isDuplicate, setCustomPortals],
  )

  /** Supprime un site personnalisé (les portails par défaut ne sont pas supprimables). */
  const removePortal = useCallback(
    (id: string) => {
      setCustomPortals((prev) => prev.filter((p) => p.id !== id))
      setFavorites((prev) => prev.filter((f) => f !== id))
    },
    [setCustomPortals, setFavorites],
  )

  return {
    portals,
    favorites: favoriteSet,
    isFavorite,
    toggleFavorite,
    isDuplicate,
    addPortal,
    removePortal,
  }
}
