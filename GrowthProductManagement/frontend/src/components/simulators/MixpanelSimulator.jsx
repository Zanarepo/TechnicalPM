import React, { useState, useEffect } from 'react';

const MixpanelSimulator = () => {
    const [activeTab, setActiveTab] = useState('tracking'); // tracking, segmentation
    const [events, setEvents] = useState([]);
    const [userProfile, setUserProfile] = useState({ id: 'user_123', plan: 'Free', country: 'Nigeria' });
    const [queryResult, setQueryResult] = useState(null);

    // Initial dummy data
    useEffect(() => {
        setEvents([
            { id: 1, name: 'App Opened', properties: { source: 'Direct' }, timestamp: new Date(Date.now() - 100000).toLocaleTimeString() },
            { id: 2, name: 'Viewed Content', properties: { category: 'Tech' }, timestamp: new Date(Date.now() - 50000).toLocaleTimeString() },
        ]);
    }, []);

    const trackEvent = (eventName, props = {}) => {
        const newEvent = {
            id: events.length + 1,
            name: eventName,
            properties: { ...props, ...userProfile },
            timestamp: new Date().toLocaleTimeString()
        };
        setEvents([newEvent, ...events]);
    };

    const runSegmentation = (metric, groupBy) => {
        let result = {};

        events.forEach(event => {
            const key = groupBy ? (event.properties[groupBy] || 'Unknown') : 'Total';
            result[key] = (result[key] || 0) + 1;
        });

        setQueryResult({ metric, groupBy, data: result });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>📊 Mixpanel Mini-Simulator</h2>
                <div style={styles.modeSwitch}>
                    <button
                        style={activeTab === 'tracking' ? styles.activeModeBtn : styles.modeBtn}
                        onClick={() => setActiveTab('tracking')}
                    >
                        1. Live Tracking
                    </button>
                    <button
                        style={activeTab === 'segmentation' ? styles.activeModeBtn : styles.modeBtn}
                        onClick={() => setActiveTab('segmentation')}
                    >
                        2. Segmentation Analysis
                    </button>
                </div>
            </div>

            {activeTab === 'tracking' && (
                <div style={styles.panel}>
                    <div style={styles.columns}>
                        {/* LEFT: SIMULATED APP */}
                        <div style={styles.column}>
                            <h3>📱 Simulated App</h3>
                            <p style={styles.label}>Current User Profile:</p>
                            <pre style={styles.codeBlock}>{JSON.stringify(userProfile, null, 2)}</pre>

                            <div style={styles.actionGrid}>
                                <button style={styles.actionBtn} onClick={() => trackEvent('Sign Up', { source: 'Google Ads' })}>
                                    📝 Sign Up
                                </button>
                                <button style={styles.actionBtn} onClick={() => trackEvent('Viewed Page', { page: '/pricing' })}>
                                    👁️ View Pricing
                                </button>
                                <button style={{ ...styles.actionBtn, backgroundColor: '#e8f5e9', color: '#2e7d32' }} onClick={() => trackEvent('Purchase', { amount: 50, item: 'Pro Plan' })}>
                                    💰 Purchase Pro ($50)
                                </button>
                                <button style={styles.actionBtn} onClick={() => trackEvent('Invited Friend', { method: 'email' })}>
                                    💌 Invite Friend
                                </button>
                            </div>
                        </div>

                        {/* RIGHT: LIVE STREAM */}
                        <div style={styles.column}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3>📡 Live Event Stream</h3>
                                <span style={styles.liveBadge}>● Listening</span>
                            </div>
                            <div style={styles.eventLog}>
                                {events.slice(0, 8).map(event => (
                                    <div key={event.id} style={styles.eventRow}>
                                        <div style={styles.eventHeader}>
                                            <strong>{event.name}</strong> • <small>{event.timestamp}</small>
                                        </div>
                                        <div style={styles.eventProps}>
                                            {JSON.stringify(event.properties)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'segmentation' && (
                <div style={styles.panel}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h3>🧠 Segmentation Builder</h3>
                        <div style={styles.queryBuilder}>
                            <span>Show me</span>
                            <select style={styles.dropdown}>
                                <option>Unique Counts</option>
                                <option>Total Events</option>
                            </select>
                            <span>grouped by</span>
                            <select id="groupBySelect" style={styles.dropdown}>
                                <option value="name">Event Name</option>
                                <option value="country">Country</option>
                                <option value="plan">User Plan</option>
                            </select>
                            <button
                                style={styles.runBtn}
                                onClick={() => {
                                    const groupBy = document.getElementById('groupBySelect').value;
                                    runSegmentation('Total Events', groupBy);
                                }}
                            >
                                ▶ Run Query
                            </button>
                        </div>
                    </div>

                    {queryResult && (
                        <div style={styles.chartArea}>
                            <h4>Results: {queryResult.metric} by {queryResult.groupBy}</h4>
                            <div style={styles.barChart}>
                                {Object.entries(queryResult.data).map(([label, value]) => (
                                    <div key={label} style={styles.barRow}>
                                        <div style={styles.barLabel}>{label}</div>
                                        <div style={styles.barTrack}>
                                            <div style={{ ...styles.barFill, width: `${(value / events.length) * 100}%` }}></div>
                                            <span style={styles.barValue}>{value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '12px',
        overflow: 'hidden',
    },
    header: {
        backgroundColor: '#f4f5f7',
        padding: '1.5rem',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
    },
    modeSwitch: {
        display: 'flex',
        gap: '10px',
    },
    modeBtn: {
        padding: '8px 16px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    activeModeBtn: {
        padding: '8px 16px',
        border: '1px solid #5c6bc0',
        backgroundColor: '#e8eaf6',
        color: '#1a237e',
        borderRadius: '6px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    panel: {
        padding: '2rem',
    },
    columns: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr'
        }
    },
    column: {
        backgroundColor: '#fafafa',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #eee'
    },
    label: {
        fontSize: '0.8rem',
        color: '#666',
        marginBottom: '0.5rem',
        fontWeight: 'bold'
    },
    codeBlock: {
        backgroundColor: '#282c34',
        color: '#abb2bf',
        padding: '10px',
        borderRadius: '6px',
        fontSize: '0.8rem',
        marginBottom: '1.5rem'
    },
    actionGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px'
    },
    actionBtn: {
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        backgroundColor: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        transition: 'all 0.2s',
        ':hover': {
            backgroundColor: '#eee'
        }
    },
    liveBadge: {
        fontSize: '0.7rem',
        color: '#4caf50',
        border: '1px solid #4caf50',
        padding: '2px 6px',
        borderRadius: '10px',
        backgroundColor: '#e8f5e9'
    },
    eventLog: {
        marginTop: '1rem',
        height: '300px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    eventRow: {
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '4px',
        borderLeft: '4px solid #5c6bc0',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    },
    eventHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.9rem',
        marginBottom: '4px'
    },
    eventProps: {
        fontSize: '0.75rem',
        color: '#666',
        fontFamily: 'monospace'
    },
    queryBuilder: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        backgroundColor: '#f5f5f5',
        padding: '1rem',
        borderRadius: '8px'
    },
    dropdown: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    runBtn: {
        padding: '8px 16px',
        backgroundColor: '#1a237e',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    chartArea: {
        marginTop: '2rem',
        border: '1px solid #eee',
        padding: '1.5rem',
        borderRadius: '8px'
    },
    barChart: {
        marginTop: '1rem'
    },
    barRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px'
    },
    barLabel: {
        width: '120px',
        textAlign: 'right',
        paddingRight: '10px',
        fontSize: '0.9rem',
        fontWeight: 'bold'
    },
    barTrack: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        height: '30px',
        borderRadius: '4px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    barFill: {
        backgroundColor: '#7986cb',
        height: '100%',
        borderRadius: '4px',
        transition: 'width 0.5s ease-out'
    },
    barValue: {
        marginLeft: '10px',
        fontSize: '0.9rem',
        fontWeight: 'bold'
    }
};

export default MixpanelSimulator;
