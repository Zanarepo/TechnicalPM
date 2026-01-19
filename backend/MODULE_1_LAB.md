# 📒 Module 1: The Ledger (Database Design)

## The Objective
We are building the **Foundation** of our bank. Before code, we need a place to store data.
In a Bank, data integrity is everything. If a server crashes, money cannot disappear.

## The Theory: Relational Databases
We will use a structure similar to **SQL** (Structured Query Language), where data lives in **Tables** (like Excel sheets) linked by **Keys**.

### Key Concepts
1.  **Primary Key (PK):** A unique ID for every row (e.g., `user_id: 101`).
2.  **Foreign Key (FK):** A link to another table (e.g., `account_owner: 101` links an Account to User 101).
3.  **One-to-Many:** One User can have Many Accounts (Checkings, Savings).

## The Assignment
Design the JSON structure for `backend/db/ledger.json` to store:
1.  **Users:** (id, name, password)
2.  **Accounts:** (id, type, balance, user_id)

### Proposed Schema (Mental Model)

**Table: Users**
| id | name | password (hashed) | roles |
| :--- | :--- | :--- | :--- |
| 1 | "Alice" | "secret" | ["customer"] |
| 2 | "Bob" | "secret" | ["customer"] |

**Table: Accounts**
| id | type | balance | user_id (Relationship) |
| :--- | :--- | :--- | :--- |
| 501 | "checking" | 1000 | 1 (Alice) |
| 502 | "savings" | 5000 | 1 (Alice) |
| 503 | "checking" | 200 | 2 (Bob) |

## 🛠️ Action Step
I will generate this initial `ledger.json` file to serve as our database.
Then, we will write our first API to query this data.
