import React, { useState } from 'react';

const FunnelSimulator = () => {
    const [traffic, setTraffic] = useState(10000);
    const [conversionRates, setConversionRates] = useState({
        acquisition: 40, // Click to Landing
        activation: 20, // Signup
        retention: 30, // Day 7
        revenue: 10,   // Paid
        referral: 5    // Referred
    });

    const steps = [
        { id: 'acquisition', label: 'Acquisition (Click)', color: '#2196f3' },
        { id: 'activation', label: 'Activation (Signup)', color: '#4caf50' },
        { id: 'retention', label: 'Retention (Active)', color: '#ff9800' },
        { id: 'revenue', label: 'Revenue (Paid)', color: '#9c27b0' },
    ];

    const calculateFunnel = () => {
        let currentUsers = traffic;
        const funnelData = [];

        // Step 1: Impressions -> Acquisition
        const acquired = Math.round(currentUsers * (conversionRates.acquisition / 100));
        funnelData.push({ step: 'Acquired', count: acquired, drop: traffic - acquired });

        // Step 2: Acquired -> Activation
        const activated = Math.round(acquired * (conversionRates.activation / 100));
        funnelData.push({ step: 'Activated', count: activated, drop: acquired - activated });

        // Step 3: Activated -> Retention
        const retained = Math.round(activated * (conversionRates.retention / 100));
        funnelData.push({ step: 'Retained', count: retained, drop: activated - retained });

        // Step 4: Retained -> Revenue
        const paid = Math.round(retained * (conversionRates.revenue / 100));
        funnelData.push({ step: 'Paid Customers', count: paid, drop: retained - paid });

        return { funnelData, paid };
    };

    const isReferral = true;
    const { funnelData, paid } = calculateFunnel();

    // Revenue Calc
    const arpu = 50; // Average Revenue Per User
    const totalRevenue = paid * arpu;

    const handleRateChange = (step, val) => {
        setConversionRates(prev => ({ ...prev, [step]: Number(val) }));
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#e8eaf6', borderRadius: '8px' }}>
            <h3>🔻 Pirate Funnel Simulator (AARRR)</h3>
            <p style={{ marginBottom: '20px', color: '#666' }}>Adjust conversion rates to see the impact on the bottom line.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px' }}>
                {/* CONTROLS */}
                <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', height: 'fit-content' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold' }}>🚦 Top of Funnel Traffic</label>
                        <input
                            type="number"
                            value={traffic}
                            onChange={(e) => setTraffic(Number(e.target.value))}
                            style={{ width: '100%', padding: '5px', marginTop: '5px' }}
                        />
                    </div>

                    <hr style={{ margin: '15px 0', border: '0', borderTop: '1px solid #eee' }} />

                    {steps.map(step => (
                        <div key={step.id} style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', color: step.color, fontWeight: 'bold' }}>
                                {step.label} Rate (%)
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={conversionRates[step.id]}
                                onChange={(e) => handleRateChange(step.id, e.target.value)}
                                style={{ width: '100%' }}
                            />
                            <div style={{ textAlign: 'right', fontSize: '0.8rem' }}>{conversionRates[step.id]}%</div>
                        </div>
                    ))}
                </div>

                {/* VISUALIZATION */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {funnelData.map((data, index) => {
                        const width = Math.max((data.count / traffic) * 100, 5); // min width 5% for visibility
                        return (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    <span>{data.step}</span>
                                    <span>{data.count.toLocaleString()} users</span>
                                </div>
                                <div style={{ height: '40px', backgroundColor: '#c5cae9', borderRadius: '4px', position: 'relative' }}>
                                    <div style={{
                                        width: `${width}%`,
                                        height: '100%',
                                        backgroundColor: steps[index] ? steps[index].color : '#9c27b0', // Fallback color
                                        borderRadius: '4px',
                                        transition: 'width 0.5s ease'
                                    }}></div>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#f44336', textAlign: 'right', marginTop: '2px' }}>
                                    -{data.drop.toLocaleString()} drop-off
                                </div>
                            </div>
                        )
                    })}

                    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#4caf50', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.9rem' }}>Projected Revenue (@ $50 LTV)</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>${totalRevenue.toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FunnelSimulator;
