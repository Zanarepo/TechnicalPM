import React from 'react';

const recipes = [
    {
        title: "1. Revenue by Gender",
        desc: "See which gender contributes the most revenue.",
        steps: [
            "Report: **Insights**",
            "Metric: **Sum** of property `price`",
            "Breakdown: by `gender`",
            "Visualization: **Bar Chart**"
        ]
    },
    {
        title: "2. Ride Completion Rate",
        desc: "Percentage of requested rides that finish successfully.",
        steps: [
            "Report: **Funnels**",
            "Step 1: `Ride Requested`",
            "Step 2: `Ride Completed`",
            "Metric: **Conversion Rate** (Overall)"
        ]
    },
    {
        title: "3. Power Users (Whales)",
        desc: "Identify users who spend > $100.",
        steps: [
            "Report: **Cohorts**",
            "Create Cohort: 'Top Spenders'",
            "Condition: Users who did `Ride Completed`...",
            "...aggregated by **Sum** of `price` > 100",
            "Timeframe: in the last 30 days"
        ]
    },
    {
        title: "4. Retention Analysis",
        desc: "Do users take a second ride within 7 days?",
        steps: [
            "Report: **Retention**",
            "A Event: `Ride Completed`",
            "B Event: `Ride Completed`",
            "Breakdown: by `city` (Optional)",
            "Look at the 'Day 7' or 'Week 1' bucket."
        ]
    },
    {
        title: "5. Cancellation Reasons",
        desc: "Why are rides failing?",
        steps: [
            "Report: **Insights**",
            "Event: `Ride Cancelled`",
            "Breakdown: by property `cancellation_reason` (or `status`)",
            "Visualization: **Pie Chart**"
        ]
    },
    {
        title: "6. Surge Sensitivity",
        desc: "How does surge pricing affect volume?",
        steps: [
            "Report: **Insights**",
            "Event: `Ride Completed`",
            "Breakdown: by `surge_multiplier` (Create Custom Buckets: 1-1.2, 1.3-1.8, 2+)",
            "Visualization: **Line Chart** compared to `Average Price`"
        ]
    },
    {
        title: "7. User Journey Maps",
        desc: "What do users do before cancelling?",
        steps: [
            "Report: **Flows**",
            "Anchor Event: `Ride Cancelled`",
            "Look **Backwards** (What happened before?)",
            "Identify patterns (e.g., 'Viewed Estimate' -> 'Cancelled')"
        ]
    },
    {
        title: "8. City Comparison",
        desc: "Compare growth in London vs. Paris.",
        steps: [
            "Report: **Insights**",
            "Event: `Ride Completed`",
            "Breakdown: by `city`",
            "Compare: **Unique Count** (Growth) vs **Sum of Price** (Revenue)"
        ]
    },
    {
        title: "9. Product Stickiness",
        desc: "How many days a week do users ride?",
        steps: [
            "Report: **Retention** (Frequency view) OR **Insights** -> Stickiness",
            "Event: `Ride Completed`",
            "Measure: **Weekly Stickiness** (L7/30)",
            "Goal: Users riding 2+ days/week"
        ]
    },
    {
        title: "10. Impact of Promos",
        desc: "Do discounts increase ride frequency?",
        steps: [
            "Report: **Insights**",
            "Event: `Ride Completed`",
            "Filter: `discount_applied` equals `true` vs `false`",
            "Compare: **Average** `distance_miles` (Do they go further with cheap rides?)"
        ]
    }
];

const MixpanelRecipes = () => {
    return (
        <div style={{ marginTop: '30px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
            <h3>📚 Mixpanel Playbook: 10 Essential Recipes</h3>
            <p style={{ color: '#666', marginBottom: '20px' }}>Follow these exact steps in Mixpanel to build your analysis.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {recipes.map((recipe, index) => (
                    <div key={index} style={recipeCardStyle}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#6c5ce7' }}>{recipe.title}</h4>
                        <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>{recipe.desc}</p>
                        <div style={{ backgroundColor: '#f5f6fa', padding: '10px', borderRadius: '6px' }}>
                            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#2d3436' }}>
                                {recipe.steps.map((step, i) => (
                                    <li key={i} style={{ marginBottom: '5px' }}>
                                        <span dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code style="background:#dfe6e9;padding:2px 4px;border-radius:4px">$1</code>') }} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const recipeCardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '1px solid #e0e0e0'
};

export default MixpanelRecipes;
