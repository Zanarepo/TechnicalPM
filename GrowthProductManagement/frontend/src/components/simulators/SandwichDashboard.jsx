import React, { useState, useEffect } from 'react';
import { generateSandwichData } from '../../data/sandwichDataGenerator';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SandwichDashboard = () => {
    const [data, setData] = useState({ users: [], events: [] });
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(30); // Default to last 30 days

    useEffect(() => {
        // Simulate "Click to Load" or Auto Load
        const generated = generateSandwichData(200, selectedDate);
        setData(generated);
        setLoading(false);
    }, [selectedDate]);

    // ----------------------------
    // ANALYSIS LOGIC
    // ----------------------------

    // Q1: Acquisition by Platform
    const getAcquisitionData = () => {
        const platformCounts = { iOS: 0, Android: 0, Web: 0 };
        const appOpens = data.events.filter(e => e.event === 'App Open');

        appOpens.forEach(e => {
            if (platformCounts[e.properties.platform] !== undefined) {
                platformCounts[e.properties.platform]++;
            }
        });

        return {
            labels: Object.keys(platformCounts),
            datasets: [{
                label: 'App Opens (Acquisition)',
                data: Object.values(platformCounts),
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            }]
        };
    };

    // Q2: Funnel Dropoff
    const getFunnelData = () => {
        // Simple counts of unique users doing each step
        const getUniqueUsers = (eventName) => {
            const users = new Set(data.events.filter(e => e.event === eventName).map(e => e.properties.distinct_id));
            return users.size;
        };

        const funnel = [
            getUniqueUsers('App Open'),
            getUniqueUsers('View Menu'),
            getUniqueUsers('Select Item'),
            getUniqueUsers('Add to Cart'),
            getUniqueUsers('Purchase Complete')
        ];

        return {
            labels: ['App Open', 'View Menu', 'Select Item', 'Add to Cart', 'Purchase'],
            datasets: [{
                label: 'Unique Users',
                data: funnel,
                backgroundColor: '#4BC0C0',
            }]
        };
    };

    // Q3: The Golden Path (Vegetarian Retention)
    const getGoldenPathData = () => {
        // Segment Users
        const vegUsers = data.users.filter(u => u.properties.favorite_category === 'Vegetarian');
        const otherUsers = data.users.filter(u => u.properties.favorite_category !== 'Vegetarian');

        // Check Conversion for each segment
        const checkConversion = (userList) => {
            let converted = 0;
            userList.forEach(u => {
                const hasPurchased = data.events.some(e => e.event === 'Purchase Complete' && e.properties.distinct_id === u.distinct_id);
                if (hasPurchased) converted++;
            });
            return (converted / userList.length) * 100;
        };

        return {
            labels: ['Vegetarian Users', 'Other Users'],
            datasets: [{
                label: 'Conversion Rate (%)',
                data: [checkConversion(vegUsers), checkConversion(otherUsers)],
                backgroundColor: ['#9966FF', '#C9CBCF'],
            }]
        };
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>🥪 SandwichScale Executive Dashboard</h2>
                <div>
                    <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Analyze Last:</label>
                    <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(Number(e.target.value))}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value={7}>7 Days</option>
                        <option value={30}>30 Days</option>
                        <option value={90}>90 Days</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>

                {/* 1. ACQUISITION */}
                <div style={cardStyle}>
                    <h3>1. Acquisition: Where are users coming from?</h3>
                    <p style={insightStyle}><strong>Q:</strong> Traffic source breakdown.</p>
                    <div style={{ height: '250px' }}>
                        <Bar options={{ maintainAspectRatio: false }} data={getAcquisitionData()} />
                    </div>
                    <div style={mixpanelGuideStyle}>
                        <strong>📊 Build in Mixpanel:</strong>
                        <ol style={{ paddingLeft: '20px', margin: '5px 0' }}>
                            <li>Go to <strong>Insights</strong> report.</li>
                            <li>Select Event: <code>App Open</code>.</li>
                            <li>Select "Total Events" or "Unique Users".</li>
                            <li>Click <strong>Breakdown</strong> and select <code>Platform</code>.</li>
                        </ol>
                    </div>
                </div>

                {/* 2. ACTIVATION (FUNNEL) */}
                <div style={cardStyle}>
                    <h3>2. Activation: The Funnel</h3>
                    <p style={insightStyle}><strong>Q:</strong> Where do users drop off?</p>
                    <div style={{ height: '250px' }}>
                        <Bar options={{ maintainAspectRatio: false }} data={getFunnelData()} />
                    </div>
                    <div style={mixpanelGuideStyle}>
                        <strong>📊 Build in Mixpanel:</strong>
                        <ol style={{ paddingLeft: '20px', margin: '5px 0' }}>
                            <li>Go to <strong>Funnels</strong> report.</li>
                            <li>Add Steps: <code>App Open</code> &rarr; <code>View Menu</code> &rarr; <code>Select Item</code> &rarr; <code>Add to Cart</code> &rarr; <code>Purchase Complete</code>.</li>
                            <li>Analyze the conversion rate between steps.</li>
                        </ol>
                    </div>
                </div>

                {/* 3. REVENUE BY COUNTRY */}
                <div style={cardStyle}>
                    <h3>3. 🌍 Revenue by Country</h3>
                    <p style={insightStyle}><strong>Q:</strong> Which country generates the most revenue?</p>
                    <div style={{ height: '250px' }}>
                        <Bar
                            options={{ maintainAspectRatio: false }}
                            data={(() => {
                                const revenueByCountry = {};
                                data.events
                                    .filter(e => e.event === 'Purchase Complete')
                                    .forEach(e => {
                                        const user = data.users.find(u => u.distinct_id === e.properties.distinct_id);
                                        if (user && user.properties.$country) {
                                            const country = user.properties.$country;
                                            revenueByCountry[country] = (revenueByCountry[country] || 0) + e.properties.total_amount;
                                        }
                                    });
                                return {
                                    labels: Object.keys(revenueByCountry),
                                    datasets: [{
                                        label: 'Total Revenue ($)',
                                        data: Object.values(revenueByCountry),
                                        backgroundColor: '#4BC0C0',
                                    }]
                                };
                            })()}
                        />
                    </div>
                    <div style={explanationStyle}>
                        <strong>Analysis:</strong> Aggregate <code>total_amount</code> from 'Purchase Complete' events, grouped by User Property <code>$country</code>.
                    </div>
                    <div style={mixpanelGuideStyle}>
                        <strong>📊 Build in Mixpanel:</strong>
                        <ol style={{ paddingLeft: '20px', margin: '5px 0' }}>
                            <li>Go to <strong>Insights</strong>.</li>
                            <li>Metric: <code>Purchase Complete</code> &rarr; Select "Totals" &rarr; "Sum" of <code>total_amount</code>.</li>
                            <li>Breakdown by: <code>Country</code> (User Property).</li>
                        </ol>
                    </div>
                </div>

                {/* 4. REVENUE BY PLATFORM */}
                <div style={cardStyle}>
                    <h3>4. 📱 Revenue by Platform</h3>
                    <p style={insightStyle}><strong>Q:</strong> Do iOS users spend more than Android?</p>
                    <div style={{ height: '250px' }}>
                        <Bar
                            options={{ maintainAspectRatio: false }}
                            data={(() => {
                                const revenueByPlatform = { iOS: 0, Android: 0, Web: 0 };
                                data.events
                                    .filter(e => e.event === 'Purchase Complete')
                                    .forEach(e => {
                                        const sessionOpen = data.events.find(ev => ev.event === 'App Open' && ev.properties.distinct_id === e.properties.distinct_id);
                                        if (sessionOpen) {
                                            revenueByPlatform[sessionOpen.properties.platform] = (revenueByPlatform[sessionOpen.properties.platform] || 0) + e.properties.total_amount;
                                        }
                                    });
                                return {
                                    labels: Object.keys(revenueByPlatform),
                                    datasets: [{
                                        label: 'Total Revenue ($)',
                                        data: Object.values(revenueByPlatform),
                                        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                                    }]
                                };
                            })()}
                        />
                    </div>
                    <div style={explanationStyle}>
                        <strong>Insight:</strong> iOS users typically have a 20% higher Average Order Value (AOV).
                    </div>
                    <div style={mixpanelGuideStyle}>
                        <strong>📊 Build in Mixpanel:</strong>
                        <ol style={{ paddingLeft: '20px', margin: '5px 0' }}>
                            <li>Go to <strong>Insights</strong>.</li>
                            <li>Metric: <code>Purchase Complete</code> &rarr; "Sum" of <code>total_amount</code>.</li>
                            <li>Breakdown by: <code>Platform</code> (Event Property).</li>
                        </ol>
                    </div>
                </div>

                {/* 5. MENU POPULARITY */}
                <div style={cardStyle}>
                    <h3>5. 🍔 Menu Popularity</h3>
                    <p style={insightStyle}><strong>Q:</strong> Highest vs Least ordered items?</p>
                    <div style={{ height: '300px' }}>
                        <Bar
                            options={{ maintainAspectRatio: false, indexAxis: 'y' }}
                            data={(() => {
                                const itemCounts = {};
                                data.events
                                    .filter(e => e.event === 'Purchase Complete')
                                    .forEach(e => {
                                        const item = e.properties.item_name;
                                        itemCounts[item] = (itemCounts[item] || 0) + 1;
                                    });
                                // Sort
                                const sortedItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]);
                                return {
                                    labels: sortedItems.map(i => i[0]),
                                    datasets: [{
                                        label: 'Times Ordered',
                                        data: sortedItems.map(i => i[1]),
                                        backgroundColor: '#9966FF',
                                    }]
                                };
                            })()}
                        />
                    </div>
                    <div style={explanationStyle}>
                        <strong>Winner:</strong> The "Classic BLT" often wins on Volume.<br />
                        <strong>Loser:</strong> "Veggie Burger" (Low volume, but high margin?).
                    </div>
                    <div style={mixpanelGuideStyle}>
                        <strong>📊 Build in Mixpanel:</strong>
                        <ol style={{ paddingLeft: '20px', margin: '5px 0' }}>
                            <li>Go to <strong>Insights</strong>.</li>
                            <li>Metric: <code>Purchase Complete</code> &rarr; "Total Events".</li>
                            <li>Breakdown by: <code>item_name</code>.</li>
                        </ol>
                    </div>
                </div>

                {/* 6. USER SEGMENTS */}
                <div style={cardStyle}>
                    <h3>6. 👥 User Segments</h3>
                    <p style={insightStyle}><strong>Q:</strong> What is our user base composition?</p>
                    <div style={{ height: '250px' }}>
                        <Bar
                            options={{ maintainAspectRatio: false }}
                            data={(() => {
                                const segments = {};
                                data.users.forEach(u => {
                                    segments[u.properties.favorite_category] = (segments[u.properties.favorite_category] || 0) + 1;
                                });
                                return {
                                    labels: Object.keys(segments),
                                    datasets: [{
                                        label: 'User Count',
                                        data: Object.values(segments),
                                        backgroundColor: ['#FF9F40', '#FFCD56', '#4BC0C0'],
                                    }]
                                };
                            })()}
                        />
                    </div>
                    <div style={explanationStyle}>
                        <strong>Breakdown:</strong> Use this to inform your "Golden Path" strategy (e.g. if 40% are Veggie, optimize for them!).
                    </div>
                    <div style={mixpanelGuideStyle}>
                        <strong>📊 Build in Mixpanel:</strong>
                        <ol style={{ paddingLeft: '20px', margin: '5px 0' }}>
                            <li>Go to <strong>Insights</strong>.</li>
                            <li>Metric: <code>Unique Users</code>.</li>
                            <li>Breakdown by: <code>favorite_category</code> (User Property).</li>
                        </ol>
                    </div>
                </div>

                {/* 7. GOLDEN PATH (Original) */}
                <div style={{ ...cardStyle, gridColumn: '1 / -1', border: '2px solid #9966FF', background: '#f3e5f5' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3>7. 🌟 The Golden Path Discovery</h3>
                        <span style={{ background: '#9966FF', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>Solution</span>
                    </div>
                    <p style={insightStyle}>
                        <strong>Hypothesis:</strong> "Vegetarian users convert better when they find vegetarian food."
                    </p>
                    <div style={{ height: '300px' }}>
                        <Bar
                            options={{
                                maintainAspectRatio: false,
                                indexAxis: 'y', // Horizontal Bar
                            }}
                            data={getGoldenPathData()}
                        />
                    </div>
                    <div style={explanationStyle}>
                        <strong>The Solution:</strong> By segmenting users by <code>favorite_category</code>, we found that Vegetarians convert at ~80% vs 30% for others!
                        <br />
                        <strong>Actionable Insight:</strong> We should verify this segment and personalize the home screen for them.
                    </div>
                    <div style={mixpanelGuideStyle}>
                        <strong>🏆 How to find this in Mixpanel (The "Aha!" Moment):</strong>
                        <ol style={{ paddingLeft: '20px', margin: '5px 0' }}>
                            <li>Go to <strong>Funnels</strong> report.</li>
                            <li>Steps: <code>App Open</code> &rarr; <code>Purchase Complete</code>.</li>
                            <li><strong>Breakdown</strong> by: <code>favorite_category</code>.</li>
                            <li>Observe: The "Vegetarian" bar will be significantly longer (higher conversion %) than others.</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
                *Data generated live in browser using <code>sandwichDataGenerator.js</code>
            </div>
        </div>
    );
};

const cardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '1px solid #eee'
};

const insightStyle = {
    fontStyle: 'italic',
    color: '#555',
    marginBottom: '15px'
};

const explanationStyle = {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#e8eaf6',
    borderRadius: '4px',
    fontSize: '0.9rem',
    color: '#1a237e'
};

const mixpanelGuideStyle = {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#fff3e0',
    borderRadius: '6px',
    fontSize: '0.85rem',
    color: '#e65100',
    border: '1px solid #ffe0b2'
};

export default SandwichDashboard;
