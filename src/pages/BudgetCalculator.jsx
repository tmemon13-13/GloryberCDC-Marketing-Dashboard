import { useLocalStorage } from '../components/useLocalStorage'

const DEFAULT_ITEMS = [
  { category: 'Foundation', name: 'Website hosting', low: 15, medium: 15, high: 23, notes: 'Squarespace or SiteGround' },
  { category: 'Foundation', name: 'Domain name (annual, /12)', low: 1, medium: 1, high: 1, notes: '~$12/yr amortized' },
  { category: 'Foundation', name: 'Professional email (Google Workspace)', low: 6, medium: 6, high: 6, notes: '$6/mo per user' },
  { category: 'Organic', name: 'Google Business Profile', low: 0, medium: 0, high: 0, notes: 'Always free' },
  { category: 'Organic', name: 'Social media (organic content)', low: 0, medium: 0, high: 0, notes: 'Time investment only' },
  { category: 'Organic', name: 'Nextdoor business profile', low: 0, medium: 0, high: 0, notes: 'Free' },
  { category: 'Paid Ads', name: 'Facebook / Instagram Ads', low: 50, medium: 200, high: 400, notes: 'Separate EN + ES campaigns' },
  { category: 'Paid Ads', name: 'Google Ads (Local Search)', low: 0, medium: 400, high: 1000, notes: '$3–8/click' },
  { category: 'Paid Ads', name: 'Google Local Services Ads', low: 0, medium: 0, high: 300, notes: '$25–60/verified lead' },
  { category: 'Paid Ads', name: 'Google Display + Retargeting', low: 0, medium: 0, high: 200, notes: 'Targets website visitors' },
  { category: 'SEO', name: 'Local SEO / citation building', low: 0, medium: 150, high: 300, notes: 'BrightLocal or one-time cleanup' },
  { category: 'Directories', name: 'Care.com Premium listing', low: 0, medium: 35, high: 50, notes: 'Optional at low tier' },
  { category: 'Directories', name: 'Winnie / CareLuLu / Yelp', low: 0, medium: 0, high: 0, notes: 'Free listings' },
  { category: 'Content', name: 'Email marketing (Mailchimp)', low: 0, medium: 15, high: 15, notes: 'Free up to 500 contacts' },
  { category: 'Content', name: 'Video production (one-time /12)', low: 0, medium: 0, high: 42, notes: '$500 one-time amortized' },
  { category: 'Content', name: 'Photography (one-time /12)', low: 0, medium: 21, high: 0, notes: '$250 one-time amortized' },
  { category: 'Physical', name: 'Bilingual flyers & printing', low: 75, medium: 75, high: 100, notes: 'Arlandria, churches, grocery' },
  { category: 'Physical', name: 'Exterior signage (one-time /12)', low: 0, medium: 0, high: 45, notes: '$540 one-time amortized' },
  { category: 'Community', name: 'Event sponsorships & booth fees', low: 0, medium: 100, high: 300, notes: 'Farmers market, Cinco de Mayo, etc.' },
  { category: 'Community', name: 'Referral program credits', low: 150, medium: 150, high: 150, notes: '$100–150 per referred enrollment' },
  { category: 'Agency', name: 'Marketing agency / freelancer', low: 0, medium: 0, high: 800, notes: 'Childcare-focused preferred' },
  { category: 'Tech', name: 'Brightwheel / HiMama (parent app)', low: 0, medium: 0, high: 100, notes: 'Also a retention tool' },
  { category: 'Tech', name: 'Canva Pro (design tool)', low: 13, medium: 13, high: 13, notes: 'For social media & flyers' },
]

const CATEGORIES = [...new Set(DEFAULT_ITEMS.map(i => i.category))]
const CAT_COLORS = {
  Foundation: '#eff6ff',
  Organic: '#f0fdf4',
  'Paid Ads': '#fff3ed',
  SEO: '#fdf4ff',
  Directories: '#fffbeb',
  Content: '#e8f5ee',
  Physical: '#fef2f2',
  Community: '#fff3ed',
  Agency: '#f0fdf4',
  Tech: '#eff6ff',
}

