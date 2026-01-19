
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); // Built-in Node.js Security Module

const app = express();
const PORT = 3001; // Frontend is usually 5173 or 3000

// MIDDLEWARE
app.use(cors()); // Allow Frontend to talk to Backend
app.use(express.json()); // Parse incoming JSON bodies

// DATABASE (Mock Ledger)
const DB_PATH = path.join(__dirname, 'db', 'ledger.json');

// SECURITY HELPERS (Educational Simulation)
const SECURITY_LOGS = true;

const hashPassword = (password, salt) => {
    // In real life: Use bcrypt or argon2 (slow hashing). 
    // Here: PBKDF2 with SHA256 (Good standard)
    // We use a simple synchronous version for this demo clarity
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash;
};

const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex');
};

// Helper to read DB
const readDb = () => {
    if (!fs.existsSync(DB_PATH)) return { users: [], accounts: [] };
    const data = fs.readFileSync(DB_PATH);
    return JSON.parse(data);
};

// API ROUTES (The Exchange)
app.get('/', (req, res) => {
    res.send({ message: "Welcome to the Bank of TPM API 🏦" });
});

/**
 * MODULE 1: READ THE LEDGER
 * Fetch all users (Admin only in real life, but open for learning)
 */
app.get('/api/users', (req, res) => {
    const db = readDb();
    res.json(db.users);
});

/**
 * MODULE 1: READ ACCOUNTS
 * Fetch all accounts
 */
app.get('/api/accounts', (req, res) => {
    const db = readDb();
    res.json(db.accounts);
});

/**
 * MODULE 2: THE GUARD (Authentication)
 * Receives { username, password }
 * Returns User Profile + Educational Server Logs
 */
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const db = readDb();
    const logs = [];

    // 1. Log Receipt
    logs.push(`[Server] 📨 Received POST request from Client IP: ${req.ip}`);
    logs.push(`[Server] Processing credentials for user: "${username}"`);

    // 2. Database Lookup
    logs.push(`[Database] 🔍 SELECT * FROM users WHERE name = '${username}'`);
    const user = db.users.find(u => u.name === username);

    if (!user) {
        logs.push(`[Database] ❌ Result: NULL (User not found)`);
        logs.push(`[Server] 🛑 Returning 401 Unauthorized`);
        return res.status(401).json({ error: "User not found", logs });
    }
    logs.push(`[Database] ✅ Result: Found User ID ${user.id}`);

    // 3. Password Verification (Simulation)
    logs.push(`[Auth] 🔐 Verifying Credentials...`);

    let isValid = false;

    // Check if user has modern security (Hash + Salt)
    if (user.hash && user.salt) {
        logs.push(`[Security] 🧂 Found Salt: ${user.salt.substring(0, 10)}...`);
        const attemptHash = hashPassword(password, user.salt);
        logs.push(`[Security] 🧮 Re-calculating Hash for input...`);

        if (attemptHash === user.hash) {
            isValid = true;
            logs.push(`[Auth] ✅ MATCH! The calculated hash matches the stored hash.`);
        } else {
            logs.push(`[Auth] ❌ Mismatch! The hashes do not look alike.`);
        }
    }
    // Legacy Code (Plain Text) - For backward compatibility with existing JSON data
    else if (user.password) {
        logs.push(`[Security] ⚠️ WARNING: User has legacy plain-text password. Upgrade recommended.`);
        if (user.password === password) isValid = true;
    }

    if (!isValid) {
        logs.push(`[Auth] ❌ Access Denied.`);
        logs.push(`[Server] 🛑 Returning 401 Unauthorized`);
        return res.status(401).json({ error: "Invalid credentials", logs });
    }

    logs.push(`[Auth] ✅ Identity Confirmed.`);

    // 4. Create Session (Token)
    logs.push(`[Server] 🎟️ Generating Session Token (JWT)...`);

    // JWT Construction (Educational Manual Creation)
    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString('base64');
    const payload = Buffer.from(JSON.stringify({
        sub: user.id,
        name: user.name,
        role: user.roles.includes('admin') ? 'admin' : 'customer',
        iat: Date.now()
    })).toString('base64');
    const signature = crypto.createHmac('sha256', 'super_secret_key').update(header + "." + payload).digest('base64');

    const token = `${header}.${payload}.${signature}`;
    logs.push(`[Server] 📦 Packaging: Header (Alg) . Payload (Data) . Signature (Seal)`);

    // Return user info (excluding secrets)
    const { password: _, hash: __, salt: ___, ...userSafe } = user;

    // Simulate network delay for dramatic effect
    setTimeout(() => {
        res.json({
            success: true,
            user: userSafe,
            token: token,
            logs
        });
    }, 1500);
});

