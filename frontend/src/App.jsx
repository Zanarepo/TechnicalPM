import { useState } from 'react'
import AnatomyLesson from './components/AnatomyLesson'
import NetworkSimulation from './components/NetworkSimulation'
import CourseOutline from './components/CourseOutline'
import ModuleExplainer from './components/ModuleExplainer'
import AuthLesson from './components/AuthLesson'
import TransferLesson from './components/TransferLesson'
import WebBasicsLesson from './components/WebBasicsLesson'
import BrowserDomLesson from './components/BrowserDomLesson'
import ReactLesson from './components/ReactLesson'
import MobileLesson from './components/MobileLesson'
import ApiLesson from './components/ApiLesson'
import SecurityLesson from './components/SecurityLesson'
import DatabaseLesson from './components/DatabaseLesson';
import MicroservicesLesson from './components/MicroservicesLesson';
import CloudLesson from './components/CloudLesson';
import AiLesson from './components/AiLesson';
import SystemDesignLesson from './components/SystemDesignLesson';
import PasswordBank from './components/PasswordBank';
import './App.css'

function App() {
  const [activeModule, setActiveModule] = useState('home');
  const [moduleTab, setModuleTab] = useState('rbac'); // Generic tab state for sub-modules
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  const modules = [
    { id: 1, name: "The Raw Materials", icon: "🏗️" },
    { id: 2, name: "The Browser & DOM", icon: "🌍" },
    { id: 3, name: "Modern Frameworks", icon: "⚛️" },
    { id: 4, name: "Mobile Apps", icon: "📱" },
    { id: 5, name: "APIs & Communication", icon: "🔌" },
    { id: 6, name: "Auth & Security", icon: "🔐" },
    { id: 7, name: "Databases (Ledger)", icon: "📒" },
    { id: 8, name: "Server Logic", icon: "🧠" },
    { id: 9, name: "Cloud & DevOps", icon: "☁️" },
    { id: 10, name: "AI & Analytics", icon: "🤖" },
    { id: 11, name: "System Design", icon: "🍻" },
  ];

  const handleModuleSelect = (id) => {
    setActiveModule(id);
    if (window.innerWidth <= 768) setIsSidebarOpen(false); // Close on mobile after click
  };

  // Module 6: Auth & Security Helper
  const renderModule6 = () => {
    return (
      <div>
        <div className="tab-bar">
          <button
            className={moduleTab === 'rbac' ? 'active-tab' : ''}
            onClick={() => setModuleTab('rbac')}
          >
            👮 Access Guard (RBAC)
          </button>
          <button
            className={moduleTab === 'security' ? 'active-tab' : ''}
            onClick={() => setModuleTab('security')}
          >
            🔐 Security Protocols (Hashing)
          </button>
        </div>
        {moduleTab === 'rbac' ? <AuthLesson /> : <SecurityLesson />}
      </div>
    );
  };

  const renderContent = () => {
    if (!activeModule || activeModule === 'home') return <CourseOutline onSelectModule={handleModuleSelect} />;

    return (
      <ModuleExplainer moduleId={activeModule}>
        {activeModule === 1 && <WebBasicsLesson />}
        {activeModule === 2 && <BrowserDomLesson />}
        {activeModule === 3 && <ReactLesson />}
        {activeModule === 4 && <MobileLesson />}
        {activeModule === 5 && <ApiLesson />}
        {activeModule === 6 && renderModule6()}
        {activeModule === 7 && <DatabaseLesson />}
        {activeModule === 8 && <MicroservicesLesson />}
        {activeModule === 9 && <CloudLesson />}
        {activeModule === 10 && <AiLesson />}
        {activeModule === 11 && <SystemDesignLesson />}

        {/* Fallback for new/undefined modules */}
        {activeModule > 11 && (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🚧</div>
            <h2>Module {activeModule}: Under Construction</h2>
            <p>This content is being built. Check back soon!</p>
          </div>
        )}

      </ModuleExplainer>
    );
  };

  return (
    <div className="app-container">
      {/* MOBILE HEADER / TOGGLE */}
      <div className="mobile-header">
        <button className="menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
        <div className="mobile-logo">🚀 TPM Lab</div>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <div className="logo" onClick={() => handleModuleSelect('home')}>🚀 TPM Lab</div>
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

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        {renderContent()}
      </main>
      <PasswordBank />
    </div>
  )
}

export default App
