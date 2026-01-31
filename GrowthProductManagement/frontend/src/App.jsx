import { useState, useEffect } from 'react'
import CourseOutline from './components/CourseOutline'
import ModuleExplainer from './components/ModuleExplainer'
import PasswordBank from './components/PasswordBank'
import './App.css'
import './index.css'

function App() {
  const [activeModule, setActiveModule] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [backendStatus, setBackendStatus] = useState(null);

  // Check Backend Status on Mount
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
    fetch(`${apiUrl}/api/status`)
      .then(res => res.json())
      .then(data => setBackendStatus(data))
      .catch(err => console.error("Backend Error:", err));
  }, []);

  const modules = [
    { id: 1, name: "Growth Mindset & Loops", icon: "🔄" },
    { id: 2, name: "Funnel Stages (AARRR)", icon: "🏴‍☠️" },
    { id: 3, name: "Acquisition & SEO", icon: "🔍" },
    { id: 4, name: "Growth Hacks & Virality", icon: "🚀" },
    { id: 5, name: "Activation & Onboarding", icon: "⚡" },
    { id: 6, name: "Retention & Engagement", icon: "🎣" },
    { id: 7, name: "Monetization Strategy", icon: "💰" },
    { id: 8, name: "Experimentation (A/B)", icon: "🧪" },
    { id: 9, name: "Psychology of Growth", icon: "🧠" },
    { id: 10, name: "The Growth Tech Stack", icon: "🛠️" },
    { id: 11, name: "Mixpanel Analytics", icon: "📊" },
    { id: 12, name: "Sandwich Shop Analysis", icon: "🥪" },
    { id: 13, name: "Real World Analysis: Banking", icon: "🏦" },
    { id: 14, name: "Ride Hailing Strategy", icon: "🚖" },
    { id: 15, name: "E-Commerce & Attribution", icon: "🛍️" },
  ];

  const handleModuleSelect = (id) => {
    setActiveModule(id);
    if (window.innerWidth <= 768) setIsSidebarOpen(false); // Close on mobile after click
  };

  const renderContent = () => {
    if (!activeModule || activeModule === 'home') return <CourseOutline onSelectModule={handleModuleSelect} />;

    return (
      <ModuleExplainer moduleId={activeModule}>
        {/* Placeholder for Interactive Lessons */}
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          Interactive Component for <strong>{modules.find(m => m.id === activeModule)?.name}</strong> coming soon...
          {backendStatus && <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>Backend: {backendStatus.status}</p>}
        </div>
      </ModuleExplainer>
    );
  };

  const renderNavButtons = () => {
    // Determine Current ID (Home = 0)
    let currentId = activeModule === 'home' ? 0 : activeModule;
    let prevId = null;
    let nextId = null;

    if (currentId === 0) {
      nextId = 1;
    } else {
      prevId = currentId === 1 ? 'home' : currentId - 1;
      // Check if next module exists
      if (currentId < modules.length) nextId = currentId + 1;
    }

    return (
      <div style={{ display: 'flex', gap: '10px' }}>
        {prevId !== null && (
          <button onClick={() => { handleModuleSelect(prevId); window.scrollTo(0, 0); }} style={navBtnStyle}>
            ⬅ Prev
          </button>
        )}

        {nextId !== null && (
          <button onClick={() => { handleModuleSelect(nextId); window.scrollTo(0, 0); }} style={navBtnStyle}>
            Next ➡
          </button>
        )}
      </div>
    );
  };

  const navBtnStyle = {
    padding: '8px 16px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: '#1a237e',
    border: '1px solid #1a237e',
    borderRadius: '20px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.2s'
  };

  return (
    <div className="app-container">
      {/* MOBILE HEADER / TOGGLE */}
      <div className="mobile-header">
        <button className="menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
        <div className="mobile-logo">🚀 Growth PM Lab</div>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <nav className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="logo-container">
          <div className="logo" onClick={() => handleModuleSelect('home')}>🚀 Growth PM Lab</div>
          <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>×</button>
        </div>

        <ul className="nav-links">
          <li
            className={activeModule === 'home' ? 'active' : ''}
            onClick={() => handleModuleSelect('home')}
          >
            📋 Course Outline
          </li>

          {modules.map(m => (
            <li
              key={m.id}
              className={activeModule === m.id ? 'active' : ''}
              onClick={() => handleModuleSelect(m.id)}
            >
              <span style={{ marginRight: '10px' }}>{m.icon}</span>
              Module {m.id}: {m.name}
            </li>
          ))}
        </ul>
      </nav>

      {/* OVERLAY FOR MOBILE */}
      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* RIGHT SIDE LAYOUT (HEADER + SCROLLABLE CONTENT) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

        {/* FIXED TOP BAR */}
        <header style={{
          height: '60px',
          background: 'white',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          flexShrink: 0,
          zIndex: 800
        }}>
          {/* LEFT: Menu */}
          <div style={{ width: '50px' }}>
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#1a237e' }}>☰</button>
            )}
          </div>

          {/* RIGHT: Buttons */}
          {renderNavButtons()}
        </header>

        {/* SCROLLABLE MAIN CONTENT */}
        <main className="main-content" style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          {renderContent()}
        </main>

      </div>

      <PasswordBank />
    </div>
  )
}

export default App
