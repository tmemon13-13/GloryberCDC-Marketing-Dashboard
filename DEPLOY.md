# Gloryber Dashboard — Deploy to Netlify via GitHub

## Step 1: Push to GitHub
1. Create a new GitHub repository at github.com (click "New repository")
2. Name it: `gloryber-dashboard`
3. Open Terminal and run these commands from inside the `gloryber-dashboard` folder:

```bash
git init
git add .
git commit -m "Initial commit — Gloryber marketing dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gloryber-dashboard.git
git push -u origin main
```

## Step 2: Connect to Netlify
1. Go to netlify.com and sign in (or sign up — it's free)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select your `gloryber-dashboard` repository
5. Build settings will auto-detect from netlify.toml:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

Your dashboard will be live in ~60 seconds at a URL like `https://jolly-name-abc123.netlify.app`

## Step 3: Optional — Custom Domain
In Netlify → Site Settings → Domain Management, add your custom domain (e.g. `marketing.gloryberdaycare.com`)

## Local Development
To run locally:
```bash
npm install
npm run dev
```

## Pages Included
- **Overview** — Key stats, quick wins checklist, market data
- **Brand & Identity** — Editable center info, brand checklist, bilingual tips
- **Channel Strategy** — Low/Medium/High tier channel breakdowns
- **Budget Calculator** — Editable line-item budget with revenue comparison
- **Milestone Tracker** — 20 pre-launch milestones with progress tracking
- **Community Outreach** — Partner tracker, content calendar, press pitch template
- **Lead Tracker** — Full CRM: log inquiries, track status, see conversion rate
- **Retention & Reviews** — Enrollment tracker, review log, retention checklist

All data is saved in your browser's localStorage — no backend or database needed.
