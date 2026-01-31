import React, { useState } from 'react';

const PasswordBank = () => {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                style={styles.toggleBtn}
            >
                🔑 Password Bank
            </button>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={{ margin: 0 }}>🔑 Credentials Vault</h3>
                <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>×</button>
            </div>
            <div style={styles.content}>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Use these focused users for all lessons:</p>

                <div style={styles.userRow}>
                    <div style={styles.icon}>👩‍💼</div>
                    <div>
                        <strong>Alice Growth</strong> (PM)
                        <div style={styles.cred}>
                            User: <code>Alice</code><br />
                            Pass: <code>growth123</code>
                        </div>
                    </div>
                </div>

                <div style={styles.userRow}>
                    <div style={styles.icon}>👨‍💻</div>
                    <div>
                        <strong>Bob Dev</strong> (Engineer)
                        <div style={styles.cred}>
                            User: <code>Bob</code><br />
                            Pass: <code>code123</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    toggleBtn: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#263238',
        color: 'white',
        border: 'none',
        borderRadius: '30px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        zIndex: 1000,
        fontWeight: 'bold',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    container: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '300px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        zIndex: 1000,
        overflow: 'hidden',
        border: '1px solid #ddd',
        animation: 'slideUp 0.3s ease-out'
    },
    header: {
        backgroundColor: '#263238',
        color: 'white',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '1.5rem',
        cursor: 'pointer'
    },
    content: {
        padding: '15px'
    },
    userRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '15px',
        paddingBottom: '15px',
        borderBottom: '1px solid #eee'
    },
    icon: {
        fontSize: '1.5rem',
        backgroundColor: '#f5f5f5',
        padding: '10px',
        borderRadius: '50%'
    },
    cred: {
        fontFamily: 'monospace',
        backgroundColor: '#f9f9f9',
        padding: '5px',
        borderRadius: '4px',
        marginTop: '5px',
        fontSize: '0.85rem'
    }
};

export default PasswordBank;
