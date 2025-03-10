
import { Notification } from './types';

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "deal_expiring",
    title: "Deal Expiring Soon",
    message: "The 50% off at Whole Foods expires in 2 hours!",
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    read: false,
    relatedDealId: "d1",
  },
  {
    id: "n2",
    type: "points_earned",
    title: "Points Earned",
    message: "You earned 10 points for posting a new deal!",
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    read: true,
  },
  {
    id: "n3",
    type: "deal_verified",
    title: "Deal Verified",
    message: "5 people verified your Starbucks BOGO deal!",
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    read: true,
    relatedDealId: "d2",
  },
  {
    id: "n4",
    type: "new_deal",
    title: "New Deal Nearby",
    message: "New electronics deal at Best Buy just 0.5 miles away!",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    read: false,
    relatedDealId: "d4",
  },
];
