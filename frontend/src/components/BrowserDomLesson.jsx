
import React, { useState } from 'react';
import PmInsight from './PmInsight';

const BrowserDomLesson = () => {
    const [hoveredNode, setHoveredNode] = useState(null);
    const [deletedNodes, setDeletedNodes] = useState([]);

    const handleMouseEnter = (nodeId) => setHoveredNode(nodeId);
    const handleMouseLeave = () => setHoveredNode(null);

    const handleDelete = (nodeId) => {
        setDeletedNodes(prev => [...prev, nodeId]);
    };

    const isDeleted = (id) => deletedNodes.includes(id);

    // Helper to render tree node
    const TreeNode = ({ id, label, children }) => {
        if (isDeleted(id)) return null;

        const isHovered = hoveredNode === id;
        return (
            <div
                style={{
                    marginLeft: '20px',
                    padding: '4px',
                    backgroundColor: isHovered ? '#e3f2fd' : 'transparent',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: 'monospace'
                }}
                onMouseEnter={() => handleMouseEnter(id)}
                onMouseLeave={handleMouseLeave}
            >
                <span style={{ color: '#d32f2f' }}>&lt;{label}&gt;</span>
                {children}
                <span style={{ color: '#d32f2f' }}>&lt;/{label.split(' ')[0]}&gt;</span>
                <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(id); }}
                    style={{ marginLeft: '10px', fontSize: '0.7rem', border: 'none', background: 'none', color: '#666', cursor: 'pointer' }}
                >
                    🗑️
                </button>
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <h2>🖥️ Module 2: The Browser & DOM</h2>
            <p>The Browser reads code and builds a <strong>DOM Tree</strong>. Hover nodes to see them!</p>

            <div style={styles.splitScreen}>

                {/* LEFT: DOM TREE */}
                <div style={styles.treePanel}>
                    <h3>📄 DOM Tree (The Blueprint)</h3>
                    <TreeNode id="root" label='div id="app"'>
                        <TreeNode id="card" label='div class="card"'>
                            <TreeNode id="h3" label="h3">Bank Login</TreeNode>
                            <TreeNode id="form" label="form">
                                <TreeNode id="input1" label='input type="text"' />
                                <TreeNode id="input2" label='input type="password"' />
                                <TreeNode id="btn" label="button">Login</TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>

                    <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#666' }}>
                        <p>💡 Tip: Try clicking 🗑️ to delete a node. See how it instantly updates the render?</p>
                        <button onClick={() => setDeletedNodes([])} style={styles.resetBtn}>Reset Tree</button>
                    </div>
                </div>

                {/* RIGHT: RENDERED UI */}
                <div style={styles.renderPanel}>
                    <h3>🎨 Rendered View (The Pixel Painting)</h3>

                    {!isDeleted('root') && (
                        <div
                            id="app"
                            style={{
                                ...styles.appBox,
                                border: hoveredNode === 'root' ? '2px solid blue' : '1px dashed #ccc'
                            }}
                        >
                            {!isDeleted('card') && (
                                <div
                                    className="card"
                                    style={{
                                        ...styles.card,
                                        boxShadow: hoveredNode === 'card' ? '0 0 0 4px #2196f3' : '0 4px 6px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {!isDeleted('h3') && (
                                        <h3 style={{
                                            ...styles.h3,
                                            backgroundColor: hoveredNode === 'h3' ? '#bbdefb' : 'transparent'
                                        }}>
                                            Bank Login
                                        </h3>
                                    )}

                                    {!isDeleted('form') && (
                                        <form style={{
                                            ...styles.form,
                                            backgroundColor: hoveredNode === 'form' ? '#e3f2fd' : 'transparent'
                                        }}>
                                            {!isDeleted('input1') && (
                                                <input
                                                    type="text"
                                                    placeholder="Username"
                                                    style={{
                                                        ...styles.input,
                                                        border: hoveredNode === 'input1' ? '2px solid blue' : '1px solid #ccc'
                                                    }}
                                                />
                                            )}
                                            {!isDeleted('input2') && (
                                                <input
                                                    type="password"
                                                    placeholder="Password"
                                                    style={{
                                                        ...styles.input,
                                                        border: hoveredNode === 'input2' ? '2px solid blue' : '1px solid #ccc'
                                                    }}
                                                />
                                            )}
                                            {!isDeleted('btn') && (
                                                <button
                                                    type="button" // Prevent submit
                                                    style={{
                                                        ...styles.btn,
                                                        transform: hoveredNode === 'btn' ? 'scale(1.05)' : 'scale(1)'
                                                    }}
                                                >
                                                    Login
                                                </button>
                                            )}
                                        </form>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>

            <PmInsight
                title="Performance Budgets & The DOM"
                description="Every time you add a node (stick a post-it on the wall), the browser has to recalculate layout. Infinite scrolling social feeds can crash browsers if they don't Delete (Garbage Collect) old nodes."
                tradeOffs={[
                    "Rich Interactions (Animations/Popups) = Heavy DOM manipulation = Slower Battery Life.",
                    "PMs should ask: 'Do we really need to show 10,000 rows at once, or is 50 enough?'"
                ]}
            />
        </div>
    );
};

const styles = {
    container: { padding: '5px' }, // Minimized padding
    splitScreen: { display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' },
    treePanel: { flex: 1, minWidth: '100%', border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', backgroundColor: '#fafafa', fontFamily: 'monospace' }, // Full width on mobile default
    renderPanel: { flex: 1, minWidth: '100%', border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' },

    // Rendered Styles
    appBox: { padding: '2rem', width: '100%', display: 'flex', justifyContent: 'center' },
    card: { padding: '2rem', border: '1px solid #eee', borderRadius: '8px', width: '250px' },
    h3: { textAlign: 'center', marginBottom: '1.5rem', marginTop: 0 },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem', padding: '10px' },
    input: { padding: '8px', borderRadius: '4px' },
    btn: { padding: '10px', backgroundColor: '#1a237e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'transform 0.2s' },
    resetBtn: { marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }
};

export default BrowserDomLesson;
