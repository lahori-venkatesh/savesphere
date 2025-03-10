
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Deal } from '@/utils/types';
import { formatTimeRemaining, getExpiryColor } from '@/utils/utils';
import PromoCodeDisplay from './deal/PromoCodeDisplay';
import DealTypeIndicator from './deal/DealTypeIndicator';
import DealHeader from './deal/DealHeader';
import DealActions from './deal/DealActions';
import DealFooter from './deal/DealFooter';

interface DealCardProps {
  deal: Deal;
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onRedeem?: (deal: Deal) => void;
}

const DealCard: React.FC<DealCardProps> = ({
  deal,
  compact = false,
  className,
  style,
  onRedeem
}) => {
  return (
    <Link 
      to={`/deal/${deal.id}`}
      className={cn(
        "deal-card block rounded-xl overflow-hidden bg-background border shadow-soft hover:shadow-md transition-all duration-300 transform hover:-translate-y-1",
        compact ? "h-full" : "",
        className
      )}
      style={style}
    >
      <div className="relative">
        <div className="aspect-[5/3] bg-muted overflow-hidden">
          <img 
            src={deal.image} 
            alt={deal.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        </div>
        
        <div className="absolute top-3 left-3 flex space-x-2">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm text-foreground">
            {deal.category}
          </span>
        </div>
        
        <div className="absolute top-3 right-3">
          <span className={cn(
            "text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm",
            getExpiryColor(deal.expiresAt)
          )}>
            {formatTimeRemaining(deal.expiresAt)}
          </span>
        </div>
      </div>
      
      <DealHeader 
        title={deal.title}
        store={deal.store}
        category={deal.category}
        dealType={deal.dealType}
        expiresAt={deal.expiresAt}
        location={deal.location}
        platform={deal.platform}
      />
      
      <div className="px-4 pb-4">
        <div className="mb-3">
          <span className="font-bold text-xl text-primary">
            {deal.discount} OFF
          </span>
        </div>
        
        {!compact && deal.dealType === 'online' && deal.promoCode && (
          <PromoCodeDisplay code={deal.promoCode} className="mb-3" />
        )}
        
        {!compact && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {deal.description}
          </p>
        )}
        
        {!compact && <DealActions deal={deal} onRedeem={onRedeem} />}
        
        <DealFooter 
          postedBy={deal.postedBy}
          createdAt={deal.createdAt}
          verified={deal.verified}
          flagged={deal.flagged}
        />
      </div>
    </Link>
  );
};

export default DealCard;
