/**
 * Mock Uber Ride Datal
 * ---------------------
 * Simulating a dataset of 50 recent rides.
 * Focus: High Surge, Premium Users (Uber Black), High Reliability.
 */
export const uberData = [
    { id: "u_1", timestamp: "2024-03-10T08:30:00", event: "Ride Completed", user_id: "user_a", gender: "Male", city: "New York", product: "UberX", price: 25.50, distance_miles: 5.2, surge_multiplier: 1.2, rating: 5, status: "completed" },
    { id: "u_2", timestamp: "2024-03-10T08:45:00", event: "Ride Cancelled", user_id: "user_b", gender: "Female", city: "New York", product: "UberX", price: 0, distance_miles: 0, surge_multiplier: 2.5, rating: null, status: "cancelled_user_price_too_high" },
    { id: "u_3", timestamp: "2024-03-10T09:00:00", event: "Ride Completed", user_id: "user_c", gender: "Female", city: "San Francisco", product: "Uber Black", price: 85.00, distance_miles: 12.0, surge_multiplier: 1.0, rating: 5, status: "completed" },
    { id: "u_4", timestamp: "2024-03-10T18:00:00", event: "Ride Completed", user_id: "user_a", gender: "Male", city: "New York", product: "UberX", price: 32.00, distance_miles: 5.5, surge_multiplier: 1.8, rating: 4, status: "completed" },
    { id: "u_5", timestamp: "2024-03-11T08:30:00", event: "Ride Completed", user_id: "user_d", gender: "Male", city: "London", product: "UberX", price: 15.00, distance_miles: 2.0, surge_multiplier: 1.0, rating: 5, status: "completed" },
    { id: "u_6", timestamp: "2024-03-11T22:00:00", event: "Ride Completed", user_id: "user_c", gender: "Female", city: "San Francisco", product: "Uber Black", price: 90.00, distance_miles: 11.5, surge_multiplier: 1.1, rating: 5, status: "completed" },
    { id: "u_7", timestamp: "2024-03-12T08:15:00", event: "Ride Completed", user_id: "user_a", gender: "Male", city: "New York", product: "Uber Pool", price: 12.00, distance_miles: 5.2, surge_multiplier: 1.0, rating: 3, status: "completed" },
    { id: "u_8", timestamp: "2024-03-12T09:00:00", event: "Ride Completed", user_id: "user_e", gender: "Female", city: "New York", product: "UberX", price: 28.00, distance_miles: 3.0, surge_multiplier: 1.5, rating: 5, status: "completed" },
    { id: "u_9", timestamp: "2024-03-12T19:30:00", event: "Ride Cancelled", user_id: "user_f", gender: "Male", city: "London", product: "UberX", price: 0, distance_miles: 0, surge_multiplier: 1.0, rating: null, status: "cancelled_driver_not_found" },
    { id: "u_10", timestamp: "2024-03-13T07:00:00", event: "Ride Completed", user_id: "user_c", gender: "Female", city: "San Francisco", product: "Uber Black", price: 110.00, distance_miles: 25.0, surge_multiplier: 1.0, rating: 5, status: "completed" },
    // ... Simulating more data points
    { id: "u_11", timestamp: "2024-03-13T12:00:00", event: "Ride Completed", user_id: "user_g", gender: "Non-binary", city: "New York", product: "UberX", price: 18.50, distance_miles: 2.2, surge_multiplier: 1.0, rating: 5, status: "completed" },
    { id: "u_12", timestamp: "2024-03-13T12:30:00", event: "Ride Completed", user_id: "user_h", gender: "Male", city: "London", product: "UberX", price: 22.00, distance_miles: 6.0, surge_multiplier: 1.0, rating: 4, status: "completed" },
    { id: "u_13", timestamp: "2024-03-14T01:00:00", event: "Ride Completed", user_id: "user_i", gender: "Female", city: "New York", product: "UberX", price: 45.00, distance_miles: 8.0, surge_multiplier: 2.8, rating: 5, status: "completed" },
    { id: "u_14", timestamp: "2024-03-14T08:00:00", event: "Ride Completed", user_id: "user_a", gender: "Male", city: "New York", product: "UberX", price: 26.00, distance_miles: 5.2, surge_multiplier: 1.2, rating: 5, status: "completed" },
    { id: "u_15", timestamp: "2024-03-14T17:00:00", event: "Ride Cancelled", user_id: "user_j", gender: "Male", city: "San Francisco", product: "UberX", price: 0, distance_miles: 0, surge_multiplier: 1.9, rating: null, status: "cancelled_user_price_too_high" },
    { id: "u_16", timestamp: "2024-03-15T20:00:00", event: "Ride Completed", user_id: "user_c", gender: "Female", city: "San Francisco", product: "Uber Black", price: 75.00, distance_miles: 8.0, surge_multiplier: 1.0, rating: 5, status: "completed" },
    { id: "u_17", timestamp: "2024-03-15T21:00:00", event: "Ride Completed", user_id: "user_k", gender: "Female", city: "New York", product: "Uber Pool", price: 14.00, distance_miles: 4.5, surge_multiplier: 1.0, rating: 4, status: "completed" },
    { id: "u_18", timestamp: "2024-03-16T10:00:00", event: "Ride Completed", user_id: "user_l", gender: "Male", city: "London", product: "UberX", price: 30.00, distance_miles: 10.0, surge_multiplier: 1.0, rating: 5, status: "completed" },
    { id: "u_19", timestamp: "2024-03-16T14:00:00", event: "Ride Completed", user_id: "user_m", gender: "Non-binary", city: "New York", product: "UberX", price: 20.00, distance_miles: 3.5, surge_multiplier: 1.1, rating: 5, status: "completed" },
    { id: "u_20", timestamp: "2024-03-17T09:00:00", event: "Ride Completed", user_id: "user_a", gender: "Male", city: "New York", product: "UberX", price: 25.50, distance_miles: 5.2, surge_multiplier: 1.2, rating: 5, status: "completed" }
];
