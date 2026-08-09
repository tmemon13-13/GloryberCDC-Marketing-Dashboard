import { useLocalStorage } from '../components/useLocalStorage'

const DEFAULT_PARTNERS = [
  { id: 1, name: 'CASA of Virginia', type: 'Advocacy Org', contact: '', status: 'Not Started', notes: 'Serves Latino/Hispanic community. Ask about referral partnerships and community announcements.' },
  { id: 2, name: 'Arlandria-Chirilagua Community', type: 'Neighborhood', contact: '', status: 'Not Started', notes: 'Highest Hispanic population density in Alexandria. Flyers, community events, word of mouth.' },
  { id: 3, name: 'WIC Office — Alexandria', type: 'Government', contact: '', status: 'Not Started', notes: 'WIC serves low-income families with young children. Request permission to leave flyers.' },
  { id: 4, name: 'Head Start Alexandria', type: 'Education', contact: '', status: 'Not Started', notes: 'Federal early childhood program. Potential referral source for families aging out of Head Start.' },
  { id: 5, name: 'Spanish-speaking Churches (multiple)', type: 'Faith', contact: '', status: 'Not Started', notes: 'Ask to post flyers, make announcements, or hold a parent info night. High trust channel.' },
  { id: 6, name: 'Telemundo Washington DC', type: 'Media', contact: '', status: 'Not Started', notes: 'Free press: pitch your bilingual daycare story for news coverage or a feature segment.' },
  { id: 7, name: 'Univision Washington DC', type: 'Media', contact: '', status: 'Not Started', notes: 'Same pitch as Telemundo. Opening of a bilingual daycare is a community interest story.' },
  { id: 8, name: 'Fiesta Supermarket (Alexandria)', type: 'Business', contact: '', status: 'Not Started', notes: 'Ask to post bilingual flyers in store. High foot traffic from Hispanic families.' },
  { id: 9, name: 'Las Americas Supermarket', type: 'Business', contact: '', status: 'Not Started', notes: 'Another high-traffic Hispanic grocery store in Northern Virginia.' },
  { id: 10, name: 'Alexandria City Public Schools', type: 'Education', contact: '', status: 'Not Started', notes: 'Connect with early childhood coordinators. Many families need daycare before kindergarten.' },
  { id: 11, name: 'Latinos in Virginia Empowerment Center', type: 'Advocacy Org', contact: '', status: 'Not Started', notes: 'Community organization supporting Latino families. Strong referral network.' },
  { id: 12, name: 'Local Pediatrician Offices', type: 'Healthcare', contact: '', status: 'Not Started', notes: 'Leave bilingual flyers in waiting rooms. Parents with newborns are actively planning childcare.' },
]

const STATUSES = ['Not Started', 'In Progress', 'Connected', 'Partnership Active']
const STATUS_COLORS = {
  'Not Started': 'badge-gray',
  'In Progress': 'badge-yellow',
  'Connected': 'badge-blue',
  'Partnership Active': 'badge-green',
}
const TYPE_ICONS = {
  'Advocacy Org': '🏛️', 'Neighborhood': '🏘️', 'Government': '🏥', 'Education': '🎓',
  'Faith': '⛪', 'Media': '📺', 'Business': '🏪', 'Healthcare': '👨‍⚕️'
}

