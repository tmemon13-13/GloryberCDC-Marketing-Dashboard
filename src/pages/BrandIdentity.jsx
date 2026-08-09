import { useLocalStorage } from '../components/useLocalStorage'

const DEFAULT_BRAND = {
  centerName: 'Gloryber Child Development Center',
  centerNameEs: 'Centro de Desarrollo Infantil Gloryber',
  tagline: 'Growing Together, Two Languages at a Time',
  taglineEs: 'Creciendo Juntos, en Dos Idiomas',
  phone: '',
  email: '',
  address: 'Alexandria, VA',
  website: '',
  primaryColor: '#e85d04',
  facebook: '',
  instagram: '',
  nextdoor: '',
}

const BRAND_CHECKLIST = [
  { id: 'logo', label: 'Logo designed (bilingual-friendly, warm colors)', cost: '$300–$800 (designer) or $0 (Canva)' },
  { id: 'colors', label: 'Brand color palette selected', cost: 'Free' },
  { id: 'tagline', label: 'Taglines written in English & Spanish', cost: 'Free' },
  { id: 'domain', label: 'Domain name purchased (e.g. gloryberdaycare.com)', cost: '$12–$15/yr' },
  { id: 'email', label: 'Professional email set up (e.g. info@gloryberdaycare.com)', cost: '$6–$12/mo' },
  { id: 'website', label: 'Website live with bilingual pages', cost: '$200–$2,500 one-time + $15/mo hosting' },
  { id: 'photos', label: 'Professional facility photos taken', cost: '$200–$500 one-time' },
  { id: 'video', label: 'Welcome video (English & Spanish)', cost: '$200–$500 one-time' },
  { id: 'print', label: 'Bilingual flyers & brochures printed', cost: '$50–$150' },
  { id: 'signage', label: 'Exterior signage / A-frame / window vinyl', cost: '$300–$600 one-time' },
]

export default function BrandIdentity() {
  const [brand, setBrand] = useLocalStorage('brand', DEFAULT_BRAND)
  const [checks, setChecks] = useLocalStorage('brandChecks', BRAND_CHECKLIST.map(c => ({ ...c, done: false })))

  const update = (field, val) => setBrand(prev => ({ ...prev, [field]: val }))
  const toggleCheck = (i) => setChecks(prev => prev.map((c, j) => j === i ? { ...c, done: !c.done } : c))

  const done = checks.filter(c => c.done).length
  const pct = Math.round((done / checks.length) * 100)

  return (
    <div>
      <div className="page-header">
        <h2>🎨 Brand & Identity</h2>
        <p>Your brand is the first impression every family has. Make it bilingual from day one.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Center Information</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['centerName', 'Center Name (English)', 'text'],
              ['centerNameEs', 'Center Name (Spanish)', 'text'],
              ['tagline', 'Tagline (English)', 'text'],
              ['taglineEs', 'Tagline (Spanish)', 'text'],
              ['address', 'Address', 'text'],
              ['phone', 'Phone Number', 'tel'],
              ['email', 'Email Address', 'email'],
              ['website', 'Website URL', 'url'],
            ].map(([field, label, type]) => (
              <div key={field}>
                <label style={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>{label}</label>
                <input
                  className="input"
                  type={type}
                  value={brand[field] || ''}
                  onChange={e => update(field, e.target.value)}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card">
            <div className="card-title">Social Media Handles</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['facebook', '📘 Facebook Page URL'],
                ['instagram', '📷 Instagram Handle'],
                ['nextdoor', '🏘️ Nextdoor Business Profile URL'],
              ].map(([field, label]) => (
                <div key={field}>
                  <label style={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>{label}</label>
                  <input
                    className="input"
                    value={brand[field] || ''}
                    onChange={e => update(field, e.target.value)}
                    placeholder="Enter URL or handle"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title">Brand Color</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input
                type="color"
                value={brand.primaryColor}
                onChange={e => update('primaryColor', e.target.value)}
                style={{ width: 48, height: 48, border: 'none', borderRadius: 8, cursor: 'pointer', background: 'none' }}
              />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{brand.primaryColor}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>Primary brand color</div>
              </div>
              <div style={{
                flex: 1, height: 40, borderRadius: 8,
                background: brand.primaryColor, opacity: 0.85
              }} />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">
          Brand Setup Checklist
          <span className="badge badge-orange" style={{ marginLeft: 'auto' }}>{done}/{checks.length} done · {pct}%</span>
        </div>
        <div className="progress-bar" style={{ marginBottom: 16 }}>
          <div className="progress-fill" style={{ width: `${pct}%`, background: '#e85d04' }} />
        </div>
        <table>
          <thead>
            <tr>
              <th style={{ width: 32 }}></th>
              <th>Task</th>
              <th>Est. Cost</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((c, i) => (
              <tr key={c.id} style={{ opacity: c.done ? 0.5 : 1 }}>
                <td>
                  <div
                    className={`milestone-check ${c.done ? 'done' : ''}`}
                    onClick={() => toggleCheck(i)}
                    style={{ margin: 0 }}
                  />
                </td>
                <td style={{ textDecoration: c.done ? 'line-through' : 'none', color: c.done ? '#9ca3af' : 'inherit' }}>
                  {c.label}
                </td>
                <td><span className="badge badge-gray">{c.cost}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-title">💡 Bilingual Branding Tips</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ background: '#f9fafb', borderRadius: 8, padding: 14 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>✅ Do</div>
            <ul style={{ paddingLeft: 18, color: '#374151' }}>
              <li>Lead with warmth — families trust warmth over polish</li>
              <li>Use both languages equally (not Spanish as an afterthought)</li>
              <li>Feature bilingual staff prominently in photos</li>
              <li>Use bright, welcoming colors (not corporate blues)</li>
              <li>Show real children from your community</li>
            </ul>
          </div>
          <div style={{ background: '#fef2f2', borderRadius: 8, padding: 14 }}>
            <div style={{ fontWeight: 600, marginBottom: 6, color: '#b91c1c' }}>❌ Avoid</div>
            <ul style={{ paddingLeft: 18, color: '#374151' }}>
              <li>Generic stock photos of children</li>
              <li>Machine-translated Spanish (get a native speaker to review)</li>
              <li>Logos that are hard to read at small sizes</li>
              <li>Inconsistent name/address spelling across platforms</li>
              <li>Missing contact info or no clear CTA on every page</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
