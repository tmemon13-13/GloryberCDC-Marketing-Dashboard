import { useLocalStorage } from '../components/useLocalStorage'
import { useState } from 'react'

const STATUSES = ['New Inquiry', 'Tour Scheduled', 'Tour Complete', 'Application Sent', 'Enrolled', 'Lost']
const SOURCES = ['Google', 'Facebook/Instagram', 'Nextdoor', 'Care.com/Winnie', 'Referral', 'Flyer', 'Walk-In', 'Event', 'Other']
const STATUS_COLORS = {
  'New Inquiry': 'badge-blue',
  'Tour Scheduled': 'badge-yellow',
  'Tour Complete': 'badge-orange',
  'Application Sent': 'badge-orange',
  'Enrolled': 'badge-green',
  'Lost': 'badge-gray',
}

const EMPTY_LEAD = { name: '', phone: '', email: '', childAge: '', source: 'Google', status: 'New Inquiry', notes: '', date: '' }

export default function LeadTracker() {
  const [leads, setLeads] = useLocalStorage('leads', [])
  const [form, setForm] = useState(EMPTY_LEAD)
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('All')

  const addLead = () => {
    if (!form.name) return
    setLeads(prev => [{ ...form, id: Date.now(), date: form.date || new Date().toLocaleDateString() }, ...prev])
    setForm(EMPTY_LEAD)
    setShowForm(false)
  }

  const updateLead = (id, field, val) =>
    setLeads(prev => prev.map(l => l.id === id ? { ...l, [field]: val } : l))

  const deleteLead = (id) => setLeads(prev => prev.filter(l => l.id !== id))

  const filtered = filter === 'All' ? leads : leads.filter(l => l.status === filter)

  const byStatus = STATUSES.reduce((acc, s) => {
    acc[s] = leads.filter(l => l.status === s).length
    return acc
  }, {})

  const conversionRate = leads.length > 0
    ? Math.round((byStatus['Enrolled'] / leads.length) * 100)
    : 0

  const bySource = SOURCES.reduce((acc, s) => {
    acc[s] = leads.filter(l => l.source === s).length
    return acc
  }, {})
  const topSource = Object.entries(bySource).sort((a, b) => b[1] - a[1])[0]

  return (
    <div>
      <div className="page-header">
        <h2>👥 Lead Tracker</h2>
        <p>Track every family from first inquiry to enrollment. All data saves automatically.</p>
      </div>

      <div className="grid-4" style={{ marginBottom: 16 }}>
        <div className="stat-card">
          <div className="label">Total Leads</div>
          <div className="value">{leads.length}</div>
          <div className="sub">All inquiries</div>
        </div>
        <div className="stat-card">
          <div className="label">Enrolled</div>
          <div className="value" style={{ color: '#10b981' }}>{byStatus['Enrolled'] || 0}</div>
          <div className="sub">Confirmed families</div>
        </div>
        <div className="stat-card">
          <div className="label">Conversion Rate</div>
          <div className="value" style={{ color: conversionRate >= 20 ? '#10b981' : '#f59e0b' }}>{conversionRate}%</div>
          <div className="sub">Inquiry → Enrolled</div>
        </div>
        <div className="stat-card">
          <div className="label">Top Source</div>
          <div className="value" style={{ fontSize: 16 }}>{topSource ? topSource[0] : '—'}</div>
          <div className="sub">{topSource ? `${topSource[1]} leads` : 'No data yet'}</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Pipeline Overview</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {STATUSES.map(s => (
            <div key={s} style={{
              flex: 1, minWidth: 90, background: '#f9fafb', borderRadius: 8,
              padding: '10px 14px', textAlign: 'center', border: '1px solid #e8e8e8'
            }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: s === 'Enrolled' ? '#10b981' : s === 'Lost' ? '#9ca3af' : '#1a1a2e' }}>
                {byStatus[s] || 0}
              </div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['All', ...STATUSES].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                border: '1.5px solid',
                borderColor: filter === s ? '#e85d04' : '#e5e7eb',
                background: filter === s ? '#fff3ed' : '#fff',
                color: filter === s ? '#e85d04' : '#6b7280',
                cursor: 'pointer'
              }}
            >
              {s} {s !== 'All' && byStatus[s] ? `(${byStatus[s]})` : s === 'All' ? `(${leads.length})` : ''}
            </button>
          ))}
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>
          + Add Lead
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 16, border: '2px solid #e85d04' }}>
          <div className="card-title">Add New Lead</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
            {[
              ['name', 'Family / Parent Name', 'text'],
              ['phone', 'Phone Number', 'tel'],
              ['email', 'Email Address', 'email'],
              ['childAge', 'Child Age / DOB', 'text'],
              ['date', 'Inquiry Date', 'date'],
            ].map(([field, label, type]) => (
              <div key={field}>
                <label style={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>{label}</label>
                <input className="input" type={type} value={form[field]}
                  onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                  placeholder={`Enter ${label.toLowerCase()}`} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>Lead Source</label>
              <select className="input" value={form.source} onChange={e => setForm(p => ({ ...p, source: e.target.value }))}>
                {SOURCES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>Notes</label>
            <input className="input" value={form.notes}
              onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
              placeholder="Any details about this family..." />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary" onClick={addLead}>Save Lead</button>
            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>👥</div>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>{filter === 'All' ? 'No leads yet' : `No leads with status "${filter}"`}</div>
          <div style={{ fontSize: 13 }}>Click "+ Add Lead" to log your first family inquiry.</div>
        </div>
      ) : (
        <div className="card" style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Family</th>
                <th>Contact</th>
                <th>Child Age</th>
                <th>Source</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <tr key={lead.id}>
                  <td style={{ fontWeight: 600 }}>{lead.name}</td>
                  <td style={{ fontSize: 12 }}>
                    {lead.phone && <div>{lead.phone}</div>}
                    {lead.email && <div style={{ color: '#6b7280' }}>{lead.email}</div>}
                  </td>
                  <td style={{ fontSize: 12 }}>{lead.childAge || '—'}</td>
                  <td><span className="badge badge-blue">{lead.source}</span></td>
                  <td>
                    <select
                      value={lead.status}
                      onChange={e => updateLead(lead.id, 'status', e.target.value)}
                      style={{
                        padding: '4px 8px', borderRadius: 6, border: '1.5px solid #e5e7eb',
                        fontSize: 12, outline: 'none', cursor: 'pointer', background: '#fff'
                      }}
                    >
                      {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ fontSize: 12, color: '#6b7280', maxWidth: 180 }}>
                    <input
                      style={{ border: 'none', background: 'transparent', fontSize: 12, width: '100%', outline: 'none', color: '#6b7280' }}
                      value={lead.notes}
                      onChange={e => updateLead(lead.id, 'notes', e.target.value)}
                      placeholder="Add note..."
                    />
                  </td>
                  <td style={{ fontSize: 12, color: '#9ca3af' }}>{lead.date}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteLead(lead.id)}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
