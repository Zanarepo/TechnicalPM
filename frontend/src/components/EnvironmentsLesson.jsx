import React, { useState } from 'react';
import PmInsight from './PmInsight';

const EnvironmentsLesson = () => {
    // Pipeline State
    const [currentStep, setCurrentStep] = useState(0); // 0: Dev, 1: Staging, 2: Prod
    const [bugHidden, setBugHidden] = useState(true); // Is there a bug?
    const [bugFoundAt, setBugFoundAt] = useState(null); // 'dev', 'staging', 'prod'
    const [cost, setCost] = useState(0);
    const [logs, setLogs] = useState([]);

    const steps = [
        { id: 'dev', name: '💻 Local / Dev', desc: 'The Kitchen', cost: 10 },
        { id: 'staging', name: '🎭 Staging / QA', desc: 'Dress Rehearsal', cost: 100 },
        { id: 'prod', name: '🚀 Production', desc: 'Live Show', cost: 10000 }
    ];

    const resetSim = () => {
        setCurrentStep(0);
        setBugHidden(Math.random() > 0.3); // 70% chance of bug
        setBugFoundAt(null);
        setCost(0);
        setLogs(['🆕 New Feature Ticket Created']);
    };

    const runTests = () => {
        const step = steps[currentStep];

        // Simulation Logic
        const foundBug = bugHidden && Math.random() > 0.4; // 60% chance to catch it if it exists

        if (foundBug) {
            setBugFoundAt(step.id);
            setCost(prev => prev + step.cost);
            setLogs(prev => [...prev, `🐛 Bug found in ${step.name}! Cost to fix: $${step.cost}`]);
            setBugHidden(false); // Fixed
        } else {
            setLogs(prev => [...prev, `✅ Tests passed in ${step.name}.`]);
        }
    };

    const promote = () => {
        if (bugFoundAt === steps[currentStep].id) {
            // Can't promote if bug just found (must re-test)
            setLogs(prev => [...prev, `⚠️ Fix the bug first!`]);
            return;
        }

        if (currentStep < 2) {
            setCurrentStep(prev => prev + 1);
            setLogs(prev => [...prev, `🚚 Deploying to ${steps[currentStep + 1].name}...`]);
        } else {
            // Reached Prod
            if (bugHidden) {
                // Bug survived to Prod!
                setCost(prev => prev + steps[2].cost);
                setLogs(prev => [...prev, `🔥 DISASTER! Bug exploded in Production! Cost: $${steps[2].cost}`]);
                setBugFoundAt('prod');
                setBugHidden(false);
            } else {
                setLogs(prev => [...prev, `🎉 Successful Launch! Revenue increasing.`]);
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>🧪 Module 12: Environments</h2>
                <p>It works on my machine... but will it work for the user?</p>
            </div>

            <div style={styles.pipeline}>
                {steps.map((step, index) => (
                    <div key={step.id} style={{
                        ...styles.stage,
                        borderColor: currentStep === index ? '#2196F3' : '#ddd',
                        opacity: currentStep === index ? 1 : 0.5,
                        transform: currentStep === index ? 'scale(1.05)' : 'scale(1)'
                    }}>
                        <div style={styles.icon}>{index === 0 ? '👨‍💻' : index === 1 ? '🕵️‍♀️' : '🌍'}</div>
                        <h3>{step.name}</h3>
                        <p>{step.desc}</p>
                        <div style={styles.priceTag}>Fix Cost: ${step.cost}</div>
                    </div>
                ))}
            </div>

            <div style={styles.controlPanel}>
                <div style={styles.stats}>
                    <div>Total Cost: <span style={{ color: cost > 100 ? 'red' : 'green', fontWeight: 'bold' }}>${cost}</span></div>
                    <div>Status: {bugFoundAt ? '🐛 Bug Found' : '🟢 Clean'}</div>
                </div>

                <div style={styles.actions}>
                    {bugFoundAt ? (
                        <button style={styles.fixBtn} onClick={() => {
                            setBugFoundAt(null);
                            setLogs(prev => [...prev, '🛠️ Bug Fixed. Ready to re-test.']);
                        }}>🛠️ Fix Bug</button>
                    ) : (
                        <>
                            <button style={styles.testBtn} onClick={runTests}>🕵️ Run Tests</button>
                            {currentStep < 2 ? (
                                <button style={styles.promoteBtn} onClick={promote}>🚀 Promote</button>
                            ) : (
                                <button style={styles.promoteBtn} onClick={promote}>🏁 Verifiy Prod</button>
                            )}
                        </>
                    )}
                    <button style={styles.resetBtn} onClick={resetSim}>🔄 New Feature</button>
                </div>

                <div style={styles.logConsole}>
                    {logs.map((l, i) => <div key={i}>{l}</div>)}
                </div>
            </div>

            <PmInsight
                title="The Cost of Quality"
                description="Why do we have Staging? Because fixing a bug in Production is 100x more expensive (Panic, Hotfixes, Reputation Damage)."
                tradeOffs={[
                    "Velocity vs Stability: Skipping Staging makes you faster, until you crash Prod.",
                    "UAT (User Acceptance Testing): Staging is the PM's playground. If it looks wrong here, DO NOT APPROVE IT.",
                    "Feature Flags: A way to 'Deploy' code to Prod but keep the 'Feature' hidden (Best of both worlds)."
                ]}
            />
        </div>
    );
};

const styles = {
    container: { padding: '20px', maxWidth: '800px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '40px' },
    pipeline: { display: 'flex', justifyContent: 'space-between', marginBottom: '40px', alignItems: 'center' },
    stage: {
        border: '3px solid #ddd', borderRadius: '12px', padding: '20px', width: '30%',
        textAlign: 'center', transition: 'all 0.3s ease', background: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    },
    icon: { fontSize: '3rem', marginBottom: '10px' },
    priceTag: { marginTop: '10px', background: '#eee', padding: '5px', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' },

    controlPanel: { background: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '1px solid #ddd' },
    stats: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 'bold' },
    actions: { display: 'flex', gap: '10px', marginBottom: '20px' },

    testBtn: { flex: 1, padding: '12px', background: '#FF9800', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' },
    promoteBtn: { flex: 1, padding: '12px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' },
    fixBtn: { flex: 1, padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' },
    resetBtn: { padding: '12px', background: 'transparent', border: '1px solid #999', borderRadius: '6px', cursor: 'pointer' },

    logConsole: { background: '#222', color: '#0f0', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', height: '150px', overflowY: 'auto' }
};

export default EnvironmentsLesson;