// Helper to write to DB (Simulating a Commit)
const writeDb = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

/**
 * MODULE 3: THE EXCHANGE (Business Logic)
 * Receives { senderId, receiverId, amount }
 * Performs an Atomic Transaction
 */
app.post('/api/transfer', (req, res) => {
    const { senderId, receiverId, amount } = req.body;
    const db = readDb();
    const logs = [];

    logs.push(`[Transaction] 🔄 Request: Transfer $${amount} from Account #${senderId} to #${receiverId}`);

    // 1. Validate Accounts
    const sender = db.accounts.find(a => a.id === parseInt(senderId));
    const receiver = db.accounts.find(a => a.id === parseInt(receiverId));

    if (!sender || !receiver) {
        logs.push(`[Validation] ❌ Error: One or both accounts not found.`);
        return res.status(400).json({ success: false, error: "Invalid Account IDs", logs });
    }

    logs.push(`[Validation] ✅ Details verified: Sender Balance = $${sender.balance}`);

    // 2. Check Balance
    if (sender.balance < amount) {
        logs.push(`[Validation] ❌ Insufficient Funds! Required: $${amount}, Available: $${sender.balance}`);
        return res.status(400).json({ success: false, error: "Insufficient Funds", logs });
    }

    // 3. Perform Atomic Update
    logs.push(`[Ledger] 📉 Deducting $${amount} from Sender #${senderId}...`);
    sender.balance -= parseInt(amount);

    logs.push(`[Ledger] 📈 Adding $${amount} to Receiver #${receiverId}...`);
    receiver.balance += parseInt(amount);

    // 4. Commit to Disk (DELAYED TO PREVENT NODEMON RACE CONDITION)
    setTimeout(() => {
        writeDb(db); // Write Sync
        logs.push(`[Database] 💾 COMMIT: Transaction saved to disk.`);
        res.json({ success: true, newBalance: sender.balance, logs });
    }, 1500);
});

// MODULE 5 EXTRA: Deposit & Withdraw
// Deposit (Add Money)
app.post('/api/deposit', (req, res) => {
    const { accountId, amount } = req.body;
    const db = readDb();
    const account = db.accounts.find(a => a.id === parseInt(accountId));

    if (!account) return res.status(404).json({ error: "Account not found" });

    account.balance += parseInt(amount);
    writeDb(db);

    res.json({
        success: true,
        message: `Deposited $${amount}`,
        newBalance: account.balance
    });
});

// Withdraw (Remove Money)
app.post('/api/withdraw', (req, res) => {
    const { accountId, amount } = req.body;
    const db = readDb();
    const account = db.accounts.find(a => a.id === parseInt(accountId));

    if (!account) return res.status(404).json({ error: "Account not found" });

    if (account.balance < amount) {
        return res.status(400).json({
            error: "Insufficient Funds",
            currentBalance: account.balance,
            attempted: amount
        });
    }

    account.balance -= parseInt(amount);
    writeDb(db);

    res.json({
        success: true,
        message: `Withdrew $${amount}`,
        newBalance: account.balance
    });
});

