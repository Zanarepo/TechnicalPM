import React, { useState } from 'react';
import { uberData } from '../../data/uberData';
import { boltData } from '../../data/boltData';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import MixpanelRecipes from '../MixpanelRecipes';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const RideHailingDashboard = () => {
    const [activeTab, setActiveTab] = useState('basic');
    const [activeDataset, setActiveDataset] = useState('uber'); // 'uber' or 'bolt'
    const [showBuilderWith, setShowBuilderWith] = useState(null); // 'basic', 'funnel', etc to show guide

    const data = activeDataset === 'uber' ? uberData : boltData;
    const brandColor = activeDataset === 'uber' ? 'black' : '#34d186'; // Bolt Green

    // HELPER: Toggle Builder Guide
    const toggleGuide = (section) => {
        setShowBuilderWith(showBuilderWith === section ? null : section);
    };

    // ----------------------
    // ANALYTICS LOGIC
    // ----------------------

    // BASIC: Revenue & Rides
    const getBasicStats = () => {
        const totalRides = data.filter(r => r.status === 'completed').length;
        const totalRevenue = data.reduce((acc, curr) => acc + (curr.status === 'completed' ? curr.price : 0), 0);
        const avgRating = (data.reduce((acc, curr) => acc + (curr.rating || 0), 0) / totalRides).toFixed(1);

        return { totalRides, totalRevenue, avgRating };
    };

    // INTERMEDIATE: Funnel (Completed vs Cancelled)
    const getFunnelData = () => {
        const completed = data.filter(r => r.status === 'completed').length;
        const cancelled = data.filter(r => r.status.includes('cancelled')).length;

        return {
            labels: ['Ride Completed', 'Ride Cancelled'],
            datasets: [{
                data: [completed, cancelled],
                backgroundColor: [brandColor, '#ff6384']
            }]
        };
    };

    // ADVANCED: Surge Sensitivity
    const getSurgeData = () => {
        // Group by Surge Multiplier Buckets: 1.0, 1.1-1.5, 1.5+
        const buckets = { 'No Surge (1.0x)': 0, 'Low Surge (1.1-1.5x)': 0, 'High Surge (>1.5x)': 0 };

        data.forEach(r => {
            if (r.surge_multiplier === 1.0) buckets['No Surge (1.0x)']++;
            else if (r.surge_multiplier <= 1.5) buckets['Low Surge (1.1-1.5x)']++;
            else buckets['High Surge (>1.5x)']++;
        });

        return {
            labels: Object.keys(buckets),
            datasets: [{
                label: 'Ride Volume',
                data: Object.values(buckets),
                backgroundColor: brandColor,
                borderColor: brandColor,
                tension: 0.1
            }]
        };
    };

    // NEW: Gender Data for Advanced Tab
    const getGenderData = () => {
        const buckets = { 'Male': 0, 'Female': 0, 'Non-binary': 0 };
        data.forEach(r => {
            if (r.gender) buckets[r.gender] = (buckets[r.gender] || 0) + r.price; // Sum of Revenue
        });

        return {
            labels: Object.keys(buckets),
            datasets: [{
                label: 'Revenue by Gender ($)',
                data: Object.values(buckets),
                backgroundColor: ['#0984e3', '#e84393', '#fdcb6e'],
            }]
        };
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>

            {/* HEADER & DATASET TOGGLE */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h2>🚖 Ride Hailing Analytics</h2>
                    <p>Analyzing {data.length} rides from Kaggle Dataset</p>
                </div>
                <div>
                    <button
                        onClick={() => setActiveDataset('uber')}
                        style={{ ...toggleBtn, backgroundColor: activeDataset === 'uber' ? 'black' : '#ddd', color: activeDataset === 'uber' ? 'white' : 'black' }}
                    >Uber</button>
                    <button
                        onClick={() => setActiveDataset('bolt')}
                        style={{ ...toggleBtn, backgroundColor: activeDataset === 'bolt' ? '#34d186' : '#ddd', color: activeDataset === 'bolt' ? 'white' : 'black' }}
                    >Bolt</button>
                </div>
            </div>

            {/* LEVEL TABS */}
            <div style={{ borderBottom: '2px solid #eee', marginBottom: '20px' }}>
                {['basic', 'intermediate', 'advanced'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '10px 20px',
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === tab ? `3px solid ${brandColor}` : '3px solid transparent',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                            fontSize: '1rem',
                            color: activeTab === tab ? brandColor : '#555',
                            transition: 'all 0.3s'
                        }}
                    >
                        {tab} Analysis
                    </button>
                ))}
            </div>

            {/* CONTENT AREA */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>

                {/* LEFT: CHARTS */}
                <div>
                    {activeTab === 'basic' && (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
                                <StatCard label="Total Rides" value={getBasicStats().totalRides} />
                                <StatCard label="Total Revenue" value={`$${getBasicStats().totalRevenue.toFixed(2)}`} />
                                <StatCard label="Avg Rating" value={`⭐ ${getBasicStats().avgRating}`} />
                            </div>
                            <ChartCard title="Revenue Distribution">
                                <p style={{ fontStyle: 'italic', color: '#666' }}>A basic breakdown would normally go here. Check 'Intermediate' for Funnels.</p>
                            </ChartCard>
                        </div>
                    )}

                    {activeTab === 'intermediate' && (
                        <ChartCard title="Conversion Funnel: Completed vs Cancelled">
                            <div style={{ height: '300px', width: '300px', margin: '0 auto' }}>
                                <Doughnut data={getFunnelData()} />
                            </div>
                            <p style={{ marginTop: '15px', textAlign: 'center' }}>
                                <strong>Insight:</strong> High cancellations on Bolt (if any) might indicate "Ghost Drivers".
                            </p>
                        </ChartCard>
                    )}

                    {activeTab === 'advanced' && (
                        <div>
                            <ChartCard title="Surge Pricing Sensitivity (Elasticity)">
                                <div style={{ height: '300px' }}>
                                    <Line options={{ maintainAspectRatio: false }} data={getSurgeData()} />
                                </div>
                                <p style={{ marginTop: '15px' }}>
                                    <strong>Insight:</strong> Does volume drop when Surge &gt; 1.5x? If yes, users are Price Sensitive (Elastic). If no, they are Inelastic (Need a ride at any cost).
                                </p>
                            </ChartCard>

                            <ChartCard title="Revenue Share by Gender">
                                <div style={{ height: '300px', width: '300px', margin: '0 auto' }}>
                                    <Doughnut data={getGenderData()} />
                                </div>
                            </ChartCard>
                        </div>
                    )}
                </div>

                {/* RIGHT: BUILDER'S GUIDE (MIXPANEL INSTRUCTIONS) */}
                <div style={{ backgroundColor: '#2d3436', color: 'white', padding: '20px', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🛠️</span>
                        <h3 style={{ margin: 0 }}>Builder's Guide</h3>
                    </div>

                    <p style={{ fontSize: '0.9rem', color: '#b2bec3' }}>How to build this in Mixpanel:</p>

                    {activeTab === 'basic' && (
                        <div>
                            <h4 style={{ color: '#00b894' }}>Building KPIs</h4>
                            <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                                <li>Go to <strong>Insights</strong> Report.</li>
                                <li>Under Metrics, select <strong>Unique Count</strong> of Events.</li>
                                <li>Select Event: <code>Ride Completed</code>.</li>
                                <li>For Revenue: Change "Unique Count" to <strong>Sum</strong>.</li>
                                <li>Select Property: <code>price</code>.</li>
                                <li>Visualization: Select <strong>Metric</strong> (Big Number).</li>
                            </ol>
                        </div>
                    )}

                    {activeTab === 'intermediate' && (
                        <div>
                            <h4 style={{ color: '#00b894' }}>Building Funnels</h4>
                            <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                                <li>Go to <strong>Funnels</strong> Report.</li>
                                <li>Step 1: <code>App Open</code> (if tracked).</li>
                                <li>Step 2: <code>Ride Requested</code>.</li>
                                <li>Step 3: <code>Ride Completed</code>.</li>
                                <li><strong>Breakdown:</strong> By <code>city</code> or <code>product</code> (UberX vs Black).</li>
                                <li>Look for the steepest drop-off percentage.</li>
                            </ol>
                        </div>
                    )}

                    {activeTab === 'advanced' && (
                        <div>
                            <h4 style={{ color: '#00b894' }}>Advanced Segmentation</h4>
                            <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                                <li>Go to <strong>Insights</strong>.</li>
                                <li>Event: <code>Ride Completed</code>.</li>
                                <li><strong>Breakdown</strong> by: <code>surge_multiplier</code>.</li>
                                <li>Click "Edit Buckets" to group them (1.0, 1.1-1.5, etc).</li>
                                <li><strong>Filter:</strong> Where <code>product</code> equals "Uber Black" to see if rich users care about surge.</li>
                            </ol>
                        </div>
                    )}

                    <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#636e72', borderRadius: '8px', fontSize: '0.8rem' }}>
                        <strong>Token used:</strong><br />
                        <code style={{ wordBreak: 'break-all', color: '#81ecec' }}>ca0f815a715168cb4f637b2a02f59777</code>
                    </div>
                </div>

            </div>

            {/* NEW PLAYBOOK SECTION */}
            <MixpanelRecipes />
        </div>
    );
};

// SUB-COMPONENTS & STYLES
const StatCard = ({ label, value }) => (
    <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>{label}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</div>
    </div>
);

const ChartCard = ({ title, children }) => (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 15px 0' }}>{title}</h4>
        {children}
    </div>
);

const toggleBtn = {
    padding: '8px 16px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    marginLeft: '10px',
    fontWeight: 'bold'
};

export default RideHailingDashboard;
