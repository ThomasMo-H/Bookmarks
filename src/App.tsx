import { useMemo, useState } from 'react'
import type { TabId } from './types'
import { usePortals } from './hooks/usePortals'
import { Header } from './components/Header'
import { SearchBar } from './components/SearchBar'
import { Tabs } from './components/Tabs'
import { PortalGrid } from './components/PortalGrid'
import { AddSiteModal } from './components/AddSiteModal'

export default function App() {
  const { portals, isFavorite, toggleFavorite, addPortal, removePortal, favorites } = usePortals()

  const [tab, setTab] = useState<TabId>('all')
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  // 1) Filtrage par recherche (nom, URL ou catégorie).
  const searched = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return portals
    return portals.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.url.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }, [portals, query])

  // 2) Filtrage par onglet actif.
  const visible = useMemo(() => {
    switch (tab) {
      case 'apps':
        return searched.filter((p) => p.group === 'apps')
      case 'admin':
        return searched.filter((p) => p.group === 'admin')
      case 'favoris':
        return searched.filter((p) => favorites.has(p.id))
      default:
        return searched
    }
  }, [searched, tab, favorites])

  // Compteurs affichés dans les onglets (tiennent compte de la recherche en cours).
  const counts = useMemo<Record<TabId, number>>(
    () => ({
      all: searched.length,
      apps: searched.filter((p) => p.group === 'apps').length,
      admin: searched.filter((p) => p.group === 'admin').length,
      favoris: searched.filter((p) => favorites.has(p.id)).length,
    }),
    [searched, favorites],
  )

  // Catégories existantes proposées dans la modale d'ajout.
  const categories = useMemo(
    () => Array.from(new Set(portals.map((p) => p.category))).sort(),
    [portals],
  )

  const emptyLabel =
    tab === 'favoris'
      ? 'Ajoutez des favoris avec l’étoile sur chaque carte.'
      : 'Essayez un autre terme ou ajoutez un site.'

  return (
    <div className="app">
      <Header onAdd={() => setModalOpen(true)} />

      <main className="container">
        <SearchBar value={query} onChange={setQuery} />
        <Tabs active={tab} onChange={setTab} counts={counts} />

        <PortalGrid
          portals={visible}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onRemove={removePortal}
          emptyLabel={emptyLabel}
        />
      </main>

      <footer className="footer">
        {portals.length} portails · {counts.favoris} favori(s) · données stockées localement
      </footer>

      <AddSiteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addPortal}
        categories={categories}
      />
    </div>
  )
}
