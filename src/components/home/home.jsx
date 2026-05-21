import { useState, useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'
import './home.scss'

function Home() {
  const [examRunning, setExamRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(180) // 3 hours in minutes
  const [simulatedScore, setSimulatedScore] = useState(148.5)
  const [selectedUniversity, setSelectedUniversity] = useState('National University')
  const [aiMatchProbability, setAiMatchProbability] = useState(84)

  const tiltRef = useRef(null)

  // Initialize Vanilla Tilt effect on the showcase card
  useEffect(() => {
    const tiltElement = tiltRef.current
    if (tiltElement) {
      VanillaTilt.init(tiltElement, {
        max: 6,
        speed: 300,
        glare: true,
        'max-glare': 0.25,
        scale: 1.02,
        gyroscope: true
      })
    }
    return () => {
      if (tiltElement && tiltElement.vanillaTilt) {
        tiltElement.vanillaTilt.destroy()
      }
    }
  }, [])

  // Simulate dynamic dashboard progress
  useEffect(() => {
    let interval = null
    if (examRunning) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setExamRunning(false)
            return 180
          }
          return prev - 1
        })
        // fluctuate simulated DTM scores slightly during mock testing
        setSimulatedScore((prev) => {
          const delta = (Math.random() - 0.48) * 2
          const nextScore = prev + delta
          return Math.min(189, Math.max(50, parseFloat(nextScore.toFixed(1))))
        })
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [examRunning])

  // Function to randomize matching algorithm
  const handleStartAIMatch = () => {
    const universities = [
      'National University of Uzbekistan',
      'Tashkent State Technical University',
      'Tashkent University of Information Technologies',
      'Westminster International University',
      'Inha University in Tashkent'
    ]
    const randomUni = universities[Math.floor(Math.random() * universities.length)]
    setSelectedUniversity(randomUni)
    
    // Simulate thinking delay then update probability
    const targetProb = Math.floor(Math.random() * 36) + 60 // 60% to 95%
    let currentProb = 30
    const timer = setInterval(() => {
      currentProb += 5
      if (currentProb >= targetProb) {
        setAiMatchProbability(targetProb)
        clearInterval(timer)
      } else {
        setAiMatchProbability(currentProb)
      }
    }, 30)
  }

  // Format time (e.g. 180 min -> 03:00)
  const formatTime = (minutes) => {
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  }

  return (
    <>
      {/* Animated Caustics Orbs Background */}
      <div className="caustics-wrapper" aria-hidden="true">
        <div className="orb-1"></div>
        <div className="orb-2"></div>
      </div>

      {/* High-Spec Glass Header Navbar */}
      <header className="navbar">
        <div className="logo" onClick={() => window.location.reload()}>
          <div className="logo-dot"></div>
          <span>DTM Elite</span>
        </div>

        <nav>
          <ul className="nav-links">
            <li><a href="#universities">Universities</a></li>
            <li><a href="#simulator">Simulator</a></li>
            <li><a href="#ai-match">AI Match</a></li>
            <li><a href="#career">Career</a></li>
            <li><a href="#forum">Forum</a></li>
          </ul>
        </nav>

        <div className="nav-actions">
          <button className="search-btn" aria-label="Search items">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button className="dashboard-btn" aria-label="Access student dashboard">Dashboard</button>
        </div>
      </header>

      <main className="app-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="intelligence-pill">
            <span>⚡ Next-Gen Education Intelligence</span>
          </div>

          <h1 className="display-title">
            Your Path to University, <br />
            <span className="glow-text">Guided by </span>
            <span className="blue-text">AI.</span>
          </h1>

          <p className="subtitle">
            Match with your ideal faculty based on DTM results and master your exams with our premium university simulator.
          </p>

          <div className="cta-group">
            <button className="btn-primary" onClick={handleStartAIMatch} aria-label="Simulate AI match selection">
              <span>Start AI Match</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
            
            <button className="btn-secondary" onClick={() => setExamRunning(!examRunning)} aria-label="Toggle mock exam simulation">
              <span>{examRunning ? 'Stop Simulator' : 'Take Mock Exam'}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </button>
          </div>
        </section>

        {/* 3D Tilted Interactive Showcase Mockup */}
        <section className="dashboard-container-wrap">
          <div ref={tiltRef} className="tilted-dashboard-card" id="simulator">
            <div className="dashboard-simulator">
              
              {/* Simulated Left Sidebar */}
              <div className="sim-sidebar">
                <div className="sim-profile">
                  <div className="avatar">JR</div>
                  <div className="profile-info">
                    <span className="name">Jasur Rahimov</span>
                    <span className="role">Science Candidate</span>
                  </div>
                </div>

                <ul className="sim-nav">
                  <li className="active">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
                    Dashboard
                  </li>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    DTM Exams
                  </li>
                  <li onClick={handleStartAIMatch}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                    AI Matching
                  </li>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                    Analytics
                  </li>
                </ul>
              </div>

              {/* Simulated Center Area */}
              <div className="sim-body">
                <div className="sim-header">
                  <h3>Academic Performance Portal</h3>
                  <div className="tag">
                    {examRunning ? `🔴 Mock Exam Live: ${formatTime(timeRemaining)}` : '🟢 Status: Simulator Standby'}
                  </div>
                </div>

                <div className="sim-grid">
                  {/* Performance Curve Chart Card */}
                  <div className="sim-chart-card">
                    <div className="chart-info">
                      <span className="label">Simulated DTM Score History</span>
                      <span className="val">{simulatedScore} pts / 189 max</span>
                    </div>

                    <svg className="svg-chart" viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#bbe1fa" />
                          <stop offset="100%" stopColor="#3282b8" />
                        </linearGradient>
                        <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3282b8" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#0f4c75" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Horizontal Gridlines */}
                      <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                      <line x1="0" y1="60" x2="320" y2="60" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                      <line x1="0" y1="100" x2="320" y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

                      {/* Area Fill */}
                      <path className="area" d="M 0 120 L 0 95 Q 50 60 90 70 T 170 30 T 260 55 T 320 15 L 320 120 Z" />

                      {/* Stroke Line */}
                      <path className="line" d="M 0 95 Q 50 60 90 70 T 170 30 T 260 55 T 320 15" />

                      {/* Interactive Dot */}
                      <circle cx="320" cy="15" r="4" fill="#bbe1fa" />
                      <circle cx="320" cy="15" r="8" stroke="rgba(187, 225, 250, 0.4)" strokeWidth="2" fill="none" />
                    </svg>
                  </div>

                  {/* Radial Gauge Match Probability */}
                  <div className="sim-radar-card">
                    <span className="title">AI Match Probability</span>
                    
                    <div className="radial-progress">
                      <svg width="90" height="90" viewBox="0 0 100 100">
                        <circle className="circle-bg" cx="50" cy="50" r="40" />
                        <circle 
                          className="circle-progress" 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          style={{
                            strokeDasharray: '251.2',
                            strokeDashoffset: `${251.2 - (251.2 * aiMatchProbability) / 100}`
                          }}
                        />
                      </svg>
                      <span className="pct">{aiMatchProbability}%</span>
                    </div>

                    <span className="match-lbl" style={{fontSize: '9px', textTransform: 'uppercase'}}>
                      {selectedUniversity.split(' ').slice(0, 3).join(' ')}
                    </span>
                  </div>
                </div>

                {/* Bottom interactive action helper inside card */}
                <div style={{
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '12px 14px', 
                  background: 'rgba(187,225,250,0.03)', 
                  border: '1px dashed rgba(187,225,250,0.1)', 
                  borderRadius: 'var(--radius-default)',
                  fontSize: '11px',
                  color: 'var(--on-surface-variant)'
                }}>
                  <span>💡 Tip: Click <strong>Start AI Match</strong> above to dynamically run calculations on other universities!</span>
                  <span style={{color: '#fff', fontWeight: 600}}>Uni: {selectedUniversity}</span>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Stats Section Row */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-val">10,000+</div>
              <div className="stat-label">Active Students</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-val">80+</div>
              <div className="stat-label">Partner Universities</div>
            </div>

            <div className="stat-card">
              <div className="stat-val">500k+</div>
              <div className="stat-label">Mock Tests Taken</div>
            </div>
          </div>
        </section>

        {/* Precision Tools Grid */}
        <section className="features-section" id="precision-tools">
          <div className="section-header">
            <h2>Precision Tools for Success</h2>
            <p>Everything you need to navigate your academic future with confidence.</p>
          </div>

          <div className="features-grid">
            {/* Tool 1 */}
            <div className="feature-card">
              <div className="icon-container" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                </svg>
              </div>
              <h3>University Database</h3>
              <p>Access comprehensive rankings, admission requirements, and campus details for top-tier institutions.</p>
            </div>

            {/* Tool 2 */}
            <div className="feature-card">
              <div className="icon-container" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <h3>DTM Simulator</h3>
              <p>Experience the actual test environment with our adaptive exam engine powered by past results.</p>
            </div>

            {/* Tool 3 */}
            <div className="feature-card">
              <div className="icon-container" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <h3>AI Match</h3>
              <p>Our proprietary algorithm calculates your success probability for every faculty in the country.</p>
            </div>

            {/* Tool 4 */}
            <div className="feature-card">
              <div className="icon-container" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                  <line x1="15" y1="3" x2="15" y2="21"></line>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="3" y1="15" x2="21" y2="15"></line>
                </svg>
              </div>
              <h3>Personal Dashboard</h3>
              <p>Track your progress, monitor test scores, and manage your university applications in one place.</p>
            </div>

            {/* Tool 5 */}
            <div className="feature-card">
              <div className="icon-container" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                </svg>
              </div>
              <h3>Career Guidance</h3>
              <p>Connect your choice of study with real-world market demand and long-term professional success.</p>
            </div>

            {/* Tool 6 */}
            <div className="feature-card">
              <div className="icon-container" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3>Community Forum</h3>
              <p>Join a network of thousands of students sharing advice, resources, and exam strategies.</p>
            </div>
          </div>
        </section>

        {/* Vision Statement Section */}
        <section className="vision-section">
          <div className="vision-container">
            <span className="vision-badge">Our Vision</span>
            <h2>
              Democratizing elite education access through <br />
              <span className="gradient-glow">data-driven insights.</span>
            </h2>
            <p>
              "We believe that every student deserves a clear path to their future. By combining advanced AI with comprehensive academic data, we remove the guesswork from university applications and empower the next generation of leaders."
            </p>
            <div className="divider-glow" aria-hidden="true"></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="app-container" style={{paddingTop: '0'}}>
        <div className="footer">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo">
                <div className="logo-dot"></div>
                <span>DTM Elite</span>
              </div>
              <p>
                Building the future of academic preparation and university matching.
              </p>
            </div>

            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#help">Help Center</a>
              <a href="#contact">Contact Us</a>
            </div>
          </div>

          <div className="footer-divider" aria-hidden="true"></div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} DTM Elite University Platform. All Rights Reserved.</span>
            <span>Made with Liquid Deep Glassmorphism</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home
