# Module 12: Sandwich Shop Analysis Challenge

## 🥪 Scenario: The "SandwichScale" Startup

You are the first Product Manager at **SandwichScale**, a disruptive new sandwich delivery app. 
Your CEO claims the app is growing clearly, but she has no data to prove *who* is buying or *why*.

Your mission: **Instrument the app, generate data, and find the "Golden Path" to user retention.**

---

## 🛠️ Part 1: Generating Your Data

We have created a custom data simulation script for you. This script mimics real user behavior on the SandwichScale app.

### Steps:
1.  Open `sandwichShopData.js` in your editor.
2.  Find the line `const MIXPANEL_TOKEN = "INSERT_YOUR_MIXPANEL_TOKEN_HERE";`.
3.  Replace it with your actual **Project Token** from Mixpanel (Project Settings > Overview).
4.  Find the line `const DRY_RUN = true;`. Change it to `false` to actually send data.
5.  Open your terminal in the `frontend` directory and run:
    ```bash
    node sandwichShopData.js
    ```
6.  Wait for the "Sent events to Mixpanel!" confirmation.
7.  Check your Mixpanel "Events" tab. You should see live data flowing in!

---

## 📊 Part 2: The Analysis Gauntlet

Answer the following questions using your Mixpanel boards.

### 1. Acquisition & Activation
*   **Question:** What is the most popular platform (iOS, Android, Web) for "App Open"?
*   **Metric to Build:** Create a **Segmentation** report. Event: `App Open`. Breakdown: `platform`.

### 2. The Funnel of "SandwichScale"
*   **Question:** Where are we losing the most users?
*   **Metric to Build:** Create a **Funnels** report.
    *   Step 1: `App Open`
    *   Step 2: `View Menu`
    *   Step 3: `Select Item`
    *   Step 4: `Add to Cart`
    *   Step 5: `Purchase Complete`
*   **Analysis:** Calculate the conversion rate from `View Menu` to `Purchase`. Is it above 10%?

### 3. Retention (The "Leaky Bucket")
*   **Question:** Do users come back after their first purchase?
*   **Metric to Build:** Create a **Retention** report.
    *   Start Event: `Purchase Complete`
    *   Return Event: `App Open`
*   **Analysis:** Look at the "Day 1" and "Day 7" retention numbers.

---

## 🕵️ Part 3: The "Golden Path" Challenge

There is a hidden insight in this dataset. Certain users convert at a **much higher rate** (80% vs 40%).

**Hint:** It involves a specific dietary preference matching a specific sandwich category.

### Your Task:
1.  Create a **Funnel** from `View Menu` -> `Purchase Complete`.
2.  Break it down by `User Properties` -> `favorite_category`.
3.  Break it down by `Event Properties` -> `category` (on the Purchase event or Select Item).
4.  **Find the combination that has the highest conversion rate.**

<details>
<summary>🚨 Click to Reveal the Golden Path</summary>

**The Hidden Insight:**
Users with `favorite_category = "Vegetarian"` who buy `"Vegetarian"` sandwiches are our super-users!
They convert at almost **2x** the rate of meat-eaters. 

**PM Recommendation:** We should personalize the home screen to show Vegetarian options first for users who have indicated this preference!
</details>

---

## 🚀 Bonus: Monetization
*   **Question:** Which payment method brings in the most *Revenue* (not just volume)?
*   **Metric to Build:** Create a **Insights** (Bar Chart) report.
    *   Metric: `Purchase Complete` -> `Total` (Sum) of `total_amount`.
    *   Breakdown: `payment_method`.
