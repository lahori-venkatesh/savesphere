
import { Deal } from './types';

// Mock deals data
export const mockDeals: Deal[] = [
  {
    id: "d1",
    title: "50% Off All Produce",
    description: "Get 50% off all fresh produce until end of day!",
    discount: "50%",
    store: "Whole Foods Market",
    category: "Groceries",
    dealType: "in-store", // Added dealType property
    location: {
      address: "123 Main St, San Francisco, CA",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    expiresAt: new Date(Date.now() + 3600000 * 5).toISOString(), // 5 hours from now
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    postedBy: {
      id: "u2",
      name: "Jamie Smith",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    verified: 12,
    flagged: 0,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    userCategories: ["family", "professional"]
  },
  {
    id: "d2",
    title: "Buy 1 Get 1 Free Lattes",
    description: "Buy one latte, get one free! Perfect for bringing a friend.",
    discount: "BOGO",
    store: "Starbucks",
    category: "Coffee & Beverages",
    dealType: "in-store", // Added dealType property
    location: {
      address: "456 Market St, San Francisco, CA",
      coordinates: {
        lat: 37.7899,
        lng: -122.4014,
      },
    },
    expiresAt: new Date(Date.now() + 3600000 * 24).toISOString(), // 24 hours from now
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
    postedBy: {
      id: "u3",
      name: "Riley Chen",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    verified: 8,
    flagged: 1,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1937&q=80",
    userCategories: ["student", "professional"]
  },
  {
    id: "d3",
    title: "30% Off All Athleisure",
    description: "Flash sale on all athleisure wear. Discount applied at checkout.",
    discount: "30%",
    store: "Lululemon",
    category: "Clothing & Fashion",
    dealType: "in-store", // Added dealType property
    location: {
      address: "789 Union Square, San Francisco, CA",
      coordinates: {
        lat: 37.7879,
        lng: -122.4075,
      },
    },
    expiresAt: new Date(Date.now() + 3600000 * 48).toISOString(), // 48 hours from now
    createdAt: new Date(Date.now() - 3600000 * 10).toISOString(), // 10 hours ago
    postedBy: {
      id: "u4",
      name: "Morgan Taylor",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    verified: 15,
    flagged: 0,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    userCategories: ["student"]
  },
  {
    id: "d4",
    title: "75% Off Clearance Electronics",
    description: "Massive clearance on last season's electronics. Limited quantities!",
    discount: "75%",
    store: "Best Buy",
    category: "Electronics",
    dealType: "in-store", // Added dealType property
    location: {
      address: "101 Technology Ave, San Francisco, CA",
      coordinates: {
        lat: 37.7739,
        lng: -122.4312,
      },
    },
    expiresAt: new Date(Date.now() + 3600000 * 10).toISOString(), // 10 hours from now
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(), // 1 hour ago
    postedBy: {
      id: "u5",
      name: "Casey Kim",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    verified: 6,
    flagged: 2,
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1801&q=80",
    userCategories: ["professional"]
  },
  {
    id: "d5",
    title: "20% Off Weekend Brunch",
    description: "Enjoy 20% off our weekend brunch menu, including mimosas!",
    discount: "20%",
    store: "The Breakfast Club",
    category: "Restaurants & Dining",
    dealType: "in-store", // Added dealType property
    location: {
      address: "202 Foodie Lane, San Francisco, CA",
      coordinates: {
        lat: 37.7855,
        lng: -122.4230,
      },
    },
    expiresAt: new Date(Date.now() + 3600000 * 72).toISOString(), // 72 hours from now
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(), // 18 hours ago
    postedBy: {
      id: "u6",
      name: "Jordan Webb",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    verified: 22,
    flagged: 0,
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    userCategories: ["family"]
  },
  // Student-specific deals
  {
    id: "d6",
    title: "50% Off Dominos Near Colleges",
    description: "Flash sale on all pizzas near college campuses. Valid student ID required.",
    discount: "50%",
    store: "Dominos Pizza",
    category: "Restaurants & Dining",
    dealType: "in-store", // Added dealType property
    location: {
      address: "123 University Ave, Mumbai, Maharashtra",
      coordinates: {
        lat: 19.0760,
        lng: 72.8777,
      },
    },
    expiresAt: new Date(Date.now() + 3600000 * 48).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    postedBy: {
      id: "u3",
      name: "Riley Chen",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    verified: 18,
    flagged: 0,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    userCategories: ["student"]
  },
  // Family deal
  {
    id: "d7",
    title: "30% Off Big Bazaar Groceries",
    description: "Weekend family special on all groceries. Perfect for bulk shopping.",
    discount: "30%",
    store: "Big Bazaar",
    category: "Groceries",
    dealType: "in-store", // Added dealType property
    location: {
      address: "456 Shopping Mall, Mumbai, Maharashtra",
      coordinates: {
        lat: 19.0825,
        lng: 72.8900,
      },
    },
    expiresAt: new Date(Date.now() + 3600000 * 72).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    postedBy: {
      id: "u6",
      name: "Jordan Webb",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    verified: 26,
    flagged: 0,
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    userCategories: ["family"]
  },
  // Professional deal
  {
    id: "d8",
    title: "Lunch Discount at Office Complex",
    description: "Special lunch offer for office workers. Valid on weekdays only.",
    discount: "25%",
    store: "Office Canteen",
    category: "Restaurants & Dining",
    dealType: "in-store", // Added dealType property
    location: {
      address: "789 Business Park, Mumbai, Maharashtra",
      coordinates: {
        lat: 19.0650,
        lng: 72.8890,
      },
    },
    expiresAt: new Date(Date.now() + 3600000 * 5).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    postedBy: {
      id: "u4",
      name: "Morgan Taylor",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    verified: 12,
    flagged: 0,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    userCategories: ["professional"]
  },
  // Let's add some online and affiliate deals
  {
    id: "d9",
    title: "FLAT 500 Off on Electronics",
    description: "Use code TECHSAVE500 at checkout for ₹500 off on all electronics over ₹3000.",
    discount: "₹500",
    store: "Amazon",
    category: "Electronics",
    dealType: "online",
    promoCode: "TECHSAVE500",
    platform: "Amazon",
    location: {
      address: "Online",
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
    expiresAt: new Date(Date.now() + 3600000 * 72).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    postedBy: {
      id: "u2",
      name: "Jamie Smith",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    verified: 30,
    flagged: 0,
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
    userCategories: ["student", "professional", "family"]
  },
  {
    id: "d10",
    title: "40% Off First Myntra Order",
    description: "Exclusive 40% discount on your first order with Myntra. Limited time offer!",
    discount: "40%",
    store: "Myntra",
    category: "Clothing & Fashion",
    dealType: "affiliate",
    affiliateUrl: "https://www.myntra.com/?utm=savesphere&code=FIRST40",
    platform: "Myntra",
    location: {
      address: "Online",
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
    expiresAt: new Date(Date.now() + 3600000 * 48).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    postedBy: {
      id: "u3",
      name: "Riley Chen",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    verified: 15,
    flagged: 0,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    userCategories: ["student", "family"]
  }
];

// Categories for filtering
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
