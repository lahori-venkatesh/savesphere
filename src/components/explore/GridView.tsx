
import React from 'react';
import DealCard from '@/components/ui/DealCard';
import { Deal } from '@/utils/types';

interface GridViewProps {
  deals: Deal[];
  onRedeem: (deal: Deal) => void;
}

const GridView: React.FC<GridViewProps> = ({ deals, onRedeem }) => {
  if (deals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-medium mb-2">No deals found</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals.map((deal, index) => (
        <DealCard
          key={deal.id}
          deal={deal}
          className="animate-slide-up"
          style={{ animationDelay: `${50 + index * 50}ms` }}
          onRedeem={onRedeem}
        />
      ))}
    </div>
  );
};

export default GridView;
