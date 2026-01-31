import React from 'react';

const modules = [
    { id: 1, title: 'Module 1: Growth Mindset & Loops', desc: 'Funnels vs. Flywheels' },
    { id: 2, title: 'Module 2: Funnel Stages (AARRR)', desc: 'Pirate Metrics Deep Dive' },
    { id: 3, title: 'Module 3: Acquisition & SEO', desc: 'Organic, Paid & Content Strategy' },
    { id: 4, title: 'Module 4: Growth Hacks & Virality', desc: 'K-Factor & Referral Programs' },
    { id: 5, title: 'Module 5: Activation & Onboarding', desc: 'Time to Value (TTV)' },
    { id: 6, title: 'Module 6: Retention & Engagement', desc: 'Cohorts, Churn & Habits' },
    { id: 7, title: 'Module 7: Monetization Strategy', desc: 'Pricing, LTV & CAC' },
    { id: 8, title: 'Module 8: Experimentation (A/B)', desc: 'Hypothesis & Statistics' },
    { id: 9, title: 'Module 9: Psychology of Growth', desc: 'Nudges & Behavioral Econ' },
    { id: 10, title: 'Module 10: The Growth Tech Stack', desc: 'Analytics & CDPs' },
    { id: 11, title: 'Module 11: Mixpanel Analytics', desc: 'Tracking, Funnels & Cohorts' },
    { id: 12, title: 'Module 12: Sandwich Shop Analysis', desc: 'Case Study: Acquisition to Retention' },
    { id: 13, title: 'Module 13: Real World Analysis', desc: 'Banking Data: Risk & Segmentation' },
    { id: 14, title: 'Module 14: Ride Hailing Strategy', desc: 'Uber vs Bolt: Marketplaces & Surge' },
    { id: 15, title: 'Module 15: E-Commerce Analytics', desc: 'Attribution, AOV & Cart Abandonment' },
];

const CourseOutline = ({ onSelectModule }) => {
    return (
        <div style={styles.container}>
            <h2>🚀 Growth Product Management Curriculum</h2>
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
