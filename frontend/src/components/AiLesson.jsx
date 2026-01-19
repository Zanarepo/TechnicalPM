import React, { useState } from 'react';
import PmInsight from './PmInsight';

const AiLesson = () => {
    const [activeTab, setActiveTab] = useState('ai'); // 'ai' or 'analytics'

    // AI STATE
    const [prompt, setPrompt] = useState("Tell me a joke about Product Managers.");
    const [temp, setTemp] = useState(0.5); // 0.0 to 1.0
    const [response, setResponse] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    // ANALYTICS STATE
    const [visitors, setVisitors] = useState(1000);
    const [conversionRate, setConversionRate] = useState(0.05); // 5%
    const [fixApplied, setFixApplied] = useState(false);

    // MOCK LLM LOGIC
    const generateResponse = async () => {
        setIsGenerating(true);
        setResponse("");

        await wait(1000);

        let result = "";

        // Deterministic (Temp = 0)
        if (temp < 0.2) {
            result = "Why did the PM cross the road? To verify the acceptance criteria on the other side.";
        }
        // Balanced (Temp = 0.5)
        else if (temp >= 0.2 && temp < 0.8) {
            const jokes = [
                "A PM walks into a bar... and asks for the roadmap.",
                "How many PMs does it take to change a lightbulb? None, that's engineering's job. We just define the darkness.",
                "PM: 'I need a horse.' Engineering: 'Here is a camel, it has more features.'"
            ];
            result = jokes[Math.floor(Math.random() * jokes.length)];
        }
        // Creative/Hallucinating (Temp = 1.0)
        else {
            const weird = [
                "The chicken is a stakeholder in the roadmap of agile soup.",
                "404 Joke Not Found: But the user story for laughter is in the backlog.",
                "Why? Because the KPI of the banana was aligned with the synergy of the moon landing."
            ];
            result = weird[Math.floor(Math.random() * weird.length)];
        }

        setResponse(result);
        setIsGenerating(false);
    };

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const applyFix = () => {
        setFixApplied(true);
        setConversionRate(0.15); // Jump to 15%
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>🤖 Module 10: AI & Analytics</h2>
                <p>The Future of Product: Algorithms & Data.</p>
            </div>

            <div style={styles.tabs}>
                <button style={activeTab === 'ai' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('ai')}>🧠 AI Playground</button>
                <button style={activeTab === 'analytics' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('analytics')}>📊 Analytics Funnel</button>
            </div>

            {/* TAB 1: AI PLAYGROUND */}
            {activeTab === 'ai' && (
                <div style={styles.contentBox}>
                    <h3>🎛️ AI "Temperature" Simulator</h3>
                    <p style={{ marginBottom: '20px' }}>
                        AI Models (LLMs) are <strong>Probabilistic</strong>, not Deterministic.
                        The "Temperature" setting controls how random they are.
                    </p>

                    <div style={styles.controlRow}>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontWeight: 'bold' }}>Temperature: {temp}</label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={temp}
                                onChange={(e) => setTemp(parseFloat(e.target.value))}
                                style={{ width: '100%' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666' }}>
                                <span>🤖 Robotic (0.0)</span>
                                <span>🎨 Creative (1.0)</span>
                            </div>
                        </div>
                    </div>

                    <div style={styles.inputArea}>
                        <input
                            style={styles.input}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                        <button
                            onClick={generateResponse}
                            disabled={isGenerating}
                            style={isGenerating ? styles.btnDisabled : styles.btn}
                        >
                            {isGenerating ? 'Thinking...' : 'Generate'}
                        </button>
                    </div>

                    <div style={styles.outputBox}>
                        <strong>AI Output:</strong>
                        <p style={{ fontSize: '1.2rem', color: '#333', marginTop: '10px' }}>
                            {response || <span style={{ color: '#ccc' }}>...result will appear here...</span>}
                        </p>
                    </div>

                    <PmInsight
                        title="AI Hallucinations are a Feature, not a Bug"
                        description="If you want 100% facts (Math), use a Calculator (Code). If you want Creativity, use AI. Understanding 'Temperature' helps you decide when to use which."
                        tradeOffs={[
                            "Low Temp (0.1): Good for coding, classification, extraction.",
                            "High Temp (0.9): Good for brainstorming, poetry, creative writing.",
                            "PM Note: Don't promise '100% Accuracy' with LLMs. Design the UI to handle errors (e.g., 'Check this info')."
                        ]}
                    />
                </div>
            )}

            {/* TAB 2: ANALYTICS FUNNEL */}
            {activeTab === 'analytics' && (
                <div style={styles.contentBox}>
                    <h3>📊 The "Pirate" Funnel (AARRR)</h3>
                    <p>Metrics that matter. Where are users dropping off?</p>

                    <div style={styles.funnelContainer}>
                        {/* 1. ACQUISITION */}
                        <div style={{ ...styles.funnelStep, width: '100%', background: '#E3F2FD' }}>
                            <div style={styles.stepTitle}>1. Acquisition</div>
                            <div style={styles.stepStat}>{visitors} Visitors</div>
                            <div style={styles.stepDesc}>Came from Ads/SEO</div>
                        </div>

                        {/* 2. ACTIVATION */}
                        <div style={{ ...styles.funnelStep, width: '80%', background: '#BBDEFB' }}>
                            <div style={styles.stepTitle}>2. Activation (Sign Up)</div>
                            <div style={styles.stepStat}>
                                {Math.floor(visitors * conversionRate)} Users
                                <span style={{ fontSize: '0.9rem', color: '#1565C0' }}> ({conversionRate * 100}%)</span>
                            </div>
                            <div style={styles.stepDesc}>Created an account</div>
                        </div>

                        {/* 3. RETENTION */}
                        <div style={{ ...styles.funnelStep, width: '60%', background: '#90CAF9' }}>
                            <div style={styles.stepTitle}>3. Retention</div>
                            <div style={styles.stepStat}>{Math.floor(visitors * conversionRate * 0.4)} Users</div>
                            <div style={styles.stepDesc}>Came back next week</div>
                        </div>

                        {/* 4. REVENUE */}
                        <div style={{ ...styles.funnelStep, width: '40%', background: '#64B5F6' }}>
                            <div style={styles.stepTitle}>4. Revenue ($$)</div>
                            <div style={styles.stepStat}>
                                ${Math.floor(visitors * conversionRate * 0.4 * 10)}
                            </div>
                            <div style={styles.stepDesc}>Subscribed</div>
                        </div>
                    </div>

                    <div style={styles.optimizationPanel}>
                        <h4>🔧 Optimization Lab</h4>
                        <p>Scenario: The "Sign Up" button is broken on Mobile. Users are dropping off!</p>

                        {!fixApplied ? (
                            <button onClick={applyFix} style={styles.fixBtn}>
                                🛠️ Fix UX Bug (+10% Conversion)
                            </button>
                        ) : (
                            <div style={{ color: 'green', fontWeight: 'bold' }}>
                                ✅ Bug Fixed! Look at the Revenue jump!
                            </div>
                        )}
                    </div>

                    <PmInsight
                        title="Vanity Metrics vs. North Star"
                        description="Total Visitors (Acquisition) is a 'Vanity Metric'. It feels good but doesn't pay bills. Retention & Revenue are 'North Star' metrics."
                        tradeOffs={[
                            "PM Trap: Celebrating 1 million downloads when only 100 people use the app.",
                            "Focus: Move the bottleneck. If Activation is 5% (terrible), don't buy more Ads (Acquisition)."
                        ]}
                    />
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '20px', maxWidth: '800px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '30px' },
    tabs: { display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' },
    tab: { padding: '10px 20px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer', color: '#666' },
    activeTab: { padding: '10px 20px', background: '#E0F2F1', border: '1px solid #009688', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', color: '#00695C' },
    contentBox: { background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },

    // AI Styles
    controlRow: { display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px', padding: '15px', background: '#fafafa', borderRadius: '8px' },
    inputArea: { display: 'flex', gap: '10px', marginBottom: '20px' },
    input: { flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' },
    btn: { padding: '10px 20px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    btnDisabled: { padding: '10px 20px', background: '#ccc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'not-allowed' },
    outputBox: { padding: '20px', background: '#f5f5f5', borderRadius: '8px', borderLeft: '4px solid #333', minHeight: '80px', marginBottom: '30px' },

    // Analytics Styles
    funnelContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' },
    funnelStep: { padding: '15px', margin: '2px 0', borderRadius: '4px', textAlign: 'center', color: '#0D47A1', transition: 'width 0.5s ease' },
    stepTitle: { fontWeight: 'bold', fontSize: '1.1rem' },
    stepStat: { fontSize: '1.4rem', fontWeight: 'bold', margin: '5px 0' },
    stepDesc: { fontSize: '0.8rem', opacity: 0.8 },
    optimizationPanel: { padding: '20px', background: '#FFF3E0', borderRadius: '8px', textAlign: 'center', marginBottom: '30px', border: '1px solid #FFE0B2' },
    fixBtn: { padding: '10px 20px', background: '#FF9800', color: 'white', border: 'none', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 0 #E65100' }
};

export default AiLesson;
