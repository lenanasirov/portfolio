
import { useState } from 'react'
import './App.css'

import HomeSection from './components/sections/HomeSection'
import AboutSection from './components/sections/AboutSection'
import SkillsSection from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ContactSection from './components/sections/ContactSection'
import SideNavigation from './components/navigation/SideNavigation'

function App() {
  const [navigationVisible, setNavigationVisible] = useState(false)

  return (
    <div className="portfolio-page">
      {navigationVisible && <SideNavigation />}

      <HomeSection
        onTransitionStarted={() => setNavigationVisible(true)}
      />

      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  )
}

export default App
