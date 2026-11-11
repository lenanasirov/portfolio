
import { useEffect, useState } from 'react'
import './SideNavigation.css'
import { motion } from 'motion/react'

const sections = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'about', label: 'About', icon: 'about' },
  { id: 'skills', label: 'Skills', icon: 'skills' },
  { id: 'projects', label: 'Projects', icon: 'projects' },
  { id: 'experience', label: 'Experience', icon: 'resume' },
  { id: 'contact', label: 'Contact', icon: 'contact' },
]

function SectionIcon({ name }) {
  const common = {
    width: 21,
    height: 21,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const paths = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v12h14V9" /><path d="M9 21v-7h6v7" /></>,
    about: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    skills: <><path d="m8 8-4 4 4 4" /><path d="m16 8 4 4-4 4" /><path d="m14 5-4 14" /></>,
    projects: <><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /></>,
    resume: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8M8 17h8" /></>,
    contact: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  }

  return <svg {...common}>{paths[name]}</svg>
}

export default function SideNavigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [isLightSection, setIsLightSection] = useState(true)


  useEffect(() => {
    const updateActiveSection = () => {
      const viewportHeight = window.innerHeight;
  
      // Determine the active section using a point
      // 35% down the viewport.
      const activationPoint = viewportHeight * 0.35;
  
      let currentSection = null;
  
      for (const { id } of sections) {
        const element = document.getElementById(id);
  
        if (!element) continue;
  
        const rect = element.getBoundingClientRect();
  
        if (
          rect.top <= activationPoint &&
          rect.bottom > activationPoint
        ) {
          currentSection = element;
          break;
        }
      }
  
      // At the bottom of the page, always activate
      // the last section (Contact).
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;
  
      if (atBottom) {
        currentSection = document.getElementById('contact');
      }
  
      if (currentSection) {
        setActiveSection(currentSection.id);
        setIsLightSection(
          currentSection.dataset.theme === 'light'
        );
      }
    };
  
    updateActiveSection();
  
    window.addEventListener('scroll', updateActiveSection, {
      passive: true,
    });
  
    window.addEventListener('resize', updateActiveSection);
  
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);
  

  return (
    <motion.nav
        className={`side-navigation ${
          isLightSection ? 'side-navigation-light' : 'side-navigation-dark'
        }`}
        aria-label="Main navigation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
        }}
    >
      {sections.map(({ id, label, icon }) => (
        <motion.a
            key={id}
            className={`side-navigation-link ${
                activeSection === id ? 'is-active' : ''
            }`}
            href={`#${id}`}
            aria-label={label}
            aria-current={activeSection === id ? 'location' : undefined}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.3,
                delay: 0.12 + sections.findIndex((section) => section.id === id) * 0.06,
                ease: 'easeOut',
            }}
        >
          <span className="side-navigation-icon">
            <SectionIcon name={icon} />
          </span>
          <span className="side-navigation-label">{label}</span>
        </motion.a>
      ))}
    </motion.nav>
  )
}
