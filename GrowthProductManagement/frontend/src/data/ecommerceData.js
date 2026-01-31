/**
 * Mock E-Commerce Data
 * ---------------------
 * Token: ca0f815a715168cb4f637b2a02f59777
 * Events: View Item, Add to Cart, Purchase, Refund
 */
export const ecommerceData = [
    // User 1: Direct traffic, buys Shoes (Mobile)
    { id: "e_1", timestamp: "2024-03-20T10:00:00", event: "View Item", user_id: "u_101", category: "Shoes", price: 120, gender: "Male", device: "Mobile", source: "Direct", status: "success" },
    { id: "e_2", timestamp: "2024-03-20T10:05:00", event: "Add to Cart", user_id: "u_101", category: "Shoes", price: 120, gender: "Male", device: "Mobile", source: "Direct", status: "success" },
    { id: "e_3", timestamp: "2024-03-20T10:10:00", event: "Purchase", user_id: "u_101", category: "Shoes", price: 120, gender: "Male", device: "Mobile", source: "Direct", status: "completed" },

    // User 2: Instagram Ad, browses Electronics, Abandons Cart (Desktop)
    { id: "e_4", timestamp: "2024-03-20T11:00:00", event: "View Item", user_id: "u_102", category: "Electronics", price: 899, gender: "Female", device: "Desktop", source: "Instagram Ad", status: "success" },
    { id: "e_5", timestamp: "2024-03-20T11:15:00", event: "Add to Cart", user_id: "u_102", category: "Electronics", price: 899, gender: "Female", device: "Desktop", source: "Instagram Ad", status: "success" },
    // No purchase event = Abandoned

    // User 3: Google Search, buys multiple items (Desktop)
    { id: "e_6", timestamp: "2024-03-20T12:00:00", event: "View Item", user_id: "u_103", category: "Clothing", price: 45, gender: "Male", device: "Desktop", source: "Google Search", status: "success" },
    { id: "e_7", timestamp: "2024-03-20T12:05:00", event: "Add to Cart", user_id: "u_103", category: "Clothing", price: 45, gender: "Male", device: "Desktop", source: "Google Search", status: "success" },
    { id: "e_8", timestamp: "2024-03-20T12:10:00", event: "View Item", user_id: "u_103", category: "Accessories", price: 20, gender: "Male", device: "Desktop", source: "Google Search", status: "success" },
    { id: "e_9", timestamp: "2024-03-20T12:12:00", event: "Add to Cart", user_id: "u_103", category: "Accessories", price: 20, gender: "Male", device: "Desktop", source: "Google Search", status: "success" },
    { id: "e_10", timestamp: "2024-03-20T12:20:00", event: "Purchase", user_id: "u_103", category: "Mixed", price: 65, gender: "Male", device: "Desktop", source: "Google Search", status: "completed" },

    // User 4: Refund case (Defective item)
    { id: "e_11", timestamp: "2024-03-21T09:00:00", event: "Purchase", user_id: "u_104", category: "Electronics", price: 200, gender: "Female", device: "Mobile", source: "Email", status: "completed" },
    { id: "e_12", timestamp: "2024-03-23T09:00:00", event: "Refund", user_id: "u_104", category: "Electronics", price: 200, gender: "Female", device: "Mobile", source: "Email", status: "refunded", refund_reason: "defective" },

    // User 5, 6, 7: High AOV from Email Marketing
    { id: "e_13", timestamp: "2024-03-21T14:00:00", event: "Purchase", user_id: "u_105", category: "Electronics", price: 1200, gender: "Male", device: "Desktop", source: "Email", status: "completed" },
    { id: "e_14", timestamp: "2024-03-21T15:00:00", event: "Purchase", user_id: "u_106", category: "Furniture", price: 800, gender: "Female", device: "Tablet", source: "Email", status: "completed" },

    // User 8: Window Shopper (Mobile)
    { id: "e_15", timestamp: "2024-03-22T10:00:00", event: "View Item", user_id: "u_107", category: "Shoes", price: 80, gender: "Female", device: "Mobile", source: "TikTok", status: "success" },
    { id: "e_16", timestamp: "2024-03-22T10:05:00", event: "View Item", user_id: "u_107", category: "Clothing", price: 50, gender: "Female", device: "Mobile", source: "TikTok", status: "success" },

    // Generate 20 more random events
    ...Array.from({ length: 20 }).map((_, i) => ({
        id: `e_${20 + i}`,
        timestamp: "2024-03-22T12:00:00",
        event: Math.random() > 0.7 ? "Purchase" : (Math.random() > 0.4 ? "Add to Cart" : "View Item"),
        user_id: `u_${200 + i}`,
        category: ["Shoes", "Electronics", "Clothing", "Home"][Math.floor(Math.random() * 4)],
        price: Math.floor(Math.random() * 200) + 20,
        gender: Math.random() > 0.5 ? "Female" : "Male",
        device: Math.random() > 0.3 ? "Mobile" : "Desktop",
        source: ["Instagram Ad", "Google Search", "Direct", "TikTok"][Math.floor(Math.random() * 4)],
        status: "success"
    }))
];
