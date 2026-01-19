
// Sub-component for Module 8 (extracted for cleanliness)
const ArchitectureExplainer = () => {
    const [scenario, setScenario] = useState('startup'); // 'startup' | 'enterprise'

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* 1. SCENARIO TOGGLE */}
            <div style={{ textAlign: 'center', background: '#f5f5f5', padding: '15px', borderRadius: '12px' }}>
                <h3>🏢 Context Matters: Select Your Scenario</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                    <button
                        onClick={() => setScenario('startup')}
                        style={scenario === 'startup' ? styles.activeScenarioBtn : styles.scenarioBtn}
                    >
                        🚀 Early Stage Startup
                    </button>
                    <button
                        onClick={() => setScenario('enterprise')}
                        style={scenario === 'enterprise' ? styles.activeScenarioBtn : styles.scenarioBtn}
                    >
                        🏙️ Big Enterprise (Google/Netflix)
                    </button>
                </div>
                <p style={{ marginTop: '10px', color: '#666' }}>
                    {scenario === 'startup'
                        ? "Goal: Move fast, validate idea, save money. Small team (1-5 devs)."
                        : "Goal: Scale to millions, zero downtime, independent teams (100+ devs)."
                    }
                </p>
            </div>

            {/* 2. VISUAL COMPARISON AREA */}
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>

                {/* MONOLITH CARD */}
                <div style={{
                    ...styles.archBox,
                    borderColor: scenario === 'startup' ? '#4CAF50' : '#ddd',
                    background: scenario === 'startup' ? '#e8f5e9' : 'white',
                    opacity: scenario === 'startup' ? 1 : 0.6
                }}>
                    <div style={{ fontSize: '2rem' }}>🗿</div>
                    <h3>The Monolith</h3>

                    <div style={styles.monoBlock}>
                        <div style={styles.monoLayer}>Frontend</div>
                        <div style={styles.monoLayer}>Backend API</div>
                        <div style={styles.monoLayer}>Data Abstraction</div>
                    </div>

                    {scenario === 'startup' ? (
                        <div style={{ marginTop: '10px', color: '#2e7d32' }}>
                            <h4>✅ WINNER for Startups</h4>
                            <ul style={{ textAlign: 'left', fontSize: '0.85rem' }}>
                                <li>✨ <strong>Simple Deploy:</strong> Just one file/container.</li>
                                <li>✨ <strong>Fast Debugging:</strong> One consistent log file.</li>
                                <li>✨ <strong>Cheap:</strong> Run on a single $5 VPS.</li>
                                <li>✨ <strong>No Network Lag:</strong> Function calls are instant.</li>
                            </ul>
                        </div>
                    ) : (
                        <div style={{ marginTop: '10px', color: '#c62828' }}>
                            <h4>❌ BOTTLENECK for Enterprise</h4>
                            <ul style={{ textAlign: 'left', fontSize: '0.85rem' }}>
                                <li>⚠️ <strong>Spaghetti Code:</strong> 100 devs modifying 1 file = Chaos.</li>
                                <li>⚠️ <strong>Slow Builds:</strong> Waiting 30 mins to compile.</li>
                                <li>⚠️ <strong>Single Point of Failure:</strong> One memory leak crashes EVERYTHING.</li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* MICROSERVICES CARD */}
                <div style={{
                    ...styles.archBox,
                    borderColor: scenario === 'enterprise' ? '#2196F3' : '#ddd',
                    background: scenario === 'enterprise' ? '#e3f2fd' : 'white',
                    opacity: scenario === 'enterprise' ? 1 : 0.6
                }}>
                    <div style={{ fontSize: '2rem' }}>🐝</div>
                    <h3>Microservices</h3>

                    <div style={styles.microGrid}>
                        <div style={styles.microService}>Auth 🔒</div>
                        <div style={styles.microService}>Billing 💳</div>
                    </div>
                    <div style={styles.microGrid}>
                        <div style={styles.microService}>Notify 🔔</div>
                        <div style={styles.microService}>Reports 📊</div>
                    </div>

                    {scenario === 'enterprise' ? (
                        <div style={{ marginTop: '10px', color: '#1565c0' }}>
                            <h4>✅ WINNER for Enterprise</h4>
                            <ul style={{ textAlign: 'left', fontSize: '0.85rem' }}>
                                <li>✨ <strong>Structure:</strong> "Billing Team" owns their own code/DB.</li>
                                <li>✨ <strong>Resilience:</strong> If "Reports" crashes, "Billing" stays up.</li>
                                <li>✨ <strong>Polyglot:</strong> Use Python for AI, Node for API.</li>
                                <li>✨ <strong>Scale:</strong> Add 50 servers just for "Auth" on Black Friday.</li>
                            </ul>
                        </div>
                    ) : (
                        <div style={{ marginTop: '10px', color: '#c62828' }}>
                            <h4>❌ OVERKILL for Startups</h4>
                            <ul style={{ textAlign: 'left', fontSize: '0.85rem' }}>
                                <li>⚠️ <strong>Complexity Tax:</strong> Need DevOps, Kubernetes, Service Mesh...</li>
                                <li>⚠️ <strong>Expensive:</strong> Paying for 10 separate load balancers.</li>
                                <li>⚠️ <strong>Distributed Tracing:</strong> Debugging across networks is a nightmare.</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. DECISION MATRIX / SUMMARY */}
            <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
                <h4>🤔 So... When should I switch?</h4>
                <p>Start with a Monolith. Break it apart <strong>ONLY when you feel the pain</strong>.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginTop: '10px', color: '#555' }}>
                    <span>📉 Traffic Low? Team Small? ➡️ <strong>Keep Monolith</strong>.</span>
                    <span>📈 Traffic Huge? 50+ Devs? ➡️ <strong>Go Microservices</strong>.</span>
                </div>
            </div>

        </div>
    );
};
