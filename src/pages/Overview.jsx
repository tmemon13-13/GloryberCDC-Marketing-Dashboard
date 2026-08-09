import { useLocalStorage } from '../components/useLocalStorage'

const QUICK_WINS = [
  'Claim Google Business Profile',
  'Buy domain name',
  'Set up Facebook & Instagram pages',
  'Create Care.com listing',
  'Join Alexandria parent Facebook groups',
  'Print first batch of bilingual flyers',
]

export default function Overview() {
  const [milestones] = useLocalStorage('milestones', [])
  const [leads] = useLocalStorage('leads', [])
  const [wins, setWins] = useLocalStorage('quickwins', QUICK_WINS.map(w => ({ label: w, done: false })))

  const doneMs = milestones.filter(m => m.done).length
  const totalMs = milestones.length || 1
  const msPct = Math.round((doneMs / totalMs) * 100)

  const wonLeads = leads.filter(l => l.status === 'Enrolled').length

  return (
    <div>
      <div className="page-header">
        <h2>Marketing Overview</h2>
        <p>Gloryber Child Development Center · Alexandria, VA · Pre-Launch Dashboard</p>
      </div>

      <div className="alert alert-orange">
        🚀 <span>You are in <strong>pre-launch mode</strong>. Focus on foundation tasks before spending on paid ads. Target: open with a waitlist of 15–20 families.</span>
      </div>

      <div className="grid-4">
        <div className="stat-card">
          <div className="label">Milestone Progress</div>
          <div className="value">{msPct}%</div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${msPct}%`, background: '#e85d04' }} /></div>
          <div className="sub">{doneMs} of {totalMs} complete</div>
        </div>
        <div className="stat-card">
          <div className="label">Total Leads</div>
          <div className="value">{leads.length}</div>
          <div className="sub">Families in pipeline</div>
        </div>
        <div className="stat-card">
          <div className="label">Enrolled</div>
          <div className="value" style={{ color: '#10b981' }}>{wonLeads}</div>
          <div className="sub">Confirmed enrollments</div>
        </div>
        <div className="stat-card">
          <div className="label">Avg Alexandria Tuition</div>
          <div className="value">$1,850</div>
          <div className="sub">Per month (infant)</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">🎯 Your Competitive Edge</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.7, color: '#374151' }}>
            <p style={{ marginBottom: 10 }}>There are <strong>282 licensed daycares</strong> in Alexandria — but very few offer true bilingual Spanish/English programming. The two closest competitors (Tierra Encantada, Early Steps) are premium chains. Gloryber can own the <strong>community-rooted, affordable bilingual niche</strong>.</p>
            <p>Alexandria is ~<strong>18% Hispanic/Latino</strong>. The Arlandria/Chirilagua neighborhood is your highest-priority target audience and is currently underserved.</p>
          </div>
        </div>

        <div className="card">
          <div className="card-title">⚡ Quick Wins Checklist</div>
          {wins.map((w, i) => (
            <div key={i} className="milestone-item">
              <div
                className={`milestone-check ${w.done ? 'done' : ''}`}
                onClick={() => setWins(prev => prev.map((x, j) => j === i ? { ...x, done: !x.done } : x))}
              />
              <div className="milestone-text">
                <div className={`milestone-title ${w.done ? 'done' : ''}`}>{w.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-3">
        <div className="card">
          <div className="card-title">💰 Budget Tiers</div>
          <div style={{ fontSize: 13, lineHeight: 1.8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ color: '#1d4ed8', fontWeight: 600 }}>🔵 Low</span>
              <span>~$290/mo</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ color: '#2d6a4f', fontWeight: 600 }}>🟢 Medium</span>
              <span>~$1,140/mo</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <span style={{ color: '#e85d04', fontWeight: 600 }}>🟠 High</span>
              <span>~$3,388/mo</span>
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: '#6b7280' }}>See Budget Calculator for full breakdown →</div>
        </div>

        <div className="card">
          <div className="card-title">📅 Key Enrollment Windows</div>
          <div style={{ fontSize: 13, lineHeight: 1.8 }}>
            <div style={{ padding: '4px 0', borderBottom: '1px solid #f0f0f0' }}>
              <span className="badge badge-orange" style={{ marginRight: 8 }}>Peak</span> Jan–March (fall enrollment)
            </div>
            <div style={{ padding: '4px 0', borderBottom: '1px solid #f0f0f0' }}>
              <span className="badge badge-orange" style={{ marginRight: 8 }}>Peak</span> July–August (mid-year start)
            </div>
            <div style={{ padding: '4px 0', borderBottom: '1px solid #f0f0f0' }}>
              <span className="badge badge-yellow" style={{ marginRight: 8 }}>Slow</span> Summer (June–July)
            </div>
            <div style={{ padding: '4px 0' }}>
              <span className="badge badge-green" style={{ marginRight: 8 }}>Steady</span> Sept–Dec
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">📊 Market Numbers</div>
          <div style={{ fontSize: 13, lineHeight: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Daycares in Alexandria</span><strong>282</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Avg infant tuition/wk</span><strong>$453</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Avg preschool tuition/wk</span><strong>$424</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Hispanic population</span><strong>~18%</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Google Ads cost/click</span><strong>$3–$8</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
