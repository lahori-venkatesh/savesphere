
// Re-export everything from the separate files
export * from './types';
export * from './userData';
export * from './dealsData';
export * from './utils';
export { mockNotifications } from './notificationsData';

// If needed, we can add the dealCategories here
export const dealCategories = [
  "All Deals",
  "Groceries",
  "Restaurants & Dining",
  "Coffee & Beverages",
  "Clothing & Fashion",
  "Electronics",
  "Home & Garden",
  "Health & Beauty",
  "Entertainment",
  "Travel",
];

// Re-export the currentUser
export { currentUser } from './userData';
