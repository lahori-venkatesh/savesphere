
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bell, 
  Clock, 
  Tag, 
  Award, 
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNavbar from '@/components/layout/BottomNavbar';
import { mockNotifications } from '@/utils/mockData';
import { cn } from '@/lib/utils';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'deal_expiring':
        return <Clock className="text-warning" />;
      case 'points_earned':
        return <Award className="text-primary" />;
      case 'deal_verified':
        return <CheckCircle className="text-success" />;
      case 'new_deal':
        return <Tag className="text-primary" />;
      default:
        return <Bell className="text-muted-foreground" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header showSearch={false} />
      
      <main className="pt-16 px-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 text-foreground/80 hover:text-foreground"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold ml-2">Notifications</h1>
          </div>
          
          <button className="text-sm text-primary">
            Mark all as read
          </button>
        </div>
        
        {mockNotifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <Bell size={48} className="text-muted" />
            </div>
            <h2 className="text-lg font-medium mb-2">No notifications yet</h2>
            <p className="text-muted-foreground">
              When you receive notifications, they'll appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockNotifications.map((notification, index) => (
              <div 
                key={notification.id}
                className={cn(
                  "p-4 rounded-lg border",
                  notification.read ? "bg-background" : "bg-primary/5 border-primary/10",
                  "animate-slide-up"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => notification.relatedDealId && navigate(`/deal/${notification.relatedDealId}`)}
              >
                <div className="flex">
                  <div className={cn(
                    "p-3 rounded-full mr-4",
                    notification.read ? "bg-muted" : "bg-primary/10"
                  )}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-medium",
                      !notification.read && "text-primary"
                    )}>
                      {notification.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">
                      {new Date(notification.timestamp).toLocaleString()}
                    </div>
                  </div>
                  
                  {!notification.read && (
                    <div className="ml-2 w-2 h-2 rounded-full bg-primary self-start mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Notifications;
