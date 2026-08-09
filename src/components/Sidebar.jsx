const NAV = [
  {
    section: 'Dashboard',
    items: [
      { id: 'overview', icon: '🏠', label: 'Overview' },
    ]
  },
  {
    section: 'Strategy',
    items: [
      { id: 'brand', icon: '🎨', label: 'Brand & Identity' },
      { id: 'channels', icon: '📢', label: 'Channel Strategy' },
      { id: 'budget', icon: '💰', label: 'Budget Calculator' },
      { id: 'outreach', icon: '🤝', label: 'Community Outreach' },
    ]
  },
  {
    section: 'Execution',
    items: [
      { id: 'milestones', icon: '✅', label: 'Milestone Tracker' },
      { id: 'leads', icon: '👥', label: 'Lead Tracker' },
      { id: 'retention', icon: '⭐', label: 'Retention & Reviews' },
    ]
  }
]

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <h1>Gloryber Child Development Center</h1>
        <p>Marketing Dashboard</p>
      </div>
      <div className="sidebar-nav">
        {NAV.map(group => (
          <div key={group.section}>
            <div className="nav-section-label">{group.section}</div>
            {group.items.map(item => (
              <div
                key={item.id}
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>
          Alexandria, VA · Pre-Launch<br />
          Bilingual English / Español
        </div>
      </div>
    </nav>
  )
}
