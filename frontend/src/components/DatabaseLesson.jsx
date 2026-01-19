import React, { useState, useEffect } from 'react';
import PmInsight from './PmInsight';

const DatabaseLesson = () => {
    const [viewMode, setViewMode] = useState('sql'); // 'sql' or 'nosql'
    const [users, setUsers] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [activeQuery, setActiveQuery] = useState('users');

    const runQuery = (q) => setActiveQuery(q);

    // ACID Lab State
    const [acidStep, setAcidStep] = useState(0); // 0: Idle, 1: Debited, 2: Credited (Done), 3: Rolled Back
    const [ledgerState, setLedgerState] = useState({ alice: 1000, bob: 0 });
    const [transactionLog, setTransactionLog] = useState([]);

    useEffect(() => {
        // Fetch real data to visualize
        const fetchData = async () => {
            try {
                const uRes = await fetch('http://localhost:3001/api/users');
                const aRes = await fetch('http://localhost:3001/api/accounts');
                setUsers(await uRes.json());
                setAccounts(await aRes.json());
            } catch (e) {
                console.error("DB Connect Error");
            }
        };
        fetchData();
    }, []);

    // --- ACID LOGIC ---
    const startTransfer = () => {
        setAcidStep(1);
        setTransactionLog(prev => [...prev, "🔄 BEGIN TRANSACTION: Transfer $500 from Alice to Bob"]);
        setLedgerState(prev => ({ ...prev, alice: 500 })); // Debit immediately
        setTransactionLog(prev => [...prev, "📉 STEP 1: Debit Alice -$500. (State: Alice=$500, Bob=$0)"]);
    };

    const crashTransaction = () => {
        setAcidStep(3);
        setTransactionLog(prev => [...prev, "💥 SYSTEM CRASH! Connection Lost."]);
        setTransactionLog(prev => [...prev, "🛑 DETECTED INCOMPLETE TRANSACTION."]);

        // ROLLBACK
        setTimeout(() => {
            setLedgerState(prev => ({ ...prev, alice: 1000 }));
            setTransactionLog(prev => [...prev, "🔙 ROLLBACK EXECUTED: Alice refunded +$500."]);
        }, 1000);
    };

    const completeTransaction = () => {
        setAcidStep(2);
        setLedgerState(prev => ({ ...prev, bob: 500 }));
        setTransactionLog(prev => [...prev, "📈 STEP 2: Credit Bob +$500."]);
        setTransactionLog(prev => [...prev, "✅ COMMIT: Transaction Saved."]);
    };

    const resetAcid = () => {
        setAcidStep(0);
        setLedgerState({ alice: 1000, bob: 0 });
        setTransactionLog([]);
    };
    // ------------------

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>Module 7: Databases (The Master Ledger) 📒</h2>
                <p>How we structure and protect the data.</p>
            </div>

            <div style={styles.tabs}>
                <button style={{ ...styles.tab, borderBottom: viewMode === 'sql' ? '3px solid #007bff' : 'none' }} onClick={() => setViewMode('sql')}>Structured (SQL)</button>
                <button style={{ ...styles.tab, borderBottom: viewMode === 'nosql' ? '3px solid #28a745' : 'none' }} onClick={() => setViewMode('nosql')}>Flexible (NoSQL)</button>
                <button style={{ ...styles.tab, borderBottom: viewMode === 'acid' ? '3px solid #dc3545' : 'none' }} onClick={() => setViewMode('acid')}>🛡️ The ACID Test</button>
            </div>

            {/* SQL VIEW */}
            {viewMode === 'sql' && (
                <div style={styles.content}>
                    <h3>🏛️ Relational Model (SQL)</h3>

                    <div style={styles.useCaseBox}>
                        <strong>✅ Best for:</strong> Financial Systems (Banking), Inventory, structured data.<br />
                        <strong>🤔 Why use it here?</strong> "The Bank of TPM" uses SQL because we need 100% accuracy. If we delete a User, their Account must also disappear (Foreign Key constraints). We cannot afford "messy" data when handling money.
                    </div>

                    <p style={{ marginTop: '15px' }}>Data lives in separate, strict "Tables". We link them using IDs (Foreign Keys).</p>
                    <div style={styles.tablesContainer}>
                        {/* Users Table */}
                        <div style={styles.dbTable}>
                            <div style={styles.tableHead}>📋 USERS Table</div>
                            <div style={styles.rowHeader}><span>ID (PK)</span><span>Name</span><span>Roles</span></div>
                            {users.slice(0, 5).map(u => (
                                <div key={u.id} style={styles.row}>
                                    <span style={styles.pk}>{u.id}</span>
                                    <span>{u.name}</span>
                                    <span style={{ fontSize: '0.8em' }}>{u.roles.join(',')}</span>
                                </div>
                            ))}
                        </div>

                        {/* Accounts Table */}
                        <div style={styles.dbTable}>
                            <div style={styles.tableHead}>💰 ACCOUNTS Table</div>
                            <div style={styles.rowHeader}><span>ID (PK)</span><span>Type</span><span>Balance</span><span>User_ID (FK)</span></div>
                            {accounts.slice(0, 5).map(a => (
                                <div key={a.id} style={styles.row}>
                                    <span style={styles.pk}>{a.id}</span>
                                    <span>{a.type}</span>
                                    <span>${a.balance}</span>
                                    <span style={styles.fk}>Ref: User {a.user_id}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={styles.explanation}>
                        <strong>Pro:</strong> Super organized. No duplicate data. <br />
                        <strong>Con:</strong> Need to "JOIN" tables to get full info (Slow).
                    </div>

                    {/* SQL PLAYGROUND */}
                    <div style={styles.playground}>
                        <h4 style={{ marginTop: 0 }}>⚡ SQL Query Playground</h4>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>Click a query to see how we retrieve data from these tables:</p>

                        <div style={styles.queryButtons}>
                            <button onClick={() => runQuery('users')} style={activeQuery === 'users' ? styles.qBtnActive : styles.qBtn}>
                                1. SELECT * FROM users
                            </button>
                            <button onClick={() => runQuery('accounts')} style={activeQuery === 'accounts' ? styles.qBtnActive : styles.qBtn}>
                                2. SELECT * FROM accounts
                            </button>
                            <button onClick={() => runQuery('join')} style={styles.qBtnJoin}>
                                3. SELECT name, balance <br />FROM users <br />INNER JOIN accounts ON users.id = accounts.user_id
                            </button>
                        </div>

                        {/* RESULT VISUALIZER */}
                        <div style={styles.consoleWindow}>
                            <div style={styles.consoleHeader}>Target: postgresql_production_db</div>

                            {/* The Query */}
                            <div style={{ padding: '10px', color: '#aeea00', borderBottom: '1px solid #333', fontFamily: 'monospace' }}>
                                &gt; {activeQuery === 'users' ? "SELECT * FROM users;" :
                                    activeQuery === 'accounts' ? "SELECT * FROM accounts;" :
                                        "SELECT users.name, accounts.balance FROM users INNER JOIN accounts ON users.id = accounts.user_id;"}
                            </div>

                            {/* The Result */}
                            <div style={styles.consoleResult}>
                                {activeQuery === 'users' && users.slice(0, 4).map(u => (
                                    <div key={u.id} style={styles.consoleRow}>
                                        <span style={styles.cVal}>{u.id}</span>
                                        <span style={styles.cVal}>{u.name}</span>
                                        <span style={styles.cVal}>{u.roles[0]}</span>
                                    </div>
                                ))}
                                {activeQuery === 'accounts' && accounts.slice(0, 4).map(a => (
                                    <div key={a.id} style={styles.consoleRow}>
                                        <span style={styles.cVal}>{a.id}</span>
                                        <span style={styles.cVal}>{a.type}</span>
                                        <span style={styles.cVal}>${a.balance}</span>
                                    </div>
                                ))}
                                {activeQuery === 'join' && users.slice(0, 4).map(u => {
                                    const acc = accounts.find(a => a.user_id === u.id);
                                    if (!acc) return null;
                                    return (
                                        <div key={u.id} style={styles.consoleRow}>
                                            <span style={{ ...styles.cVal, color: '#fff' }}>{u.name}</span>
                                            <span style={styles.cVal}>+</span>
                                            <span style={{ ...styles.cVal, color: '#00e676' }}>${acc.balance}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div style={styles.consoleFooter}>
                                Result: {activeQuery === 'join' ? "Combined Data (User + Money)" : "Raw Table Data"}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* NoSQL VIEW */}
            {viewMode === 'nosql' && (
                <div style={styles.content}>
                    <h3>📑 Document Model (NoSQL)</h3>

                    <div style={{ ...styles.useCaseBox, borderColor: '#28a745', backgroundColor: '#e8f5e9' }}>
                        <strong>✅ Best for:</strong> Social Media Feeds, Product Catalogs (Amazon), High-Speed Logging.<br />
                        <strong>🤔 Why NOT for Banking?</strong> If Alice changes her name, we have to find every single document where "Alice" is written and update it. In Banking, that's too risky. But for a Facebook Feed, it's perfect (fast loading).
                    </div>

                    <p style={{ marginTop: '15px' }}>Data lives in "Documents". We nest related data together.</p>
                    <div style={styles.jsonBox}>
                        {users.slice(0, 3).map(u => {
                            const userAccounts = accounts.filter(a => a.user_id === u.id);
                            return (
                                <div key={u.id} style={styles.document}>
                                    <span style={{ color: '#888' }}>{"{"}</span>
                                    <div style={{ paddingLeft: '20px' }}>
                                        <div>"_id": <span style={{ color: '#d32f2f' }}>{u.id}</span>,</div>
                                        <div>"name": "{u.name}",</div>
                                        <div>"accounts": [</div>
                                        {userAccounts.map(a => (
                                            <div key={a.id} style={{ paddingLeft: '20px', color: '#009688' }}>
                                                {"{"} "type": "{a.type}", "balance": {a.balance} {"}"},
                                            </div>
                                        ))}
                                        <div>]</div>
                                    </div>
                                    <span style={{ color: '#888' }}>{"},"}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div style={styles.explanation}>
                        <strong>Pro:</strong> Fast! One read gets everything.<br />
                        <strong>Con:</strong> Duplicate data. If user changes name, update everywhere.
                    </div>
                </div>
            )}

            {/* ACID VIEW */}
            {viewMode === 'acid' && (
                <div style={styles.content}>
                    <h3>🛡️ ACID Compliance (Atomicity)</h3>
                    <p>Atomicity means "All or Nothing". A transaction cannot "half-happen".</p>

                    <div style={styles.acidStage}>
                        <div style={styles.ledgerCard}>
                            <h4>👩 Alice</h4>
                            <h1>${ledgerState.alice}</h1>
                        </div>
                        <div style={{ fontSize: '2rem' }}>➡️</div>
                        <div style={styles.ledgerCard}>
                            <h4>👨 Bob</h4>
                            <h1>${ledgerState.bob}</h1>
                        </div>
                    </div>

                    <div style={styles.acidControls}>
                        {acidStep === 0 && (
                            <button onClick={startTransfer} style={styles.startBtn}>1. Start Transfer ($500)</button>
                        )}
                        {acidStep === 1 && (
                            <>
                                <button onClick={completeTransaction} style={styles.successBtn}>2. Complete (Commit)</button>
                                <button onClick={crashTransaction} style={styles.crashBtn}>💥 CRASH SYSTEM</button>
                            </>
                        )}
                        {(acidStep === 2 || acidStep === 3) && (
                            <button onClick={resetAcid} style={styles.resetBtn}>Reset Simulation</button>
                        )}
                    </div>

                    <div style={styles.logBox}>
                        {transactionLog.map((l, i) => (
                            <div key={i} style={{ color: l.includes('ROLLBACK') ? 'orange' : l.includes('CRASH') ? 'red' : '#eee', marginBottom: '5px' }}>
                                {l}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <PmInsight
                title="SQL vs NoSQL: Structure vs Speed"
                description="Choosing a database is one of the hardest-to-reverse decisions. Use SQL for money/inventory. Use NoSQL for social feeds/catalogs."
                tradeOffs={[
                    "SQL ensures data is correct (ACID) but is harder to scale horizontally.",
                    "NoSQL scales easily (Sharding) but you might see 'ghost' data (Eventual Consistency).",
                    "PM Question: 'Is it okay if a user sees their old balance for 1 second?' If yes -> NoSQL/Cache."
                ]}
            />
        </div>
    );
};

const styles = {
    container: { padding: '20px', maxWidth: '1000px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '20px' },
    tabs: { display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' },
    tab: { padding: '10px 20px', background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold', color: '#555' },
    content: { background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },

    // SQL Styles
    tablesContainer: { display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' },
    dbTable: { border: '2px solid #333', borderRadius: '5px', minWidth: '300px' },
    tableHead: { background: '#333', color: '#fff', padding: '5px', textAlign: 'center', fontWeight: 'bold' },
    rowHeader: { display: 'flex', background: '#eee', padding: '5px', fontWeight: 'bold', fontSize: '0.8rem', justifyContent: 'space-between' },
    row: { display: 'flex', padding: '8px', borderBottom: '1px solid #eee', justifyContent: 'space-between' },
    pk: { color: '#d32f2f', fontWeight: 'bold' },
    fk: { color: '#007bff', fontStyle: 'italic', fontSize: '0.8rem' },

    // NoSQL Styles
    jsonBox: { background: '#222', color: '#aeea00', fontFamily: 'monospace', padding: '20px', borderRadius: '5px' },
    document: { marginBottom: '10px' },

    // ACID Styles
    acidStage: { display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '30px 0' },
    ledgerCard: { padding: '20px', border: '1px solid #ccc', borderRadius: '10px', textAlign: 'center', minWidth: '150px' },
    acidControls: { display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' },
    startBtn: { padding: '15px 30px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1rem' },
    successBtn: { padding: '15px 30px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1rem' },
    crashBtn: { padding: '15px 30px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1rem' },
    resetBtn: { padding: '10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    logBox: { background: '#000', color: '#fff', padding: '15px', fontFamily: 'monospace', borderRadius: '5px', height: '150px', overflowY: 'auto' },

    explanation: { marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '5px', borderLeft: '5px solid #ffecb3' },
    useCaseBox: { padding: '15px', background: '#e3f2fd', borderRadius: '5px', borderLeft: '5px solid #2196F3', lineHeight: '1.6' },

    playground: { marginTop: '30px', padding: '20px', borderTop: '1px solid #eee' },
    queryButtons: { display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' },
    qBtn: { padding: '8px 15px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', background: '#f5f5f5', fontFamily: 'monospace' },
    qBtnActive: { padding: '8px 15px', border: '1px solid #007bff', borderRadius: '4px', cursor: 'pointer', background: '#e3f2fd', fontWeight: 'bold', fontFamily: 'monospace' },
    qBtnJoin: { padding: '8px 15px', border: '1px solid #9c27b0', borderRadius: '4px', cursor: 'pointer', background: '#f3e5f5', color: '#6a1b9a', fontWeight: 'bold', fontFamily: 'monospace' },

    consoleWindow: { background: '#263238', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' },
    consoleHeader: { background: '#37474f', padding: '5px 10px', color: '#ccc', fontSize: '0.8rem', borderBottom: '1px solid #455a64' },
    consoleResult: { padding: '10px', minHeight: '100px', maxHeight: '200px', overflowY: 'auto' },
    consoleRow: { display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #37474f', color: '#b0bec5', fontFamily: 'monospace' },
    cVal: { flex: 1, textAlign: 'left' },
    consoleFooter: { padding: '5px 10px', background: '#37474f', color: '#888', fontSize: '0.8rem', textAlign: 'right' }
};

export default DatabaseLesson;
