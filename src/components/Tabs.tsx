import type { TabId } from '../types'

interface TabsProps {
  active: TabId
  onChange: (tab: TabId) => void
  counts: Record<TabId, number>
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'apps', label: 'Apps' },
  { id: 'admin', label: 'Admin' },
  { id: 'favoris', label: 'Favoris' },
]

export function Tabs({ active, onChange, counts }: TabsProps) {
  return (
    <nav className="tabs" role="tablist">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          className={`tab ${active === tab.id ? 'tab--active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.id === 'favoris' && <span aria-hidden>★ </span>}
          {tab.label}
          <span className="tab__count">{counts[tab.id]}</span>
        </button>
      ))}
    </nav>
  )
}