export default function CommunityOutreach() {
  const [partners, setPartners] = useLocalStorage('partners', DEFAULT_PARTNERS)

  const updatePartner = (id, field, val) =>
    setPartners(prev => prev.map(p => p.id === id ? { ...p, [field]: val } : p))

  const active = partners.filter(p => p.status === 'Partnership Active').length
  const connected = partners.filter(p => p.status === 'Connected').length
  const inProgress = partners.filter(p => p.status === 'In Progress').length

  return (
    <div>
      <div className="page-header">
        <h2>🤝 Community Outreach</h2>
        <p>Track your relationships with community partners, media contacts, and referral sources.</p>
      </div>

      <div className="alert alert-success">
        🌟 <span><strong>Bilingual advantage:</strong> Gloryber has a unique edge in the Arlandria/Chirilagua neighborhood. Spanish-language outreach through churches, WIC, and community organizations is your highest-ROI channel — and it costs almost nothing.</span>
      </div>

      <div className="grid-4" style={{ marginBottom: 16 }}>
        <div className="stat-card"><div className="label">Total Partners</div><div className="value">{partners.length}</div></div>
        <div className="stat-card"><div className="label">In Progress</div><div className="value" style={{ color: '#f59e0b' }}>{inProgress}</div></div>
        <div className="stat-card"><div className="label">Connected</div><div className="value" style={{ color: '#1d4ed8' }}>{connected}</div></div>
        <div className="stat-card"><div className="label">Active Partnerships</div><div className="value" style={{ color: '#10b981' }}>{active}</div></div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">📋 Spanish-Language Content Calendar (Suggested)</div>
        <table>
          <thead>
            <tr><th>Week</th><th>Content</th><th>Platform</th><th>Language</th></tr>
          </thead>
          <tbody>
            {[
              ['Week 1', '"Meet our bilingual team" — staff intro photos', 'Facebook + Instagram', 'ES + EN'],
              ['Week 2', 'Facility tour video (60 sec)', 'Facebook, Instagram, WhatsApp', 'ES narration, EN subtitles'],
              ['Week 3', '"A day in the life at Gloryber" — classroom content', 'Instagram Stories', 'ES + EN'],
              ['Week 4', 'Enrollment open post with call to action', 'Facebook + Google Post', 'ES + EN'],
              ['Month 2', 'Open House invitation — event post', 'Facebook + Nextdoor + Flyers', 'ES primary'],
              ['Month 2', 'Press release sent to Telemundo/Univision', 'Media outreach', 'ES + EN'],
              ['Month 3', 'Parent testimonial (first families)', 'Facebook + Google Reviews', 'ES + EN'],
            ].map(([w, c, p, l]) => (
              <tr key={w}>
                <td><span className="badge badge-orange">{w}</span></td>
                <td>{c}</td>
                <td style={{ fontSize: 12, color: '#6b7280' }}>{p}</td>
                <td><span className="badge badge-green">{l}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-title">🗂️ Partner & Contact Tracker</div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Partner</th>
                <th>Type</th>
                <th>Contact Name / Info</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {partners.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 500 }}>
                    <span style={{ marginRight: 6 }}>{TYPE_ICONS[p.type] || '🤝'}</span>{p.name}
                  </td>
                  <td><span className="badge badge-gray">{p.type}</span></td>
                  <td>
                    <input
                      className="input input-sm"
                      placeholder="Add contact name/email..."
                      value={p.contact}
                      onChange={e => updatePartner(p.id, 'contact', e.target.value)}
                      style={{ minWidth: 160 }}
                    />
                  </td>
                  <td>
                    <select
                      value={p.status}
                      onChange={e => updatePartner(p.id, 'status', e.target.value)}
                      style={{
                        padding: '4px 8px', borderRadius: 6, border: '1.5px solid #e5e7eb',
                        fontSize: 12, outline: 'none', cursor: 'pointer', background: '#fff'
                      }}
                    >
                      {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ fontSize: 12, color: '#6b7280', maxWidth: 240 }}>{p.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-title">💬 Sample Bilingual Press Pitch</div>
        <div style={{
          background: '#f9fafb', borderRadius: 8, padding: 16, fontSize: 13,
          lineHeight: 1.8, borderLeft: '3px solid #e85d04'
        }}>
          <p><strong>Subject: New Bilingual Daycare Opening in Alexandria — Community Story</strong></p>
          <br />
          <p>Hi [Reporter Name],</p>
          <br />
          <p>I'm opening <strong>Gloryber Child Development Center</strong>, Alexandria's newest bilingual (Spanish/English) daycare, serving families in the Arlandria/Chirilagua neighborhood and surrounding areas. We're filling a real gap: while Alexandria has 282 licensed daycares, very few offer authentic bilingual programming accessible to working Spanish-speaking families.</p>
          <br />
          <p>Gloryber was built from the ground up with our community in mind — fully bilingual staff, curriculum that honors both languages, and pricing that makes quality childcare accessible. Our grand opening is [DATE].</p>
          <br />
          <p>I'd love to share our story with your audience. We're happy to arrange a facility tour and family interviews. Please reach me at [PHONE] or [EMAIL].</p>
          <br />
          <p>Con mucho gusto, / With gratitude,<br />[Your Name]<br />Founder, Gloryber Child Development Center</p>
        </div>
      </div>
    </div>
  )
}
