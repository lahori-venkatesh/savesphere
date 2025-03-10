
import React from 'react';
import { Store, Globe, ExternalLink } from 'lucide-react';

interface DealTypeIndicatorProps {
  dealType: "in-store" | "online" | "affiliate";
  className?: string;
  showLabel?: boolean;
  iconSize?: number;
}

const DealTypeIndicator: React.FC<DealTypeIndicatorProps> = ({
  dealType,
  className = "",
  showLabel = true,
  iconSize = 14
}) => {
  const getDealTypeIcon = () => {
    switch (dealType) {
      case 'in-store':
        return <Store size={iconSize} className="mr-1 text-primary" />;
      case 'online':
        return <Globe size={iconSize} className="mr-1 text-blue-500" />;
      case 'affiliate':
        return <ExternalLink size={iconSize} className="mr-1 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <span className={`flex items-center ${className}`}>
      {getDealTypeIcon()}
      {showLabel && (
        <span>
          {dealType === 'in-store' ? 'In-Store' : 
           dealType === 'online' ? 'Online' : 'Affiliate'}
        </span>
      )}
    </span>
  );
};

export default DealTypeIndicator;
