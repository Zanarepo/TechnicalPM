import React, { useState, useEffect } from 'react';
import { bankingData } from '../../data/bankingData';
import { Bar, Pie, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, ArcElement, Title, Tooltip, Legend);

const BankingDashboard = () => {
    const [showSolution, setShowSolution] = useState(false);

    // ----------------------------
    // ANALYSIS LOGIC
    // ----------------------------

    // 1. Credit Usage (Balance vs Limit)
    const getCreditUsageData = () => {
        // top 10 users by balance for readability
        const sortedUsers = [...bankingData].sort((a, b) => b.balance - a.balance).slice(0, 10);

        return {
            labels: sortedUsers.map(u => u.custId),
            datasets: [
                {
                    label: 'Current Balance',
                    data: sortedUsers.map(u => u.balance),
                    backgroundColor: '#FF6384',
                },
                {
                    label: 'Credit Limit',
                    data: sortedUsers.map(u => u.creditLimit),
                    backgroundColor: '#36A2EB',
                }
            ]
        };
    };

    // 2. Purchase Behavior (One-off vs Installments)
    const getPurchaseBehaviorData = () => {
        let oneOffHeavy = 0;
        let installmentHeavy = 0;
        let mixed = 0;
        let nonSpenders = 0;

        bankingData.forEach(user => {
            if (user.purchases === 0) {
                nonSpenders++;
            } else if (user.oneoffPurchases > user.installmentsPurchases && user.installmentsPurchases === 0) {
                oneOffHeavy++;
            } else if (user.installmentsPurchases > user.oneoffPurchases && user.oneoffPurchases === 0) {
                installmentHeavy++;
            } else {
                mixed++;
            }
        });

        return {
            labels: ['One-Off Purcahses Only', 'Installments Only', 'Mixed Spenders', 'Non-Spenders'],
            datasets: [{
                data: [oneOffHeavy, installmentHeavy, mixed, nonSpenders],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#C9CBCF']
            }]
        };
    };

    // 3. Payments vs Minimum Payments (Scatter)
    const getPaymentHabitsData = () => {
        // Filter out extreme outliers for easier visualization if needed, but keeping raw for now
        // Limiting to first 50 for performance if dataset grows
        return {
            datasets: [{
                label: 'User Payment Behavior',
                data: bankingData.map(user => ({
                    x: user.minimumPayments,
                    y: user.payments
                })).filter(p => p.x != null && p.y != null && p.x < 5000 && p.y < 10000), // Filter extreme outliers for chart readability
                backgroundColor: '#4BC0C0',
            }]
        };
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f2f5', borderRadius: '12px' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2>🏦 Banking Data Analytics Dashboard</h2>
                    <p style={{ color: '#666' }}>Analyzing {bankingData.length} User Records imported from Mixpanel</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>

                {/* 1. CREDIT UTILIZATION */}
                <div style={cardStyle}>
                    <h3>💳 High Rollers: Balance vs Limit</h3>
                    <p style={insightStyle}><strong>Q:</strong> Who are our most "at risk" customers (near limit)?</p>
                    <div style={{ height: '300px' }}>
                        <Bar
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    title: { display: true, text: 'Top 10 Balances' }
                                }
                            }}
                            data={getCreditUsageData()}
                        />
                    </div>
                    <div style={explanationStyle}>
                        <strong>Insight:</strong> Customers with bars close in height (Red vs Blue) are near their credit limit. High utilization often correlates with high risk but also high interest revenue.
                    </div>
                </div>

                {/* 2. SPENDING HABITS */}
                <div style={cardStyle}>
                    <h3>🛍️ Spending Segments</h3>
                    <p style={insightStyle}><strong>Q:</strong> How do people use their cards?</p>
                    <div style={{ height: '300px' }}>
                        <Pie
                            options={{ maintainAspectRatio: false }}
                            data={getPurchaseBehaviorData()}
                        />
                    </div>
                    <div style={explanationStyle}>
                        <strong>Insight:</strong>
                        <ul>
                            <li><strong>Installments:</strong> Good for long-term retention.</li>
                            <li><strong>One-off:</strong> Everyday spenders.</li>
                            <li><strong>Non-spenders:</strong> Churn risk! Needs activation.</li>
                        </ul>
                    </div>
                </div>

                {/* 3. PAYMENT BEHAVIOR */}
                <div style={{ ...cardStyle, gridColumn: '1 / -1' }}>
                    <h3>💸 Payment Hygiene: Payments vs Min Due</h3>
                    <p style={insightStyle}><strong>Q:</strong> Do users pay just the minimum?</p>
                    <div style={{ height: '300px' }}>
                        <Scatter
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    x: { title: { display: true, text: 'Minimum Payments Due ($)' } },
                                    y: { title: { display: true, text: 'Actual Payments Made ($)' } }
                                },
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: (ctx) => `Min: $${ctx.raw.x.toFixed(0)}, Paid: $${ctx.raw.y.toFixed(0)}`
                                        }
                                    }
                                }
                            }}
                            data={getPaymentHabitsData()}
                        />
                    </div>
                    <div style={explanationStyle}>
                        <strong>Interpretation:</strong>
                        <ul>
                            <li><strong>Above Diagonal line (y &gt; x):</strong> Paying more than minimum (Healthy).</li>
                            <li><strong>On Diagonal (y ≈ x):</strong> Revolvers paying just the minimum (Profitable but risky).</li>
                            <li><strong>Below Diagonal (y &lt; x):</strong> Delinquent (High Risk).</li>
                        </ul>
                    </div>
                </div>

            </div>

            {/* TOGGLEABLE SOLUTION SECTION */}
            <div style={{ marginTop: '40px', borderTop: '2px dashed #ccc', paddingTop: '20px' }}>
                <button
                    onClick={() => setShowSolution(!showSolution)}
                    style={{
                        padding: '12px 24px',
                        background: showSolution ? '#d32f2f' : '#2e7d32',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        display: 'block',
                        margin: '0 auto'
                    }}
                >
                    {showSolution ? 'Hide Solutions' : '👁️ Reveal Teacher Solutions'}
                </button>

                {showSolution && (
                    <div style={{ marginTop: '20px', animation: 'fadeIn 0.5s' }}>
                        <div style={{ backgroundColor: '#e8f5e9', padding: '20px', borderRadius: '8px', border: '1px solid #2e7d32' }}>
                            <h3 style={{ color: '#1b5e20', marginTop: 0 }}>✅ Expert Analysis & Solutions</h3>

                            <div style={{ marginBottom: '20px' }}>
                                <h4>1. The "Revolver" Strategy</h4>
                                <p><strong>Observation:</strong> The Scatter plot shows many users hovering right on the diagonal line (Paying exactly the specific minimum).</p>
                                <p><strong>Product Action:</strong> These users generate interest. We should <strong>increase their credit limit</strong> slightly to encourage more spending, as they have demonstrated responsible (albeit bare minimum) payment behavior.</p>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <h4>2. Activating the "Non-Spenders"</h4>
                                <p><strong>Observation:</strong> The Pie chart shows a significant chunk of "Non-Spenders".</p>
                                <p><strong>Product Action:</strong> Run a "Re-activation Campaign". Send a push notification: <em>"Spend $50 this week and get $10 cashback"</em>. Use the <strong>Growth Hacks (Module 4)</strong> concept here.</p>
                            </div>

                            <div>
                                <h4>3. Mixpanel Implementation</h4>
                                <p>To track this in Mixpanel, we would set up the following Cohorts:</p>
                                <code>
                                    Cohort: "Whales" -&gt; Properties["balance"] &gt; 5000<br />
                                    Cohort: "Risky" -&gt; Properties["payments"] &lt; Properties["minimumPayments"]
                                </code>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const cardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #e0e0e0'
};

const insightStyle = {
    fontStyle: 'italic',
    color: '#666',
    marginBottom: '15px'
};

const explanationStyle = {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    fontSize: '0.9rem',
    color: '#333',
    borderLeft: '4px solid #36A2EB'
};

export default BankingDashboard;
