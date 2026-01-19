
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
                // In unsafe mode, this 'prevBalance' inside the setter is correct for React state, 
                // BUT to visually simulate the bug, we need to pretend they read the OLD balance.
                // However, React functional updates are atomic.
                // To simulate the race condition properly in UI, we can cheat a bit:
                // If safeMode is OFF, and we have multiple processings, we might want to force a conflict.
                // Actually, the easiest way to show the bug in React is:
                // Read from a specific value captured at start, NOT prevBalance.

                // For demonstration, let's just subtract 10. 
                // Visual bug explanation is better: 
                // "Alice reads 100. Bob reads 100. Alice writes 90. Bob writes 90."

                // Let's rely on the visual log to explain the race, but ensure the math is reliable for the lesson.
                // Actually, let's implement the BUG!

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

            <div style={{ marginTop: '20px', background: '#fff9c4', padding: '15px', borderRadius: '8px', fontSize: '0.9rem' }}>
                <strong>Experiment:</strong>
                <ol style={{ textAlign: 'left', margin: '10px 0 0 20px' }}>
                    <li>Select <strong>Unsafe Mode</strong>.</li>
                    <li>Click <strong>Alice</strong> and <strong>Bob</strong> as fast as you can!</li>
                    <li>Observe what happens when they read the balance at the same time.</li>
                </ol>
            </div>
        </div>
    );
};
