interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search">
      <span className="search__icon" aria-hidden>
        🔍
      </span>
      <input
        type="search"
        className="search__input"
        placeholder="Rechercher par nom, URL ou catégorie…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        aria-label="Rechercher un portail"
      />
      {value && (
        <button
          className="search__clear"
          onClick={() => onChange('')}
          aria-label="Effacer la recherche"
        >
          ✕
        </button>
      )}
    </div>
  )
}
