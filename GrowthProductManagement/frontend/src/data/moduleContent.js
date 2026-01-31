export const moduleContent = {
    1: {
        title: "Growth Mindset & Loops",
        subtitle: "From Linear Funnels to Compounding Loops",
        description: "Understanding why 'Growth' is a system. Moving from the traditional funnel view to self-reinforcing growth loops, using Instagram as our primary case study.",
        deepDive: `
            <h3>Why Loops Beat Funnels</h3>
            <p>Traditional marketing relies on a linear funnel: You pay to acquire a user, they go through steps, and a percentage buys. The problem? You have to keep paying to fill the top.</p>
            <p><strong>Growth Loops</strong> use the output of one cycle (a new user) as the input for the next cycle. This creates compound interest for your user base.</p>
            <h3>Key Metrics</h3>
            <ul>
                <li><strong>K-Factor (Viral Coefficient):</strong> The number of new users each existing user invites who actually convert. K > 1 means exponential growth.</li>
                <li><strong>Cycle Time:</strong> How long it takes for a user to complete the loop. Shorter cycles = faster compounding.</li>
            </ul>
        `,
        mentalModel: {
            title: "The Flywheel Effect",
            explanation: "Growth should not require linear effort for linear results. Successful products build momentum where output becomes input for the next cycle.",
            points: [
                "Acquisition Loop: User eats sandwich -> Love it -> Invites Coworker for free cookie -> Coworker orders sandwich",
                "Engagement Loop: App sends 'Lunch Time' push -> User opens app -> Orders -> App learns preference -> Better Push next time",
                "Friction slows the flywheel; Viral features speed it up"
            ]
        },
        realWorldExample: {
            product: "The 'Free Lunch' Loop",
            explanation: "Incentivized Referral Program.",
            points: [
                "Give $5, Get $5.",
                "Every happy customer becomes a salesperson.",
                "Result: Zero-cost acquisition of hungry office workers."
            ]
        },
        studentTask: {
            title: "Map a Growth Loop",
            description: "Diagram the 'Share' loop in the Sandwich App. How does sharing a photo of a delicious sub trigger a new user?",
            qna: [
                {
                    question: "How is this different from a funnel?",
                    answer: "A funnel has a start and end (User buys). A loop feeds itself (User buys -> Invites friend -> Friend buys)."
                }
            ]
        }
    },
    2: {
        title: "Funnel Stages (ToFu, MoFu, BoFu)",
        subtitle: "The Pirate Metrics Framework (AARRR)",
        description: "Deep dive into the 5 stages of the user lifecycle, mapped to Top, Middle, and Bottom of the Funnel strategies.",
        deepDive: `
            <h3>The AARRR Framework</h3>
            <p>Coined by Dave McClure, these separate the health of your product into distinct stages:</p>
            <ol>
                <li><strong>Acquisition (ToFu):</strong> How do users find you? (SEO, Ads)</li>
                <li><strong>Activation (MoFu):</strong> Do they have a great first experience? "Aha Moment"</li>
                <li><strong>Retention (MoFu):</strong> Do they come back? (Churn Rate)</li>
                <li><strong>Referral (BoFu):</strong> Do they tell others? (Virality)</li>
                <li><strong>Revenue (BoFu):</strong> Do you make money? (LTV, CAC)</li>
            </ol>
            <p><strong>Use the simulator</strong> to see how improving Retention often has a bigger impact on Revenue than just pouring more traffic into Acquisition.</p>
        `,
        mentalModel: {
            title: "ToFu, MoFu, BoFu",
            explanation: "Categorizing the user journey by intent and depth.",
            points: [
                "ToFu (Top of Funnel): Awareness (Hungry user searches 'best sub near me').",
                "MoFu (Middle of Funnel): Consideration (Browsing the menu, customizing ingredients).",
                "BoFu (Bottom of Funnel): Conversion (Clicking 'Pay Now')."
            ]
        },
        realWorldExample: {
            product: "The Hungry User Funnel",
            explanation: "Mapping the Sandwich Order journey.",
            points: [
                "ToFu: Seeing a flyer or Google Ad.",
                "MoFu: Downloading the app and adding a 'Club Sandwich' to cart.",
                "BoFu: Entering credit card details and confirming."
            ]
        },
        studentTask: {
            title: "The Funnel Audit",
            description: "Identify where the Sandwich App loses the most users. Is it ToFu (App download) or MoFu (Menu browsing)?",
            qna: [
                {
                    question: "Which metric is most important?",
                    answer: "Usually Retention (MoFu). If the sandwich is bad, no amount of ads (ToFu) will save you."
                }
            ]
        }
    },
    3: {
        title: "Acquisition & SEO",
        subtitle: "Organic vs Paid Growth",
        description: "Strategies for getting users into the door (ToFu). Focusing on Search Engine Optimization (SEO), SEM, and Content Marketing.",
        deepDive: `
            <h3>Channels of Growth</h3>
            <p>Every product grows through one or two primary channels. Trying to do all of them usually fails.</p>
            <ul>
                <li><strong>Organic Search (SEO):</strong> High intent, slow to build, free/cheap long term. (e.g., TripAdvisor, Pinterest)</li>
                <li><strong>Paid Marketing (SEM/Social):</strong> Fast to scale, expensive, stops when you stop paying. (e.g., Mobile Games, Casper)</li>
                <li><strong>Virality:</strong> Product driven. Hardest to engineer. (e.g., Dropbox, Zoom)</li>
            </ul>
        `,
        mentalModel: {
            title: "Intent vs. Discovery",
            explanation: "Matching the channel to how users find food.",
            points: [
                "High Intent: Search (User googles 'Gluten Free Sandwich').",
                "Low Intent: Social (User sees a delicious food photo on feed).",
                "Local SEO: Google Maps 'Sandwich Shop' listing."
            ]
        },
        realWorldExample: {
            product: "Menu SEO",
            explanation: "Capturing search traffic.",
            points: [
                "Create a dedicated page for every sandwich type (e.g., /menu/vegan-meatball-sub).",
                "Allow Google to index these pages.",
                "Capture users searching for specific cravings."
            ]
        },
        studentTask: {
            title: "Keyword Strategy",
            description: "What keywords should we bid on to steal customers from Subway? (e.g., 'fresh subs', 'healthy lunch').",
            qna: [
                {
                    question: "How long does SEO take?",
                    answer: "It's a long-term play but provides free organic traffic forever."
                }
            ]
        }
    },
    4: {
        title: "Growth Hacks & Virality",
        subtitle: "High-Impact, Low-Cost Experiments",
        description: "The art of 'Growth Hacking' – using engineering to get massive scale. Focusing on K-Factor.",
        deepDive: `
            <h3>What is a Growth Hack?</h3>
            <p>It's not just a marketing trick. It's usually a product feature that exploits a system loop.</p>
            <p><strong>Integration Marketing:</strong> Integrating your product into a platform that already has millions of users (Airbnb -> Craigslist, PayPal -> eBay, Instagram -> Facebook).</p>
            <p><strong>Incentivized Referrals:</strong> Paying users (in cash or credits) to bring friends. (Tesla, Uber, Dropbox).</p>
        `,
        mentalModel: {
            title: "Other People's Networks (OPN)",
            explanation: "Leveraging existing platforms to get hungry users.",
            points: [
                "Piggybacking on Food Delivery Apps (UberEats/DoorDash).",
                "Corporate Partnerships (Slack integration for office lunch).",
                "Influencer Tastings."
            ]
        },
        realWorldExample: {
            product: "The 'Golden Ticket'",
            explanation: "Physical to Digital Hack.",
            points: [
                "Put a physical flyer with a QR code in every delivery bag.",
                "Offer: 'Scan for 50% off your next order'.",
                "Result: Converts 3rd party delivery users (high fee) to direct app users (low fee)."
            ]
        },
        studentTask: {
            title: "Viral Loop Design",
            description: "Design a 'Gift a Sandwich' feature. How do you make it easy to buy lunch for a friend?",
            qna: [
                {
                    question: "What is a good K-factor?",
                    answer: "Anything > 1 means exponential viral growth."
                }
            ]
        }
    },
    5: {
        title: "Activation & Onboarding",
        subtitle: "Time to Value (TTV)",
        description: "The crucial first minutes (MoFu). Getting users to the 'Aha!' moment as fast as possible.",
        deepDive: `
            <h3>The 'Aha!' Moment</h3>
            <p>This is the precise moment your user calculates: <em>"Oh, this is why I need this."</em></p>
            <p><strong>Setup Moment:</strong> The necessary friction (Download, Sign up, Confirm Email).</p>
            <p><strong>Aha Moment:</strong> The payoff (Sending first message, Seeing first photo).</p>
            <p><strong>Goal:</strong> Reduce the gap between Setup and Aha. Remove every field, every click that isn't essential.</p>
        `,
        mentalModel: {
            title: " The Setup vs. Value Gap",
            explanation: "Minimize the work required before the user eats.",
            points: [
                "Aha! Moment: The first bite of the sandwich.",
                "The Barrier: Account creation, Entering Credit Card, Address."
            ]
        },
        realWorldExample: {
            product: "Guest Checkout",
            explanation: "Removing friction.",
            points: [
                "Hypothesis: Forcing account creation causes drop-off.",
                "Solution: Allow 'Guest Checkout' with Apple Pay.",
                "Result: 15% increase in first-time conversion (Activation)."
            ]
        },
        studentTask: {
            title: "Onboarding Tear-down",
            description: "Count how many taps it takes to order a sandwich in the app. Can you remove the 'Email Confirmation' step?",
            qna: []
        }
    },
    6: {
        title: "Retention & Engagement",
        subtitle: "Cohort Analysis & Churn",
        description: "Keeping users coming back (MoFu). Understanding Cohort Analysis and flattened retention curves.",
        deepDive: `
            <h3>Retention is King</h3>
            <p>If you have poor retention, you don't have a product, you have a bucket with holes. No amount of marketing can fix a bad product.</p>
            <p><strong>Cohort Analysis:</strong> Tracking groups of users over time (e.g., "Users who joined in Jan").</p>
            <p><strong>Flattening the Curve:</strong> All products lose users. The goal is for the retention curve to flatten out (become asymptotic), meaning a core group of users stays forever.</p>
        `,
        mentalModel: {
            title: "Habit Loops (Trigger, Action, Reward)",
            explanation: "Building lunch into the user's daily routine.",
            points: [
                "Trigger: 'It's 11:30 AM' Push Notification.",
                "Action: Open app and hit 'Reorder'.",
                "Reward: Food arrives, Hunger solved."
            ]
        },
        realWorldExample: {
            product: "Loyalty Punch Card",
            explanation: "Gamified Retention.",
            points: [
                "Problem: Users switch between apps (UberEats, DoorDash).",
                "Solution: 'Order 10, Get 1 Free'.",
                "Result: Increases 'Share of Wallet' and frequency."
            ]
        },
        studentTask: {
            title: "Analyze a Cohort",
            description: "If 'Office Workers' retain better than 'Weekend Users', how should we adjust our push notification schedule?",
            qna: []
        }
    },
    7: {
        title: "Monetization Strategy",
        subtitle: "Pricing, LTV & CAC",
        description: "How to translate value into money (BoFu). Advertising vs Subscription models.",
        deepDive: `
            <h3>LTV > CAC</h3>
            <p>The fundamental equation of business viability.</p>
            <ul>
                <li><strong>LTV (Lifetime Value):</strong> How much profit you make from a single customer over their entire life.</li>
                <li><strong>CAC (Customer Acquisition Cost):</strong> Total Marketing Spend / Number of users acquired.</li>
            </ul>
            <p>If LTV < CAC, you are losing money on every sale. You need LTV to be at least 3x CAC for a healthy business.</p>
        `,
        mentalModel: {
            title: "Share of Wallet",
            explanation: "Maximizing the revenue from each order.",
            points: [
                "Core Product: Sandwich ($10).",
                "Cross-sell: Chips ($2).",
                "Up-sell: Make it a distinct 'Double Meat' ($4)."
            ]
        },
        realWorldExample: {
            product: "The Combo Meal",
            explanation: "Closing the loop (BoFu).",
            points: [
                "Instead of just selling the main item, bundle high-margin sides (Soda/Fries).",
                "Increases Average Order Value (AOV) without increasing CAC.",
                "Classic monetization strategy."
            ]
        },
        studentTask: {
            title: "Pricing Strategy",
            description: "Where would you place the 'Add Avocado' prompt? (In cart? At checkout? On the menu?).",
            qna: []
        }
    },
    8: {
        title: "Experimentation & A/B Testing",
        subtitle: "Data-Driven Decision Making",
        description: "The scientific method applied to product. Hypothesis, Control vs Variation, Significance.",
        deepDive: `
            <h3>1. The Anatomy of an Experiment</h3>
            <ul>
                <li><strong>Hypothesis:</strong> The foundation. A falsifiable statement: "If we [Change X], then [Metric Y] will increase by [Z]% because [Rationale]."</li>
                <li><strong>Variables:</strong>
                    <ul>
                        <li><em>Independent Variable:</em> What you change (e.g., The Headline).</li>
                        <li><em>Dependent Variable:</em> What you measure (e.g., Signup Rate).</li>
                        <li><em>Confounding Variables:</em> External factors (e.g., Holidays) that might mess up data.</li>
                    </ul>
                </li>
                <li><strong>Statistical Significance (p-value):</strong> The probability that the result is NOT luck. Standard is 95% confidence (p < 0.05).</li>
                <li><strong>Sample Size & Power:</strong> You need enough traffic. If sample size is too small, you won't detect the win (False Negative). Use the simulator to calculate this!</li>
            </ul>

            <h3>2. Types of Experiments</h3>
            <ul>
                <li><strong>A/B Testing:</strong> The classic. 50% see A, 50% see B. Best for clear statistical answers.</li>
                <li><strong>Multivariate Testing (MVT):</strong> Testing multiple elements at once (Title vs Button vs Image). Requires huge traffic (Traffic needed = Variations ^ 2).</li>
                <li><strong>Split URL Testing:</strong> Redirecting users to a completely different page path (/home-v1 vs /home-v2). Best for radical design overhauls.</li>
                <li><strong>Painted Door Test:</strong> Showing a feature that doesn't exist yet to measure interest. (e.g., A "Dark Mode" button that says "Coming Soon" when clicked). Great for validation.</li>
            </ul>

            <h3>3. Applying Experimentation to Growth</h3>
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p><strong>💡 Validating Ideas:</strong> Before building a referral program, add a "Invite Friend" button. If nobody clicks it, don't build the backend.</p>
                <p><strong>⚡ Improving Onboarding:</strong> Test <em>Friction vs Value</em>. Try removing fields from the signup form vs. adding a "Progress Bar" to motivate users.</p>
                <p><strong>💰 Increasing Revenue:</strong> Test "Decoy Pricing". Adding a high-priced "Enterprise" plan can often double sales of the "Pro" plan by making it look cheap.</p>
                <p><strong>📈 Increasing Users:</strong> Test the "Share" prompt timing. Asking for a referral <em>after</em> a user achieves a win (e.g., posts a photo) converts 3x better than asking at signup.</p>
            </div>

            <h3>4. The Tools of the Trade</h3>
            <p><strong>Client-Side (Marketing):</strong> Optimizely, VWO, Google Optimize (Sunset).</p>
            <p><strong>Server-Side (Product):</strong> Statsig, LaunchDarkly, Eppo, PostHog.</p>
            <p><strong>Mobile:</strong> Firebase Remote Config.</p>
        `,
        mentalModel: {
            title: "Local Maxima",
            explanation: "Incremental optimization (testing button color) vs. Global Maxima (new menu items).",
            points: [
                "Don't just optimize a bad checkout page.",
                "Test a completely new way to order (e.g., Voice Order)."
            ]
        },
        realWorldExample: {
            product: "One-Click Reorder",
            explanation: "Reducing friction.",
            points: [
                "Hypothesis: Users want to order the same thing as last time.",
                "Test: Add a big 'Reorder Last Meal' button on home screen.",
                "Result: 20% increase in order frequency for returning users."
            ]
        },
        studentTask: {
            title: "Design an Experiment",
            description: "Hypothesis: If we show dessert photos at checkout, dessert sales will increase by 15%.",
            qna: []
        }
    },
    9: {
        title: "Psychology of Growth",
        subtitle: "Behavioral Economics",
        description: "Using psychology principles like Social Proof, Scarcity, and Loss Aversion.",
        deepDive: `
            <h3>Nudge Theory</h3>
            <p>Small design choices can have huge impacts on behavior. We are irrational.</p>
            <ul>
                <li><strong>Social Proof:</strong> "10,000 people are watching this". We copy others.</li>
                <li><strong>Scarcity:</strong> "Only 2 left!". We value things more when they are rare.</li>
                <li><strong>Loss Aversion:</strong> We hate losing $10 more than we like gaining $10. (Streaks).</li>
                <li><strong>Anchoring:</strong> The first number we see sets the baseline. ($1000 slashed to $500 looks like a deal).</li>
            </ul>
        `,
        mentalModel: {
            title: "FOMO (Fear Of Missing Out)",
            explanation: "Scarcity drives action.",
            points: [
                "Limited Time Offers ('McRib is back').",
                "Countdown Timers ('Order in 5 mins for arrival by 12:00').",
                "Social Proof ('20 people ordered this sub today')."
            ]
        },
        realWorldExample: {
            product: "The 'Sold Out' Sticker",
            explanation: "Scarcity & Social Proof.",
            points: [
                "Marking items as 'Sold Out' signals high demand.",
                "Makes the remaining items seem more desirable.",
                "It exploits the fear of missing out on the good stuff."
            ]
        },
        studentTask: {
            title: "Identify Dark Patterns",
            description: "Is adding a countdown timer when there is no real deadline a dark pattern? (Yes).",
            qna: []
        }
    },
    10: {
        title: "The Growth Tech Stack",
        subtitle: "Tools of the Trade",
        description: "How to track Instagram-scale data. Analytics, Event Tracking.",
        deepDive: `
            <h3>The Modern Growth Stack</h3>
            <p>You can't manage what you don't measure.</p>
            <ul>
                <li><strong>CDP (Customer Data Platform):</strong> The pipes. Collects data from App/Web and sends it everywhere. (Segment, mParticle).</li>
                <li><strong>Product Analytics:</strong> Visualizing the funnel. (Amplitude, Mixpanel).</li>
                <li><strong>Engagement/CRM:</strong> Sending the emails/push. (Braze, HubSpot, Customer.io).</li>
                <li><strong>Experimentation:</strong> Running the A/B tests. (Optimizely, VWO, Statsig).</li>
            </ul>
        `,
        mentalModel: {
            title: "Event Taxonomy",
            explanation: "Structuring data to answer questions later.",
            points: [
                "Object: 'Sandwich'",
                "Action: 'Order'",
                "Properties: 'Type: BLT', 'Cost: $12', 'Time: 12:00pm'"
            ]
        },
        realWorldExample: {
            product: "Smart Kitchen Display",
            explanation: "Data integration.",
            points: [
                "Online orders sync instantly to kitchen screens.",
                "Delivery drivers are dispatched automatically when food is marked 'Ready'.",
                "Seamless loops of data."
            ]
        },
        studentTask: {
            title: "Tracking Plan",
            description: "Define the events needed to measure the success of a 'Build Your Own' feature. (Ingredient selected, steps completed).",
            qna: []
        }
    },
    11: {
        title: "Mixpanel Analytics",
        subtitle: "From Tracking to Insights",
        description: "Mastering the world's leading product analytics tool. From foundational event tracking to advanced cohort analysis and segmentation.",
        deepDive: `
            <h3>Level 1: Foundations - Events & Properties</h3>
            <p><strong>The Data Model:</strong> Unlike Google Analytics (which is page-view based), Mixpanel is <strong>Event-based</strong>.</p>
            <ul>
                <li><strong>Event:</strong> "User Signed Up", "Video Played", "Purchase Completed".</li>
                <li><strong>Property:</strong> Metadata describing the event. (e.g., "Plan Type: Pro", "Video Length: 120s").</li>
                <li><strong>User Profile:</strong> State about the user (e.g., "Email", "Total Spend", "Last Login Date").</li>
            </ul>

            <h3>Level 2: Advanced - Segmentation & Cohorts</h3>
            <p>Once data is in, the magic happens in analysis.</p>
            <ul>
                <li><strong>Segmentation:</strong> "Show me 'Sign Ups' broken down by 'Country'".</li>
                <li><strong>Funnels:</strong> "How many people went from 'Sign Up' -> 'Add to Cart' -> 'Purchase'? Where did they drop off?"</li>
                <li><strong>Cohorts:</strong> "Show me retention for users who signed up in January vs. February."</li>
            </ul>
        `,
        mentalModel: {
            title: "The Who, What, Where",
            explanation: "Every digital interaction can be described by this triplet.",
            points: [
                "Who: The Hungry User (Distinct ID).",
                "What: Ordered Sandwich (Event Name).",
                "Where: From iOS App, with Fries (Properties)."
            ]
        },
        realWorldExample: {
            product: "Sandwich Trends",
            explanation: "Tracking consumption preferences.",
            points: [
                "Event: 'Order Sandwich'",
                "Properties: 'Type', 'Time of Day'.",
                "Insight: 'Users order Bánh mì mostly at lunch, but Burgers at dinner' -> Optimize menu display."
            ]
        },
        studentTask: {
            title: "Tracking Plan Design",
            description: "Design a tracking plan for a sophisticated 'Search' feature for food.",
            qna: [
                {
                    question: "What properties do you need?",
                    answer: "Search Query (e.g., 'Vegan'), Number of Results, Filters Applied (e.g. 'Under $10')."
                }
            ]
        }
    },
    12: {
        title: "Sandwich Shop Analysis Challenge",
        subtitle: "The 'Golden Path' Case Study",
        description: "Interactive Analysis Dashboard. Use the charts below to solve the prompt.",
        deepDive: `<p>Use the Interactive Dashboard above to analyze trends.</p>`,
        mentalModel: {
            title: "Analysis Mode",
            explanation: "Interact with the data directly.",
            points: ["Data", "Insights", "Action"]
        },
        realWorldExample: {
            product: "Dashboard",
            explanation: "Real-time analytics.",
            points: []
        },
        studentTask: {
            title: "Solve the Case Study",
            description: "Use the dashboard to find the Golden Path.",
            qna: []
        }
    },
    13: {
        title: "Real World Analysis: Banking Data",
        subtitle: "Advanced Segmentation & Risk",
        description: "Analyzing real credit card usage data. Understanding financial behaviors, segmentation, and risk profiles using Mixpanel principles.",
        deepDive: `
            <h3>Understanding the Dataset</h3>
            <p>This dataset (sourced from Kaggle) contains usage behavior of active credit card holders. It allows us to practice <strong>Fintech Product Management</strong> skills.</p>
            <ul>
                <li><strong>Balance:</strong> The amount left in their account to pay (Debt).</li>
                <li><strong>Purchases:</strong> The amount of purchases made.</li>
                <li><strong>OneOff vs Installments:</strong> Does the user pay all at once (Groceries) or over time (New TV)?</li>
                <li><strong>Cash Advance:</strong> Withdrawing cash (High fees, indicates liquidity need).</li>
                <li><strong>PRC Full Payment:</strong> Percent of Full Payment paid by user. (1 = pays off fully every month).</li>
            </ul>
        `,
        mentalModel: {
            title: "Transactors vs. Revolvers",
            explanation: "The two main types of credit card users.",
            points: [
                "Transactors: Pay off full balance every month. (Bank makes money on Merchant Fees).",
                "Revolvers: Carry a balance and pay interest. (Bank makes money on Interest).",
                "Deadbeats: Don't use the card at all. (Cost money to maintain)."
            ]
        },
        realWorldExample: {
            product: "Credit Line Increase",
            explanation: "Targeting the right segment.",
            points: [
                "If a user is a 'Revolver' (pays interest) and is near their limit, giving them a Credit Line Increase is highly profitable.",
                "If a user is a 'Transactor', increasing limits doesn't create much revenue, but increases loyalty."
            ]
        },
        studentTask: {
            title: "Find the 'Must-Retain' Users",
            description: "Use the Banking Dashboard below. Identify which segment of users are high-spenders but low-risk (pay off balance).",
            qna: [
                {
                    question: "Why track 'Cash Advance'?",
                    answer: "High cash advance usage often signals financial distress. These users are high churn/default risks."
                }
            ]
        }
    },
    14: {
        title: "Ride Hailing Strategy: Uber vs Bolt",
        subtitle: "Basic to Advanced Analytics",
        description: "Comparative analysis of two mobility giants. Learn how to look at Marketplaces (Supply vs Demand) and Surge Pricing elasticity.",
        deepDive: `
            <h3>Marketplace Dynamics</h3>
            <p>Ride Hailing is a two-sided marketplace. You need to balance <strong>Rider Demand</strong> with <strong>Driver Supply</strong>.</p>
            <ul>
                <li><strong>Surge Pricing:</strong> A mechanism to balance the marketplace. When Demand > Supply, price goes up to (1) dampen demand and (2) encourage more drivers to get on the road.</li>
                <li><strong>Utilization Rate:</strong> % of time a driver has a passenger. High utilization = Happy Driver.</li>
                <li><strong>CAC (Rider) vs CAC (Driver):</strong> Usually, acquiring drivers is harder and more expensive than acquiring riders.</li>
            </ul>
        `,
        mentalModel: {
            title: "Elasticity",
            explanation: "How sensitive are users to price changes?",
            points: [
                "Elastic Demand: Small price increase -> Large drop in demand. (e.g., Casual rides).",
                "Inelastic Demand: Price increase -> Same demand. (e.g., Rain, Rush hour, Airport runs).",
                "Understanding elasticity helps you maximize revenue without killing volume."
            ]
        },
        realWorldExample: {
            product: "Uber Pass",
            explanation: "Subscription for Retention.",
            points: [
                "Lock users into a monthly fee.",
                "Result: They stop comparing prices with Lyft/Bolt because 'I have free delivery/rides on Uber'.",
                "Increases LTV and Share of Wallet."
            ]
        },
        studentTask: {
            title: "Analyze Surge Drop-off",
            description: "Use the Advanced tab in the dashboard. At what Surge Multiplier does the ride volume crash? Make a recommendation on the maximum surge cap.",
            qna: []
        }
    },
    15: {
        title: "E-Commerce Analytics",
        subtitle: "Conversion & Attribution",
        description: "Mastering the e-commerce funnel. Analyze Cart Abandonment, Average Order Value (AOV), and Marketing Attribution.",
        deepDive: `
            <h3>E-Commerce KPI Framework</h3>
            <p>For any store, growth comes from 3 levers: <strong>Traffic x Conversion x AOV</strong>.</p>
            <ul>
                <li><strong>Cart Abandonment:</strong> The #1 leak in the bucket. Average abandonment is ~70%. Reducing this by 5% can double profits.</li>
                <li><strong>Marketing Attribution:</strong> Knowing WHERE your high-value customers come from (Instagram vs Google) is key to spending your ad budget wisely.</li>
                <li><strong>Refund Rate:</strong> A hidden growth killer. If 20% of purchases are refunded, your 'Growth' is an illusion.</li>
            </ul>
        `,
        mentalModel: {
            title: "The Leaky Bucket",
            explanation: "Don't pour more water (Traffic) until you fix the holes (Retention/Conversion).",
            points: [
                "Top of Funnel: Traffic (Ads, SEO).",
                "Middle of Funnel: Add to Cart (Product Page optimization).",
                "Bottom of Funnel: Checkout (Payment ease, Trust signals)."
            ]
        },
        realWorldExample: {
            product: "Amazon 1-Click",
            explanation: "Removing friction.",
            points: [
                "Amazon patented 1-Click ordering to remove the 'Check out' step entirely.",
                "Result: Massive increase in conversion rate because it removed time for 'Buyer's Remorse'."
            ]
        },
        studentTask: {
            title: "Fix the Attribution",
            description: "Look at the 'AOV by Source' chart. Which marketing channel brings in the 'Cheap' users and which brings the 'Whales'? Where should we spend our next $1000?",
            qna: []
        }
    }
};
