
import React, { useState } from 'react';
import { Search, Map as MapIcon, List, X, Filter } from 'lucide-react';
import { Deal } from '@/utils/types';
import { mockDeals } from '@/utils/dealsData';
import { cn } from '@/lib/utils';

interface MapViewProps {
  onDealSelect?: (deal: Deal) => void;
  className?: string;
}

const MapView: React.FC<MapViewProps> = ({
  onDealSelect,
  className,
}) => {
  const [isMapView, setIsMapView] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // This is a placeholder for an actual map implementation
  // In a real app, you would use a library like react-map-gl or Google Maps API
  return (
    <div className={cn("relative w-full rounded-xl overflow-hidden", className)}>
      {isMapView ? (
        <div className="aspect-[3/2] sm:aspect-[2/1] bg-gray-100 relative">
          {/* Placeholder for map - in a real app this would be a MapboxGL or Google Maps component */}
          <div className="absolute inset-0 flex items-center justify-center flex-col bg-gradient-to-b from-[#e2f1f8] to-[#e0edff] overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <MapIcon 
                size={48} 
                className="text-primary/20 absolute animate-pulse-subtle"
              />
              <div className="text-primary/70 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="300"
                  height="300"
                  viewBox="0 0 100 100"
                  className="w-full h-full max-w-xs opacity-20"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    d="M10,10 L90,10 L90,90 L10,90 Z"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    d="M30,10 L30,90 M50,10 L50,90 M70,10 L70,90 M10,30 L90,30 M10,50 L90,50 M10,70 L90,70"
                  />
                  <circle cx="30" cy="30" r="3" fill="currentColor" />
                  <circle cx="50" cy="70" r="3" fill="currentColor" />
                  <circle cx="70" cy="50" r="3" fill="currentColor" />
                  <circle cx="40" cy="20" r="1" fill="currentColor" />
                  <circle cx="60" cy="40" r="1" fill="currentColor" />
                  <circle cx="80" cy="60" r="1" fill="currentColor" />
                  <circle cx="20" cy="80" r="1" fill="currentColor" />
                </svg>
              </div>
            </div>
            
            {/* Map pins would go here, but we're using placeholders */}
            {mockDeals.map((deal) => (
              <div 
                key={deal.id}
                className="absolute rounded-full border-2 border-background shadow-md cursor-pointer transform transition-transform hover:scale-110 animate-bounce-gentle"
                style={{
                  background: deal.expiresAt < new Date().toISOString() ? "#f87171" : "#10b981",
                  width: "1.5rem", 
                  height: "1.5rem",
                  left: `${(deal.location.coordinates.lng + 123) * 5}%`,
                  top: `${(deal.location.coordinates.lat - 37) * 30}%`,
                }}
                onClick={() => onDealSelect && onDealSelect(deal)}
              >
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-background text-xs font-medium px-2 py-0.5 rounded whitespace-nowrap shadow-sm border">
                  {deal.discount} at {deal.store}
                </div>
              </div>
            ))}
          </div>
          
          {/* Map controls overlay */}
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm border p-1.5 flex space-x-1">
            <button 
              className="p-1.5 rounded-md bg-primary text-primary-foreground"
              aria-label="Map view"
            >
              <MapIcon size={18} />
            </button>
            <button 
              className="p-1.5 rounded-md text-muted-foreground hover:bg-muted"
              aria-label="List view"
              onClick={() => setIsMapView(false)}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-muted/50 rounded-xl flex items-center justify-center min-h-[200px]">
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            onClick={() => setIsMapView(true)}
          >
            <MapIcon size={18} />
            <span>Show Map View</span>
          </button>
        </div>
      )}
      
      {/* Search overlay */}
      <div className="absolute top-4 left-4 right-20 z-10">
        {showSearch ? (
          <div className="flex items-center bg-background/90 backdrop-blur-sm rounded-full shadow-sm border overflow-hidden transition-all animate-scale-in">
            <Search size={18} className="ml-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for deals, stores, or categories..."
              className="py-2 px-3 flex-1 outline-none bg-transparent text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button 
              className="p-2 text-muted-foreground hover:text-foreground"
              onClick={() => {
                setSearchQuery('');
                setShowSearch(false);
              }}
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button 
              className="p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-sm border text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowSearch(true)}
            >
              <Search size={18} />
            </button>
            <button 
              className="p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-sm border text-muted-foreground hover:text-foreground transition-colors"
            >
              <Filter size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
