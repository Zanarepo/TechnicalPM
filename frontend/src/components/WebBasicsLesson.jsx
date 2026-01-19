
import React, { useState } from 'react';
import PmInsight from './PmInsight';

const WebBasicsLesson = () => {
    const [layers, setLayers] = useState({
        html: true,
        css: false,
        js: false
    });

    const toggleLayer = (layer) => {
        setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
    };

    const checkLogin = (e) => {
        e.preventDefault();
        if (!layers.js) {
            alert("⚠️ JavaScript is OFF: This button does nothing!");
        } else {
            alert("✅ JavaScript is ON: Submitting form...");
        }
    };

    return (
        <div style={styles.container}>
            <h2>🧱 Module 1: The Raw Materials</h2>
            <p>Toggle the layers to see how a "Bank Login" is built from scratch.</p>

            {/* CONTROLS */}
            <div style={styles.controls}>
                <label style={styles.checkbox}>
                    <input type="checkbox" checked={layers.html} disabled />
                    <strong>1. HTML</strong> (Structure)
                </label>
                <label style={styles.checkbox}>
                    <input type="checkbox" checked={layers.css} onChange={() => toggleLayer('css')} />
                    <strong>2. CSS</strong> (Style)
                </label>
                <label style={styles.checkbox}>
                    <input type="checkbox" checked={layers.js} onChange={() => toggleLayer('js')} />
                    <strong>3. JavaScript</strong> (Logic)
                </label>
            </div>

            <hr />

            {/* DEMO AREA */}
            <div style={styles.demoArea}>
                {/* If CSS is ON, use styled container. If OFF, use raw div */}
                <div className={layers.css ? "bank-card" : ""}>

                    <h3 className={layers.css ? "bank-title" : ""}>Bank of TPM</h3>

                    <form onSubmit={checkLogin} className={layers.css ? "bank-form" : ""}>
                        <div className={layers.css ? "input-group" : ""}>
                            <label>Username:</label>
                            <input type="text" placeholder="Enter name" className={layers.css ? "bank-input" : ""} />
                        </div>

                        <div className={layers.css ? "input-group" : ""}>
                            <label>Password:</label>
                            <input type="password" placeholder="Secret" className={layers.css ? "bank-input" : ""} />
                        </div>

                        <button type="submit" className={layers.css ? "bank-btn" : ""}>
                            Login
                        </button>
                    </form>

                    {layers.js && <p style={{ color: 'green', fontSize: '0.8rem' }}>⚡ JS Active: Form Validation Ready</p>}
                </div>
            </div>

            {/* INJECTED STYLES FOR DEMO (To simulate "External CSS") */}
            {layers.css && (
                <style>{`
          .bank-card {
            border: 1px solid #ccc;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            max-width: 300px;
            margin: 0 auto;
            background: white;
            font-family: sans-serif;
          }
          .bank-title {
            color: #1a237e;
            text-align: center;
            margin-bottom: 1.5rem;
          }
          .bank-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .input-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .bank-input {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          .bank-btn {
            background-color: #1a237e;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
          }
          .bank-btn:hover {
            background-color: #0d47a1;
            padding: 10px;
          }
        `}</style>
            )}

            <PmInsight
                title="The 'Cost' of a Pixel Perfect Design"
                description="Engineers separate Structure (HTML), Style (CSS), and Logic (JS). A 'simple' change like 'Move this button here' often breaks all three layers."
                tradeOffs={[
                    "Custom CSS (Pixel Perfect) takes 3x longer than using standard UI libraries.",
                    "Logic (JS) often depends on specific HTML structure. Changing UI can break functionality."
                ]}
            />
        </div>
    );
};

const styles = {
    container: { padding: '5px' }, // Responsive padding
    controls: { display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' },
    checkbox: { display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '1.1rem' },
    demoArea: { padding: '2rem', border: '2px dashed #eee', minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fafafa' }
};

export default WebBasicsLesson;
