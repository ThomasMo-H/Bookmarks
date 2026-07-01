import { useEffect, useRef, useState } from 'react'
import type { PortalGroup } from '../types'
import { isValidUrl, suggestNameFromUrl } from '../utils/url'

interface AddSiteModalProps {
  open: boolean
  onClose: () => void
  onAdd: (site: { name: string; url: string; category: string; group: PortalGroup }) => boolean
  categories: string[]
}

const DEFAULT_CATEGORY = 'Personnalisé'

export function AddSiteModal({ open, onClose, onAdd, categories }: AddSiteModalProps) {
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState(DEFAULT_CATEGORY)
  const [group, setGroup] = useState<PortalGroup>('apps')
  const [error, setError] = useState('')
  const [clipboardHint, setClipboardHint] = useState('')
  const urlInputRef = useRef<HTMLInputElement>(null)

  // À l'ouverture : réinitialise le formulaire et tente de lire le presse-papiers.
  useEffect(() => {
    if (!open) return

    setUrl('')
    setName('')
    setCategory(DEFAULT_CATEGORY)
    setGroup('apps')
    setError('')
    setClipboardHint('')

    // Lecture du presse-papiers (nécessite un contexte sécurisé + autorisation).
    const readClipboard = async () => {
      try {
        const text = (await navigator.clipboard.readText())?.trim()
        if (text && isValidUrl(text)) {
          setUrl(text)
          setName(suggestNameFromUrl(text))
          setClipboardHint('URL détectée dans le presse-papiers ✔')
        }
      } catch {
        /* autorisation refusée ou API indisponible : saisie manuelle */
      }
    }
    readClipboard()

    // Focus après le rendu.
    const t = setTimeout(() => urlInputRef.current?.focus(), 50)
    return () => clearTimeout(t)
  }, [open])

  // Fermeture avec la touche Échap.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const handleUrlChange = (value: string) => {
    setUrl(value)
    setError('')
    // Suggère un nom tant que l'utilisateur n'en a pas saisi un.
    if (!name.trim() && isValidUrl(value)) {
      setName(suggestNameFromUrl(value))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidUrl(url)) {
      setError('Saisissez une URL valide (ex. https://exemple.com).')
      return
    }
    const finalName = name.trim() || suggestNameFromUrl(url)
    const added = onAdd({
      name: finalName,
      url: url.trim(),
      category: category.trim() || DEFAULT_CATEGORY,
      group,
    })
    if (!added) {
      setError('Ce site est déjà présent dans votre liste.')
      return
    }
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id="add-title">Ajouter un site</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </div>

        <form className="modal__body" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field__label">URL</span>
            <input
              ref={urlInputRef}
              type="text"
              className="field__input"
              placeholder="https://exemple.com"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
            />
            {clipboardHint && <span className="field__hint">{clipboardHint}</span>}
          </label>

          <label className="field">
            <span className="field__label">Nom</span>
            <input
              type="text"
              className="field__input"
              placeholder="Nom du site"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <div className="field-row">
            <label className="field">
              <span className="field__label">Catégorie</span>
              <input
                type="text"
                className="field__input"
                list="category-list"
                placeholder="Catégorie"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <datalist id="category-list">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>

            <label className="field">
              <span className="field__label">Onglet</span>
              <select
                className="field__input"
                value={group}
                onChange={(e) => setGroup(e.target.value as PortalGroup)}
              >
                <option value="apps">Apps</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          </div>

          {error && <p className="modal__error">{error}</p>}

          <div className="modal__footer">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn btn--primary">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
