
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, MapPin } from 'lucide-react';
import { currentUser } from '@/utils/mockData';
import { cn } from '@/lib/utils';

interface HeaderProps {
  showSearch?: boolean;
  showLocation?: boolean;
  currentLocation?: string;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  showSearch = true,
  showLocation = true,
  currentLocation = "San Francisco, CA",
  transparent = false,
}) => {
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-3 px-4",
        transparent 
          ? "bg-transparent" 
          : "bg-background/80 backdrop-blur-lg border-b"
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <Link 
            to="/" 
            className="flex items-center"
          >
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              SaveSphere
            </span>
          </Link>
          
          {showLocation && (
            <div className="hidden md:flex items-center text-sm text-muted-foreground">
              <MapPin size={14} className="mr-1" />
              <span className="truncate max-w-[120px]">{currentLocation}</span>
            </div>
          )}
        </div>
        
        {showSearch && (
          <div className="relative hidden sm:block flex-1 max-w-md mx-4">
            <div className="flex items-center h-9 rounded-full bg-muted px-3 text-sm">
              <Search size={16} className="text-muted-foreground mr-2" />
              <input 
                type="text"
                placeholder="Search deals & stores..."
                className="bg-transparent outline-none w-full" 
              />
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-4">
          <Link to="/notifications">
            <div className="relative">
              <Bell size={20} className="text-foreground/80 hover:text-primary transition-colors" />
              <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </div>
          </Link>
          
          <Link to="/profile">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-muted overflow-hidden border border-border">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:flex items-center">
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {currentUser.points} pts
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
