import { useState } from 'react'

const CHANNELS = {
  low: [
    { icon: '🗺️', bg: '#e8f5ee', name: 'Google Business Profile', desc: 'Claim and fully optimize. Post weekly updates, add photos, answer Q&A in English and Spanish. Appear in the Google Local Pack for "daycare near me Alexandria VA."', cost: 'Free', roi: 'Highest' },
    { icon: '📘', bg: '#eff6ff', name: 'Facebook Page + Parent Groups', desc: 'Create a bilingual Facebook page. Post 3–4x/week. Join every Alexandria/NoVA parent group and share your opening. Boost top posts for $50/mo.', cost: '$0–$50/mo', roi: 'High' },
    { icon: '📷', bg: '#fdf4ff', name: 'Instagram (Organic)', desc: 'Post daily Stories and 3–4 feed posts/week. Bilingual word-of-the-day, classroom setup, staff portraits. Hashtags: #AlexandriaVA #BilingualKids #GuarderíaAlexandria', cost: 'Free', roi: 'Medium' },
    { icon: '🏘️', bg: '#fffbeb', name: 'Nextdoor', desc: 'Create a business profile. Post in Del Ray, Arlandria, Potomac Yard, Old Town, Rosemont neighborhoods. Parents actively ask for childcare here.', cost: 'Free', roi: 'High' },
    { icon: '📄', bg: '#f0fdf4', name: 'Bilingual Flyers', desc: 'Distribute at laundromats, Hispanic grocery stores (Fiesta, Las Americas), churches, pediatrician offices, YMCA, libraries. Target Arlandria/Chirilagua first.', cost: '$50–$100', roi: 'Medium' },
    { icon: '🔗', bg: '#fff3ed', name: 'Free Directory Listings', desc: 'Create profiles on Winnie, Care.com (free), CareLuLu, Yelp, ChildcareFinder.net. These are where parents search first.', cost: 'Free', roi: 'High' },
    { icon: '🤝', bg: '#eff6ff', name: 'Referral Program', desc: 'Even pre-launch: "Refer a family who enrolls — get $100 off your first month." Word of mouth is the #1 way families find daycares.', cost: '$100–$200/mo credits', roi: 'Very High' },
  ],
  medium: [
    { icon: '🔍', bg: '#fff3ed', name: 'Google Ads — Local Search', desc: 'Target: "daycare Alexandria VA," "infant care Alexandria," "bilingual preschool Northern Virginia," "guardería Alexandria VA." At $3–8/click, $400/mo = 50–100 clicks. Expect 8–15 tour inquiries.', cost: '$300–$500/mo', roi: 'Very High' },
    { icon: '🎯', bg: '#eff6ff', name: 'Facebook & Instagram Ads', desc: 'Run TWO campaigns: English (parents 25–40, 5-mile radius) + Spanish (Spanish-speaking parents, same area). Cost per lead: ~$15–40. At $200/mo expect 5–12 inquiries.', cost: '$150–$250/mo', roi: 'High' },
    { icon: '📊', bg: '#f0fdf4', name: 'Local SEO & Citations', desc: 'Ensure your Name, Address, Phone (NAP) is consistent across 50+ directories. Use BrightLocal ($30/mo) or one-time citation cleanup. Boosts Google Local Pack ranking.', cost: '$30–$200/mo', roi: 'High' },
    { icon: '📧', bg: '#fffbeb', name: 'Email Marketing', desc: 'Build an email list from your inquiry form from day one. Monthly newsletter with classroom updates, bilingual tips, enrollment reminders. Mailchimp free up to 500 contacts.', cost: '$0–$15/mo', roi: 'Medium' },
    { icon: '📰', bg: '#fdf4ff', name: 'Local PR', desc: 'Pitch story to: Alexandria Living Magazine, ALXnow.com, Connection Newspapers, Telemundo/Univision Washington DC. Angle: bilingual daycare filling a community gap. Free — just effort.', cost: 'Free', roi: 'Very High' },
    { icon: '⭐', bg: '#fff3ed', name: 'Care.com Premium', desc: 'Premium listing puts you ahead of 90% of competitors in Care.com search. Worth it once organic is established.', cost: '$35–$50/mo', roi: 'Medium' },
    { icon: '🗺️', bg: '#e8f5ee', name: 'Google Local Services Ads', desc: 'Pay-per-lead (not per-click). These appear above regular Google Ads and show your star rating. $25–$60 per verified lead from parents actively searching for childcare.', cost: '$200–$400/mo', roi: 'Very High' },
  ],
  high: [
    { icon: '🎬', bg: '#fffbeb', name: 'YouTube / Video Ads', desc: 'Hire a local videographer for a 2–3 min bilingual facility tour. Run as YouTube pre-roll. Also use for Facebook video ads. One-time production + ongoing ad spend.', cost: '$200–$500 + $300/mo ads', roi: 'High' },
    { icon: '🖥️', bg: '#eff6ff', name: 'Google Display + Retargeting', desc: 'Show banner ads on parenting websites. Retarget anyone who visited your website but didn\'t inquire — show them ads as they browse elsewhere. Keeps you top of mind.', cost: '$200–$300/mo', roi: 'Medium' },
    { icon: '👩‍💼', bg: '#f0fdf4', name: 'Marketing Agency / Freelancer', desc: 'A childcare-focused agency manages your Google Ads, social media, and SEO. Look for agencies with childcare experience. Alternatively, hire a bilingual VA at $15–25/hr, 20 hrs/mo.', cost: '$500–$1,000/mo', roi: 'High' },
    { icon: '🎪', bg: '#fff3ed', name: 'Community Event Sponsorships', desc: 'Sponsor booths at: Alexandria Fall Festival, Cinco de Mayo events, Del Ray Farmers Market, Hispanic Heritage Month events, neighborhood school fairs. Monthly Open House events.', cost: '$100–$300/mo', roi: 'High' },
    { icon: '🚗', bg: '#fdf4ff', name: 'Physical Signage', desc: 'A-frame sidewalk signs, window vinyl graphics, exterior banner. Car magnet for center vehicle. Essential for drive-by visibility in your neighborhood.', cost: '$300–$600 one-time', roi: 'Medium' },
    { icon: '📱', bg: '#e8f5ee', name: 'Brightwheel / HiMama App', desc: 'Parent communication app that sends daily photos and updates to enrolled families. This IS a retention and referral tool — happy parents post about it and recommend you.', cost: '$0–$150/mo', roi: 'Very High' },
    { icon: '🏢', bg: '#eff6ff', name: 'Employer Partnerships', desc: 'Pitch to local employers with Spanish-speaking workforces (construction, restaurants, cleaning companies) about childcare for employees. Can fill spots fast via corporate referrals.', cost: 'Free (outreach time)', roi: 'High' },
  ],
}