export default function BudgetCalculator() {
  const [items, setItems] = useLocalStorage('budgetItems', DEFAULT_ITEMS)
  const [tier, setTier] = useLocalStorage('budgetTier', 'medium')
  const [capacity, setCapacity] = useLocalStorage('capacity', 40)
  const [fillPct, setFillPct] = useLocalStorage('fillPct', 60)
  const [infantTuition, setInfantTuition] = useLocalStorage('infantTuition', 1850)

  const updateItem = (i, field, val) => {
    setItems(prev => prev.map((item, j) => j === i ? { ...item, [field]: parseFloat(val) || 0 } : item))
  }

  const total = items.reduce((sum, item) => sum + (item[tier] || 0), 0)
  const monthlyRevenue = Math.round(capacity * (fillPct / 100) * infantTuition)
  const marketingPct = monthlyRevenue > 0 ? ((total / monthlyRevenue) * 100).toFixed(1) : 0

  return (
    <div>
      <div className="page-header">
        <h2>💰 Budget Calculator</h2>
        <p>Customize your monthly marketing spend and see how it compares to projected revenue.</p>
      </div>

      <div className="tier-tabs">
        {['low', 'medium', 'high'].map(t => (
          <button
            key={t}
            className={`tier-tab ${tier === t ? `active ${t}` : ''}`}
            onClick={() => setTier(t)}
          >
            {t === 'low' ? '🔵 Low' : t === 'medium' ? '🟢 Medium' : '🟠 High'}
          </button>
        ))}
      </div>

      <div className="grid-3" style={{ marginBottom: 16 }}>
        <div className="stat-card">
          <div className="label">Total Monthly Spend</div>
          <div className="value" style={{ color: '#e85d04' }}>${total.toLocaleString()}</div>
          <div className="sub">Across all channels</div>
        </div>
        <div className="stat-card">
          <div className="label">Est. Monthly Revenue</div>
          <div className="value" style={{ color: '#2d6a4f' }}>${monthlyRevenue.toLocaleString()}</div>
          <div className="sub">{capacity} seats × {fillPct}% fill × ${infantTuition}/mo</div>
        </div>
        <div className="stat-card">
          <div className="label">Marketing % of Revenue</div>
          <div className="value" style={{ color: parseFloat(marketingPct) > 20 ? '#ef4444' : '#10b981' }}>
            {marketingPct}%
          </div>
          <div className="sub">Target: 10–20% year 1</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Revenue Assumptions</div>
        <div className="grid-3">
          <div>
            <label style={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>Licensed Capacity (children)</label>
            <input className="input" type="number" value={capacity} onChange={e => setCapacity(Number(e.target.value))} min={1} />
          </div>
          <div>
            <label style={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>Fill Rate (%)</label>
            <input className="input" type="number" value={fillPct} onChange={e => setFillPct(Number(e.target.value))} min={1} max={100} />
          </div>
          <div>
            <label style={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>Avg Tuition / Child / Month ($)</label>
            <input className="input" type="number" value={infantTuition} onChange={e => setInfantTuition(Number(e.target.value))} min={500} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Line-Item Budget (click any value to edit)</div>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Channel / Item</th>
              <th style={{ width: 100 }}>Low/mo</th>
              <th style={{ width: 100 }}>Med/mo</th>
              <th style={{ width: 100 }}>High/mo</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>
                  <span style={{
                    padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600,
                    background: CAT_COLORS[item.category] || '#f3f4f6', color: '#374151'
                  }}>{item.category}</span>
                </td>
                <td style={{ fontWeight: 500 }}>{item.name}</td>
                {['low', 'medium', 'high'].map(t => (
                  <td key={t} style={{ background: tier === t ? (t === 'low' ? '#eff6ff' : t === 'medium' ? '#e8f5ee' : '#fff3ed') : 'transparent' }}>
                    <input
                      type="number"
                      value={item[t]}
                      onChange={e => updateItem(i, t, e.target.value)}
                      style={{
                        width: '80px', padding: '4px 8px', border: '1.5px solid #e5e7eb',
                        borderRadius: 6, fontSize: 13, textAlign: 'right', outline: 'none',
                        background: 'transparent', fontWeight: tier === t ? 700 : 400
                      }}
                      onFocus={e => e.target.style.borderColor = '#e85d04'}
                      onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </td>
                ))}
                <td style={{ fontSize: 12, color: '#6b7280' }}>{item.notes}</td>
              </tr>
            ))}
            <tr style={{ background: '#f9fafb', fontWeight: 700 }}>
              <td colSpan={2} style={{ fontWeight: 700 }}>TOTAL</td>
              {['low', 'medium', 'high'].map(t => (
                <td key={t} style={{
                  fontWeight: 700, fontSize: 14,
                  color: t === 'low' ? '#1d4ed8' : t === 'medium' ? '#2d6a4f' : '#e85d04'
                }}>
                  ${items.reduce((s, item) => s + (item[t] || 0), 0).toLocaleString()}
                </td>
              ))}
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
