import React, { useState } from 'react';

const ScalingExplainer = () => {
    const [mode, setMode] = useState('vertical'); // 'vertical' or 'horizontal'

    // Vertical State
    const [serverSize, setServerSize] = useState(1); // 1 to 5 (XL)
    const [verticalCost, setVerticalCost] = useState(10);

    // Horizontal State
    const [serverCount, setServerCount] = useState(1); // 1 to 10
    const [horizontalCost, setHorizontalCost] = useState(10);
    const [reqIndex, setReqIndex] = useState(0); // For visualizing load balancer round robin

    // Vertical Logic
    const upgradeVertical = () => {
        if (serverSize < 5) {
            setServerSize(prev => prev + 1);
            setVerticalCost(prev => prev * 2); // Exponential cost for specialized hardware
        }
    };

    const downgradeVertical = () => {
        if (serverSize > 1) {
            setServerSize(prev => prev - 1);
            setVerticalCost(prev => prev / 2);
        }
    };

    // Horizontal Logic
    const addServer = () => {
        if (serverCount < 8) {
            setServerCount(prev => prev + 1);
            setHorizontalCost(prev => prev + 10); // Linear cost
        }
    };

    const removeServer = () => {
        if (serverCount > 1) {
            setServerCount(prev => prev - 1);
            setHorizontalCost(prev => prev - 10);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3>⚖️ Scaling Strategies: Vertical vs Horizontal</h3>
                <p>How do we handle 1 million users? Make the machine bigger or add more machines?</p>
            </div>

            {/* TOGGLE MODES */}
            <div style={styles.toggles}>
                <button
                    onClick={() => setMode('vertical')}
                    style={mode === 'vertical' ? styles.activeTab : styles.tab}
                >
                    🗼 Vertical Scaling (Scale Up)
                </button>
                <button
                    onClick={() => setMode('horizontal')}
                    style={mode === 'horizontal' ? styles.activeTab : styles.tab}
                >
                    🏙️ Horizontal Scaling (Scale Out)
                </button>
            </div>

            {/* VISUALIZATION AREA */}
            <div style={styles.visArea}>

                {/* 1. VERTICAL MODE */}
                {mode === 'vertical' && (
                    <div style={styles.scene}>
                        <div style={styles.controls}>
                            <button onClick={downgradeVertical} disabled={serverSize === 1} style={styles.btn}>- Downgrade</button>
                            <span style={styles.stat}>Size: {getShirtSize(serverSize)}</span>
                            <button onClick={upgradeVertical} disabled={serverSize === 5} style={styles.btn}>+ Upgrade CPU/RAM</button>
                        </div>

                        <p style={styles.desc}>
                            Buying a bigger, stronger machine. Easiest to do (no code changes), but has a <strong>Hard Limit</strong> and gets expensive fast.
                        </p>

                        <div style={styles.rack}>
                            <div style={{
                                ...styles.serverBox,
                                width: `${100 + (serverSize * 40)}px`,
                                height: `${100 + (serverSize * 40)}px`,
                                fontSize: `${1 + (serverSize * 0.2)}rem`,
                                backgroundColor: getHeatColor(serverSize)
                            }}>
                                🖥️<br />
                                <span style={{ fontSize: '0.8rem' }}>Server-01</span>
                            </div>
                        </div>

                        <div style={styles.metrics}>
                            <div>Cost: <span style={{ color: 'red' }}>${verticalCost}/hr</span></div>
                            <div>Capacity: <span style={{ color: 'green' }}>{serverSize * 1000} req/s</span></div>
                            <div>Downtime to Upgrade: <span style={{ color: 'red', fontWeight: 'bold' }}>YES</span> (Restart required)</div>
                        </div>
                    </div>
                )}

                {/* 2. HORIZONTAL MODE */}
                {mode === 'horizontal' && (
                    <div style={styles.scene}>
                        <div style={styles.controls}>
                            <button onClick={removeServer} disabled={serverCount === 1} style={styles.btn}>- Remove Node</button>
                            <span style={styles.stat}>Count: {serverCount} Nodes</span>
                            <button onClick={addServer} disabled={serverCount === 8} style={styles.btn}>+ Add Node</button>
                        </div>

                        <p style={styles.desc}>
                            Adding more cheap, commodity machines. Theoretically <strong>Infinite Scale</strong>, but requires a Load Balancer and specific coding patterns (Stateless).
                        </p>

                        {/* Load Balancer Visual */}
                        <div style={styles.lbRow}>
                            <div style={styles.loadBalancer}>
                                ⚖️ Load Balancer
                                <div style={{ fontSize: '0.7rem', marginTop: '5px' }}>Distributing Traffic...</div>
                            </div>
                            <div style={styles.arrows}>⬇️ ⬇️ ⬇️</div>
                        </div>

                        <div style={styles.cluster}>
                            {Array.from({ length: serverCount }).map((_, i) => (
                                <div key={i} style={styles.miniServer}>
                                    💻<br />Node-{i + 1}
                                </div>
                            ))}
                        </div>

                        <div style={styles.metrics}>
                            <div>Cost: <span style={{ color: 'green' }}>${horizontalCost}/hr</span> (Linear)</div>
                            <div>Capacity: <span style={{ color: 'green' }}>{serverCount * 1000} req/s</span></div>
                            <div>Downtime to Scale: <span style={{ color: 'green', fontWeight: 'bold' }}>NONE</span> (Hot Swap)</div>
                        </div>
                    </div>
                )}

            </div>

            {/* PM INSIGHT FOOTER */}
            <div style={styles.insight}>
                <strong>💡 PM Takeaway:</strong><br />
                Start <strong>Vertical</strong> (it's simpler). When you hit the ceiling (or cost gets too high), refactor for <strong>Horizontal</strong> (Microservices/Kubernetes).
                <br />
                <em>Analogy: It's easier to hire one genius (Vertical) than to coordinate a team of 10 average people (Horizontal), but the team scales better.</em>
            </div>
        </div>
    );
};

// Helpers
const getShirtSize = (s) => ['XS', 'S', 'M', 'L', 'XL', 'Gozilla'][s - 1];

const getHeatColor = (s) => {
    const intensity = (s / 5) * 255;
    return `rgb(255, ${255 - intensity}, ${255 - intensity})`; // Gets redder as it gets bigger
};

const styles = {
    container: {
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '12px',
        background: 'white',
        maxWidth: '800px',
        margin: '0 auto'
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px'
    },
    toggles: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '20px'
    },
    tab: {
        padding: '10px 20px',
        border: '1px solid #ccc',
        borderRadius: '20px',
        cursor: 'pointer',
        background: '#f5f5f5'
    },
    activeTab: {
        padding: '10px 20px',
        border: '2px solid #2196f3',
        borderRadius: '20px',
        cursor: 'pointer',
        background: '#e3f2fd',
        fontWeight: 'bold',
        color: '#1565c0'
    },
    visArea: {
        minHeight: '400px',
        background: '#fafafa',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #eee',
        display: 'flex',
        justifyContent: 'center'
    },
    scene: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '15px'
    },
    btn: {
        padding: '8px 16px',
        background: '#333',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    stat: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
        minWidth: '100px',
        textAlign: 'center'
    },
    desc: {
        fontSize: '0.9rem',
        color: '#666',
        textAlign: 'center',
        maxWidth: '500px',
        marginBottom: '30px'
    },
    rack: {
        height: '300px',
        display: 'flex',
        alignItems: 'end', // meaningful growth upwards
        marginBottom: '20px'
    },
    serverBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '4px solid #333',
        borderRadius: '8px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        fontWeight: 'bold',
        transition: 'all 0.3s ease-out',
        color: '#333'
    },
    metrics: {
        display: 'flex',
        gap: '20px',
        padding: '15px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        marginTop: 'auto',
        borderTop: '2px solid #eee'
    },
    // Horizontal speific
    lbRow: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px'
    },
    loadBalancer: {
        padding: '15px 30px',
        background: '#673ab7',
        color: 'white',
        borderRadius: '8px',
        fontWeight: 'bold',
        boxShadow: '0 4px 10px rgba(103, 58, 183, 0.3)',
        textAlign: 'center'
    },
    arrows: {
        fontSize: '1.5rem',
        margin: '5px 0',
        color: '#aaa',
        animation: 'bounce 1s infinite'
    },
    cluster: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '600px',
        marginBottom: '30px'
    },
    miniServer: {
        width: '80px',
        height: '80px',
        background: '#e0f7fa',
        border: '2px solid #00acc1',
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.8rem',
        color: '#006064',
        fontWeight: 'bold',
        animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    insight: {
        marginTop: '20px',
        padding: '15px',
        background: '#fff3cd',
        borderLeft: '5px solid #ffc107',
        borderRadius: '4px',
        fontSize: '0.9rem',
        lineHeight: '1.5'
    }
};

// Add global style for keyframes if needed in a real app, 
// but for inline react styles we might miss keyframes. 
// We can use a style tag.
const StyleTag = () => (
    <style>{`
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(5px); }
        }
        @keyframes popIn {
            from { transform: scale(0); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `}</style>
);

export default () => (
    <>
        <StyleTag />
        <ScalingExplainer />
    </>
);
