import { useState } from 'react'
import type { Portal } from '../types'
import { faviconUrl, colorFromName } from '../utils/favicon'
import { getHostname } from '../utils/url'

interface PortalCardProps {
  portal: Portal
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  onRemove: (id: string) => void
}

export function PortalCard({ portal, isFavorite, onToggleFavorite, onRemove }: PortalCardProps) {
  const [iconError, setIconError] = useState(false)
  const host = getHostname(portal.url)

  return (
    <a
      className="card"
      href={portal.url}
      target="_blank"
      rel="noopener noreferrer"
      title={portal.url}
    >
      <div className="card__icon">
        {iconError ? (
          <span
            className="card__fallback"
            style={{ backgroundColor: colorFromName(portal.name) }}
            aria-hidden
          >
            {portal.name.charAt(0).toUpperCase()}
          </span>
        ) : (
          <img
            src={faviconUrl(portal.url)}
            alt=""
            width={32}
            height={32}
            loading="lazy"
            onError={() => setIconError(true)}
          />
        )}
      </div>

      <div className="card__body">
        <span className="card__name">{portal.name}</span>
        <span className="card__url">{host}</span>
        <span className="card__category">{portal.category}</span>
      </div>

      <div className="card__actions">
        <button
          className={`icon-btn ${isFavorite ? 'icon-btn--fav' : ''}`}
          aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          aria-pressed={isFavorite}
          onClick={(e) => {
            e.preventDefault()
            onToggleFavorite(portal.id)
          }}
        >
          {isFavorite ? '★' : '☆'}
        </button>

        {portal.custom && (
          <button
            className="icon-btn icon-btn--danger"
            aria-label="Supprimer ce site"
            onClick={(e) => {
              e.preventDefault()
              onRemove(portal.id)
            }}
          >
            🗑
          </button>
        )}
      </div>
    </a>
  )
}
