
import React from 'react';
import MapView from '@/components/ui/MapView';
import DealCard from '@/components/ui/DealCard';
import { Deal } from '@/utils/types';

interface MapViewContainerProps {
  selectedDeal: Deal | null;
  onDealSelect: (deal: Deal) => void;
  onRedeem: (deal: Deal) => void;
}

const MapViewContainer: React.FC<MapViewContainerProps> = ({
  selectedDeal,
  onDealSelect,
  onRedeem,
}) => {
  return (
    <>
      <MapView 
        onDealSelect={onDealSelect} 
        className="rounded-xl shadow-md min-h-[400px]" 
      />
      
      {selectedDeal && (
        <div className="mt-4 animate-slide-up">
          <h3 className="text-lg font-medium mb-2">Selected Deal</h3>
          <DealCard 
            deal={selectedDeal} 
            onRedeem={onRedeem}
          />
        </div>
      )}
    </>
  );
};

export default MapViewContainer;
