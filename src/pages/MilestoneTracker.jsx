import { useLocalStorage } from '../components/useLocalStorage'

const DEFAULT_MILESTONES = [
  { id: 1, phase: 'Phase 1 · Foundation', title: 'Secure center location & licensing', detail: 'Confirm address, begin Virginia childcare licensing application', timing: '4+ months before open', done: false },
  { id: 2, phase: 'Phase 1 · Foundation', title: 'Purchase domain name', detail: 'e.g. gloryberdaycare.com or glorybercdc.com', timing: '3 months before open', done: false },
  { id: 3, phase: 'Phase 1 · Foundation', title: 'Logo & brand identity finalized', detail: 'Bilingual name, tagline, colors — reviewed by native Spanish speaker', timing: '3 months before open', done: false },
  { id: 4, phase: 'Phase 1 · Foundation', title: 'Website live (bilingual)', detail: 'Home, Programs, Tuition, About, Contact — all in English & Spanish', timing: '2.5 months before open', done: false },
  { id: 5, phase: 'Phase 1 · Foundation', title: 'Google Business Profile claimed & optimized', detail: 'Photos, hours, bilingual description, Q&A answered', timing: '2.5 months before open', done: false },
  { id: 6, phase: 'Phase 2 · Pre-Launch', title: 'Social media accounts created & branded', detail: 'Facebook Page, Instagram, Nextdoor — all bilingual', timing: '2.5 months before open', done: false },
  { id: 7, phase: 'Phase 2 · Pre-Launch', title: 'Begin organic social posting', detail: '3–4 posts/week. Join all Alexandria parent Facebook groups.', timing: '2 months before open', done: false },
  { id: 8, phase: 'Phase 2 · Pre-Launch', title: 'Listed on Care.com, Winnie, CareLuLu, Yelp', detail: 'Consistent NAP (name, address, phone) across all platforms', timing: '2 months before open', done: false },
  { id: 9, phase: 'Phase 2 · Pre-Launch', title: 'Launch Google Ads campaign', detail: 'Even a $200/mo budget. Target local search terms in English & Spanish.', timing: '2 months before open', done: false },
  { id: 10, phase: 'Phase 2 · Pre-Launch', title: 'First bilingual flyer distribution', detail: 'Arlandria, Hispanic grocery stores, churches, YMCA, libraries, pediatricians', timing: '2 months before open', done: false },
  { id: 11, phase: 'Phase 2 · Pre-Launch', title: 'Apply for CACFP food program', detail: 'USDA Child & Adult Care Food Program — free funding for meals/snacks', timing: '6 weeks before open', done: false },
  { id: 12, phase: 'Phase 2 · Pre-Launch', title: 'Press pitch sent to local media', detail: 'ALXnow.com, Alexandria Living, Telemundo/Univision DC, Connection Newspapers', timing: '6 weeks before open', done: false },
  { id: 13, phase: 'Phase 2 · Pre-Launch', title: 'Host first Open House event', detail: 'Bilingual, light refreshments, facility tour, enrollment sign-up', timing: '6 weeks before open', done: false },
  { id: 14, phase: 'Phase 2 · Pre-Launch', title: 'Enrollment waitlist officially open', detail: 'Accept pre-enrollments. Capture every family\'s email & phone.', timing: '4 weeks before open', done: false },
  { id: 15, phase: 'Phase 2 · Pre-Launch', title: 'Referral program launched', detail: '$100–$150 credit per enrolled family referred. Printed referral cards.', timing: '4 weeks before open', done: false },
  { id: 16, phase: 'Phase 3 · Opening', title: 'Grand Opening event', detail: 'Community event with bilingual staff, activities, media invited', timing: 'Opening week', done: false },
  { id: 17, phase: 'Phase 3 · Opening', title: 'Brightwheel / HiMama live for enrolled families', detail: 'Parent communication app for daily updates, photos, invoices', timing: 'Opening day', done: false },
  { id: 18, phase: 'Phase 3 · Opening', title: 'Begin Google review collection', detail: 'Text every enrolled family a direct review link. Goal: 20+ reviews in 6 months.', timing: 'Week 2 after open', done: false },
  { id: 19, phase: 'Phase 4 · Growth', title: 'Host second Open House', detail: 'Monthly open houses for first 3 months. Fill remaining spots.', timing: 'Month 2', done: false },
  { id: 20, phase: 'Phase 4 · Growth', title: 'Apply for employer partnerships', detail: 'Pitch to local employers with Spanish-speaking workforces', timing: 'Month 2–3', done: false },
]

const PHASES = [...new Set(DEFAULT_MILESTONES.map(m => m.phase))]

export default function MilestoneTracker() {
  const [milestones, setMilestones] = useLocalStorage('milestones', DEFAULT_MILESTONES)

  const toggle = (id) => setMilestones(prev => prev.map(m => m.id === id ? { ...m, done: !m.done } : m))

  const done = milestones.filter(m => m.done).length
  const pct = Math.round((done / milestones.length) * 100)

  return (
    <div>
      <div className="page-header">
        <h2>✅ Milestone Tracker</h2>
        <p>Check off each milestone as you complete it. Progress saves automatically.</p>
      </div>

      <div className="grid-3" style={{ marginBottom: 16 }}>
        <div className="stat-card">
          <div className="label">Overall Progress</div>
          <div className="value">{pct}%</div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%`, background: '#e85d04' }} /></div>
          <div className="sub">{done} of {milestones.length} milestones complete</div>
        </div>
        <div className="stat-card">
          <div className="label">Remaining Tasks</div>
          <div className="value" style={{ color: '#f59e0b' }}>{milestones.length - done}</div>
          <div className="sub">Still to complete</div>
        </div>
        <div className="stat-card">
          <div className="label">Completed</div>
          <div className="value" style={{ color: '#10b981' }}>{done}</div>
          <div className="sub">Great work!</div>
        </div>
      </div>

      {PHASES.map(phase => {
        const phaseMilestones = milestones.filter(m => m.phase === phase)
        const phaseDone = phaseMilestones.filter(m => m.done).length
        const phasePct = Math.round((phaseDone / phaseMilestones.length) * 100)

        return (
          <div className="card" key={phase} style={{ marginBottom: 16 }}>
            <div className="card-title">
              {phase}
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="progress-bar" style={{ width: 80, margin: 0 }}>
                  <div className="progress-fill" style={{ width: `${phasePct}%`, background: phasePct === 100 ? '#10b981' : '#e85d04' }} />
                </div>
                <span style={{ fontSize: 12, color: '#6b7280' }}>{phaseDone}/{phaseMilestones.length}</span>
              </div>
            </div>
            {phaseMilestones.map(m => (
              <div key={m.id} className="milestone-item">
                <div
                  className={`milestone-check ${m.done ? 'done' : ''}`}
                  onClick={() => toggle(m.id)}
                />
                <div className="milestone-text">
                  <div className={`milestone-title ${m.done ? 'done' : ''}`}>{m.title}</div>
                  <div className="milestone-meta">{m.detail}</div>
                </div>
                <span className="badge badge-gray" style={{ whiteSpace: 'nowrap', alignSelf: 'flex-start', marginTop: 2 }}>
                  {m.timing}
                </span>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
