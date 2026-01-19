
import React, { useState } from 'react';
import PmInsight from './PmInsight';

const MobileLesson = () => {
    const [webStatus, setWebStatus] = useState('Idle');
    const [mobileStatus, setMobileStatus] = useState('Idle');

    const handleWebUpload = () => {
        setWebStatus('Opening File Picker...');
        setTimeout(() => setWebStatus('Uploading file...'), 1000);
        setTimeout(() => setWebStatus('Success: Image Uploaded'), 2000);
    };

    const handleMobileScan = () => {
        setMobileStatus('Opening Camera Hardware...');
        setTimeout(() => setMobileStatus('📸 Check Scanned!'), 800);
        setTimeout(() => setMobileStatus('Success: Verified Locally'), 1600);
    };

    return (
        <><div style={styles.container}>
            <h2>📱 Module 4: Mobile & Website</h2>
            <p>Why build an App? <strong>Hardware Access.</strong></p>
            <p style={{ marginBottom: '2rem' }}>Use Case: <strong>Remote Check Deposit</strong></p>

            <div style={styles.splitScreen}>

                {/* LEFT: MOBILE WEBSITE */}
                <div style={styles.deviceWrapper}>
                    <div style={styles.browserBar}>
                        <div style={styles.urlBar}>bank-of-tpm.com/deposit</div>
                    </div>
                    <div style={styles.screen}>
                        <h3>🌐 Mobile Website</h3>
                        <p style={styles.desc}>Restricted to Browser APIs.</p>

                        <div style={styles.featureBox}>
                            <p>Deposit Check</p>
                            <button onClick={handleWebUpload} style={styles.webBtn}>
                                📂 Upload File
                            </button>
                            <div style={styles.statusLog}>{webStatus}</div>
                        </div>

                        <p style={styles.note}>
                            Has to ask generic OS permissions. Clunky file picker.
                        </p>
                    </div>
                </div>

                {/* RIGHT: NATIVE APP */}
                <div style={{ ...styles.deviceWrapper, borderRadius: '30px', border: '8px solid #333' }}>
                    <div style={styles.notch}></div>
                    <div style={styles.screen}>
                        <h3>📲 Native App</h3>
                        <p style={styles.desc}>Direct Hardware Access.</p>

                        <div style={styles.featureBox}>
                            <p>Deposit Check</p>
                            <button onClick={handleMobileScan} style={styles.appBtn}>
                                📷 Scan Check
                            </button>
                            <div style={styles.statusLog}>{mobileStatus}</div>
                        </div>

                        <p style={styles.note}>
                            Accesses Camera Hardware directly. Custom overlay. Instant feedback.
                        </p>
                    </div>
                </div>

            </div>

        </div><PmInsight
                title="Native App vs Mobile Web"
                description="Native Apps have access to hardware (Camera/GPS) and feel faster. Mobile Web is cheaper/easier to distribute (just send a link)."
                tradeOffs={[
                    "App Store Tax: Apple/Google take 30% of revenue + Approval process delays.",
                    "Web Reach: Instant updates (no app store review) but less engagement.",
                    "PWA (Progressive Web Apps): A middle ground, but limited adoption on iOS."
                ]} /></>

    )

};

const styles = {
    container: { padding: '1rem' },
    splitScreen: { display: 'flex', gap: '4rem', justifyContent: 'center', flexWrap: 'wrap' },

    deviceWrapper: {
        width: '280px',
        height: '500px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#fff',
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
    },

    browserBar: { backgroundColor: '#eee', padding: '10px', borderBottom: '1px solid #ccc' },
    urlBar: { backgroundColor: 'white', padding: '5px', borderRadius: '20px', fontSize: '0.8rem', textAlign: 'center', color: '#666' },

    notch: { width: '100px', height: '20px', backgroundColor: '#333', position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', zIndex: 10 },

    screen: { padding: '20px', paddingTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' },

    desc: { color: '#666', fontSize: '0.9rem', marginBottom: '2rem' },

    featureBox: { width: '100%', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' },

    webBtn: { padding: '10px 20px', border: '1px solid #ccc', backgroundColor: '#eee', cursor: 'pointer', width: '100%' },
    appBtn: { padding: '10px 20px', border: 'none', backgroundColor: '#007aff', color: 'white', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', width: '100%' },

    statusLog: { marginTop: '10px', fontSize: '0.8rem', color: '#1a237e', minHeight: '20px' },
    note: { fontSize: '0.8rem', color: '#888', textAlign: 'center', marginTop: 'auto', marginBottom: '20px' }
};

export default MobileLesson;
