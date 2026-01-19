# 👮 Module 2: The Guard (Authentication & Roles)

## The Objective
We have Users in the database. Now we need to **Identify** them (AuthN) and **Control** them (AuthZ).

## The Theory
1.  **Authentication (AuthN):** "Who are you?" (Username + Password).
2.  **Authorization (AuthZ):** "What can you do?" (Roles: Admin vs Customer).
3.  **Hiding the Key:** Passwords should NEVER be stored as plain text. We use **Hashing** (e.g., `bcrypt`).

## The Assignment
### Part 1: Test the Glass Box
1.  Go to the Frontend -> Module 2.
2.  Login as `Alice Admin` (password: `hashed_secret_123`).
3.  Watch the "Server Terminal" on the right. Notice the steps:
    *   Receive Request
    *   DB Lookup
    *   Password Comparison
    *   Token Generation

### Part 2: Code Challenge (Middleware)
In `backend/server.js`, we have a list of users.
**Challenge:** Create a new API endpoint `/api/vault` that:
1.  Checks if the user has the role `"admin"`.
2.  Returns `{ secret: "The Gold is Here" }` only if they are an admin.
3.  Returns `403 Forbidden` if they are just a customer.

*Hint:*
```javascript
app.post('/api/vault', (req, res) => {
  const { username } = req.body;
  const user = db.users.find(u => u.name === username);
  if (user && user.roles.includes('admin')) {
      // Allow
  } else {
      // Deny
  }
});
```