// MODULE 5 EXTRA: CREATE, UPDATE, DELETE
// Create User (POST)
app.post('/api/users', (req, res) => {
    const { name, password = "password123" } = req.body;
    const db = readDb();
    const logs = [];
    logs.push(`[Account Creation] 👤 New Applicant: ${name}`);

    // 1. Password Security
    logs.push(`[Security] 🛡️ Starting Account Security Protocols...`);
    const salt = generateSalt();
    logs.push(`[Security] 🧂 Generated Random Salt: ${salt.substring(0, 10)}...`);

    const hashedPassword = hashPassword(password, salt);
    logs.push(`[Security] 🔐 Hashing Password...`);
    logs.push(`[Security] 🕵️ Input: "${password}"`);
    logs.push(`[Security] 🔒 Stored: "${hashedPassword.substring(0, 20)}..." (We NEVER store the real password)`);

    const newId = (db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) : 0) + 1;
    const newUser = {
        id: newId,
        name,
        // STORE THE HASH, NOT THE PASSWORD
        hash: hashedPassword,
        salt: salt,
        roles: ["customer"]
    };

    db.users.push(newUser);

    // Also give them a checking account
    const newAccountId = (db.accounts.length > 0 ? Math.max(...db.accounts.map(a => a.id)) : 500) + 1;
    db.accounts.push({
        id: newAccountId,
        type: "checking",
        balance: 100,
        user_id: newId
    });

    writeDb(db);
    logs.push(`[Database] 💾 User saved to Ledger securely.`);

    // Simulate delay for effect
    setTimeout(() => {
        res.json({
            success: true,
            message: `Created User #${newId} (${name})`,
            user: { id: newId, name, roles: newUser.roles },
            logs: logs
        });
    }, 1500);
});

// Update User Name (PUT)
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const db = readDb();

    const user = db.users.find(u => u.id === parseInt(id));

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const oldName = user.name;
    user.name = name; // Update name
    writeDb(db); // Commit

    res.json({
        success: true,
        message: `Updated User #${id}`,
        change: `Name changed from '${oldName}' to '${name}'`
    });
});

// Delete User (DELETE)
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const db = readDb();

    const userIndex = db.users.findIndex(u => u.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    const deletedUser = db.users[userIndex];
    db.users.splice(userIndex, 1); // Remove from array
    writeDb(db); // Commit

    res.json({
        success: true,
        message: `Deleted User #${id} (${deletedUser.name})`
    });
});

// MODULE 6: AUTH & SECURITY (RBAC)

// 1. Protected Route: "My Accounts" (Any Logged In User)
// In real life, we would decode the JWT Token. Here, we send user ID in headers.
app.get('/api/my-accounts', (req, res) => {
    const userId = req.headers['x-user-id']; // Simulating a Token

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized: Who are you?" });
    }

    const db = readDb();
    const myAccounts = db.accounts.filter(a => a.user_id === parseInt(userId));

    res.json({ success: true, accounts: myAccounts });
});

// 2. Admin Route: "The Master Ledger" (Admins Only)
app.get('/api/admin/ledger', (req, res) => {
    const userId = req.headers['x-user-id'];
    const db = readDb();

    // Check if user exists and is Admin
    const user = db.users.find(u => u.id === parseInt(userId));

    if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (!user.roles.includes('admin')) {
        return res.status(403).json({ error: "Forbidden: Admins Only! 🛑" });
    }

    // Success: Return EVERYTHING
    res.json({ success: true, ledger: db.accounts, totalMoney: db.accounts.reduce((sum, a) => sum + a.balance, 0) });
});

// MODULE 5 EXTRA: Fetch Accounts by User ID
app.get('/api/users/:id/accounts', (req, res) => {
    const { id } = req.params;
    const db = readDb();
    const user = db.users.find(u => u.id === parseInt(id));
    const accounts = db.accounts.filter(a => a.user_id === parseInt(id));

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
        success: true,
        userId: id,
        owner: user.name, // Added for clarity
        accounts
    });
});

