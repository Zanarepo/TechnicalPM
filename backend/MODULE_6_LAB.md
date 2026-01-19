# 👮 Module 6: Auth & Security (RBAC)

## The Objective
We have Users (AuthN - Authentication). Now we need **Roles** (AuthZ - Authorization).
Not all users are equal. Alice is an Admin. Bob is a Customer.

## The Theory
1.  **Authentication:** Checking your ID (Login).
2.  **Authorization:** Checking if your ID allows you to enter the VIP room.
3.  **Forbidden (403):** The server knows who you are, but refuses to serve you.
4.  **Unauthorized (401):** The server doesn't know who you are.

## The Assignment
### Part 1: Test Principles of Least Privilege
1.  Go to **Module 6**.
2.  Login as **Bob Builder** (User).
    - Click "View My Statement". Success! (You see your money).
    - Click "Access Admin Vault". **FAIL!** (Server returns 403 Forbidden).
3.  Logout and login as **Alice Admin**.
    - Click "Access Admin Vault". **Success!** (You see the total bank reserves).

### Part 2: Code Challenge (Middleware)
In `server.js`, user roles are hardcoded.
**Challenge:** Modify `ledger.json` to give Bob the "admin" role, and see if he can suddenly access the Vault!
