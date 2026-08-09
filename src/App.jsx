import { useState } from 'react'
import './index.css'
import Sidebar from './components/Sidebar'
import Overview from './pages/Overview'
import BrandIdentity from './pages/BrandIdentity'
import ChannelStrategy from './pages/ChannelStrategy'
import BudgetCalculator from './pages/BudgetCalculator'
import MilestoneTracker from './pages/MilestoneTracker'
import CommunityOutreach from './pages/CommunityOutreach'
import Retention from './pages/Retention'
import LeadTracker from './pages/LeadTracker'

const PAGES = {
  overview: Overview,
  brand: BrandIdentity,
  channels: ChannelStrategy,
  budget: BudgetCalculator,
  milestones: MilestoneTracker,
  outreach: CommunityOutreach,
  retention: Retention,
  leads: LeadTracker,
}

function App() {
  const [page, setPage] = useState('overview')
  const PageComponent = PAGES[page] || Overview

  return (
    <div className="layout">
      <Sidebar activePage={page} onNavigate={setPage} />
      <main className="main-content">
        <PageComponent />
      </main>
    </div>
  )
}

export default App
