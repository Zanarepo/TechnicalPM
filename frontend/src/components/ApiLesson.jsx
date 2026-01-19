
import React, { useState } from 'react';
import PmInsight from './PmInsight';

const ApiLesson = () => {
    const [activeTab, setActiveTab] = useState('GET');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    // State for Inputs
    const [transferAmount, setTransferAmount] = useState(100);
    const [newName, setNewName] = useState('Alice Pro');
    const [deleteId, setDeleteId] = useState(1);
    const [getStrategy, setGetStrategy] = useState('all'); // 'all' or 'user'

    // Dynamic Data
    const [users, setUsers] = useState([]);
    const [accounts, setAccounts] = useState([]);

    // Initial Fetch of Data
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const uRes = await fetch('http://localhost:3001/api/users');
                const uData = await uRes.json();
                setUsers(uData);
                if (uData.length > 0) setDeleteId(uData[0].id);

                const aRes = await fetch('http://localhost:3001/api/accounts');
                const aData = await aRes.json();
                setAccounts(aData);
            } catch (e) { console.error("Failed to fetch data"); }
        };
        fetchData();
    }, []);

    const simulateRequest = async (method, endpoint, body = null) => {
        setLoading(true);
        setResponse(null);

        try {
            // INTENTIONAL DELAY FOR DRAMA
            await new Promise(r => setTimeout(r, 800));

            const options = {
                method,
                headers: { 'Content-Type': 'application/json' }
            };
            if (body) options.body = JSON.stringify(body);

            const res = await fetch(`http://localhost:3001${endpoint}`, options);
            const data = await res.json();

            setResponse({
                status: res.status,
                statusText: res.statusText,
                data: data
            });

            // Refresh Data if we made changes
            if (['POST', 'PUT', 'DELETE'].includes(method)) {
                const uRes = await fetch('http://localhost:3001/api/users');
                setUsers(await uRes.json());

                const aRes = await fetch('http://localhost:3001/api/accounts');
                setAccounts(await aRes.json());
            }

        } catch (err) {
            setResponse({
                status: 500,
                statusText: "Network Error",
                data: { message: "Is the backend running?" }
            });
        }
        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <h2>🗣️ Module 5: API Playground</h2>
            <p>The Teller Window. Choose your action below:</p>

            {/* TABS */}
            <div style={styles.tabs}>
                <button onClick={() => { setActiveTab('GET'); setResponse(null); }} style={{ ...styles.tab, backgroundColor: activeTab === 'GET' ? '#e3f2fd' : 'white', borderColor: '#2196f3' }}>
                    <span style={{ color: '#2196f3' }}>GET</span> (Read)
                </button>
                <button onClick={() => { setActiveTab('POST'); setResponse(null); }} style={{ ...styles.tab, backgroundColor: activeTab === 'POST' ? '#e8f5e9' : 'white', borderColor: '#4caf50' }}>
                    <span style={{ color: '#4caf50' }}>POST</span> (Create/Action)
                </button>
                <button onClick={() => { setActiveTab('PUT'); setResponse(null); }} style={{ ...styles.tab, backgroundColor: activeTab === 'PUT' ? '#fff3e0' : 'white', borderColor: '#ff9800' }}>
                    <span style={{ color: '#ff9800' }}>PUT</span> (Update)
                </button>
                <button onClick={() => { setActiveTab('DELETE'); setResponse(null); }} style={{ ...styles.tab, backgroundColor: activeTab === 'DELETE' ? '#ffebee' : 'white', borderColor: '#f44336' }}>
                    <span style={{ color: '#f44336' }}>DELETE</span> (Remove)
                </button>
            </div>

            <div style={styles.playground}>
                {/* LEFT: ACTION PANEL */}
                <div style={styles.panel}>
                    <h3>🔨 Construct Request</h3>

                    {/* GET SCENARIO */}
                    {activeTab === 'GET' && (
                        <div>
                            <p><strong>Goal:</strong> Fetch Data.</p>

                            <div style={styles.inputGroup}>
                                <label>Endpoint Strategy:</label>
                                <select
                                    value={getStrategy}
                                    onChange={(e) => setGetStrategy(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="all">Fetch ALL Accounts (Public)</option>
                                    <option value="user">Fetch Specific User Accounts (REST)</option>
                                </select>
                            </div>

                            {getStrategy === 'user' ? (
                                <div>
                                    <div style={styles.inputGroup}>
                                        <label>Target User:</label>
                                        <select id="targetUserId" style={styles.input}>
                                            {users.map(u => (
                                                <option key={u.id} value={u.id}>{u.name} (ID: {u.id})</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div style={styles.codeBlock}>
                                        Try: GET /api/users/&lt;id&gt;/accounts
                                    </div>
                                    <button onClick={() => {
                                        const uid = document.getElementById('targetUserId').value;
                                        simulateRequest('GET', `/api/users/${uid}/accounts`);
                                    }} style={{ ...styles.actionBtn, backgroundColor: '#0097a7' }}>
                                        👤 Get Accounts
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div style={styles.codeBlock}>
                                        Try: GET /api/accounts
                                    </div>
                                    <button onClick={() => simulateRequest('GET', '/api/accounts')} style={styles.actionBtn}>
                                        🔍 Get All Accounts
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {/* POST SCENARIO */}
                    {activeTab === 'POST' && (
                        <div>
                            <p><strong>Goal:</strong> Change Account Balance.</p>

                            {/* Sub-tabs for Actions */}
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
                                <button onClick={() => setResponse(null)} style={{ fontSize: '0.8rem', padding: '5px', cursor: 'pointer' }}>🔄 Reset</button>
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Action Type:</label>
                                <select id="actionType" style={styles.input} defaultValue="transfer" onChange={(e) => {
                                    setResponse(null);
                                    const val = e.target.value;
                                    document.getElementById('actionContainer').dataset.mode = val;
                                }}>
                                    <option value="transfer">Transfer (Person to Person)</option>
                                    <option value="deposit">Deposit (Fund Account)</option>
                                    <option value="withdraw">Withdraw (Take Cash)</option>
                                    <option value="create_user">✨ Create New User</option>
                                </select>
                            </div>

                            {/* DYNAMIC INPUTS BASED ON ACTION */}
                            <div id="actionContainer" data-mode="transfer">

                                {/* TRANSFER INPUTS */}
                                <div id="transferInputs" style={{ display: 'none', borderLeft: '3px solid #ccc', paddingLeft: '10px', marginBottom: '10px' }}>
                                    <style>{`#actionContainer[data-mode="transfer"] #transferInputs { display: block !important; }`}</style>
                                    <div style={styles.inputGroup}>
                                        <label>From (Sender):</label>
                                        <select id="senderId" style={styles.input}>
                                            {accounts.map(a => {
                                                const u = users.find(u => u.id === a.user_id);
                                                return <option key={a.id} value={a.id}>Acct #{a.id} ({u ? u.name : 'Unknown'}) - ${a.balance}</option>;
                                            })}
                                        </select>
                                    </div>
                                    <div style={styles.inputGroup}>
                                        <label>To (Receiver):</label>
                                        <select id="receiverId" style={styles.input} defaultValue={accounts[1]?.id}>
                                            {accounts.map(a => {
                                                const u = users.find(u => u.id === a.user_id);
                                                return <option key={a.id} value={a.id}>Acct #{a.id} ({u ? u.name : 'Unknown'})</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>

                                {/* DEPOSIT/WITHDRAW INPUTS */}
                                <div id="depWithInputs" style={{ display: 'none' }}>
                                    <style>{`
                                        #actionContainer[data-mode="deposit"] #depWithInputs, 
                                        #actionContainer[data-mode="withdraw"] #depWithInputs 
                                        { display: block !important; }
                                    `}</style>
                                    <div style={styles.inputGroup}>
                                        <label>Target Account:</label>
                                        <select id="targetAccountId" style={styles.input}>
                                            {accounts.map(a => {
                                                const u = users.find(u => u.id === a.user_id);
                                                return <option key={a.id} value={a.id}>Acct #{a.id} ({u ? u.name : 'Unknown'}) - ${a.balance}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>

                                {/* CREATE USER INPUTS */}
                                <div id="createInputs" style={{ display: 'none' }}>
                                    <style>{`#actionContainer[data-mode="create_user"] #createInputs { display: block !important; }`}</style>
                                    <div style={styles.inputGroup}>
                                        <label>Enter Name:</label>
                                        <input id="newUserName" type="text" placeholder="e.g. Rich Richie" style={styles.input} />
                                    </div>
                                </div>

                                {/* AMOUNT INPUT (Shared for Transfer/Deposit/Withdraw) */}
                                <div id="amountInput" style={{ display: 'none' }}>
                                    <style>{`
                                        #actionContainer[data-mode="transfer"] #amountInput,
                                        #actionContainer[data-mode="deposit"] #amountInput,
                                        #actionContainer[data-mode="withdraw"] #amountInput
                                        { display: block !important; }
                                    `}</style>
                                    <div style={styles.inputGroup}>
                                        <label>Amount ($):</label>
                                        <input
                                            type="number"
                                            value={transferAmount}
                                            onChange={e => setTransferAmount(e.target.value)}
                                            style={styles.input}
                                        />
                                    </div>
                                </div>

                            </div>

                            <button onClick={() => {
                                const type = document.getElementById('actionType').value;
                                if (type === 'transfer') {
                                    const senderId = document.getElementById('senderId').value;
                                    const receiverId = document.getElementById('receiverId').value;
                                    simulateRequest('POST', '/api/transfer', { senderId, receiverId, amount: transferAmount });
                                } else if (type === 'deposit') {
                                    const accountId = document.getElementById('targetAccountId').value;
                                    simulateRequest('POST', '/api/deposit', { accountId, amount: transferAmount });
                                } else if (type === 'withdraw') {
                                    const accountId = document.getElementById('targetAccountId').value;
                                    simulateRequest('POST', '/api/withdraw', { accountId, amount: transferAmount });
                                } else if (type === 'create_user') {
                                    const name = document.getElementById('newUserName').value;
                                    if (name) simulateRequest('POST', '/api/users', { name });
                                }
                            }} style={styles.actionBtn}>
                                🚀 Execute Action
                            </button>

                            <div style={styles.codeBlock}>
                                POST /api/action<br />
                                {`{ "amount": ${transferAmount} }`}
                            </div>
                        </div>
                    )}
                    {/* PUT SCENARIO */}
                    {activeTab === 'PUT' && (
                        <div>
                            <p><strong>Goal:</strong> Rename User (Update).</p>
                            <div style={styles.inputGroup}>
                                <label>Select User to Update:</label>
                                <select id="putUserId" style={styles.input}>
                                    {users.map(u => (
                                        <option key={u.id} value={u.id}>{u.name} (ID: {u.id})</option>
                                    ))}
                                </select>
                            </div>

                            <div style={styles.inputGroup}>
                                <label>New Name:</label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.codeBlock}>
                                PUT /api/users/&lt;id&gt;<br />
                                {`{ "name": "${newName}" }`}
                            </div>

                            <button onClick={() => {
                                const uid = document.getElementById('putUserId').value;
                                simulateRequest('PUT', `/api/users/${uid}`, { name: newName })
                            }} style={styles.actionBtn}>
                                💾 Update Profile
                            </button>
                        </div>
                    )}

                    {/* DELETE SCENARIO */}
                    {activeTab === 'DELETE' && (
                        <div>
                            <p><strong>Goal:</strong> Close Account (Destructive).</p>
                            <div style={styles.inputGroup}>
                                <label>Select User to Delete:</label>
                                <select value={deleteId} onChange={e => setDeleteId(e.target.value)} style={styles.input}>
                                    {users.map(u => (
                                        <option key={u.id} value={u.id}>{u.name} (ID: {u.id})</option>
                                    ))}
                                </select>
                            </div>

                            <div style={styles.codeBlock}>
                                DELETE /api/users/{deleteId}
                            </div>

                            <button onClick={() => simulateRequest('DELETE', `/api/users/${deleteId}`)} style={{ ...styles.actionBtn, backgroundColor: '#d32f2f' }}>
                                🗑️ Delete User
                            </button>
                        </div>
                    )}
                </div>

                {/* RIGHT: RESULT PANEL */}
                <div style={styles.panel}>
                    <h3>📬 Server Response</h3>
                    {loading ? (
                        <div style={{ color: '#666', fontStyle: 'italic' }}>Calling Teller...</div>
                    ) : (
                        response ? (
                            <div>
                                <div style={{
                                    ...styles.statusBadge,
                                    backgroundColor: response.status >= 200 && response.status < 300 ? '#def7e5' : '#fce4ec',
                                    color: response.status >= 200 && response.status < 300 ? 'green' : 'red'
                                }}>
                                    Status: <strong>{response.status} {response.statusText}</strong>
                                </div>
                                <pre style={styles.jsonBlock}>
                                    {JSON.stringify(response.data, null, 2)}
                                </pre>

                                {/* VISUAL PREVIEW if Accounts Present */}
                                {response.data?.accounts && (
                                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #ddd' }}>
                                        <h4>💳 Wallet: {response.data.owner || 'Unknown'}</h4>
                                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                            {response.data.accounts.map(acc => (
                                                <div key={acc.id} style={{
                                                    padding: '15px',
                                                    borderRadius: '10px',
                                                    background: 'linear-gradient(135deg, #1a237e, #0d47a1)',
                                                    color: 'white',
                                                    minWidth: '150px',
                                                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                                                }}>
                                                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{acc.type.toUpperCase()}</div>
                                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '10px 0' }}>${acc.balance}</div>
                                                    <div style={{ fontSize: '0.7rem' }}>ID: {acc.id}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ color: '#ccc' }}>Waiting for request...</div>
                        )
                    )}
                </div>
            </div>

            <PmInsight
                title="APIs are Contracts"
                description="Once you publish an API, you promise not to break it. If you change 'user.name' to 'user.fullName', you might break a partner's mobile app."
                tradeOffs={[
                    "Versioning (v1 vs v2) is expensive to maintain but necessary.",
                    "PM Strategy: 'API First' design means agreeing on the contract (JSON) before writing a single line of code."
                ]}
            />
        </div>
    );
};

const styles = {
    container: { padding: '1rem' },
    tabs: { display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' },
    tab: { padding: '10px 20px', borderRadius: '8px', border: '2px solid #ccc', cursor: 'pointer', fontWeight: 'bold', minWidth: '120px' },
    playground: { display: 'flex', gap: '2rem', flexWrap: 'wrap' },
    panel: { flex: 1, minWidth: '300px', border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem' },

    actionBtn: { padding: '12px', backgroundColor: '#1a237e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '1rem' },

    inputGroup: { marginBottom: '1rem' },
    input: { padding: '8px', fontSize: '1rem', width: '100%', marginTop: '5px' },

    codeBlock: { fontFamily: 'monospace', backgroundColor: '#eee', padding: '10px', borderRadius: '4px', borderLeft: '4px solid #333', margin: '1rem 0' },
    jsonBlock: { fontFamily: 'monospace', fontSize: '0.9rem', overflowX: 'auto' },

    statusBadge: { padding: '10px', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }
};

export default ApiLesson;
