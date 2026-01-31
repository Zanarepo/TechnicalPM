import React, { useState } from 'react';

const ABTestSimulator = () => {
    const [hypothesis, setHypothesis] = useState("If we change the button color to red, click rate will increase by 5%.");
    const [baselineConversion, setBaselineConversion] = useState(10); // %
    const [minDatesectableEffect, setMinDatesectableEffect] = useState(2); // %
    const [sampleSize, setSampleSize] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [result, setResult] = useState(null);

    const calculateSampleSize = () => {
        // Simplified Evan Miller approx logic for demo purposes
        // n = 16 * (sigma^2 / delta^2)
        // Very rough proxy for educational purposes
        const base = 1000;
        const effectImpact = (10 / (minDatesectableEffect || 0.1));
        const calculated = Math.round(base * effectImpact);
        setSampleSize(calculated);
    };

    const runSimulation = () => {
        setIsRunning(true);
        setResult(null);

        setTimeout(() => {
            // Randomize result
            const random = Math.random();
            const isSignifant = random > 0.4; // 60% chance of significance for demo

            const variantConversion = isSignifant
                ? baselineConversion + minDatesectableEffect
                : baselineConversion + (Math.random() * 0.5); // noise

            setResult({
                isSignificant: isSignifant,
                pValue: isSignifant ? 0.03 : 0.24,
                variantConversion: variantConversion.toFixed(2),
                uplift: (((variantConversion - baselineConversion) / baselineConversion) * 100).toFixed(1)
            });
            setIsRunning(false);
        }, 1500);
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#fff3e0', borderRadius: '8px', border: '1px solid #ffcc80' }}>
            <h3>🧪 A/B Test Laboratory</h3>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>1. Formulate Hypothesis</label>
                <textarea
                    value={hypothesis}
                    onChange={(e) => setHypothesis(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    rows={2}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                    <label style={{ fontWeight: 'bold' }}>Baseline Conv. Rate (%)</label>
                    <input
                        type="number"
                        value={baselineConversion}
                        onChange={(e) => setBaselineConversion(Number(e.target.value))}
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>
                <div>
                    <label style={{ fontWeight: 'bold' }}>Minimum Detectable Effect (%)</label>
                    <input
                        type="number"
                        value={minDatesectableEffect}
                        onChange={(e) => setMinDatesectableEffect(Number(e.target.value))}
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>
            </div>

            <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#fff', borderRadius: '4px' }}>
                <p><strong>Required Sample Size:</strong> {sampleSize > 0 ? sampleSize.toLocaleString() : 'Click Calculate'} users per variation.</p>
                <button onClick={calculateSampleSize} style={primaryBtnStyle}>Calculate Sample Size</button>
            </div>

            <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #ebd4b0' }} />

            <div style={{ textAlign: 'center' }}>
                <button
                    onClick={runSimulation}
                    disabled={isRunning || sampleSize === 0}
                    style={{ ...primaryBtnStyle, backgroundColor: isRunning ? '#ccc' : '#e65100', width: '100%' }}
                >
                    {isRunning ? 'Running Experiment...' : '🚀 Run Simulation'}
                </button>
            </div>

            {result && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: result.isSignificant ? '#e8f5e9' : '#ffebee', borderRadius: '8px', textAlign: 'center' }}>
                    <h4 style={{ color: result.isSignificant ? 'green' : 'red', margin: '0 0 10px 0' }}>
                        {result.isSignificant ? 'Result: Statistically Significant! 🎉' : 'Result: Not Significant 📉'}
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>Variant Conv.</div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{result.variantConversion}%</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>Uplift</div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: result.isSignificant ? 'green' : 'black' }}>+{result.uplift}%</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>P-Value</div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{result.pValue}</div>
                        </div>
                    </div>
                    <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
                        {result.isSignificant
                            ? "Reject the Null Hypothesis. Roll out the variant."
                            : "Fail to reject Null Hypothesis. Do not roll out."}
                    </p>
                </div>
            )}
        </div>
    );
};

const primaryBtnStyle = {
    padding: '8px 16px',
    backgroundColor: '#ff9800',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '5px'
};

export default ABTestSimulator;
