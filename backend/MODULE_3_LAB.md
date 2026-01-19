# 💸 Module 3: The Exchange (API & Business Logic)

## The Objective
We have Users (Module 1) and Security (Module 2). Now we need a **Product**: Moving money.
This introduces **Business Logic**: Rules that protect the integrity of the data.

## The Theory
1.  **Atomic Transactions:** In a transfer, two things happen:
    - Deduct from Sender.
    - Add to Receiver.
    - **CRITICAL:** If the second part fails (e.g., server crash), the first part MUST be undone (Rollback).
2.  **Race Conditions:** What if I send $100 to Bob AND $100 to Charlie at the exact same millisecond, but I only have $100? The database must handle locking.

## The Assignment
### Part 1: Test the Transfer
1.  Go to the Frontend -> Module 3.
2.  Send $100 from Alice (#501) to Bob (#503).
3.  Watch the logs. See how the server verifies availability BEFORE deducting.

### Part 2: Code Challenge (Logic)
In `backend/server.js`, improve the `/api/transfer` endpoint.
**Challenge:** Add a rule that forbids transfers larger than $10,000 (Money Laundering Check).
1.  If `amount > 10000`, return `400 Bad Request` with error "Anti-Fraud Limit Exceeded".
2.  Write a log entry `[Security] 🚨 Large transaction blocked!`.
