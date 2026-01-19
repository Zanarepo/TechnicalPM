
import React, { useState, useEffect } from 'react';
import PmInsight from './PmInsight';

const ReactLesson = () => {
    const [legacyTransactions, setLegacyTransactions] = useState([
        { id: 1, text: 'Deposit $100' },
        { id: 2, text: 'Withdraw $50' }
    ]);
    const [reactTransactions, setReactTransactions] = useState([
        { id: 1, text: 'Deposit $100' },
        { id: 2, text: 'Withdraw $50' }
    ]);

    const [legacyFlash, setLegacyFlash] = useState(false);
    const [nextId, setNextId] = useState(3);

    const addTransaction = () => {
        const newTx = { id: nextId, text: `Payment #${nextId} ($20)` };
        setNextId(prev => prev + 1);

        // LEGACY WAY: Simulate Full Page Reload/Repaint
        setLegacyTransactions(prev => [...prev, newTx]);
        setLegacyFlash(true);
        setTimeout(() => setLegacyFlash(false), 300);

        // REACT WAY: Just update state
        setReactTransactions(prev => [...prev, newTx]);
    };

    return (
        <div style={styles.container}>
            <h2>⚛️ Module 3: Modern Frameworks (React)</h2>
            <p>Why use a Framework? <strong>Efficiency.</strong></p>

            <div style={styles.controls}>
                <button onClick={addTransaction} style={styles.mainBtn}>
                    ➕ Add Transaction to Both
                </button>
            </div>

            <div style={styles.splitScreen}>

                {/* LEFT: THE OLD WAY */}
                <div style={{ ...styles.panel, backgroundColor: legacyFlash ? '#fff9c4' : 'white', transition: 'background-color 0s' }}>
                    <h3>📜 The Old Way (HTML)</h3>
                    <p style={styles.desc}>
                        When data changes, we must <strong>Repaint the Whole List</strong>.
                        <br /><br />
                        (Notice how the <em>entire box</em> flashes yellow. We wasted energy repainting items 1 & 2.)
                    </p>
                    <ul style={styles.list}>
                        {legacyTransactions.map(tx => (
                            <li key={tx.id} style={styles.item}>
                                {tx.text}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* RIGHT: THE REACT WAY */}
                <div style={styles.panel}>
                    <h3>🚀 The React Way (Virtual DOM)</h3>
                    <p style={styles.desc}>
                        React compares the new list with the old one and only updates <strong>what changed</strong>.
                        <br /><br />
                        (Notice how only the <strong>new item</strong> flashes green.)
                    </p>
                    <ul style={styles.list}>
                        {reactTransactions.map(tx => (
                            <li key={tx.id} style={styles.item} className="react-item-enter">
                                {tx.text}
                                {tx.id === nextId - 1 && <span style={styles.badge}>Just Added!</span>}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            <style>{`
        .react-item-enter {
          animation: highlight 1s ease-out;
        }
        @keyframes highlight {
          0% { background-color: #69f0ae; transform: scale(1.05); }
          100% { background-color: #f5f5f5; transform: scale(1); }
        }
      `}</style>

            <PmInsight
                title="Components = Velocity"
                description="React allows us to build 'Lego Blocks' (Components). Once we build a 'Button' component, we can reuse it everywhere."
                tradeOffs={[
                    "Initial Velocity is slow (building the Design System).",
                    "Long-term Velocity is fast (drag-and-drop components).",
                    "PM Strategy: Push for a 'Design System' early to avoid 'Spaghetti UI' later."
                ]}
            />
        </div>
    );
};

const styles = {
    container: { padding: '1rem' },
    controls: { textAlign: 'center', marginBottom: '2rem' },
    mainBtn: { padding: '15px 30px', fontSize: '1.2rem', backgroundColor: '#6200ea', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' },
    splitScreen: { display: 'flex', gap: '2rem', flexWrap: 'wrap' },
    panel: { flex: 1, minWidth: '300px', border: '1px solid #ddd', borderRadius: '12px', padding: '2rem', transition: 'background-color 0.3s' },
    desc: { color: '#666', marginBottom: '1.5rem', lineHeight: '1.5' },
    list: { listStyle: 'none', padding: 0 },
    item: { padding: '15px', borderBottom: '1px solid #eee', backgroundColor: '#f5f5f5', marginBottom: '8px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    badge: { fontSize: '0.7rem', backgroundColor: '#00e676', color: '#003300', padding: '2px 6px', borderRadius: '4px' }
};

export default ReactLesson;
