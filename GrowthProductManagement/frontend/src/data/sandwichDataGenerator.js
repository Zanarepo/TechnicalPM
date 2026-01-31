import { v4 as uuidv4 } from 'uuid';

// ==========================================
// DATA SCHEMA
// ==========================================
const SANDWICHES = [
    { name: "Classic BLT", category: "Meat", price: 8.50 },
    { name: "Veggie Delight", category: "Vegetarian", price: 8.00 },
    { name: "Turkey Club", category: "Meat", price: 9.50 },
    { name: "Spicy Italian", category: "Meat", price: 9.00 },
    { name: "Tuna Melt", category: "Seafood", price: 8.75 },
    { name: "Caprese", category: "Vegetarian", price: 8.25 }
];

const TOPPINGS = ["Extra Cheese", "Avocado", "Bacon", "Mayo", "Mustard", "Hot Peppers"];
const PAYMENT_METHODS = ["Credit Card", "Apple Pay", "PayPal"];
const COUNTRIES = ["USA", "Canada", "UK", "Germany", "France", "Japan"];

// ==========================================
// HELPER FUNCTIONS
// ==========================================
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Standard Normal Distribution for realistic "clusters" of values
function gaussianRandom(mean = 0, stdev = 1) {
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdev + mean;
}

// ==========================================
// GENERATOR LOGIC
// ==========================================
export function generateSandwichData(numUsers = 200, days = 30) {
    let allEvents = [];
    let users = [];

    // 1. Create Users
    for (let i = 0; i < numUsers; i++) {
        const userId = uuidv4();
        users.push({
            distinct_id: userId,
            properties: {
                $first_name: `User${i}`,
                $last_name: `Test`,
                $email: `user${i}@sandwichscale.com`,
                $country: getRandomItem(COUNTRIES),
                $created: new Date().toISOString(),
                favorite_category: getRandomItem(["Meat", "Vegetarian", "Seafood"])
            }
        });
    }

    // 2. Generate Events
    users.forEach(user => {
        const numSessions = getRandomInt(1, 5);

        for (let s = 0; s < numSessions; s++) {
            const daysAgo = getRandomInt(0, days);
            let sessionTime = new Date();
            sessionTime.setDate(sessionTime.getDate() - daysAgo);

            // App Open
            allEvents.push({
                event: "App Open",
                properties: {
                    distinct_id: user.distinct_id,
                    time: sessionTime.getTime(),
                    platform: getRandomItem(["iOS", "Android", "Web"]),
                    $os: getRandomItem(["iOS", "Android", "Windows", "MacOS"]) // For detailed breakdown
                }
            });

            if (Math.random() > 0.1) {
                sessionTime = new Date(sessionTime.getTime() + getRandomInt(5000, 30000));
                allEvents.push({
                    event: "View Menu",
                    properties: {
                        distinct_id: user.distinct_id,
                        time: sessionTime.getTime(),
                        sort_by: getRandomItem(["Price", "Popularity", "Recommended"])
                    }
                });

                if (Math.random() > 0.2) {
                    const selectedSandwich = getRandomItem(SANDWICHES);
                    sessionTime = new Date(sessionTime.getTime() + getRandomInt(5000, 60000));
                    allEvents.push({
                        event: "Select Item",
                        properties: {
                            distinct_id: user.distinct_id,
                            time: sessionTime.getTime(),
                            item_name: selectedSandwich.name,
                            category: selectedSandwich.category,
                            price: selectedSandwich.price
                        }
                    });

                    if (Math.random() > 0.3) {
                        sessionTime = new Date(sessionTime.getTime() + getRandomInt(2000, 10000));
                        const numToppings = Math.max(0, Math.floor(gaussianRandom(1, 1)));

                        allEvents.push({
                            event: "Add to Cart",
                            properties: {
                                distinct_id: user.distinct_id,
                                time: sessionTime.getTime(),
                                item_name: selectedSandwich.name,
                                category: selectedSandwich.category,
                                toppings_count: numToppings
                            }
                        });

                        // Golden Path Logic
                        let conversionChance = 0.3; // Base low conversion
                        if (user.properties.favorite_category === "Vegetarian" && selectedSandwich.category === "Vegetarian") {
                            conversionChance = 0.85; // High conversion for Golden Path
                        }

                        if (Math.random() < conversionChance) {
                            sessionTime = new Date(sessionTime.getTime() + getRandomInt(10000, 120000));
                            const finalPrice = selectedSandwich.price + (numToppings * 0.50);

                            allEvents.push({
                                event: "Purchase Complete",
                                properties: {
                                    distinct_id: user.distinct_id,
                                    time: sessionTime.getTime(),
                                    item_name: selectedSandwich.name,
                                    total_amount: finalPrice,
                                    category: selectedSandwich.category,
                                    payment_method: getRandomItem(PAYMENT_METHODS)
                                }
                            });
                        }
                    }
                }
            }
        }
    });

    return { users, events: allEvents };
}
