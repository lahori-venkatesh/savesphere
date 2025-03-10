
import React from 'react';
import { ChevronRight } from 'lucide-react';
import MapView from '@/components/ui/MapView';

const NearbyDealsSection: React.FC = () => {
  return (
    <section className="mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Nearby Deals</h2>
        <button className="text-sm text-primary flex items-center hover:underline">
          View all <ChevronRight size={16} />
        </button>
      </div>
      
      <MapView className="shadow-soft" />
    </section>
  );
};

export default NearbyDealsSection;
