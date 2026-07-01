interface HeaderProps {
  onAdd: () => void
}

export function Header({ onAdd }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo" aria-hidden>
          <span /> <span /> <span /> <span />
        </span>
        <div>
          <h1 className="header__title">MS Portals</h1>
          <p className="header__subtitle">Launcher &amp; favoris Microsoft 365</p>
        </div>
      </div>

      <button className="btn btn--primary" onClick={onAdd}>
        <span aria-hidden>＋</span> Ajouter un site
      </button>
    </header>
  )
}
