import type { Portal } from '../types'
import { PortalCard } from './PortalCard'

interface PortalGridProps {
  portals: Portal[]
  isFavorite: (id: string) => boolean
  onToggleFavorite: (id: string) => void
  onRemove: (id: string) => void
  emptyLabel: string
}

export function PortalGrid({
  portals,
  isFavorite,
  onToggleFavorite,
  onRemove,
  emptyLabel,
}: PortalGridProps) {
  if (portals.length === 0) {
    return (
      <div className="empty">
        <p className="empty__title">Aucun résultat</p>
        <p className="empty__hint">{emptyLabel}</p>
      </div>
    )
  }

  return (
    <div className="grid">
      {portals.map((portal) => (
        <PortalCard
          key={portal.id}
          portal={portal}
          isFavorite={isFavorite(portal.id)}
          onToggleFavorite={onToggleFavorite}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}
