import React, { useState } from 'react';
import PmInsight from './PmInsight';
import ScalingExplainer from './ScalingExplainer';

const MicroservicesLesson = () => {
    const [activeTab, setActiveTab] = useState('lab'); // 'lab', 'arch', 'scale', 'strategies'
    const [loading, setLoading] = useState(false);
    const [traceLog, setTraceLog] = useState([]);
    const [services, setServices] = useState({
        auth: true,
        ledger1: true,
        ledger2: true, // Replica
        notify: true
    });

    // Toggle Service Health
    const toggleService = (service) => {
        setServices(prev => ({ ...prev, [service]: !prev[service] }));
    };

    const runSimulation = async () => {
        setLoading(true);
        setTraceLog([]);

        try {
            const res = await fetch('http://localhost:3001/api/orchestrated-transfer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    senderId: 1,
                    amount: 50,
                    serviceStatus: services
                })
            });
            const data = await res.json();

            if (data.trace) {
                data.trace.forEach((item, index) => {
                    setTimeout(() => {
                        setTraceLog(prev => [...prev, item]);
                    }, index * 600);
                });
                setTimeout(() => setLoading(false), data.trace.length * 600 + 500);
            } else {
                setLoading(false);
            }

        } catch (e) {
            setTraceLog(prev => [...prev, { service: 'GATEWAY', status: 'error', msg: 'Network Error: Backend unreachable?' }]);
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>🧠 Module 8: Server Logic (The Brain)</h2>
                <p>Architecting for Scale: Microservices, API Gateways, and Failover.</p>
            </div>

            <div style={styles.tabs}>
                <button style={activeTab === 'lab' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('lab')}>🧪 Microservices Lab</button>
                <button style={activeTab === 'arch' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('arch')}>🏛️ Monolith vs Micro</button>
                <button style={activeTab === 'scale' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('scale')}>⚖️ Concurrency (Race)</button>
                <button style={activeTab === 'strategies' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('strategies')}>📈 Scaling Sim</button>
            </div>

            {/* TAB 1: LAB (FAILOVER SIMULATION) */}
            {activeTab === 'lab' && (
                <div style={styles.dashboard}>
                    <div style={styles.controlPanel}>
                        <h3>🎛️ Mission Control</h3>
                        <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>System Status Toggles:</p>

                        <ServiceToggle label="🛡️ Auth Service" isOn={services.auth} onToggle={() => toggleService('auth')} />
                        <ServiceToggle label="🔔 Notifier Service" isOn={services.notify} onToggle={() => toggleService('notify')} />

                        <div style={{ marginTop: '15px', padding: '10px', background: '#fff3e0', borderRadius: '8px', border: '1px solid #ffe0b2' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#f57c00', marginBottom: '5px' }}>DATA LAYER (Redundancy Code)</div>
                            <ServiceToggle label="💰 Ledger (Primary)" isOn={services.ledger1} onToggle={() => toggleService('ledger1')} />
                            <ServiceToggle label="💾 Ledger (Replica)" isOn={services.ledger2} onToggle={() => toggleService('ledger2')} />
                        </div>

                        <button
                            onClick={runSimulation}
                            disabled={loading}
                            style={loading ? styles.runBtnDisabled : styles.runBtn}
                        >
                            {loading ? 'Processing...' : '🚀 Run Transaction'}
                        </button>

                        <div style={styles.explanation}>
                            <strong>Failover Test:</strong> Turn OFF "Ledger Primary". <br />
                            Processing should automatically <strong>fail over</strong> to the Replica.<br />
                            Watch the trace logs!
                        </div>
                    </div>

                    <div style={styles.tracePanel}>
                        <h3>📡 Live Request Trace</h3>
                        <div style={styles.traceWindow}>
                            {traceLog.length === 0 && <div style={{ color: '#666', fontStyle: 'italic', padding: '20px' }}>Ready for request...</div>}
                            {traceLog.map((log, i) => (
                                <div key={i} style={styles.logItem}>
                                    <div style={styles.logHeader}>
                                        <span style={{ fontWeight: 'bold', color: getServiceColor(log.service) }}>{log.service}</span>
                                        <span style={{ fontSize: '0.8rem', color: '#888' }}>{log.status.toUpperCase()}</span>
                                    </div>
                                    <div style={{ color: log.status === 'error' ? '#ff5252' : '#b0bec5' }}>
                                        {log.msg}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: ARCHITECTURE (Startups vs Enterprise) */}
            {activeTab === 'arch' && (
                <div style={styles.archContainer}>
                    <ArchitectureExplainer />
                </div>
            )}

            {/* TAB 3: SCALING & CONCURRENCY */}
            {activeTab === 'scale' && (
                <div style={styles.archContainer}>
                    <ConcurrencyExplainer />
                </div>
            )}

            {/* TAB 4: SCALING STRATEGIES (New) */}
            {activeTab === 'strategies' && (
                <div style={styles.archContainer}>
                    <ScalingExplainer />
                </div>
            )}
        </div>
    );
};

const ServiceToggle = ({ label, isOn, onToggle }) => (
    <div style={styles.serviceRow}>
        <div style={styles.serviceLabel}>{label}</div>
        <button
            onClick={onToggle}
            style={{ ...styles.toggleBtn, backgroundColor: isOn ? '#4CAF50' : '#f44336' }}
        >
            {isOn ? 'ONLINE' : 'OFFLINE'}
        </button>
    </div>
);

const getServiceColor = (service) => {
    if (service.includes('LEDGER')) return '#ffa726';
    if (service === 'GATEWAY') return '#29b6f6';
    if (service === 'AUTH') return '#ef5350';
    return '#ab47bc';
};

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

            <PmInsight
                title="The 'Microservices Tax'"
                description="Microservices allow teams to move independently (Billing Team vs Auth Team), but they add massive complexity (Network Latency, Distributed Logs)."
                tradeOffs={[
                    "Monolith: Fast for small teams, hard for 100+ devs.",
                    "Microservices: Slow start, but necessary for Google-scale.",
                    "PM Advice: Don't start with Microservices. Validate the product first (Monolith), then break it up when you hit scaling limits."
                ]}
            />
        </div >
    );
};

// Sub-component for Module 8 (Concurrency)
const ConcurrencyExplainer = () => {
    const [balance, setBalance] = useState(100);
    const [logs, setLogs] = useState([]);
    const [isLocked, setIsLocked] = useState(false);
    const [safeMode, setSafeMode] = useState(false);
    const [processing, setProcessing] = useState({ alice: false, bob: false });

    const addLog = (msg, color = 'black') => {
        setLogs(prev => [{ msg, color, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 4)]);
    };

    const withdraw = async (user) => {
        if (processing[user.toLowerCase()]) return;

        // 1. SAFE MODE CHECK (LOCKING)
        if (safeMode && isLocked) {
            addLog(`🔒 ${user} is BLOCKED by DB Lock. Retrying...`, 'red');
            return;
        }

        setProcessing(prev => ({ ...prev, [user.toLowerCase()]: true }));

        if (safeMode) {
            setIsLocked(true);
            addLog(`🔐 ${user} acquired DB Lock.`, 'green');
        }

        addLog(`📖 ${user} reads Balance: $${balance}`, '#1976D2');

        // SIMULATE DB LATENCY (The "Race" Window)
        setTimeout(() => {
            setBalance(prevBalance => {
                const newBal = prevBalance - 10;
                addLog(`💾 ${user} writes Balance: $${newBal}`, safeMode ? 'green' : '#E64A19');

                if (safeMode) setIsLocked(false);
                return newBal;
            });
            setProcessing(prev => ({ ...prev, [user.toLowerCase()]: false }));
        }, 1000);
    };

    const reset = () => {
        setBalance(100);
        setLogs([]);
        setIsLocked(false);
        setProcessing({ alice: false, bob: false });
    };

    return (
        <div style={{ width: '100%', textAlign: 'center' }}>
            <h3>🏎️ Race Condition Simulator</h3>
            <p>Task: Both Alice & Bob want to withdraw $10 at the same time.</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
                <button
                    onClick={() => setSafeMode(false)}
                    style={!safeMode ? styles.activeScenarioBtn : styles.scenarioBtn}
                >
                    💀 Unsafe Mode (No Locks)
                </button>
                <button
                    onClick={() => setSafeMode(true)}
                    style={safeMode ? styles.activeScenarioBtn : styles.scenarioBtn}
                >
                    🔒 Safe Mode (DB Locking)
                </button>
            </div>

            <div style={{ fontSize: '3rem', margin: '20px', fontWeight: 'bold', color: '#2e7d32' }}>
                ${balance}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', position: 'relative' }}>
                {safeMode && isLocked && (
                    <div style={{ position: 'absolute', top: '-20px', background: '#ffebee', color: 'red', padding: '5px 10px', borderRadius: '15px', fontWeight: 'bold' }}>
                        🔒 LOCKED
                    </div>
                )}

                <div style={styles.userBox}>
                    <h4>👩 Alice</h4>
                    <button
                        onClick={() => withdraw('Alice')}
                        disabled={processing.alice}
                        style={{ ...styles.runBtn, background: processing.alice ? '#999' : '#E91E63', padding: '10px' }}
                    >
                        {processing.alice ? 'Processing...' : '💸 Withdraw $10'}
                    </button>
                </div>

                <div style={styles.userBox}>
                    <h4>👨 Bob</h4>
                    <button
                        onClick={() => withdraw('Bob')}
                        disabled={processing.bob}
                        style={{ ...styles.runBtn, background: processing.bob ? '#999' : '#2196F3', padding: '10px' }}
                    >
                        {processing.bob ? 'Processing...' : '💸 Withdraw $10'}
                    </button>
                </div>
            </div>

            <div style={{ background: '#263238', color: '#fff', padding: '15px', borderRadius: '8px', marginTop: '30px', textAlign: 'left', minHeight: '150px', fontFamily: 'monospace' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #546E7A', paddingBottom: '5px', marginBottom: '10px' }}>
                    <strong>📺 Transaction Log</strong>
                    <span style={{ cursor: 'pointer', color: '#80CBC4' }} onClick={reset}>Clear/Reset</span>
                </div>
                {logs.map((l, i) => (
                    <div key={i} style={{ color: l.color, marginBottom: '5px' }}>
                        <span style={{ color: '#546E7A', marginRight: '10px' }}>[{l.time}]</span>
                        {l.msg}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '20px', background: '#ffebee', padding: '15px', borderRadius: '8px', fontSize: '0.9rem', textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#c62828' }}>🏎️ Why does this matter?</h4>

                <p><strong>1. The "Lost Update" Problem:</strong></p>
                <p>In "Unsafe Mode", both Alice and Bob read $100. They both calculate $100 - $10 = $90. The last one to write "wins", overwriting the other's transaction. The bank <strong>loses $10</strong> into thin air.</p>

                <p style={{ marginTop: '10px' }}><strong>2. The Cost of Safety (Latency):</strong></p>
                <p>In "Safe Mode", we use a <strong>Lock</strong> (Mutex). Bob cannot even <em>read</em> the balance until Alice is done. This ensures accuracy (Balance = $80), but it <strong>slows down the system</strong>. If 1 million people try to buy the last concert ticket, 999,999 have to wait in line!</p>

                <div style={{ marginTop: '10px', padding: '10px', background: 'white', borderRadius: '5px', border: '1px solid #ffcdd2' }}>
                    <strong>💡 Key Takeaway:</strong>
                    <br />
                    <em>Financial systems (Banks) prefer <strong>Safety</strong> (Locking) over Speed.</em>
                    <br />
                    <em>Social Networks (Likes) prefer <strong>Speed</strong> over Safety (Eventual Consistency).</em>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '20px', maxWidth: '1000px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '30px' },
    dashboard: { display: 'flex', gap: '2rem', flexWrap: 'wrap' },

    // Control Panel
    controlPanel: { flex: 1, minWidth: '300px', background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
    serviceRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', padding: '10px', background: '#f5f5f5', borderRadius: '8px' },
    serviceLabel: { fontWeight: 'bold', fontSize: '1.1rem' },
    toggleBtn: { padding: '8px 16px', border: 'none', borderRadius: '20px', color: 'white', fontWeight: 'bold', cursor: 'pointer', width: '100px' },

    runBtn: { width: '100%', padding: '15px', backgroundColor: '#1a237e', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },
    runBtnDisabled: { width: '100%', padding: '15px', backgroundColor: '#9fa8da', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'not-allowed', marginTop: '10px' },

    explanation: { marginTop: '20px', padding: '15px', backgroundColor: '#e8eaf6', borderRadius: '8px', fontSize: '0.9rem', color: '#3f51b5' },

    // Tabs
    tabs: { display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' },
    tab: { padding: '10px 20px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer', color: '#666' },
    activeTab: { padding: '10px 20px', background: '#e3f2fd', border: '1px solid #2196f3', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', color: '#1565c0' },

    // Architecture Lab
    archContainer: { display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', padding: '20px', background: 'white', borderRadius: '10px' },
    archBox: { border: '2px solid #eee', padding: '20px', borderRadius: '10px', width: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
    monoBlock: { width: '100%', height: '100px', background: '#7986cb', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: '8px', marginBottom: '10px' },
    monoLayer: { borderBottom: '1px solid rgba(255,255,255,0.3)', padding: '5px', fontSize: '0.8rem' },
    microGrid: { display: 'flex', gap: '5px', justifyContent: 'center', marginBottom: '10px' },
    microService: { padding: '10px', background: '#ffcc80', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 'bold' },
    dbIcon: { fontSize: '2rem', marginTop: '10px' },
    dbGrid: { display: 'flex', gap: '15px' },

    // Trace Panel
    tracePanel: { flex: 1, minWidth: '300px', background: '#263238', color: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' },
    traceWindow: { flex: 1, overflowY: 'auto', maxHeight: '500px', marginTop: '10px', fontFamily: 'monospace' },
    logItem: { marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #37474f' },
    logHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '5px' },

    // Scenario Styles
    scenarioBtn: { padding: '10px 15px', border: '1px solid #ccc', background: 'white', borderRadius: '8px', cursor: 'pointer', transition: '0.2s' },
    activeScenarioBtn: { padding: '10px 15px', border: '2px solid #333', background: '#333', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transform: 'scale(1.05)' },

    // Concurrency Styles
    userBox: { border: '2px solid #ddd', padding: '15px', borderRadius: '12px', width: '150px', textAlign: 'center', background: 'white' }
};

export default MicroservicesLesson;
