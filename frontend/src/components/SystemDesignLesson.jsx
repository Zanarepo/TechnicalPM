import React, { useState, useEffect } from 'react';
import PmInsight from './PmInsight';

const SystemDesignLesson = () => {
    const [activeTab, setActiveTab] = useState('arch'); // arch, scale, cap

    // SCALABILITY STATE
    const [users, setUsers] = useState(10); // Concurrent Users
    const [servers, setServers] = useState(1);
    const [tps, setTps] = useState(0);
    const [latency, setLatency] = useState(50); // ms
    const [errors, setErrors] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // CAP STATE
    const [networkPartition, setNetworkPartition] = useState(false);
    const [strategy, setStrategy] = useState('CP'); // CP (Consistency) or AP (Availability)

    // Double Spend Simulation State
    const [serverBalance, setServerBalance] = useState(100);
    const [atmBalance, setAtmBalance] = useState(100);
    const [atmLog, setAtmLog] = useState([]);
    const [serverLog, setServerLog] = useState([]);
    const [syncStatus, setSyncStatus] = useState('Synced');

    // --- SCALABILITY SIMULATION ---
    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                // Simulation Logic
                const capacityPerServer = 50;
                const totalCapacity = servers * capacityPerServer;
                const load = users;

                // Calculate Metrics
                if (load <= totalCapacity) {
                    setTps(load * 2); // 2 tx per user
                    setLatency(50 + (load / totalCapacity) * 50); // 50-100ms
                    setErrors(0);
                } else {
                    // Overloaded
                    const overflow = load - totalCapacity;
                    setTps(totalCapacity * 2);
                    setLatency(200 + overflow * 10); // Latency explodes
                    setErrors(Math.floor(overflow * 0.5)); // 50% fail rate for overflow
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, users, servers]);

    // --- CAP SIMULATION LOGIC ---

    // 1. ATM Withdrawal (Local)
    const atmWithdraw = () => {
        const amount = 100;
        if (networkPartition) {
            if (strategy === 'AP') {
                // AP: Allow withdrawal even if offline
                if (atmBalance >= amount) {
                    setAtmBalance(prev => prev - amount);
                    setAtmLog(prev => [...prev, `💸 Withdrew $${amount} (Offline)`]);
                    setSyncStatus('Desynchronized (Data Hazard)');
                } else {
                    setAtmLog(prev => [...prev, `❌ Insufficient Funds (Local)`]);
                }
            } else {
                // CP: Deny withdrawal if offline
                setAtmLog(prev => [...prev, `🔒 Network Error: Cannot verify balance.`]);
            }
        } else {
            // Online: Sync immediately
            if (serverBalance >= amount) {
                setServerBalance(prev => prev - amount);
                setAtmBalance(prev => prev - amount);
                setAtmLog(prev => [...prev, `✅ Withdrew $${amount} (Online)`]);
                setServerLog(prev => [...prev, `📉 ATM Withdrawal -$${amount}`]);
            } else {
                setAtmLog(prev => [...prev, `❌ Insufficient Funds`]);
            }
        }
    };

    // 2. Online Payment (Server)
    const onlinePay = () => {
        const amount = 100;
        if (serverBalance >= amount) {
            setServerBalance(prev => prev - amount);
            setServerLog(prev => [...prev, `💳 Online Payment -$${amount}`]);
            if (!networkPartition) {
                setAtmBalance(prev => prev - amount); // Sync if online
            } else {
                setSyncStatus('Desynchronized (Data Hazard)');
            }
        } else {
            setServerLog(prev => [...prev, `❌ Declined: Insufficient Funds`]);
        }
    };

    // 3. Re-Sync
    const togglePartition = () => {
        if (networkPartition) {
            // Turning partition OFF -> Sync
            setNetworkPartition(false);

            // Simulating the Sync Logic
            // In a real double spend, the operations strictly happened.
            // If ATM dispensed $100 (AtmBalance 0) AND Server paid $100 (ServerBalance 0)...
            // The user spent $200 starting with $100.

            // We'll calculate the 'True' balance based on logs or simply reconcile.
            // For this sim, let's say the Server accepts the ATM diff.

            const atmSpent = 100 - atmBalance; // Assumes started at 100. Simple sim.

            // This logic is simplified for demo purposes
            // If we are disjoint, we reconcile based on actions taken.
            // If Server is 0 (Spent online) and ATM is 0 (Spent offline) -> Real Balance is -100.

            // Force reconcile to lowest
            const newBal = Math.min(serverBalance, atmBalance);
            // Actually, if both spent, it's worse.
            // Let's just track total spent during partition.

            // Better visual:
            setSyncStatus('Synced');
            // If Double Spend occurred
            if (serverBalance === 0 && atmBalance === 0 && atmLog.some(l => l.includes('Offline'))) {
                // Double spend happened!
                setServerBalance(-100);
                setAtmBalance(-100);
                setServerLog(prev => [...prev, `⚠️ DOUBLE SPEND DETECTED! Balance: -$100`]);
            } else {
                // Just sync to whichever is lower/correct
                setServerBalance(Math.min(serverBalance, atmBalance));
                setAtmBalance(Math.min(serverBalance, atmBalance));
            }

        } else {
            // Turning partition ON
            setNetworkPartition(true);
            setSyncStatus('Synced (Connection Cut)');
        }
    };

    const resetSim = () => {
        setServerBalance(100);
        setAtmBalance(100);
        setAtmLog([]);
        setServerLog([]);
        setSyncStatus('Synced');
        setNetworkPartition(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>🏛️ Module 11: System Design (Bank Architecture)</h2>
                <p><strong>Definition:</strong> Defining architecture, modules, interfaces, and data for a system to satisfy requirements.</p>
            </div>

            <div style={styles.tabs}>
                <button style={activeTab === 'arch' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('arch')}>📐 The Blueprint</button>
                <button style={activeTab === 'scale' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('scale')}>📈 Scalability (TPS)</button>
                <button style={activeTab === 'cap' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('cap')}>⚖️ CAP Theorem</button>
            </div>

            {/* TAB 1: ARCHITECTURE */}
            {activeTab === 'arch' && (
                <div style={styles.contentBox}>
                    <h3>High-Level Architecture</h3>
                    <p>A modern banking system isn't one "server". It's a pipeline.</p>

                    <div style={styles.diagram}>
                        <div style={styles.node}>
                            <span style={{ fontSize: '2rem' }}>📱</span>
                            <div>Client</div>
                        </div>
                        <div style={styles.arrow}>➡️</div>
                        <div style={{ ...styles.node, borderColor: '#FF9800' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>API Gateway</div>
                            <div style={{ fontSize: '0.7rem' }}>Rate Limiting, Auth</div>
                        </div>
                        <div style={styles.arrow}>➡️</div>
                        <div style={{ ...styles.node, borderColor: '#2196F3' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Load Balancer</div>
                            <div style={{ fontSize: '0.7rem' }}>Distributes Traffic</div>
                        </div>
                        <div style={styles.arrow}>➡️</div>
                        <div style={styles.cluster}>
                            <div style={styles.smallNode}>Service A</div>
                            <div style={styles.smallNode}>Service B</div>
                        </div>
                        <div style={styles.arrow}>➡️</div>
                        <div style={{ ...styles.node, borderColor: '#4CAF50' }}>
                            <span style={{ fontSize: '1.5rem' }}>🗄️</span>
                            <div>Database</div>
                        </div>
                    </div>

                    <PmInsight
                        title="Why split it up?"
                        description="Single Points of Failure (SPOF). If the Load Balancer dies, we have a backup. If one Service dies, the others keep running."
                        tradeOffs={[
                            "Complexity: Debugging a request that jumps through 5 nodes is hard.",
                            "Latency: Every jump adds 10ms.",
                            "PM Goal: 'Nines of Availability' (99.99% uptime)."
                        ]}
                    />
                </div>
            )}

            {/* TAB 2: SCALABILITY */}
            {activeTab === 'scale' && (
                <div style={styles.contentBox}>
                    <h3>Stress Testing: Throughput vs Latency</h3>
                    <p>What happens on Black Friday? Manage the traffic.</p>

                    <div style={styles.controlRow}>

                        <div style={styles.controlGroup}>
                            <label>👥 Concurrent Users: {users}</label>
                            <input type="range" min="10" max="200" step="10" value={users} onChange={e => setUsers(Number(e.target.value))} />
                        </div>

                        <div style={styles.controlGroup}>
                            <label>🖥️ API Servers: {servers}</label>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button onClick={() => setServers(Math.max(1, servers - 1))}>-</button>
                                <button onClick={() => setServers(servers + 1)}>+</button>
                            </div>
                        </div>

                        <button
                            style={isRunning ? styles.stopBtn : styles.startBtn}
                            onClick={() => setIsRunning(!isRunning)}
                        >
                            {isRunning ? '🛑 Stop Test' : '▶️ Start Stress Test'}
                        </button>
                    </div>

                    <div style={styles.metricsGrid}>
                        <div style={styles.metricCard}>
                            <div style={styles.metricLabel}>Throughput (TPS)</div>
                            <div style={styles.metricValue}>{tps}</div>
                            <div style={styles.metricUnit}>tx / sec</div>
                        </div>
                        <div style={{ ...styles.metricCard, borderBottom: latency > 150 ? '4px solid red' : '4px solid green' }}>
                            <div style={styles.metricLabel}>P99 Latency</div>
                            <div style={{ ...styles.metricValue, color: latency > 150 ? 'red' : 'green' }}>{Math.round(latency)}</div>
                            <div style={styles.metricUnit}>milliseconds</div>
                        </div>
                        <div style={styles.metricCard}>
                            <div style={styles.metricLabel}>Error Rate</div>
                            <div style={{ ...styles.metricValue, color: errors > 0 ? 'red' : '#333' }}>{errors}</div>
                            <div style={styles.metricUnit}>failures / sec</div>
                        </div>
                    </div>

                    <PmInsight
                        title="The 'Hockey Stick' Curve"
                        description="Systems are fine until they aren't. Latency stays flat (50ms) as you add users, until you hit the 'Knee', then it explodes (10s)."
                        tradeOffs={[
                            "Auto-Scaling: Servers take 5 mins to boot. Pre-scale before the marketing push.",
                            "Cost: 10 servers cost 10x more. Don't over-provision for 3am traffic."
                        ]}
                    />
                </div>
            )}

            {/* TAB 3: CAP THEOREM */}
            {activeTab === 'cap' && (
                <div style={styles.contentBox}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>The "Double Spend" Risk (CAP Theorem)</h3>
                        <button onClick={resetSim} style={{ fontSize: '0.8rem', padding: '5px 10px' }}>🔄 Reset</button>
                    </div>
                    <p>Start with <strong>$100</strong>. Can you trick the system into spending it twice?</p>

                    <div style={styles.controlRow}>
                        <button
                            style={networkPartition ? styles.brokenBtn : styles.healthyBtn}
                            onClick={togglePartition}
                        >
                            {networkPartition ? '❌ Network: PARTITIONED' : '✅ Network: HEALTHY'}
                        </button>

                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <span>Strategy:</span>
                            <select
                                value={strategy}
                                onChange={(e) => setStrategy(e.target.value)}
                                style={styles.select}
                            >
                                <option value="CP">CP (Consistency - Safe)</option>
                                <option value="AP">AP (Availability - Risky)</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '10px', fontWeight: 'bold', color: syncStatus.includes('Hazard') ? 'red' : 'green' }}>
                        Status: {syncStatus}
                    </div>

                    <div style={styles.atmContainer}>
                        {/* ATM SIDE */}
                        <div style={styles.atmScreen}>
                            <h4>🏧 ATM (London)</h4>
                            <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>${atmBalance}</div>
                            <button
                                style={{ ...styles.withdrawBtn, background: atmBalance < 100 ? '#ccc' : '#2196F3' }}
                                onClick={atmWithdraw}
                                disabled={atmBalance < 100}
                            >
                                Withdraw $100
                            </button>
                            <div style={styles.log}>
                                {atmLog.slice(-3).map((l, i) => <div key={i}>{l}</div>)}
                            </div>
                        </div>

                        {/* CONNECTION */}
                        <div style={styles.connector}>
                            {networkPartition ? <span style={{ fontSize: '3rem' }}>✂️</span> : <span style={{ fontSize: '3rem', color: 'green' }}>↔️</span>}
                        </div>

                        {/* SERVER SIDE */}
                        <div style={styles.serverScreen}>
                            <h4>🏦 Server (New York)</h4>
                            <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>${serverBalance}</div>
                            <button
                                style={{ ...styles.withdrawBtn, background: serverBalance < 100 ? '#ccc' : '#FF9800' }}
                                onClick={onlinePay}
                                disabled={serverBalance < 100}
                            >
                                Pay $100 Online
                            </button>
                            <div style={styles.log}>
                                {serverLog.slice(-3).map((l, i) => <div key={i}>{l}</div>)}
                            </div>
                        </div>
                    </div>

                    <PmInsight
                        title="Consistency (CP) vs Availability (AP)"
                        description={strategy === 'CP'
                            ? "With CP, you blocked the ATM when offline. User was annoyed, but the Bank is safe. NO Double Spend."
                            : "With AP, you let the ATM working. The user spent $100 at the ATM AND $100 Online. The Bank lost $100. Catastrophic."}
                        tradeOffs={[
                            "Banks choose CP: Better to show an error than lose money.",
                            "Social Media chooses AP: Better to load a feed than crash, even if the 'Like' count is wrong.",
                            "The Lesson: You can't have both during a partition."
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
    activeTab: { padding: '10px 20px', background: '#E3F2FD', border: '1px solid #2196F3', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', color: '#1565C0' },
    contentBox: { background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },

    // Architectue
    diagram: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', margin: '30px 0', overflowX: 'auto' },
    node: { border: '2px solid #333', borderRadius: '8px', padding: '10px', textAlign: 'center', minWidth: '80px', background: '#FAFAFA' },
    cluster: { border: '2px dashed #999', borderRadius: '8px', padding: '10px', background: '#F5F5F5' },
    smallNode: { border: '1px solid #ccc', background: 'white', padding: '5px', margin: '5px', fontSize: '0.8rem' },
    arrow: { fontSize: '1.2rem', color: '#666' },

    // Scalability
    controlRow: { display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px', padding: '15px', background: '#fafafa', borderRadius: '8px', flexWrap: 'wrap' },
    controlGroup: { display: 'flex', flexDirection: 'column' },
    startBtn: { padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    stopBtn: { padding: '10px 20px', background: '#F44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    metricsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px' },
    metricCard: { border: '1px solid #eee', padding: '15px', borderRadius: '8px', textAlign: 'center', background: '#fff' },
    metricLabel: { fontSize: '0.9rem', color: '#666', marginBottom: '5px' },
    metricValue: { fontSize: '2rem', fontWeight: 'bold' },
    metricUnit: { fontSize: '0.7rem', color: '#999' },

    // CAP
    healthyBtn: { padding: '8px 15px', background: '#E8F5E9', color: '#2E7D32', border: '1px solid #2E7D32', borderRadius: '4px', cursor: 'pointer', width: '200px' },
    brokenBtn: { padding: '8px 15px', background: '#FFEBEE', color: '#C62828', border: '1px solid #C62828', borderRadius: '4px', cursor: 'pointer', width: '200px' },
    select: { padding: '8px', borderRadius: '4px' },
    atmContainer: { display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px', alignItems: 'flex-start' },
    atmScreen: { border: '4px solid #0277BD', borderRadius: '10px', padding: '15px', background: '#E1F5FE', width: '220px', minHeight: '200px' },
    serverScreen: { border: '4px solid #E65100', borderRadius: '10px', padding: '15px', background: '#FFF3E0', width: '220px', minHeight: '200px' },
    withdrawBtn: { width: '100%', padding: '10px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '10px', fontWeight: 'bold' },
    log: { fontSize: '0.7rem', color: '#333', borderTop: '1px solid #ccc', paddingTop: '5px', minHeight: '40px', background: 'white', padding: '5px', borderRadius: '4px', maxHeight: '80px', overflowY: 'auto' },
    connector: { fontSize: '2rem', alignSelf: 'center' }
};

export default SystemDesignLesson;
