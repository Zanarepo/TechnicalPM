import React, { useState } from 'react';
import { ecommerceData } from '../../data/ecommerceData';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const EcommerceDashboard = () => {

    // -------------------------
    // 1. DATA PROCESSING (SIMULATED MIXPANEL QUERY)
    // -------------------------

    // 1. Cart Abandonment
    const getCartAbandonment = () => {
        const addedToCart = ecommerceData.filter(e => e.event === 'Add to Cart').length;
        const purchased = ecommerceData.filter(e => e.event === 'Purchase').length;
        const abandonmentRate = ((addedToCart - purchased) / addedToCart * 100).toFixed(1);

        // Safety check for division by zero
        if (addedToCart === 0) return { rate: 0, chartData: {} };

        return {
            rate: abandonmentRate,
            data: {
                labels: ['Purchased', 'Abandoned'],
                datasets: [{
                    data: [purchased, addedToCart - purchased],
                    backgroundColor: ['#00b894', '#ff7675']
                }]
            }
        };
    };

    // 2. AOV by Source
    const getAOVBySource = () => {
        const sources = {}; // { 'Instagram': { revenue: 100, count: 2 } }
        ecommerceData.filter(e => e.event === 'Purchase').forEach(e => {
            if (!sources[e.source]) sources[e.source] = { revenue: 0, count: 0 };
            sources[e.source].revenue += e.price;
            sources[e.source].count += 1;
        });

        const labels = Object.keys(sources);
        const aov = labels.map(s => (sources[s].revenue / sources[s].count).toFixed(2));

        return {
            labels,
            datasets: [{
                label: 'Average Order Value ($)',
                data: aov,
                backgroundColor: '#0984e3'
            }]
        };
    };

    // 3. Conversion by Device
    const getDeviceConversion = () => {
        const devices = {}; // { 'Mobile': { views: 10, purchases: 2 } }
        ecommerceData.forEach(e => {
            if (!devices[e.device]) devices[e.device] = { views: 0, purchases: 0 };
            if (e.event === 'View Item') devices[e.device].views++;
            if (e.event === 'Purchase') devices[e.device].purchases++;
        });

        const labels = Object.keys(devices);
        const rates = labels.map(d => (devices[d].views > 0 ? (devices[d].purchases / devices[d].views * 100).toFixed(1) : 0));

        return {
            labels,
            datasets: [{
                label: 'Conversion Rate (%)',
                data: rates,
                backgroundColor: '#6c5ce7'
            }]
        };
    };

    // 4. Top Selling Categories
    const getTopCategories = () => {
        const categories = {};
        ecommerceData.filter(e => e.event === 'Purchase').forEach(e => {
            categories[e.category] = (categories[e.category] || 0) + e.price;
        });

        return {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: ['#fdcb6e', '#e17055', '#fab1a0', '#00cec9']
            }]
        };
    };

    // 5. Refund Rate
    const getRefundStats = () => {
        const purchases = ecommerceData.filter(e => e.event === 'Purchase').length;
        const refunds = ecommerceData.filter(e => e.event === 'Refund').length;
        return { purchases, refunds };
    };


    return (
        <div style={{ padding: '20px', backgroundColor: '#f1f2f6', borderRadius: '12px' }}>
            <h2 style={{ marginBottom: '20px' }}>🛍️ E-Commerce & Attribution Analytics</h2>

            <div style={gridStyle}>

                {/* 1. CART ABANDONMENT */}
                <Card title="1. Cart Abandonment Rate">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <div style={{ width: '150px' }}>
                            <Doughnut data={getCartAbandonment().data} options={{ plugins: { legend: { display: false } } }} />
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d63031' }}>
                            {getCartAbandonment().rate}%
                        </div>
                    </div>
                    <MixpanelTip>
                        <strong>How to build:</strong> Report: <strong>Funnels</strong>. Steps: <code>Add to Cart</code> &rarr; <code>Purchase</code>. Metric: <strong>Drop-off Rate</strong>.
                    </MixpanelTip>
                </Card>

                {/* 2. AOV BY SOURCE */}
                <Card title="2. Average Order Value by Source">
                    <div style={{ height: '200px' }}>
                        <Bar data={getAOVBySource()} options={{ maintainAspectRatio: false }} />
                    </div>
                    <MixpanelTip>
                        <strong>How to build:</strong> Report: <strong>Insights</strong>. Metric: <strong>Average</strong> of <code>price</code>. Breakdown: <strong>by</strong> <code>source</code>.
                    </MixpanelTip>
                </Card>

                {/* 3. CONVERSION BY DEVICE */}
                <Card title="3. Conversion Rate by Device">
                    <div style={{ height: '200px' }}>
                        <Bar data={getDeviceConversion()} options={{ indexAxis: 'y', maintainAspectRatio: false }} />
                    </div>
                    <MixpanelTip>
                        <strong>How to build:</strong> Report: <strong>Funnels</strong> (View &rarr; Buy). Breakdown: <strong>by</strong> <code>device</code>.
                    </MixpanelTip>
                </Card>

                {/* 4. CATEGORY SALES */}
                <Card title="4. Revenue by Category">
                    <div style={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
                        <Doughnut data={getTopCategories()} options={{ maintainAspectRatio: false }} />
                    </div>
                    <MixpanelTip>
                        <strong>How to build:</strong> Report: <strong>Insights</strong>. Metric: <strong>Sum</strong> of <code>price</code>. Breakdown: <strong>by</strong> <code>category</code>.
                    </MixpanelTip>
                </Card>

                {/* 5. REFUND ANALYSIS */}
                <Card title="5. Refund Impact">
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{getRefundStats().refunds}</div>
                        <div style={{ color: '#636e72' }}>Refunds processed out of {getRefundStats().purchases} orders.</div>
                    </div>
                    <MixpanelTip>
                        <strong>How to build:</strong> Report: <strong>Formulas</strong>. <code>Unique(Refund) / Unique(Purchase)</code>.
                    </MixpanelTip>
                </Card>

            </div>

            <div style={{ marginTop: '20px', padding: '15px', background: '#2d3436', color: 'white', borderRadius: '8px', fontSize: '0.9rem', textAlign: 'center' }}>
                Token integrated in dataset: <code style={{ color: '#55efc4' }}>ca0f815a715168cb4f637b2a02f59777</code>
            </div>

        </div>
    );
};

// COMPONENT STYLES
const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px'
};

const Card = ({ title, children }) => (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', color: '#2d3436' }}>{title}</h3>
        {children}
    </div>
);

const MixpanelTip = ({ children }) => (
    <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '6px', fontSize: '0.85rem', color: '#0984e3', borderLeft: '4px solid #0984e3' }}>
        {children}
    </div>
);

export default EcommerceDashboard;