const ROI_COLORS = { 'Very High': '#10b981', 'High': '#2d6a4f', 'Medium': '#f59e0b', 'Low': '#ef4444' }

export default function ChannelStrategy() {
  const [tier, setTier] = useState('medium')

  return (
    <div>
      <div className="page-header">
        <h2>📢 Channel Strategy</h2>
        <p>Select your budget tier to see the recommended marketing channels for that spend level.</p>
      </div>

      <div className="alert alert-info">
        💡 <span><strong>Note:</strong> Higher tiers include everything from lower tiers plus additional channels. Start with Low/Foundation, add paid channels as you grow.</span>
      </div>

      <div className="tier-tabs">
        <button className={`tier-tab ${tier === 'low' ? 'active low' : ''}`} onClick={() => setTier('low')}>
          🔵 Low Budget · ~$290/mo
        </button>
        <button className={`tier-tab ${tier === 'medium' ? 'active medium' : ''}`} onClick={() => setTier('medium')}>
          🟢 Medium Budget · ~$1,140/mo
        </button>
        <button className={`tier-tab ${tier === 'high' ? 'active high' : ''}`} onClick={() => setTier('high')}>
          🟠 High Budget · ~$3,388/mo
        </button>
      </div>

      <div className="card">
        <div className="card-title">
          {tier === 'low' && '🔵 Low Budget Channels (Organic & Free-First)'}
          {tier === 'medium' && '🟢 Medium Budget Channels (Add Paid Digital)'}
          {tier === 'high' && '🟠 High Budget Channels (Full Growth Mode)'}
          <span style={{ marginLeft: 'auto', fontSize: 12, color: '#6b7280', fontWeight: 400 }}>
            {CHANNELS[tier].length} channels
          </span>
        </div>
        {CHANNELS[tier].map((ch, i) => (
          <div key={i} className="channel-row">
            <div className="channel-icon" style={{ background: ch.bg }}>{ch.icon}</div>
            <div className="channel-info">
              <div className="channel-name">{ch.name}</div>
              <div className="channel-desc">{ch.desc}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, minWidth: 90 }}>
              <span className="channel-cost">{ch.cost}</span>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
                background: ROI_COLORS[ch.roi] + '20', color: ROI_COLORS[ch.roi]
              }}>ROI: {ch.roi}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title">🔑 Bilingual Channel Priorities</div>
        <table>
          <thead>
            <tr><th>Channel</th><th>English Audience</th><th>Spanish Audience</th><th>Priority</th></tr>
          </thead>
          <tbody>
            {[
              ['Google Business Profile', '✅ Critical', '✅ Critical (add Spanish description)', '🔥 #1'],
              ['Facebook Ads', '✅ English creative', '✅ Separate Spanish campaign', '🔥 #2'],
              ['Nextdoor', '✅ All neighborhoods', '✅ Arlandria/Chirilagua focus', '⚡ #3'],
              ['Spanish radio/TV (Telemundo/Univision)', '—', '✅ High reach, low cost PR', '⚡ #4'],
              ['Church partnerships', '—', '✅ Spanish-speaking congregations', '⚡ #5'],
              ['WIC / CASA Virginia', '—', '✅ Direct referral source', '⚡ #6'],
              ['Care.com / Winnie', '✅ Primary search', '✅ List bilingual in description', '✅ #7'],
            ].map(([ch, en, es, pri], i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{ch}</td>
                <td style={{ fontSize: 12 }}>{en}</td>
                <td style={{ fontSize: 12, color: '#2d6a4f' }}>{es}</td>
                <td><span className="badge badge-orange">{pri}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
