import React, { useState } from 'react';

const UXTestSimulator = () => {
    const [activeVariant, setActiveVariant] = useState('A'); // 'A' or 'B'
    const [stats, setStats] = useState({
        A: { impressions: 0, clicks: 0 },
        B: { impressions: 0, clicks: 0 }
    });
    const [lastAction, setLastAction] = useState(null);

    const handleImpression = (variant) => {
        // Debounce slightly or just count when rendered? 
        // For this sim, we count when the user "Starts Test" or switches tabs?
        // Let's just have manual "Simulate User Visit" buttons.
    };

    const simulateVisit = (variant) => {
        setStats(prev => ({
            ...prev,
            [variant]: { ...prev[variant], impressions: prev[variant].impressions + 1 }
        }));
        setLastAction(`User visited Variant ${variant}`);
    };

    const handleClick = (variant) => {
        setStats(prev => ({
            ...prev,
            [variant]: { ...prev[variant], clicks: prev[variant].clicks + 1 }
        }));
        setLastAction(`SUCCESS! User converted on Variant ${variant}`);
    };

    const calculateCTR = (variant) => {
        const { clicks, impressions } = stats[variant];
        if (impressions === 0) return 0;
        return ((clicks / impressions) * 100).toFixed(1);
    };

    const resetStats = () => {
        setStats({
            A: { impressions: 0, clicks: 0 },
            B: { impressions: 0, clicks: 0 }
        });
        setLastAction(null);
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>🎨 UX Split Test: Button Placement</h3>
            <p style={{ color: '#666', marginBottom: '20px' }}>
                Test two different UX layouts. Simulate traffic to see which design drives more engagement (clicks).
            </p>

            {/* CONTROLS */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
                <button onClick={() => simulateVisit('A')} style={actionBtnStyle}>👤 Send User to A</button>
                <button onClick={() => simulateVisit('B')} style={actionBtnStyle}>👤 Send User to B</button>
                <button onClick={resetStats} style={{ ...actionBtnStyle, backgroundColor: '#999' }}>🔄 Reset Data</button>
            </div>

            {/* VISUAL VARIATIONS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

                {/* VARIANT A */}
                <div style={cardStyle}>
                    <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#666' }}>Variant A: "The Text Heavy"</div>
                    <div style={{ border: '1px solid #ccc', height: '300px', padding: '20px', backgroundColor: '#f9f9f9', position: 'relative' }}>
                        <h4 style={{ marginTop: 0 }}>Our Premium Plan</h4>
                        <p style={{ fontSize: '0.8rem', color: '#555' }}>
                            Our premium plan offers the best value for your money. You get access to all features,
                            24/7 support, and unlimited data storage. We believe that this plan is perfect for
                            professionals who need reliable tools. Please consider subscribing today to unlock
                            full potential.
                        </p>
                        <p style={{ fontSize: '0.8rem', color: '#555' }}>
                            Trusted by over 1,000 companies worldwide.
                        </p>
                        {/* BOTTOM LINK */}
                        <button
                            onClick={() => handleClick('A')}
                            style={{
                                marginTop: '20px',
                                backgroundColor: 'transparent',
                                color: '#007bff',
                                border: '1px solid #007bff',
                                padding: '5px 10px',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            Subscribe Now
                        </button>
                    </div>
                    <div style={statBoxStyle}>
                        <div>Views: {stats.A.impressions}</div>
                        <div>Clicks: {stats.A.clicks}</div>
                        <div style={{ fontWeight: 'bold', color: '#007bff' }}>CTR: {calculateCTR('A')}%</div>
                    </div>
                </div>

                {/* VARIANT B */}
                <div style={cardStyle}>
                    <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#666' }}>Variant B: "The Visual Hero"</div>
                    <div style={{ border: '1px solid #ccc', height: '300px', padding: '0', backgroundColor: '#fff', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                        {/* HERO IMAGE */}
                        <div style={{ height: '140px', backgroundColor: '#ffcc80', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '3rem' }}>🚀</span>
                        </div>
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <h4 style={{ margin: '0 0 10px 0' }}>Unlock Premium</h4>
                            {/* BIG CONTRAST BUTTON */}
                            <button
                                onClick={() => handleClick('B')}
                                style={{
                                    backgroundColor: '#ff9800',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 24px',
                                    borderRadius: '25px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                }}
                            >
                                Get Started ➔
                            </button>
                            <p style={{ fontSize: '0.7rem', color: '#999', marginTop: '10px' }}>No credit card required.</p>
                        </div>
                    </div>
                    <div style={statBoxStyle}>
                        <div>Views: {stats.B.impressions}</div>
                        <div>Clicks: {stats.B.clicks}</div>
                        <div style={{ fontWeight: 'bold', color: '#ff9800' }}>CTR: {calculateCTR('B')}%</div>
                    </div>
                </div>

            </div>

            {/* LIVE FEEDBACK */}
            <div style={{
                marginTop: '20px',
                padding: '10px',
                textAlign: 'center',
                backgroundColor: lastAction && lastAction.includes('SUCCESS') ? '#d4edda' : '#f8f9fa',
                color: lastAction && lastAction.includes('SUCCESS') ? '#155724' : '#333',
                borderRadius: '4px',
                minHeight: '45px'
            }}>
                {lastAction || "Waiting for interaction..."}
            </div>

            <div style={{ marginTop: '20px', fontSize: '0.9rem', color: '#555', fontStyle: 'italic' }}>
                <strong>UX Lesson:</strong> Variant B typically wins because of
                <strong> Visual Hierarchy</strong> (Hero image draws eye) and
                <strong> Fitts's Law</strong> (Larger, distinct clickable area).
            </div>
        </div>
    );
};

const actionBtnStyle = {
    padding: '8px 16px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
};

const statBoxStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#eee',
    borderRadius: '4px',
    fontSize: '0.9rem'
};

export default UXTestSimulator;
