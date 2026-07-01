// Onglet de navigation. "favoris" est dynamique (dépend des favoris localStorage).
export type TabId = 'all' | 'apps' | 'admin' | 'favoris'

// Regroupement principal utilisé pour filtrer les onglets Apps / Admin.
export type PortalGroup = 'apps' | 'admin'

export interface Portal {
  /** Identifiant stable et unique (slug pour les portails par défaut, uuid pour les ajouts). */
  id: string
  /** Nom affiché sur la carte. */
  name: string
  /** URL complète du portail (https://...). */
  url: string
  /** Catégorie fine, utilisée pour l'affichage et la recherche (ex. "Sécurité"). */
  category: string
  /** Groupe pour le filtrage par onglet. */
  group: PortalGroup
  /** true si le site a été ajouté par l'utilisateur (persisté en localStorage). */
  custom?: boolean
}
