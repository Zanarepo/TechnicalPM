
import React, { useState } from 'react';
import PmInsight from './PmInsight';

const AuthLesson = () => {
    const [username, setUsername] = useState('Alice Admin');
    const [password, setPassword] = useState('');
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [serverStatus, setServerStatus] = useState('idle'); // idle, processing, success, error
    const [user, setUser] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setServerStatus('processing');
        setLogs([]);
        setUser(null);

        try {
            // 1. Simulate Client Sending Request
            setLogs(prev => [...prev, `[Client] 📤 Sending POST /api/login with { username: "${username}" }...`]);

            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            // 2. Animate Server Logs (slowly add them for effect)
            if (data.logs) {
                data.logs.forEach((log, index) => {
                    setTimeout(() => {
                        setLogs(prev => [...prev, log]);
                    }, index * 600); // 600ms delay between each log
                });
            }

            // 3. Handle Result
            setTimeout(() => {
                if (data.success) {
                    setServerStatus('success');
                    setUser(data.user);
                    setLogs(prev => [...prev, `[Client] ✅ Login Successful! Welcome ${data.user.name}`]);
                } else {
                    setServerStatus('error');
                    setLogs(prev => [...prev, `[Client] 🛑 Error: ${data.error}`]);
                }
                setIsLoading(false);
            }, (data.logs?.length || 0) * 600 + 500);

        } catch (err) {
            setServerStatus('error');
            setLogs(prev => [...prev, `[Client] 🚨 Network Error: Is the Backend running?`]);
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>👮 Lesson 1: Role-Based Access Control (RBAC)</h2>
            <p><strong>Goal:</strong> Test permissions. Log in as <em>Alice (Admin)</em> vs <em>Bob (Customer)</em> to see what they can access.</p>

            <div style={styles.splitScreen}>

                {/* LEFT PANEL: CLIENT (Login Form) */}
                <div style={styles.clientPanel}>
                    <h3>💻 Client (Frontend)</h3>

                    {!user ? (
                        <form onSubmit={handleLogin} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label>Username</label>
                                <select
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="Alice Admin">Alice Admin (Valid)</option>
                                    <option value="Bob Builder">Bob Builder (Valid)</option>
                                    <option value="Hacker">Hacker (Invalid)</option>
                                </select>
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Try 'hashed_secret_123'"
                                    style={styles.input}
                                />
                            </div>

                            <p style={{ fontSize: '0.8rem', color: '#666' }}>
                                Hint: Alice's password is <code>hashed_secret_123</code>
                            </p>

                            <button
                                type="submit"
                                disabled={isLoading}
                                style={isLoading ? styles.buttonDisabled : styles.button}
                            >
                                {isLoading ? 'Processing...' : 'Login'}
                            </button>
                        </form>
                    ) : (
                        <div style={styles.successState}>
                            <div style={{ fontSize: '3rem' }}>🔓</div>
                            <h3>Welcome, {user.name}!</h3>
                            <p style={{ marginBottom: '2rem' }}>Roles: {user.roles.join(', ')}</p>

                            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                                {/* STANDARD FEATURE */}
                                <button
                                    onClick={async () => {
                                        setServerStatus('processing');
                                        setLogs(prev => [...prev, `[Client] 🔍 Requesting MY Accounts (Header: UserID ${user.id})...`]);
                                        try {
                                            const res = await fetch('http://localhost:3001/api/my-accounts', {
                                                headers: { 'x-user-id': user.id }
                                            });
                                            const data = await res.json();
                                            if (data.success) {
                                                setLogs(prev => [...prev, `[Server] ✅ 200 OK: Found ${data.accounts.length} accounts.`]);
                                                setLogs(prev => [...prev, `[Result] ${JSON.stringify(data.accounts.map(a => `$${a.balance}`))}`]);
                                            } else {
                                                setLogs(prev => [...prev, `[Server] 🛑 ${data.error}`]);
                                            }
                                        } catch (e) { setLogs(prev => [...prev, `[Error] Network Fail`]) }
                                    }}
                                    style={styles.actionBtn}
                                >
                                    📂 View My Statement
                                </button>

                                {/* ADMIN FEATURE */}
                                <button
                                    onClick={async () => {
                                        setServerStatus('processing');
                                        setLogs(prev => [...prev, `[Client] 🛡️ Requesting ADMIN Ledger (Header: UserID ${user.id})...`]);
                                        try {
                                            const res = await fetch('http://localhost:3001/api/admin/ledger', {
                                                headers: { 'x-user-id': user.id }
                                            });
                                            const data = await res.json();
                                            if (data.success) {
                                                setLogs(prev => [...prev, `[Server] ✅ 200 OK: ADMIN ACCESS GRANTED.`]);
                                                setLogs(prev => [...prev, `[Result] Bank Total Deposits: $${data.totalMoney}`]);
                                            } else {
                                                setLogs(prev => [...prev, `[Server] 🛑 ${res.status} ${data.error}`]);
                                            }
                                        } catch (e) { setLogs(prev => [...prev, `[Error] Network Fail`]) }
                                    }}
                                    style={{ ...styles.actionBtn, backgroundColor: '#455a64' }}
                                >
                                    🔐 Access Admin Vault
                                </button>
                            </div>

                            <button onClick={() => setUser(null)} style={{ ...styles.button, width: '100%', marginTop: '20px' }}>Logout</button>
                        </div>
                    )}
                </div>

                {/* RIGHT PANEL: SERVER (Glass Box) */}
                <div style={styles.serverPanel}>
                    <h3>🗄️ Server Terminal (Backend)</h3>
                    <div style={styles.terminal}>
                        {logs.length === 0 && <span style={{ opacity: 0.5 }}>Waiting for request...</span>}
                        {logs.map((log, i) => (
                            <div key={i} style={styles.logLine}>
                                <span style={{ color: '#00e676' }}>&gt;</span> {log}
                            </div>
                        ))}
                        {isLoading && <div style={styles.cursor}>_</div>}
                    </div>
                </div>

            </div>

            <PmInsight
                title="The Friction vs. Security Trade-off"
                description="Every extra security step (MFA, Captcha) drops user conversion by ~5-10%. Auth is about finding the 'Sweet Spot'."
                tradeOffs={[
                    "Too Secure (Log out every 5 mins) = Users hate you.",
                    "Too Lax (Never log out) = Account takeovers.",
                    "PM Choice: 'Remember Me' for 30 days is a product decision, not just technical."
                ]}
            />
        </div>
    );
};

