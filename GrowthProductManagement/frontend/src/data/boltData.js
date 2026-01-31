/**
 * Mock Bolt Ride Data
 * ---------------------
 * Simulating a dataset of 50 recent rides.
 * Focus: Lower Price, High Promotional Activity, Younger Demographic.
 */
export const boltData = [
    { id: "b_1", timestamp: "2024-03-10T08:35:00", event: "Ride Completed", user_id: "user_b1", gender: "Female", city: "London", product: "Bolt", price: 12.50, distance_miles: 5.2, surge_multiplier: 1.0, discount_applied: true, rating: 4, status: "completed" },
    { id: "b_2", timestamp: "2024-03-10T08:50:00", event: "Ride Completed", user_id: "user_b2", gender: "Male", city: "London", product: "Bolt", price: 14.00, distance_miles: 6.0, surge_multiplier: 1.0, discount_applied: true, rating: 5, status: "completed" },
    { id: "b_3", timestamp: "2024-03-10T09:10:00", event: "Ride Completed", user_id: "user_b3", gender: "Male", city: "Paris", product: "Bolt Green", price: 18.00, distance_miles: 4.5, surge_multiplier: 1.0, discount_applied: false, rating: 5, status: "completed" },
    { id: "b_4", timestamp: "2024-03-10T18:15:00", event: "Ride Completed", user_id: "user_b1", gender: "Female", city: "London", product: "Bolt", price: 13.00, distance_miles: 5.2, surge_multiplier: 1.1, discount_applied: true, rating: 4, status: "completed" },
    { id: "b_5", timestamp: "2024-03-11T08:40:00", event: "Ride Completed", user_id: "user_b4", gender: "Non-binary", city: "London", product: "Bolt", price: 11.00, distance_miles: 3.0, surge_multiplier: 1.0, discount_applied: true, rating: 3, status: "completed" },
    { id: "b_6", timestamp: "2024-03-11T20:00:00", event: "Ride Cancelled", user_id: "user_b5", gender: "Female", city: "Paris", product: "Bolt", price: 0, distance_miles: 0, surge_multiplier: 1.5, discount_applied: false, rating: null, status: "cancelled_driver_delay" },
    { id: "b_7", timestamp: "2024-03-12T08:20:00", event: "Ride Completed", user_id: "user_b1", gender: "Female", city: "London", product: "Bolt", price: 15.00, distance_miles: 5.2, surge_multiplier: 1.3, discount_applied: true, rating: 4, status: "completed" },
    { id: "b_8", timestamp: "2024-03-12T09:05:00", event: "Ride Completed", user_id: "user_b6", gender: "Male", city: "London", product: "Bolt Lite", price: 9.00, distance_miles: 2.5, surge_multiplier: 1.0, discount_applied: false, rating: 4, status: "completed" },
    { id: "b_9", timestamp: "2024-03-12T19:40:00", event: "Ride Completed", user_id: "user_b7", gender: "Male", city: "London", product: "Bolt", price: 20.00, distance_miles: 8.0, surge_multiplier: 1.0, discount_applied: true, rating: 5, status: "completed" },
    { id: "b_10", timestamp: "2024-03-13T07:10:00", event: "Ride Completed", user_id: "user_b8", gender: "Female", city: "Paris", product: "Bolt", price: 25.00, distance_miles: 12.0, surge_multiplier: 1.0, discount_applied: false, rating: 5, status: "completed" },
    { id: "b_11", timestamp: "2024-03-13T12:15:00", event: "Ride Completed", user_id: "user_b9", gender: "Male", city: "London", product: "Bolt", price: 12.00, distance_miles: 4.0, surge_multiplier: 1.0, discount_applied: true, rating: 5, status: "completed" },
    { id: "b_12", timestamp: "2024-03-13T18:30:00", event: "Ride Completed", user_id: "user_b1", gender: "Female", city: "London", product: "Bolt", price: 16.00, distance_miles: 5.2, surge_multiplier: 1.4, discount_applied: true, rating: 3, status: "completed" },
    { id: "b_13", timestamp: "2024-03-14T01:15:00", event: "Ride Completed", user_id: "user_b10", gender: "Male", city: "Paris", product: "Bolt", price: 30.00, distance_miles: 7.0, surge_multiplier: 1.8, discount_applied: false, rating: 5, status: "completed" },
    { id: "b_14", timestamp: "2024-03-14T08:05:00", event: "Ride Completed", user_id: "user_b11", gender: "Female", city: "London", product: "Bolt Lite", price: 8.50, distance_miles: 3.0, surge_multiplier: 1.0, discount_applied: false, rating: 4, status: "completed" },
    { id: "b_15", timestamp: "2024-03-14T17:10:00", event: "Ride Cancelled", user_id: "user_b12", gender: "Male", city: "London", product: "Bolt", price: 0, distance_miles: 0, surge_multiplier: 1.2, discount_applied: false, rating: null, status: "cancelled_user_changed_mind" },
    { id: "b_16", timestamp: "2024-03-15T20:15:00", event: "Ride Completed", user_id: "user_b3", gender: "Male", city: "Paris", product: "Bolt Green", price: 22.00, distance_miles: 6.0, surge_multiplier: 1.0, discount_applied: false, rating: 5, status: "completed" }
];
