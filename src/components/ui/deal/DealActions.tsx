
import React from 'react';
import { QrCode, ShoppingCart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Deal } from '@/utils/types';

interface DealActionsProps {
  deal: Deal;
  onRedeem?: (deal: Deal) => void;
}

const DealActions: React.FC<DealActionsProps> = ({
  deal,
  onRedeem
}) => {
  const handleRedeem = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRedeem) {
      onRedeem(deal);
    }
  };

  if (!onRedeem) return null;

  return (
    <div className="flex space-x-2 mb-4">
      {deal.dealType === 'in-store' && (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center"
          onClick={handleRedeem}
        >
          <QrCode size={14} className="mr-1" />
          Show Code
        </Button>
      )}
      
      {deal.dealType === 'online' && (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center"
          onClick={handleRedeem}
        >
          <ShoppingCart size={14} className="mr-1" />
          Shop Now
        </Button>
      )}
      
      {deal.dealType === 'affiliate' && (
        <Button 
          variant="default" 
          size="sm" 
          className="w-full flex items-center justify-center"
          onClick={handleRedeem}
        >
          <ExternalLink size={14} className="mr-1" />
          Get Deal
        </Button>
      )}
    </div>
  );
};

export default DealActions;
