import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const GrowthLoopSimulator = () => {
    const [initialUsers, setInitialUsers] = useState(100);
    const [kFactor, setKFactor] = useState(1.2);
    const [cycleTime, setCycleTime] = useState(1); // Days
    const [cycles, setCycles] = useState(10);
    const [dataPoints, setDataPoints] = useState([]);

    useEffect(() => {
        let users = initialUsers;
        const points = [users];

        for (let i = 1; i <= cycles; i++) {
            // New users from viral loop = Previous Users * K-Factor
            // Simplified: User growth per cycle
            let newUsers = users * kFactor;
            if (kFactor < 1) {
                // Decay
                newUsers = users * kFactor;
            }
            users = newUsers;
            // Note: This is simplified. Usually Total = Existing + (Existing * K)
            // But for K-factor visualization usually we show the multiplier effect.
            // If K=1.2, 100 users bring 120 NEW users. Total = 220. 
            // Let's model Total Users.

            // Correction for model:
            // Cycle 0: 100
            // Cycle 1: 100 + (100 * 1.2) = 220
            // Cycle 2: 220 + (220 * 1.2) = ... 

            // Reset calculation for graph
        }
    }, [initialUsers, kFactor, cycles]);

    // Recalculate properly for render
    const calculateData = () => {
        let currentTotal = initialUsers;
        const data = [Math.round(currentTotal)];

        for (let i = 1; i <= cycles; i++) {
            const newUsers = currentTotal * kFactor;
            // If we assume K-factor applies to the whole base every cycle (simplified viral loop)
            // or just new users? 
            // Viral Loop usually: New Users = Active Users * K.
            // Let's assume K applies to the cohort from previous cycle for simplicity or entire base?
            // Standard viral growth: Total Users(t) = Total Users(t-1) * (1 + K)
            currentTotal = currentTotal * (1 + (kFactor - 0)); // Wait, K=1 means 1 user brings 1 user. Growth is doubling.
            // If K=1.2, 100 users bring 120. Total 220.
            // So Multiplier is (1 + K). 
            // However, strictly K-factor usually implies "Invites sent * conversion rate".
            // Let's stick to the multiplier logic: Next = Current + (Current * K)

            currentTotal = currentTotal + (currentTotal * kFactor);
            data.push(Math.round(currentTotal));
        }
        return data;
    }

    const chartData = {
        labels: Array.from({ length: cycles + 1 }, (_, i) => `Cycle ${i}`),
        datasets: [
            {
                label: 'Total Users',
                data: calculateData(),
                borderColor: kFactor >= 1 ? 'rgb(75, 192, 192)' : 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Viral Growth Simulation (K=${kFactor})`,
            },
        },
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h3>🔄 Viral Loop Simulator</h3>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
                K-Factor = (Invites per User) * (Conversion Rate). <br />
                If K &gt; 1, you have exponential growth. If K &lt; 1, growth eventually stops.
            </p>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>Initial Users</label>
                    <input
                        type="number"
                        value={initialUsers}
                        onChange={(e) => setInitialUsers(Number(e.target.value))}
                        style={{ padding: '5px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>K-Factor</label>
                    <input
                        type="number"
                        step="0.1"
                        value={kFactor}
                        onChange={(e) => setKFactor(Number(e.target.value))}
                        style={{ padding: '5px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>Cycles</label>
                    <input
                        type="number"
                        value={cycles}
                        onChange={(e) => setCycles(Number(e.target.value))}
                        style={{ padding: '5px' }}
                    />
                </div>
            </div>

            <div style={{ height: '300px' }}>
                <Line options={options} data={chartData} />
            </div>

            <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
                <strong>Insight:</strong>
                {kFactor > 1
                    ? " 🚀 Exponential Growth! Your user base is growing automatically."
                    : " 📉 Linear/Decaying Growth. You need paid marketing to sustain this."}
            </div>
        </div>
    );
};

export default GrowthLoopSimulator;
