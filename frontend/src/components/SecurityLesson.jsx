import React, { useState } from 'react';
import PmInsight from './PmInsight';

const SecurityLesson = () => {
    const [mode, setMode] = useState('signup'); // 'signup' or 'login'
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dbRecord, setDbRecord] = useState(null);
    const [capturedToken, setCapturedToken] = useState(null);

    // User Input State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentStep, setCurrentStep] = useState(0);

    const executeAction = async () => {
        setLoading(true);
        setLogs([]);
        setCurrentStep(0);

        const endpoint = mode === 'signup' ? '/api/users' : '/api/login';

        try {
            const res = await fetch(`http://localhost:3001${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: username, username, password })
                // Sending both name/username to cover both endpoints (signup uses name, login uses username)
            });
            const data = await res.json();

            // We expect 'logs' array from the backend if we enhanced it, 
            // OR we can simulate the visualization here if backend doesn't send detailed logs for everything.
            // Our backend update for login sends 'logs'. Signup might need updates or we simulate.

            // For this UI, let's create a "Visual Story" based on the action
            let visualLogs = [];

            if (data.logs) {
                // Use backend logs if available
                visualLogs = data.logs;
            } else if (mode === 'signup' && data.success) {
                // Simulate if backend didn't send logs for signup yet
                visualLogs = [
                    `[Client] 📝 Formatting Request: { name: "${username}", password: "***" }`,
                    `[Network] 🔒 Encrypting via HTTPS (Simulated)...`,
                    `[Server] 📨 Received payload.`,
                    `[Security] 🛡️ Protocol: SHA-256 Hashing Initiated.`,
                    `[Security] 🧂 Generating Unique Salt... Done.`,
                    `[Security] 🔐 Hashing Password... Result: ${data.user?.hash ? data.user.hash.substring(0, 15) + '...' : 'a9f2...'}`,
                    `[Database] 💾 Storing Name + Salt + Hash. (NOT Real Password)`,
                    `[Success] ✅ User Created.`
                ];
            } else if (data.error) {
                visualLogs = [`[Error] 🛑 ${data.error}`];
            }

            // Animate logs one by one
            let shownLogs = [];
            for (let i = 0; i < visualLogs.length; i++) {
                await new Promise(r => setTimeout(r, 600)); // Delay for dramatic effect
                shownLogs.push(visualLogs[i]);
                setLogs([...shownLogs]);
                setCurrentStep(i + 1);
            }

            // --- USER REQUEST: SHOW RAW DB RECORD ---
            // After action, fetch the "Raw" DB to show what happened behind the scenes
            if (!data.error) {
                const dbRes = await fetch('http://localhost:3001/api/users');
                const dbUsers = await dbRes.json();
                // Find our user (by id if we have it, or name)
                const targetUser = data.user ? dbUsers.find(u => u.id === data.user.id) : dbUsers.find(u => u.name === username);

                if (targetUser) {
                    setDbRecord(targetUser);
                }
            }

            // Save Token
            if (data.token) {
                setCapturedToken(data.token);
            }

        } catch (e) {
            setLogs(["[Network] ❌ Error connecting to server."]);
        }

        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>🔐 Lesson 2: Security Mechanics (Deep Dive)</h2>
                <p><strong>Goal:</strong> See the invisible. Watch how <strong>Hashing</strong> and <strong>Tokens</strong> work under the hood.</p>
            </div>

            <div style={styles.controls}>
                <button
                    onClick={() => { setMode('signup'); setLogs([]); }}
                    style={{ ...styles.tab, borderBottom: mode === 'signup' ? '3px solid #4CAF50' : 'none' }}
                >
                    1. Hashing Visualizer (Sign Up)
                </button>
                <button
                    onClick={() => { setMode('login'); setLogs([]); }}
                    style={{ ...styles.tab, borderBottom: mode === 'login' ? '3px solid #2196F3' : 'none' }}
                >
                    2. Token Visualizer (Login)
                </button>
                <button
                    onClick={() => { setMode('protocols'); setLogs([]); }}
                    style={{ ...styles.tab, borderBottom: mode === 'protocols' ? '3px solid #9c27b0' : 'none' }}
                >
                    3. Protocols (Sessions vs JWT)
                </button>
            </div>

            {mode !== 'protocols' ? (
                /* INTERACTIVE DEMO AREA (Existing Code) */
                <>
                    <div style={styles.demoArea}>
                        {/* LEFT: INPUTS */}
                        <div style={styles.card}>
                            <h3>👤 User Simulation</h3>
                            <div style={styles.inputGroup}>
                                <label>Username/Name:</label>
                                <input
                                    style={styles.input}
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder="Enter name..."
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label>Password:</label>
                                <input
                                    style={styles.input}
                                    type="text" // Visible for learning purposes!
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Enter password..."
                                />
                                <small style={{ color: '#888' }}>*Visible for education only</small>
                            </div>
                            <button
                                onClick={executeAction}
                                disabled={loading}
                                style={{
                                    ...styles.button,
                                    backgroundColor: mode === 'signup' ? '#4CAF50' : '#2196F3',
                                    opacity: loading ? 0.7 : 1
                                }}
                            >
                                {loading ? 'Processing...' : (mode === 'signup' ? '🛡️ Secure Sign Up' : '🔑 Secure Login')}
                            </button>
                        </div>

                        {/* RIGHT: VISUALIZER */}
                        <div style={styles.terminal}>
                            <div style={styles.terminalHeader}>
                                <span style={{ color: '#ff5f56' }}>●</span>
                                <span style={{ color: '#ffbd2e' }}>●</span>
                                <span style={{ color: '#27c93f' }}>●</span>
                                <span style={{ marginLeft: '10px', color: '#888', fontSize: '0.8rem' }}>security_daemon.exe</span>
                            </div>
                            <div style={styles.logs}>
                                {logs.length === 0 && !loading && (
                                    <div style={{ color: '#666', fontStyle: 'italic', padding: '20px' }}>
                                        Ready for input. Waiting to initiate security protocols...
                                    </div>
                                )}
                                {logs.map((log, i) => (
                                    <div key={i} style={{
                                        marginBottom: '8px',
                                        fontFamily: 'monospace',
                                        color: log.includes('Error') || log.includes('Mismatch') || log.includes('Denied') ? '#ff5252' : '#aeea00',
                                        borderLeft: log.includes('Security') ? '2px solid #2196F3' : 'none',
                                        paddingLeft: log.includes('Security') ? '10px' : '0'
                                    }}>
                                        <span style={{ opacity: 0.5, marginRight: '10px' }}>{i + 1} &gt;</span>
                                        {log}
                                    </div>
                                ))}
                                {loading && logs.length === 0 && (
                                    <div style={{ color: '#aeea00' }}>Initiating secure connection...</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* DIAGRAM SECTION */}
                    <div style={styles.diagram}>
                        <h3>🧠 How it Works</h3>
                        {mode === 'signup' ? (
                            <div style={styles.diagramBox}>
                                <div style={styles.step}>Password<br />"123"</div>
                                <div style={styles.arrow}>+ Salt 🧂</div>
                                <div style={styles.step}>"123xyz"</div>
                                <div style={styles.arrow}>➡ Hash Fn ⚙️</div>
                                <div style={{ ...styles.step, borderColor: '#4CAF50' }}>Hash<br />"a9b..."</div>
                                <div style={styles.arrow}>➡ Database 💾</div>
                            </div>
                        ) : (
                            <div style={styles.diagramBox}>
                                <div style={styles.step}>Input<br />"123"</div>
                                <div style={styles.arrow}>+ Stored Salt 🧂</div>
                                <div style={styles.step}>"123xyz"</div>
                                <div style={styles.arrow}>➡ Hash Fn ⚙️</div>
                                <div style={styles.step}>Calculated<br />"a9b..."</div>
                                <div style={styles.arrow}>==</div>
                                <div style={{ ...styles.step, borderColor: '#2196F3' }}>Stored<br />"a9b..."</div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                /* PROTOCOLS EXPLAINER */
                <div style={styles.protocolContainer}>
                    <h3>How do we remember you? (Sessions vs Tokens)</h3>

                    <div style={styles.comparisonGrid}>
                        {/* SESSION CARD */}
                        <div style={styles.protocolCard}>
                            <h4 style={{ color: '#e91e63' }}>🧥 Server-Side Sessions</h4>
                            <div style={{ fontSize: '3rem', margin: '10px 0' }}>🎟️</div>
                            <p><strong>The "Coat Check" Analogy</strong></p>
                            <ul style={{ textAlign: 'left', lineHeight: '1.6' }}>
                                <li>You give your coat to the clerk (Server).</li>
                                <li>Clerk gives you a ticket <strong>#34</strong> (Session ID).</li>
                                <li>To get your coat, you just show <strong>#34</strong>.</li>
                                <li><strong>The Catch:</strong> The Server must keep a massive room of coats (Memory). If the room burns down, everyone loses their coat.</li>
                            </ul>
                        </div>

                        {/* JWT CARD */}
                        <div style={{ ...styles.protocolCard, borderColor: '#9c27b0' }}>
                            <h4 style={{ color: '#9c27b0' }}>🎫 JSON Web Tokens (JWT)</h4>
                            <div style={{ fontSize: '3rem', margin: '10px 0' }}>🛡️</div>
                            <p><strong>The "VIP Wristband" Analogy</strong></p>
                            <ul style={{ textAlign: 'left', lineHeight: '1.6' }}>
                                <li>You buy a ticket. We give you a <strong>Wristband</strong>.</li>
                                <li>The wristband has your info written on it ("VIP Access").</li>
                                <li>The Security Guard just reads your wristband.</li>
                                <li><strong>The Catch:</strong> We don't keep a list. We verify the "Holographic Seal" (Signature) to make sure you didn't fake it.</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f3e5f5', borderRadius: '8px' }}>
                        <strong>🏆 The Bank of TPM Verdict:</strong><br />
                        We use <strong>JWTs (Tokens)</strong>. This allows our Banking Microservices (Ledger Service, User Service) to trust each other without constantly asking a central database "Is this guy legit?".
                    </div>
                </div>
            )}

            {/* DB RECORD VIEWER */}
            {dbRecord && (
                <div style={styles.dbViewer}>
                    <h3 style={{ color: '#aeea00', fontFamily: 'monospace' }}>💾 LIVE DATABASE INSPECTION (Admin View)</h3>
                    <p>This is what is actually saved in <code>ledger.json</code>:</p>
                    <pre style={styles.jsonCode}>
                        {JSON.stringify(dbRecord, null, 2)}
                    </pre>
                    <div style={styles.note}>
                        Notice: <strong>password</strong> is NOT here. Only <strong>hash</strong> and <strong>salt</strong>.
                    </div>
                </div>
            )}

            {/* JWT TOKEN INSPECTOR (Active only after Login) */}
            {mode === 'login' && logs.some(l => l.includes('Identity Confirmed')) && (
                <div style={styles.jwtViewer}>
                    <h3 style={{ color: '#fff' }}>🎫 YOUR ACCESS TOKEN (The Wristband)</h3>
                    <p style={{ color: '#ccc' }}>The server sent this back. You must keep it for future requests.</p>

                    {/* Visual Token Representation */}
                    <div style={styles.tokenBox}>
                        {capturedToken ? (
                            (() => {
                                const parts = capturedToken.split('.');
                                return (
                                    <span>
                                        <span style={{ color: '#fb015b', wordBreak: 'break-all' }}>{parts[0]}</span>
                                        <span style={{ color: '#bbb' }}>.</span>
                                        <span style={{ color: '#d63aff', wordBreak: 'break-all' }}>{parts[1]}</span>
                                        <span style={{ color: '#bbb' }}>.</span>
                                        <span style={{ color: '#00b9f1', wordBreak: 'break-all' }}>{parts[2]}</span>
                                    </span>
                                )
                            })()
                        ) : (
                            <span style={{ color: '#666' }}>Waiting for token...</span>
                        )}
                    </div>

                    <div style={styles.tokenLegend}>
                        <span style={{ color: '#fb015b' }}>● Header</span>
                        <span style={{ color: '#d63aff' }}>● Payload (Data)</span>
                        <span style={{ color: '#00b9f1' }}>● Signature (Seal)</span>
                    </div>

                    <div style={{ marginTop: '20px', padding: '10px', background: '#222', borderRadius: '5px' }}>
                        <strong style={{ color: '#d63aff' }}>🔓 Decoded Payload:</strong>
                        <pre style={{ color: '#fff', fontSize: '0.9rem' }}>
                            {`{
  "id": ${dbRecord?.id || 1},
  "name": "${dbRecord?.name || 'User'}",
  "role": "${dbRecord?.roles?.includes('admin') ? 'admin' : 'customer'}",
  "exp": "1 hour"
}`}
                        </pre>
                        <small style={{ color: '#888' }}>This data is readable by anyone! But it cannot be <strong>changed</strong> without invalidating the Blue Signature.</small>
                    </div>
                </div>

            )
            }

            <PmInsight
                title="Security is Invisible (Until it Fails)"
                description="Unlike a 'Dark Mode' feature, users don't see Hashing/Salting. But if you skip it, a data breach costs millions + loss of trust."
                tradeOffs={[
                    "Development Speed vs Security Review: Skipping security checks ships faster but relies on luck.",
                    "PM Role: Prioritize 'Technical Debt' (upgrading libraries) to prevent vulnerabilities.",
                    "The 30-Day Rule: If an employee leaves, their session (Token) must expire or be revoked."
                ]}
            />
        </div >
    );
};

const styles = {
    container: { padding: '20px', maxWidth: '1000px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '30px' },
    controls: { display: 'flex', borderBottom: '1px solid #ddd', marginBottom: '20px' },
    tab: { flex: 1, padding: '15px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', color: '#555' },

    demoArea: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
    card: { flex: 1, minWidth: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', backgroundColor: 'white' },
    inputGroup: { marginBottom: '15px' },
    input: { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '1rem' },
    button: { width: '100%', padding: '12px', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer', marginTop: '10px' },

    terminal: { flex: 1.5, minWidth: '300px', backgroundColor: '#1e1e1e', borderRadius: '8px', padding: '0', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' },
    terminalHeader: { backgroundColor: '#333', padding: '10px 15px', display: 'flex', alignItems: 'center' },
    logs: { padding: '20px', fontFamily: 'monospace', color: '#ddd', height: '300px', overflowY: 'auto' },

    diagram: { marginTop: '40px', textAlign: 'center' },
    diagramBox: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '20px' },
    step: { padding: '10px 20px', border: '2px solid #ddd', borderRadius: '8px', fontWeight: 'bold', backgroundColor: 'white' },
    arrow: { fontSize: '1.2rem', color: '#666' },

    protocolContainer: { textAlign: 'center', padding: '20px' },
    comparisonGrid: { display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' },
    protocolCard: { flex: 1, minWidth: '300px', border: '2px solid #ccc', borderRadius: '10px', padding: '20px', backgroundColor: 'white' },

    dbViewer: { marginTop: '40px', padding: '20px', backgroundColor: '#000', borderRadius: '8px', border: '2px solid #4CAF50' },
    jsonCode: { color: '#0f0', textAlign: 'left', overflowX: 'auto' },
    note: { color: '#fff', marginTop: '10px', fontStyle: 'italic', borderTop: '1px solid #444', paddingTop: '10px' },

    jwtViewer: { marginTop: '40px', padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px', border: '2px solid #9c27b0' },
    tokenBox: { fontFamily: 'monospace', padding: '15px', background: '#000', borderRadius: '5px', marginBottom: '10px', fontSize: '1.2rem', lineHeight: '1.5' },
    tokenLegend: { display: 'flex', gap: '20px', fontSize: '0.9rem', fontWeight: 'bold' }
};

export default SecurityLesson;
