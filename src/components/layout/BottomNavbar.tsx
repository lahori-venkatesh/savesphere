
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/',
    },
    {
      icon: Search,
      label: 'Explore',
      path: '/explore',
    },
    {
      icon: PlusCircle,
      label: 'Add Deal',
      path: '/add-deal',
      highlight: true,
    },
    {
      icon: Bell,
      label: 'Notifications',
      path: '/notifications',
      badge: 2,
    },
    {
      icon: User,
      label: 'Profile',
      path: '/profile',
    },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t py-1 sm:py-2">
      <div className="flex items-center justify-around max-w-xl mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center py-1 px-3 rounded-lg transition-all",
              currentPath === item.path 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground",
              item.highlight && "text-primary"
            )}
          >
            <div className="relative">
              <item.icon 
                size={item.highlight ? 24 : 20} 
                className={cn(
                  "transition-all duration-200",
                  currentPath === item.path ? "animate-scale-in" : "",
                  item.highlight && "text-primary"
                )} 
              />
              
              {item.badge && (
                <span className="absolute -top-1 -right-1 bg-destructive text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;
