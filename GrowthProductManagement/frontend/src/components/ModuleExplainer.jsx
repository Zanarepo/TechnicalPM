import React, { useState } from 'react';
import { moduleContent } from '../data/moduleContent';

// Simulators
import GrowthLoopSimulator from './simulators/GrowthLoopSimulator';
import FunnelSimulator from './simulators/FunnelSimulator';
import ABTestSimulator from './simulators/ABTestSimulator';
import UXTestSimulator from './simulators/UXTestSimulator';
import MixpanelSimulator from './simulators/MixpanelSimulator';
import SandwichSimulator from './simulators/SandwichSimulator';
import SandwichDashboard from './simulators/SandwichDashboard';
import BankingDashboard from './simulators/BankingDashboard';
import RideHailingDashboard from './simulators/RideHailingDashboard';
import EcommerceDashboard from './simulators/EcommerceDashboard';

const ModuleExplainer = ({ moduleId, children }) => {
    const content = moduleContent[moduleId];
    const [activeTab, setActiveTab] = useState('casestudy'); // Default to case study for analysis

    if (!content) {
        return <div style={styles.container}>Construction in progress 🚧</div>;
    }

    // MAP MODULES TO SIMULATORS
    const renderSimulator = () => {
        switch (moduleId) {
            case 1: // Loops
            case 4: // Growth Hacks
                return <GrowthLoopSimulator />;
            case 2: // Funnels
            case 5: // Activation
            case 6: // Retention
            case 7: // Monetization
                return <FunnelSimulator />;
            case 8: // Experimentation
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <ABTestSimulator />
                        <UXTestSimulator />
                    </div>
                );
            case 11: // Mixpanel
                return <MixpanelSimulator />;
            case 12: // Sandwich Shop Analysis
                return <SandwichDashboard />;
            case 13: // Banking Analysis
                return <BankingDashboard />;
            case 14: // Ride Hailing Analysis
                return <RideHailingDashboard />;
            case 15: // E-Commerce Analysis
                return <EcommerceDashboard />;
            case 9: // Psychology
            case 10: // Tech Stack
            case 3: // Acquisition
                return (
                    <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                        <h3>🔍 Deep Dive Analysis</h3>
                        <p>Interactive simulation for this module is under development. Use the Concept and Case Study tabs for now!</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.badge}>Module {moduleId}</div>
                <h1>{content.title}</h1>
                <h3 style={styles.subtitle}>{content.subtitle}</h3>
                <p style={styles.description}>{content.description}</p>
            </header>

            {/* PERSISTENT DASHBOARD FOR MODULE 12 */}
            {moduleId === 12 ? (
                <div style={{ marginBottom: '2rem' }}>
                    <SandwichDashboard />
                </div>
            ) : (
                /* TABS FOR OTHER MODULES */
                <>
                    <div style={styles.tabContainer}>
                        <button
                            style={activeTab === 'concept' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
                            onClick={() => setActiveTab('concept')}
                        >
                            📘 Concept & Context
                        </button>
                        <button
                            style={activeTab === 'simulation' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
                            onClick={() => setActiveTab('simulation')}
                        >
                            🧪 Active Lab (Simulator)
                        </button>
                        <button
                            style={activeTab === 'casestudy' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
                            onClick={() => setActiveTab('casestudy')}
                        >
                            💼 Case Study: Analysis
                        </button>
                    </div>

                    {/* CONTENT AREA */}
                    <div style={styles.contentArea}>

                        {activeTab === 'concept' && (
                            <div className="concept-view">
                                {/* MENTAL MODEL CARD */}
                                <section style={styles.card}>
                                    <div style={styles.cardHeader}>🧠 Mental Model</div>
                                    <h3>{content.mentalModel.title}</h3>
                                    <p><em>{content.mentalModel.explanation}</em></p>
                                    <ul style={styles.list}>
                                        {content.mentalModel.points.map((point, index) => (
                                            <li key={index}>{point}</li>
                                        ))}
                                    </ul>
                                </section>

                                {/* DEEP DIVES (CONTEXT) */}
                                <div style={{ marginTop: '2rem' }}>
                                    <h3>📖 Deep Dive Definition</h3>
                                    <div
                                        style={{ lineHeight: '1.6' }}
                                        dangerouslySetInnerHTML={{ __html: content.deepDive || "<p>Deep dive content loading...</p>" }}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'simulation' && (
                            <div>
                                {renderSimulator()}
                            </div>
                        )}

                        {activeTab === 'casestudy' && (
                            <div>
                                {/* REAL WORLD EXAMPLE CARD */}
                                <section style={{ ...styles.card, borderColor: '#4caf50' }}>
                                    <div style={{ ...styles.cardHeader, backgroundColor: '#e8f5e9', color: '#2e7d32' }}>🌍 Real World Example</div>
                                    <h3>{content.realWorldExample.product}</h3>
                                    <p><em>{content.realWorldExample.explanation}</em></p>
                                    <ul style={styles.list}>
                                        {content.realWorldExample.points.map((point, index) => (
                                            <li key={index}>{point}</li>
                                        ))}
                                    </ul>
                                </section>

                                {/* STUDENT TASK & QnA SECTION */}
                                {content.studentTask && (
                                    <section style={{ ...styles.card, marginTop: '2rem', borderColor: '#ff9800' }}>
                                        <div style={{ ...styles.cardHeader, backgroundColor: '#fff3e0', color: '#e65100' }}>🛠️ Student Task</div>
                                        <h3>{content.studentTask.title}</h3>
                                        <p>{content.studentTask.description}</p>

                                        <div style={{ marginTop: '1.5rem' }}>
                                            <h4 style={{ marginBottom: '1rem', color: '#e65100' }}>🤔 Q&A & Validation</h4>
                                            {content.studentTask.qna.map((item, index) => (
                                                <details key={index} style={styles.details}>
                                                    <summary style={styles.summary}>{item.question}</summary>
                                                    <p style={styles.answer}>{item.answer}</p>
                                                </details>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                        )}

                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        marginBottom: '2rem',
        borderBottom: '1px solid #eee',
        paddingBottom: '1rem',
    },
    badge: {
        display: 'inline-block',
        backgroundColor: '#1a237e',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '16px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
    },
    subtitle: {
        color: '#666',
        fontWeight: 'normal',
        marginTop: '-0.5rem',
    },
    description: {
        fontSize: '1.2rem',
        color: '#333',
        marginTop: '1rem',
    },
    tabContainer: {
        display: 'flex',
        borderBottom: '2px solid #ddd',
        marginBottom: '2rem',
        gap: '10px'
    },
    tab: {
        padding: '10px 20px',
        background: 'none',
        border: 'none',
        borderBottom: '4px solid transparent',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#666',
        transition: 'all 0.2s'
    },
    activeTab: {
        color: '#1a237e',
        borderBottom: '4px solid #1a237e',
        backgroundColor: '#f5f5f5'
    },
    contentArea: {
        animation: 'fadeIn 0.3s ease-in'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
    },
    card: {
        border: '1px solid #1a237e',
        borderRadius: '12px',
        padding: '1.5rem',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    },
    cardHeader: {
        display: 'inline-block',
        backgroundColor: '#e8eaf6',
        color: '#1a237e',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    list: {
        marginTop: '1rem',
        paddingLeft: '1.2rem',
        lineHeight: '1.6',
    },
    details: {
        marginBottom: '1rem',
        border: '1px solid #eee',
        borderRadius: '8px',
        padding: '0.5rem',
        backgroundColor: '#fff',
    },
    summary: {
        fontWeight: 'bold',
        cursor: 'pointer',
        padding: '0.5rem',
        color: '#1a237e',
    },
    answer: {
        marginTop: '0.5rem',
        padding: '0.5rem',
        color: '#555',
        borderTop: '1px solid #eee',
    }
};

export default ModuleExplainer;
