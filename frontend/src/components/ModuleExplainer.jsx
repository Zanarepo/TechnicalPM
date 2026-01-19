
import React from 'react';
import { moduleContent } from '../data/moduleContent';

const ModuleExplainer = ({ moduleId, children }) => {
    const content = moduleContent[moduleId];

    if (!content) {
        return <div style={styles.container}>Construction in progress 🚧</div>;
    }

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.badge}>Module {moduleId}</div>
                <h1>{content.title}</h1>
                <h3 style={styles.subtitle}>{content.subtitle}</h3>
                <p style={styles.description}>{content.description}</p>
            </header>

            {/* INTERACTIVE COMPONENT SLOT */}
            {children && <div style={styles.interactiveSlot}>{children}</div>}

            <div style={styles.grid}>
                {/* MENTAL MODEL CARD */}
                <section style={styles.card}>
                    <div style={styles.cardHeader}>🧠 Mental Model</div>
                    <h3>{content.mentalModel.title}</h3>
                    <p><em>{content.mentalModel.explanation}</em></p>
                    <ul style={styles.list}>
                        {content.mentalModel.points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </section>

                {/* REAL WORLD EXAMPLE CARD */}
                <section style={{ ...styles.card, borderColor: '#4caf50' }}>
                    <div style={{ ...styles.cardHeader, backgroundColor: '#e8f5e9', color: '#2e7d32' }}>🌍 Real World Example</div>
                    <h3>{content.realWorldExample.product}</h3>
                    <p><em>{content.realWorldExample.explanation}</em></p>
                    <ul style={styles.list}>
                        {content.realWorldExample.points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        marginBottom: '2rem',
        borderBottom: '1px solid #eee',
        paddingBottom: '1rem',
    },
    badge: {
        display: 'inline-block',
        backgroundColor: '#1a237e',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '16px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
    },
    subtitle: {
        color: '#666',
        fontWeight: 'normal',
        marginTop: '-0.5rem',
    },
    description: {
        fontSize: '1.2rem',
        color: '#333',
        marginTop: '1rem',
    },
    interactiveSlot: {
        marginBottom: '3rem',
        border: '1px dashed #ccc',
        padding: '1rem',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
    },
    card: {
        border: '1px solid #1a237e',
        borderRadius: '12px',
        padding: '1.5rem',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    },
    cardHeader: {
        display: 'inline-block',
        backgroundColor: '#e8eaf6',
        color: '#1a237e',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    list: {
        marginTop: '1rem',
        paddingLeft: '1.2rem',
        lineHeight: '1.6',
    }
};

export default ModuleExplainer;
