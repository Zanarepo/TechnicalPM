
import React, { useState, useEffect } from 'react';

// Mock Data Generators (simplified from productAnalytics.js)
const SANDWICH_TYPES = ["American sub", "Bacon egg and cheese", "Bánh mì", "BLT", "Cheesesteak", "Chicken salad", "Club", "Cuban", "Falafel", "Gyro", "Hamburger", "Meatball", "Panini", "Reuben", "Tuna", "Veggie burger"];
const MARKETING_CHANNELS = ["Organic", "Instagram Ads", "Google Ads", "Facebook Post", "Referral"];
const PAYMENT_METHODS = ["Credit Card", "Debit Card", "Apple Pay", "Bitcoin"];
const PLATFORMS = ["iOS", "Android", "Web"];

const SandwichSimulator = () => {
    const [events, setEvents] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);

    // Initialize a fake user
    useEffect(() => {
        createNewUser();
    }, []);

    const createNewUser = () => {
        const id = Math.random().toString(36).substring(7);
        const newUser = {
            distinct_id: `user_${id}`,
            marketing_channel: MARKETING_CHANNELS[Math.floor(Math.random() * MARKETING_CHANNELS.length)],
            platform: PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)],
            dietary_preference: Math.random() > 0.8 ? "Vegetarian" : "None",
            ltv: 0
        };
        setUserProfile(newUser);
        logEvent('User Identified', { ...newUser });
        logEvent('App Open', { ...newUser });
    };

    const logEvent = (eventName, props) => {
        const newEvent = {
            id: Date.now() + Math.random(),
            timestamp: new Date().toLocaleTimeString(),
            name: eventName,
            properties: props
        };
        setEvents(prev => [newEvent, ...prev].slice(0, 50)); // Keep last 50
    };

    // User Actions
    const handleViewMenu = () => {
        logEvent('View Ingredients Modal', {
            sandwich_type: SANDWICH_TYPES[Math.floor(Math.random() * SANDWICH_TYPES.length)],
            distinct_id: userProfile.distinct_id
        });
    };

    const handleOrderSandwich = () => {
        const sandwich = SANDWICH_TYPES[Math.floor(Math.random() * SANDWICH_TYPES.length)];
        const cost = Math.floor(Math.random() * 10) + 5; // $5 - $15

        logEvent('Order Sandwich', {
            sandwich_type: sandwich,
            cost: cost,
            distinct_id: userProfile.distinct_id
        });

        // Chance to pay immediately
        if (Math.random() > 0.2) {
            setTimeout(() => handlePayment(cost), 1000);
        }
    };

    const handlePayment = (amount) => {
        logEvent('Payment Received', {
            amount: amount,
            method: PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)],
            distinct_id: userProfile.distinct_id
        });

        // Update local LTV state visually
        setUserProfile(prev => ({ ...prev, ltv: prev.ltv + amount }));
    };

    const handleRateApp = () => {
        logEvent('Rate Sandwich', {
            stars: Math.floor(Math.random() * 5) + 1,
            distinct_id: userProfile.distinct_id
        });
    };

    // Auto-Simulation effect
    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                const actions = [handleViewMenu, handleOrderSandwich, handleRateApp];
                const randomAction = actions[Math.floor(Math.random() * actions.length)];
                randomAction();

                // 10% chance to churn/new user
                if (Math.random() > 0.9) createNewUser();

            }, 1500);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, userProfile]);

    return (
        <div style={styles.container}>
            <div style={styles.controlPanel}>
                <h3>🥪 Sandwich Shop Simulator</h3>
                <div style={styles.userCard}>
                    <strong>Current User:</strong> {userProfile?.distinct_id} <br />
                    <small>Channel: {userProfile?.marketing_channel} | Platform: {userProfile?.platform}</small>
                </div>

                <div style={styles.buttonGrid}>
                    <button style={styles.actionBtn} onClick={createNewUser}>🆕 New User</button>
                    <button style={styles.actionBtn} onClick={handleViewMenu}>👀 View Menu</button>
                    <button style={{ ...styles.actionBtn, backgroundColor: '#4caf50', color: 'white' }} onClick={handleOrderSandwich}>🛒 Order Sandwich</button>
                    <button style={styles.actionBtn} onClick={handleRateApp}>⭐ Rate App</button>
                </div>

                <div style={styles.autoPlay}>
                    <label>
                        <input type="checkbox" checked={isAutoPlaying} onChange={(e) => setIsAutoPlaying(e.target.checked)} />
                        Auto-Run Simulation (Random Traffic)
                    </label>
                </div>
            </div>

            <div style={styles.logPanel}>
                <div style={styles.logHeader}>
                    <span>Live Event Stream</span>
                    <button onClick={() => setEvents([])} style={styles.clearBtn}>Clear</button>
                </div>
                <div style={styles.logList}>
                    {events.map(ev => (
                        <div key={ev.id} style={styles.logItem}>
                            <span style={styles.timestamp}>{ev.timestamp}</span>
                            <span style={styles.eventName}>{ev.name}</span>
                            <pre style={styles.props}>{JSON.stringify(ev.properties, null, 2)}</pre>
                        </div>
                    ))}
                    {events.length === 0 && <div style={{ padding: '20px', color: '#999', textAlign: 'center' }}>Waiting for events...</div>}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        backgroundColor: '#f4f4f9',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #ddd',
        height: '500px'
    },
    controlPanel: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    userCard: {
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '8px',
        borderLeft: '4px solid #1a237e',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    buttonGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px'
    },
    actionBtn: {
        padding: '12px',
        cursor: 'pointer',
        borderRadius: '6px',
        border: '1px solid #ccc',
        backgroundColor: 'white',
        color: '#333', // Explicitly set dark text color
        fontWeight: 'bold',
        transition: 'all 0.1s',
    },
    logPanel: {
        backgroundColor: '#1e1e1e',
        color: '#00ff00',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'monospace'
    },
    logHeader: {
        padding: '10px',
        borderBottom: '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#252526',
        color: '#fff'
    },
    clearBtn: {
        background: 'none',
        border: '1px solid #555',
        color: '#aaa',
        cursor: 'pointer',
        fontSize: '0.8rem',
        padding: '2px 8px',
        borderRadius: '4px'
    },
    logList: {
        flex: 1,
        overflowY: 'auto',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    logItem: {
        borderBottom: '1px solid #333',
        paddingBottom: '8px'
    },
    timestamp: {
        color: '#888',
        marginRight: '10px',
        fontSize: '0.8rem'
    },
    eventName: {
        color: '#fff',
        fontWeight: 'bold'
    },
    props: {
        margin: '4px 0 0 0',
        color: '#aaa',
        fontSize: '0.8rem'
    },
    autoPlay: {
        marginTop: 'auto',
        padding: '10px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        color: '#1565c0',
        fontWeight: 'bold'
    }
};

export default SandwichSimulator;
