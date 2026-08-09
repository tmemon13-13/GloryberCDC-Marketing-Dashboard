import { useLocalStorage } from '../components/useLocalStorage'

const DEFAULT_REVIEWS = []

export default function Retention() {
  const [reviews, setReviews] = useLocalStorage('reviews', DEFAULT_REVIEWS)
  const [newReview, setNewReview] = useLocalStorage('newReview', { family: '', stars: 5, platform: 'Google', note: '', date: '' })
  const [retentionData, setRetentionData] = useLocalStorage('retention', {
    currentEnrolled: 0,
    targetCapacity: 40,
    avgStars: 0,
    totalReviews: 0,
    brightwheelActive: false,
    cacfpApplied: false,
    referralProgramActive: false,
    openHouseScheduled: false,
  })

  const addReview = () => {
    if (!newReview.family) return
    const updated = [...reviews, { ...newReview, id: Date.now(), date: newReview.date || new Date().toLocaleDateString() }]
    setReviews(updated)
    const avgStars = (updated.reduce((s, r) => s + r.stars, 0) / updated.length).toFixed(1)
    setRetentionData(prev => ({ ...prev, totalReviews: updated.length, avgStars }))
    setNewReview({ family: '', stars: 5, platform: 'Google', note: '', date: '' })
  }

  const removeReview = (id) => {
    const updated = reviews.filter(r => r.id !== id)
    setReviews(updated)
    const avgStars = updated.length ? (updated.reduce((s, r) => s + r.stars, 0) / updated.length).toFixed(1) : 0
    setRetentionData(prev => ({ ...prev, totalReviews: updated.length, avgStars }))
  }

  const updateRD = (field, val) => setRetentionData(prev => ({ ...prev, [field]: val }))

  const fillPct = retentionData.targetCapacity > 0
    ? Math.round((retentionData.currentEnrolled / retentionData.targetCapacity) * 100)
    : 0

  return (
    <div>
      <div className="page-header">
        <h2>⭐ Retention & Reviews</h2>
        <p>Happy families stay, refer others, and leave reviews. Track it all here.</p>
      </div>

      <div className="grid-4" style={{ marginBottom: 16 }}>
        <div className="stat-card">
          <div className="label">Current Enrollment</div>
          <div className="value">{retentionData.currentEnrolled}</div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${fillPct}%`, background: fillPct >= 80 ? '#10b981' : '#e85d04' }} /></div>
          <div className="sub">{fillPct}% of {retentionData.targetCapacity} capacity</div>
        </div>
        <div className="stat-card">
          <div className="label">Avg Star Rating</div>
          <div className="value" style={{ color: '#f59e0b' }}>
            {retentionData.avgStars > 0 ? `⭐ ${retentionData.avgStars}` : '—'}
          </div>
          <div className="sub">{reviews.length} reviews tracked</div>
        </div>
        <div className="stat-card">
          <div className="label">5-Star Reviews</div>
          <div className="value" style={{ color: '#10b981' }}>{reviews.filter(r => r.stars === 5).length}</div>
          <div className="sub">Goal: 20+ in first 6 months</div>
        </div>
        <div className="stat-card">
          <div className="label">Retention Tools Active</div>
          <div className="value">
            {[retentionData.brightwheelActive, retentionData.cacfpApplied, retentionData.referralProgramActive].filter(Boolean).length}/3
          </div>
          <div className="sub">Brightwheel, CACFP, Referrals</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">📊 Enrollment Numbers</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>Currently Enrolled Children</label>
              <input className="input" type="number" value={retentionData.currentEnrolled} min={0}
                onChange={e => updateRD('currentEnrolled', Number(e.target.value))} />
            </div>
            <div>
              <label style={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>Licensed Capacity</label>
              <input className="input" type="number" value={retentionData.targetCapacity} min={1}
                onChange={e => updateRD('targetCapacity', Number(e.target.value))} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">🛠️ Retention Tools Checklist</div>
          {[
            ['brightwheelActive', '📱 Brightwheel/HiMama Active', 'Daily parent updates = happy families = referrals'],
            ['cacfpApplied', '🍎 CACFP Application Submitted', 'Free USDA food program funding. Signals affordability.'],
            ['referralProgramActive', '🎁 Referral Program Live', '$100–150 credit per enrolled referral'],
            ['openHouseScheduled', '🏠 Next Open House Scheduled', 'Monthly open houses fill remaining spots'],
          ].map(([field, label, desc]) => (
            <div key={field} className="milestone-item">
              <div
                className={`milestone-check ${retentionData[field] ? 'done' : ''}`}
                onClick={() => updateRD(field, !retentionData[field])}
              />
              <div className="milestone-text">
                <div className={`milestone-title ${retentionData[field] ? 'done' : ''}`}>{label}</div>
                <div className="milestone-meta">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">⭐ Log a Review</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto 1fr auto', gap: 10, alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>Family Name</label>
            <input className="input" placeholder="e.g. The Garcia Family"
              value={newReview.family} onChange={e => setNewReview(p => ({ ...p, family: e.target.value }))} />
          </div>
          <div>
            <label style={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>Stars</label>
            <select className="input" style={{ width: 80 }}
              value={newReview.stars} onChange={e => setNewReview(p => ({ ...p, stars: Number(e.target.value) }))}>
              {[5, 4, 3, 2, 1].map(s => <option key={s} value={s}>{s} ⭐</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>Platform</label>
            <select className="input" style={{ width: 110 }}
              value={newReview.platform} onChange={e => setNewReview(p => ({ ...p, platform: e.target.value }))}>
              {['Google', 'Yelp', 'Facebook', 'Care.com', 'Winnie', 'Other'].map(pl => <option key={pl}>{pl}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>Note (optional)</label>
            <input className="input" placeholder="Key quote or highlight"
              value={newReview.note} onChange={e => setNewReview(p => ({ ...p, note: e.target.value }))} />
          </div>
          <button className="btn btn-primary" onClick={addReview} style={{ marginBottom: 0 }}>Add</button>
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="card">
          <div className="card-title">📝 Review Log ({reviews.length})</div>
          <table>
            <thead><tr><th>Family</th><th>Rating</th><th>Platform</th><th>Note</th><th>Date</th><th></th></tr></thead>
            <tbody>
              {[...reviews].reverse().map(r => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 500 }}>{r.family}</td>
                  <td style={{ color: '#f59e0b', fontWeight: 700 }}>{'⭐'.repeat(r.stars)}</td>
                  <td><span className="badge badge-blue">{r.platform}</span></td>
                  <td style={{ fontSize: 12, color: '#6b7280' }}>{r.note || '—'}</td>
                  <td style={{ fontSize: 12, color: '#9ca3af' }}>{r.date}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeReview(r.id)}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="card">
        <div className="card-title">💡 Retention Best Practices</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 13 }}>
          {[
            ['📸 Daily Photo Updates', 'Use Brightwheel to send daily photos to parents. Families who see their kids thriving share it with friends.'],
            ['🗣️ Ask for Reviews Early', 'Send a text with a direct Google review link after the first 2 weeks. Never ask via email — text converts 5x better.'],
            ['🎂 Celebrate Milestones', 'Post birthday photos, first steps, first words. Parents love seeing their children celebrated.'],
            ['📅 Monthly Newsletters', 'Send a bilingual newsletter with classroom updates, upcoming events, and a "tip of the month" for parents.'],
            ['🏆 Referral Reminders', 'Mention your referral program monthly. Happy families forget — a gentle reminder converts to referrals.'],
            ['🍎 CACFP Participation', 'If you participate in CACFP, promote it. Lower-income families specifically look for this when choosing childcare.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ background: '#f9fafb', borderRadius: 8, padding: 14 }}>
              <div style={{ fontWeight: 600, marginBottom: 5 }}>{title}</div>
              <div style={{ color: '#6b7280', lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
