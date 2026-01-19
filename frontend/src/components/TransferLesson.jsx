
import React, { useState } from 'react';

const TransferLesson = () => {
    const [senderId, setSenderId] = useState('501'); // Alice Checking
    const [receiverId, setReceiverId] = useState('503'); // Bob Checking
    const [amount, setAmount] = useState('100');
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [serverStatus, setServerStatus] = useState('idle');

    const handleTransfer = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setServerStatus('processing');
        setLogs([]);

        try {
            setLogs(prev => [...prev, `[Client] 💸 Requesting Transfer: $${amount} from Account #${senderId} to #${receiverId}...`]);

            const response = await fetch('http://localhost:3001/api/transfer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ senderId, receiverId, amount })
            });

            const data = await response.json();

            if (data.logs) {
                data.logs.forEach((log, index) => {
                    setTimeout(() => {
                        setLogs(prev => [...prev, log]);
                    }, index * 600);
                });
            }

            setTimeout(() => {
                if (data.success) {
                    setServerStatus('success');
                    setLogs(prev => [...prev, `[Client] ✅ Transfer Complete! New Balance: $${data.newBalance}`]);
                } else {
                    setServerStatus('error');
                    setLogs(prev => [...prev, `[Client] 🛑 Transaction Failed: ${data.error}`]);
                }
                setIsLoading(false);
            }, (data.logs?.length || 0) * 600 + 500);

        } catch (err) {
            setServerStatus('error');
            setLogs(prev => [...prev, `[Client] 🚨 Network Error`]);
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>💸 Module 3: The Exchange (Business Logic)</h2>
            <p>Simulate an Atomic Transaction inside the Banking Ledger.</p>

            <div style={styles.splitScreen}>
                {/* LEFT: FORM */}
                <div style={styles.clientPanel}>
                    <h3>💳 Transfer Money</h3>
                    <form onSubmit={handleTransfer} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label>From Account (Sender)</label>
                            <select value={senderId} onChange={e => setSenderId(e.target.value)} style={styles.input}>
                                <option value="501">#501 Alice Checking ($1000)</option>
                                <option value="502">#502 Alice Savings ($5000)</option>
                            </select>
                        </div>

                        <div style={styles.inputGroup}>
                            <label>To Account (Receiver)</label>
                            <select value={receiverId} onChange={e => setReceiverId(e.target.value)} style={styles.input}>
                                <option value="503">#503 Bob Checking</option>
                                <option value="999">#999 Unknown (Error Test)</option>
                            </select>
                        </div>

                        <div style={styles.inputGroup}>
                            <label>Amount ($)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                style={styles.input}
                            />
                        </div>

                        <p style={{ fontSize: '0.8rem', color: '#666' }}>
                            Try transferring $1,000,000 to see 'Insufficient Funds' logic.
                        </p>

                        <button type="submit" disabled={isLoading} style={isLoading ? styles.buttonDisabled : styles.button}>
                            {isLoading ? 'Processing...' : 'Send Money'}
                        </button>
                    </form>
                </div>

                {/* RIGHT: LOGS */}
                <div style={styles.serverPanel}>
                    <h3>🗄️ Server Terminal</h3>
                    <div style={styles.terminal}>
                        {logs.length === 0 && <span style={{ opacity: 0.5 }}>Waiting for transaction...</span>}
                        {logs.map((log, i) => (
                            <div key={i} style={styles.logLine}>
                                <span style={{ color: '#00e676' }}>&gt;</span> {log}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '1rem' },
    splitScreen: { display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' },
    clientPanel: { flex: 1, minWidth: '300px', border: '1px solid #ddd', borderRadius: '8px', padding: '2rem', backgroundColor: 'white' },
    serverPanel: { flex: 1, minWidth: '300px', border: '4px solid #333', borderRadius: '8px', backgroundColor: '#1e1e1e', color: '#00e676', display: 'flex', flexDirection: 'column' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' },
    button: { padding: '12px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' },
    buttonDisabled: { padding: '12px', backgroundColor: '#ccc', color: '#666', border: 'none', borderRadius: '4px', cursor: 'not-allowed' },
    terminal: { padding: '1.5rem', fontFamily: 'monospace', height: '400px', overflowY: 'auto' },
    logLine: { marginBottom: '0.5rem', lineHeight: '1.4' }
};

export default TransferLesson;