const styles = {
    container: {
        padding: '1rem',
    },
    splitScreen: {
        display: 'flex',
        gap: '2rem',
        marginTop: '2rem',
        flexWrap: 'wrap',
    },
    clientPanel: {
        flex: 1,
        minWidth: '300px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '2rem',
        backgroundColor: 'white',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },
    serverPanel: {
        flex: 1,
        minWidth: '300px',
        border: '4px solid #333',
        borderRadius: '8px',
        backgroundColor: '#1e1e1e',
        color: '#00e676',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    button: {
        padding: '12px',
        backgroundColor: '#1a237e',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        marginTop: '1rem',
    },
    actionBtn: {
        padding: '12px',
        backgroundColor: '#009688',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        width: '100%',
        textAlign: 'left'
    },
    buttonDisabled: {
        padding: '12px',
        backgroundColor: '#ccc',
        color: '#666',
        border: 'none',
        borderRadius: '4px',
        cursor: 'not-allowed',
        fontSize: '1rem',
        marginTop: '1rem',
    },
    terminal: {
        padding: '1.5rem',
        fontFamily: 'monospace',
        height: '400px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    logLine: {
        wordBreak: 'break-word',
        lineHeight: '1.5',
    },
    successState: {
        textAlign: 'center',
        padding: '2rem',
    },
    cursor: {
        animation: 'blink 1s step-end infinite',
    }
};

export default AuthLesson;
