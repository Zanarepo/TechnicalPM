
import React, { useState } from 'react';

const NetworkSimulation = () => {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [data, setData] = useState(null);

    const fetchData = () => {
        setStatus('loading');
        setData(null);

        // SIMULATE NETWORK DELAY (Latency)
        setTimeout(() => {
            setStatus('success');
            setData({
                id: 101,
                username: "technical_pm",
                role: "admin",
                lastLogin: "2026-01-18"
            });
        }, 2000); // 2 seconds
    };

    return (
        <div style={styles.container}>
            <h2>🌐 The Client-Server Model</h2>
            <p>Simulate a User requesting data from the Backend API.</p>

            <div style={styles.diagram}>

                {/* CLIENT (Browser) */}
                <div style={styles.box}>
                    <h3>💻 Client (Frontend)</h3>
                    <p>The Browser (React)</p>

                    <button
                        onClick={fetchData}
                        disabled={status === 'loading'}
                        style={status === 'loading' ? styles.buttonDisabled : styles.button}
                    >
                        {status === 'loading' ? 'Requesting...' : 'Fetch User Data'}
                    </button>

                    {status === 'loading' && <div style={styles.spinner}>⏳ Waiting for Server...</div>}
                </div>

                {/* ARROWS */}
                <div style={styles.arrowContainer}>
                    <div style={{ ...styles.arrow, opacity: status === 'loading' ? 1 : 0.2 }}>
                        ➡️ GET /api/user
                    </div>
                    <div style={{ ...styles.arrow, opacity: status === 'success' ? 1 : 0.2 }}>
                        ⬅️ 200 OK (JSON)
                    </div>
                </div>

                {/* SERVER (Backend) */}
                <div style={{ ...styles.box, borderColor: '#4caf50' }}>
                    <h3>🗄️ Server (Backend)</h3>
                    <p>Node.js / Database</p>
                    <div style={styles.dbIcon}>💽</div>
                </div>

            </div>

            {/* RESPONSE AREA */}
            {data && (
                <div style={styles.response}>
                    <h4>📦 Payload Received (JSON)</h4>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        border: '1px solid #ddd',
        marginTop: '2rem',
        borderRadius: '8px',
        backgroundColor: '#fff',
    },
    diagram: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '2rem 0',
    },
    box: {
        width: '200px',
        height: '200px',
        border: '3px solid #2196f3',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e3f2fd',
        textAlign: 'center',
    },
    arrowContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        fontWeight: 'bold',
        color: '#555',
    },
    arrow: {
        padding: '0.5rem',
        backgroundColor: '#eee',
        borderRadius: '4px',
        transition: 'opacity 0.3s',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#2196f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '1rem',
        fontWeight: 'bold',
    },
    buttonDisabled: {
        padding: '10px 20px',
        backgroundColor: '#ccc',
        color: '#666',
        border: 'none',
        borderRadius: '4px',
        marginTop: '1rem',
    },
    response: {
        backgroundColor: '#333',
        color: '#00e676',
        padding: '1rem',
        borderRadius: '8px',
        fontFamily: 'monospace',
        textAlign: 'left',
    },
    spinner: {
        marginTop: '10px',
        fontSize: '0.9rem',
        color: '#d84315',
    },
    dbIcon: {
        fontSize: '3rem',
        marginTop: '1rem',
    }
};

export default NetworkSimulation;
