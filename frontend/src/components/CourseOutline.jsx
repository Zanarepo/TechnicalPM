
import React from 'react';

const modules = [
    { id: 1, title: 'Module 1: The Raw Materials', desc: 'HTML, CSS, JS (The Stack)' },
    { id: 2, title: 'Module 2: The Browser & DOM', desc: 'Rendering, Events, Performance' },
    { id: 3, title: 'Module 3: Modern Frameworks', desc: 'React, Components, Virtual DOM' },
    { id: 4, title: 'Module 4: Mobile Apps', desc: 'Native vs Web, App Store Tax' },
    { id: 5, title: 'Module 5: APIs & Communication', desc: 'REST, Status Codes, JSON' },
    { id: 6, title: 'Module 6: Auth & Security', desc: 'RBAC, Hashing, Protocols' },
    { id: 7, title: 'Module 7: Databases (Ledger)', desc: 'SQL vs NoSQL, ACID, Transactions' },
    { id: 8, title: 'Module 8: Server Logic', desc: 'Microservices, Concurrency' },
    { id: 9, title: 'Module 9: Cloud & DevOps', desc: 'CI/CD, AWS, Platforms' },
    { id: 10, title: 'Module 10: AI & Analytics', desc: 'LLMs, Temperature, Funnels' },
    { id: 11, title: 'Module 11: System Design', desc: 'Caching, Load Balancing, Queues' },
];

const CourseOutline = ({ onSelectModule }) => {
    return (
        <div style={styles.container}>
            <h2>🎓 Technical Product Management Curriculum</h2>
            <p>Select a module to begin your "Living Lab" exercises.</p>

            <div style={styles.grid}>
                {modules.map((mod) => (
                    <div key={mod.id} style={styles.card} onClick={() => onSelectModule(mod.id)}>
                        <div style={styles.badge}>Module {mod.id}</div>
                        <h3>{mod.title}</h3>
                        <p>{mod.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1000px',
        margin: '0 auto',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        backgroundColor: 'white',
        color: '#333',
        ':hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }
    },
    badge: {
        display: 'inline-block',
        padding: '4px 8px',
        backgroundColor: '#e3f2fd',
        color: '#1565c0',
        borderRadius: '4px',
        fontSize: '0.8rem',
        marginBottom: '0.5rem',
        fontWeight: 'bold',
    }
};

export default CourseOutline;
