
import React from 'react';

const AnatomyLesson = () => {
    return (
        <div style={styles.container}>
            <h2>🖥️ Anatomy of a Web Page</h2>

            <div style={styles.browserWindow}>
                {/* HEADER SECTION */}
                <header style={styles.header}>
                    <div style={styles.annotation}>&lt;Header&gt; (Navigation, Logo)</div>
                    <h3>Learning Module</h3>
                </header>

                {/* MAIN BODY SECTION */}
                <main style={styles.main}>
                    <div style={styles.annotation}>&lt;Main&gt; (The dynamic content)</div>
                    <div style={styles.card}>
                        <h4>Product List</h4>
                        <p>Learning about the anatomy of a web page!</p>
                    </div>
                </main>

                {/* FOOTER SECTION */}
                <footer style={styles.footer}>
                    <div style={styles.annotation}>&lt;Footer&gt; (Copyright, Links)</div>
                    <p>© 2026 Technical Learning</p>
                </footer>
            </div>

            <div style={styles.explanation}>
                <h3>Everything is a Component!</h3>
                <p>In React, we build small blocks (Header, Footer, Button) and stack them together like LEGOs.</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
    },
    browserWindow: {
        border: '2px solid #333',
        borderRadius: '8px',
        overflow: 'hidden',
        marginTop: '1rem',
    },
    header: {
        backgroundColor: '#ffb74d',
        padding: '1rem',
        textAlign: 'center',
        position: 'relative',
        color: '#333',
    },
    main: {
        backgroundColor: '#fff',
        padding: '2rem',
        minHeight: '200px',
        color: '#333',
        position: 'relative',
    },
    footer: {
        backgroundColor: '#4fc3f7',
        padding: '1rem',
        textAlign: 'center',
        color: '#333',
        position: 'relative',
    },
    annotation: {
        position: 'absolute',
        top: '2px',
        left: '2px',
        fontSize: '0.8rem',
        backgroundColor: 'rgba(255,255,255,0.7)',
        padding: '2px 4px',
        borderRadius: '4px',
        border: '1px dashed #333',
    },
    card: {
        border: '1px solid #ddd',
        padding: '1rem',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
    },
    explanation: {
        marginTop: '2rem',
        backgroundColor: '#e0f7fa',
        padding: '1rem',
        borderRadius: '8px',
        color: '#006064',
    }
};

export default AnatomyLesson;
