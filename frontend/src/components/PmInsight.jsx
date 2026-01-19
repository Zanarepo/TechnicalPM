
import React from 'react';

const PmInsight = ({ title, description, tradeOffs = [] }) => {
    return (
        <div style={{
            marginTop: '20px',
            marginBottom: '20px',
            padding: '20px',
            borderLeft: '5px solid #7B1FA2', // Purple for PM
            backgroundColor: '#F3E5F5',
            borderRadius: '8px',
            textAlign: 'left',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>💡</span>
                <h4 style={{ margin: 0, color: '#4A148C' }}>Product Manager Takeaway</h4>
            </div>

            <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#6A1B9A' }}>
                {title}
            </div>

            <p style={{ margin: '0 0 10px 0', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {description}
            </p>

            {tradeOffs.length > 0 && (
                <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #E1BEE7' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#7B1FA2' }}>THE TRADE-OFFS:</strong>
                    <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                        {tradeOffs.map((t, i) => (
                            <li key={i} style={{ marginBottom: '4px' }}>{t}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PmInsight;
