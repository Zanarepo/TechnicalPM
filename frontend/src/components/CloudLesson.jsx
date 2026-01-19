import React, { useState } from 'react';
import PmInsight from './PmInsight';

const CloudLesson = () => {
    const [activeTab, setActiveTab] = useState('pipeline'); // pipeline, platforms, models
    const [pipelineStatus, setPipelineStatus] = useState('idle'); // idle, running, success, fail
    const [stages, setStages] = useState([
        { id: 'build', name: 'Build (Webpack)', status: 'waiting' }, // waiting, active, done, error
        { id: 'test', name: 'Test (Jest)', status: 'waiting' },
        { id: 'deploy', name: 'Deploy (AWS)', status: 'waiting' }
    ]);
    const [log, setLog] = useState("Ready to push code...");
    const [autoFix, setAutoFix] = useState(false);

    const runPipeline = async () => {
        if (pipelineStatus === 'running') return;

        setPipelineStatus('running');
        setLog("🚀 Git Push: Triggering Pipeline...");

        // Reset stages
        setStages(prev => prev.map(s => ({ ...s, status: 'waiting' })));

        // 1. BUILD STAGE
        setStages(prev => updateStage(prev, 'build', 'active'));
        await wait(1500);

        setStages(prev => updateStage(prev, 'build', 'done'));
        setLog("📦 Build Success: Bundle created (2.4MB)");

        // 2. TEST STAGE
        setStages(prev => updateStage(prev, 'test', 'active'));
        await wait(2000);

        // Random failure unless "AutoFix" is on
        const testPassed = autoFix || Math.random() > 0.5;

        if (!testPassed) {
            setStages(prev => updateStage(prev, 'test', 'error'));
            setPipelineStatus('fail');
            setLog("❌ Test Failed: 'Expected true to be false'");
            return;
        }

        setStages(prev => updateStage(prev, 'test', 'done'));
        setLog("✅ Tests Passed: 42/42 specs");

        // 3. DEPLOY STAGE
        setStages(prev => updateStage(prev, 'deploy', 'active'));
        await wait(1500);

        setStages(prev => updateStage(prev, 'deploy', 'done'));
        setPipelineStatus('success');
        setLog("🌍 Deployed to Production: v1.0.42 is Live!");
    };

    const updateStage = (stageList, id, status) => {
        return stageList.map(s => s.id === id ? { ...s, status } : s);
    };

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>☁️ Module 9: Cloud & DevOps</h2>
                <p>How code gets from <em>"My Laptop"</em> to <em>"The World"</em>.</p>
            </div>

            <div style={styles.tabs}>
                <button style={activeTab === 'pipeline' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('pipeline')}>🏭 CI/CD Pipeline</button>
                <button style={activeTab === 'platforms' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('platforms')}>🌩️ Cloud Platforms</button>
                <button style={activeTab === 'models' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('models')}>🍕 Service Models</button>
            </div>

            {/* TAB 1: CI/CD PIPELINE */}
            {activeTab === 'pipeline' && (
                <div style={styles.pipelineContainer}>
                    <h3>🏭 The Factory Line (CI/CD)</h3>
                    <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>
                        Modern teams don't manually drag files to servers. We use <strong>Pipelines</strong>.
                    </p>

                    <div style={styles.controls}>
                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={autoFix}
                                onChange={(e) => setAutoFix(e.target.checked)}
                            />
                            ✨ Fix Broken Tests (Simulate Good Code)
                        </label>
                        <button
                            onClick={runPipeline}
                            style={pipelineStatus === 'running' ? styles.btnDisabled : styles.btn}
                            disabled={pipelineStatus === 'running'}
                        >
                            {pipelineStatus === 'running' ? 'Running...' : '🚀 Push Code'}
                        </button>
                    </div>

                    <div style={styles.stages}>
                        <div style={styles.gitBox}>
                            💻<br />Your Laptop
                        </div>
                        <div style={styles.arrow}>➡️</div>

                        {stages.map((stage, i) => (
                            <div key={stage.id} style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{
                                    ...styles.stageCard,
                                    borderColor: getStatusColor(stage.status),
                                    backgroundColor: getStatusBg(stage.status)
                                }}>
                                    <div style={styles.icon}>{getStatusIcon(stage.status)}</div>
                                    <div>{stage.name}</div>
                                </div>
                                {i < stages.length - 1 && <div style={styles.arrow}>➡️</div>}
                            </div>
                        ))}

                        <div style={styles.arrow}>➡️</div>
                        <div style={{
                            ...styles.gitBox,
                            borderColor: pipelineStatus === 'success' ? 'green' : '#ddd',
                            background: pipelineStatus === 'success' ? '#e8f5e9' : 'white'
                        }}>
                            🌍<br />Production
                        </div>
                    </div>

                    <div style={styles.console}>
                        <div style={styles.consoleHeader}>📟 Terminal Output</div>
                        <div style={{ color: pipelineStatus === 'fail' ? '#ff5252' : '#81c784' }}>
                            {log}
                        </div>
                    </div>

                    <PmInsight
                        title="Velocity vs Stability"
                        description="The goal of DevOps is not just 'automation', it's Confidence. If deploying is scary, you do it less often (monthly). If it's safe, you do it daily."
                        tradeOffs={[
                            "Manual Deploy: Takes 2 hours, prone to human error, requires 'Freeze' periods.",
                            "CI/CD Pipeline: Takes 5 mins, automated tests catch bugs, enables 'Continuous Delivery'.",
                            "PM Insight: Invest in the pipeline (Technical Debt) so features reach users faster."
                        ]}
                    />
                </div>
            )}

            {/* TAB 2: CLOUD PLATFORMS */}
            {activeTab === 'platforms' && (
                <div style={styles.contentBox}>
                    <h3>🌩️ The "Big Three" Cloud Providers</h3>
                    <p>Unless you run your own data center (you shouldn't), you're renting computers from one of these giants.</p>

                    <div style={styles.grid}>
                        <div style={{ ...styles.card, borderTop: '4px solid #FF9900' }}>
                            <h3>🟠 AWS (Amazon)</h3>
                            <p><strong>The First Mover & Market Leader.</strong></p>
                            <ul style={styles.list}>
                                <li><strong>Pros:</strong> Most mature, most services (200+), vast documentation.</li>
                                <li><strong>Cons:</strong> Steep learning curve, confusing billing.</li>
                                <li><strong>Best For:</strong> Everything. The safe default choice.</li>
                            </ul>
                        </div>

                        <div style={{ ...styles.card, borderTop: '4px solid #0089D6' }}>
                            <h3>🔵 Azure (Microsoft)</h3>
                            <p><strong>The Enterprise Favorite.</strong></p>
                            <ul style={styles.list}>
                                <li><strong>Pros:</strong> Amazing integration with Windows/Office/Active Directory.</li>
                                <li><strong>Cons:</strong> Can feel clunky if you aren't in the Microsoft ecosystem.</li>
                                <li><strong>Best For:</strong> Big non-tech companies (Banks, Hospitals) already using Microsoft.</li>
                            </ul>
                        </div>

                        <div style={{ ...styles.card, borderTop: '4px solid #4285F4' }}>
                            <h3>🔴 GCP (Google)</h3>
                            <p><strong> The Innovator.</strong></p>
                            <ul style={styles.list}>
                                <li><strong>Pros:</strong> Best for Data, AI, and Kubernetes (they invented it). Clean UI.</li>
                                <li><strong>Cons:</strong> Smaller market share, fewer enterprise support options.</li>
                                <li><strong>Best For:</strong> AI Startups, Big Data projects.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 3: SERVICE MODELS */}
            {activeTab === 'models' && (
                <div style={styles.contentBox}>
                    <h3>🍕 Service Models (The "Pizza" Analogy)</h3>
                    <p>How much do you want to manage yourself vs. have managed for you?</p>

                    <div style={styles.modelRow}>
                        <div style={styles.modelCard}>
                            <div style={styles.modelHeader}>On-Premise</div>
                            <div style={styles.pizzaIcon}>🛒</div>
                            <p><strong>"Made at Home"</strong></p>
                            <p>You manage EVERYTHING: Networking, Servers, OS, Data, App.</p>
                            <div style={styles.badget}>Total Control</div>
                        </div>

                        <div style={styles.arrow}>➡️</div>

                        <div style={styles.modelCard}>
                            <div style={styles.modelHeader}>IaaS</div>
                            <div style={styles.pizzaIcon}>🔥</div>
                            <p><strong>"Take & Bake"</strong></p>
                            <p>Provider gives hardware (AWS EC2). You manage OS + Updates + App.</p>
                            <div style={styles.badget}>Infrastructure as a Service</div>
                        </div>

                        <div style={styles.arrow}>➡️</div>

                        <div style={styles.modelCard}>
                            <div style={styles.modelHeader}>PaaS</div>
                            <div style={styles.pizzaIcon}>🛵</div>
                            <p><strong>"Pizza Delivery"</strong></p>
                            <p>Provider manages OS + Runtime. You just upload Code (Heroku/Vercel).</p>
                            <div style={styles.badget}>Platform as a Service</div>
                        </div>

                        <div style={styles.arrow}>➡️</div>

                        <div style={styles.modelCard}>
                            <div style={styles.modelHeader}>SaaS</div>
                            <div style={styles.pizzaIcon}>🍽️</div>
                            <p><strong>"Dining Out"</strong></p>
                            <p>Provider manages EVERYTHING. You just use it (Gmail, Salesforce).</p>
                            <div style={styles.badget}>Software as a Service</div>
                        </div>
                    </div>

                    {/* BaaS SPECIAL CALLOUT */}
                    <div style={{ marginTop: '30px', padding: '20px', background: '#fff3e0', borderRadius: '8px', borderLeft: '5px solid #ff9800' }}>
                        <h4>🔥 What about BaaS (Backend as a Service)?</h4>
                        <p><strong>Examples: Firebase, Supabase.</strong></p>
                        <p>It's like PaaS, but specifically for the "Backend" parts. You write the Frontend, and the BaaS gives you a pre-made Database, Auth, and File Storage via API.</p>
                        <p><strong>PM Insight:</strong> Great for 0-to-1 MVPs. Hard to scale customization later.</p>
                    </div>
                </div>
            )}

        </div>
    );
};

