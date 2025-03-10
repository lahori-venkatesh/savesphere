
import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatTimeRemaining, getExpiryColor } from '@/utils/utils';
import DealTypeIndicator from './DealTypeIndicator';

interface DealHeaderProps {
  title: string;
  store: string;
  category: string;
  dealType: "in-store" | "online" | "affiliate";
  expiresAt: string;
  location?: {
    address: string;
  };
  platform?: string;
}

const DealHeader: React.FC<DealHeaderProps> = ({
  title,
  store,
  category,
  dealType,
  expiresAt,
  location,
  platform
}) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
        <DealTypeIndicator dealType={dealType} className="text-xs ml-2" />
      </div>
      
      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <span className="font-medium text-foreground">{store}</span>
        <span className="mx-1.5">•</span>
        {dealType === 'in-store' && location ? (
          <span className="text-xs flex items-center">
            <MapPin size={12} className="mr-0.5" />
            <span className="truncate max-w-[120px]">{location.address.split(',')[0]}</span>
          </span>
        ) : (
          <span className="text-xs flex items-center">
            {platform && (
              <>
                <DealTypeIndicator dealType={dealType} showLabel={false} iconSize={12} />
                <span>{platform}</span>
              </>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default DealHeader;