// START SERVER
// ==========================================
// MODULE 8: MICROSERVICES SIMULATION
// ==========================================

// Simulated Service Delays (ms)
const DELAYS = {
    GATEWAY: 200,
    AUTH: 500,
    LEDGER: 800,
    NOTIFY: 400
};

// Orchestrator Endpoint (API Gateway)
app.post('/api/orchestrated-transfer', async (req, res) => {
    const { senderId, amount, serviceStatus } = req.body;
    // serviceStatus example: { auth: true, ledger: true, notify: true }

    // We will build a log of the journey to send back to the frontend
    let trace = [];
    const addTrace = (service, status, msg) => {
        trace.push({
            service,
            status, // 'pending', 'success', 'error'
            msg,
            timestamp: new Date().toISOString()
        });
    };

    try {
        // 1. GATEWAY RECEIVES REQUEST
        addTrace('GATEWAY', 'success', '📨 Request Received. Routing to Auth Service...');
        await new Promise(r => setTimeout(r, DELAYS.GATEWAY));

        // 2. CALL AUTH SERVICE
        if (!serviceStatus?.auth) {
            throw { service: 'AUTH', msg: '❌ Connection Timeout (Service Down)' };
        }
        addTrace('AUTH', 'pending', '🔍 Verifying Token...');
        await new Promise(r => setTimeout(r, DELAYS.AUTH));
        addTrace('AUTH', 'success', '✅ Identity Verified. Token Valid.');

        // 3. CALL LEDGER SERVICE (With Failover)
        let activeLedger = null;

        if (serviceStatus?.ledger1) {
            activeLedger = 'LEDGER_PRIMARY';
        } else if (serviceStatus?.ledger2) {
            activeLedger = 'LEDGER_REPLICA';
            addTrace('LEDGER_PRIMARY', 'error', '⚠️ Primary Ledger Down. Failing over...');
        } else {
            throw { service: 'LEDGER', msg: '❌ 503 Service Unavailable (All Ledgers Down)' };
        }

        addTrace(activeLedger, 'pending', `💰 Checking balance for User ${senderId}...`);
        await new Promise(r => setTimeout(r, DELAYS.LEDGER));

        // (Simulate Logic)
        const db = readDb(); // Read fresh DB
        const userAccounts = db.accounts.filter(a => a.user_id === parseInt(senderId));
        const totalBal = userAccounts.reduce((sum, acc) => sum + acc.balance, 0);

        if (totalBal < amount) {
            addTrace(activeLedger, 'error', '🚫 Insufficient Funds.');
            return res.json({ success: false, trace, error: 'Insufficient Funds' });
        }

        addTrace(activeLedger, 'success', `✅ Funds Reserved. Transfer Executed ($${amount}).`);

        // 4. CALL NOTIFICATION SERVICE
        addTrace('NOTIFY', 'pending', '📧 Queuing email receipt...');
        if (!serviceStatus?.notify) {
            // Note: Notification failure usually doesn't fail the transaction!
            addTrace('NOTIFY', 'error', '⚠️ Service Unreachable. Email skipped (Non-Critical).');
            // We DO NOT throw here, we continue.
        } else {
            await new Promise(r => setTimeout(r, DELAYS.NOTIFY));
            addTrace('NOTIFY', 'success', '✅ Email Sent.');
        }

        // 5. GATEWAY RESPONSE
        addTrace('GATEWAY', 'success', '📦 Response sent to Client: 200 OK');
        res.json({ success: true, trace });

    } catch (err) {
        addTrace(err.service || 'GATEWAY', 'error', err.msg || 'Unknown Error');
        res.status(500).json({ success: false, trace, error: err.msg });
    }
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`- Users Endpoint: http://localhost:${PORT}/api/users`);
    console.log(`- Accounts Endpoint: http://localhost:${PORT}/api/accounts`);
});