// Styles & Helpers
const getStatusColor = (s) => {
    switch (s) {
        case 'waiting': return '#ddd';
        case 'active': return '#2196f3';
        case 'done': return '#4caf50';
        case 'error': return '#f44336';
        default: return '#ddd';
    }
};

const getStatusBg = (s) => {
    switch (s) {
        case 'waiting': return '#f5f5f5';
        case 'active': return '#e3f2fd';
        case 'done': return '#e8f5e9';
        case 'error': return '#ffebee';
        default: return 'white';
    }
};

const getStatusIcon = (s) => {
    switch (s) {
        case 'waiting': return '⏳';
        case 'active': return '⚙️';
        case 'done': return '✅';
        case 'error': return '💥';
        default: return 'Circle';
    }
};

const styles = {
    container: { padding: '20px', maxWidth: '1000px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '30px' },
    pipelineContainer: {
        padding: '30px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '30px'
    },
    controls: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    btn: { padding: '10px 20px', background: '#333', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    btnDisabled: { padding: '10px 20px', background: '#999', color: 'white', border: 'none', borderRadius: '6px', cursor: 'not-allowed' },
    checkbox: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
    stages: { display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '5px', marginBottom: '30px' },
    stageCard: {
        width: '120px',
        height: '100px',
        border: '3px solid #ddd',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        textAlign: 'center',
        transition: 'all 0.3s'
    },
    gitBox: {
        width: '80px',
        height: '80px',
        border: '2px dashed #999',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        color: '#666'
    },
    arrow: { fontSize: '1.2rem', color: '#ccc', margin: '0 5px' },
    icon: { fontSize: '1.5rem', marginBottom: '5px' },
    console: { background: '#263238', color: 'white', padding: '15px', borderRadius: '8px', fontFamily: 'monospace' },
    consoleHeader: { borderBottom: '1px solid #546e7a', paddingBottom: '5px', marginBottom: '10px', color: '#90a4ae', fontSize: '0.8rem' },

    // NEW STYLES
    tabs: { display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' },
    tab: { padding: '10px 20px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer', color: '#666' },
    activeTab: { padding: '10px 20px', background: '#e3f2fd', border: '1px solid #2196f3', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', color: '#1565c0' },
    contentBox: { background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #eee' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' },
    card: { padding: '20px', border: '1px solid #eee', borderRadius: '8px', background: '#fafafa', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
    list: { paddingLeft: '20px', fontSize: '0.9rem', lineHeight: '1.6', color: '#444' },

    // Service Models
    modelRow: { display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto', padding: '10px 0' },
    modelCard: {
        minWidth: '160px',
        padding: '15px',
        border: '2px solid #ddd',
        borderRadius: '10px',
        textAlign: 'center',
        background: 'white',
        flex: 1
    },
    modelHeader: { fontWeight: 'bold', marginBottom: '10px', color: '#333' },
    pizzaIcon: { fontSize: '2.5rem', marginBottom: '10px' },
    badget: { display: 'inline-block', padding: '4px 8px', borderRadius: '4px', background: '#eee', fontSize: '0.7rem', marginTop: '10px', fontWeight: 'bold' }
};

export default CloudLesson;
