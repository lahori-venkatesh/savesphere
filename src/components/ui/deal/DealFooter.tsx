
import React from 'react';
import { ThumbsUp, Flag } from 'lucide-react';
import UserAvatar from '@/components/ui/UserAvatar';
import { formatDistanceToNow } from '@/utils/utils';

interface DealFooterProps {
  postedBy: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  verified: number;
  flagged: number;
}

const DealFooter: React.FC<DealFooterProps> = ({
  postedBy,
  createdAt,
  verified,
  flagged
}) => {
  return (
    <div className="flex items-center justify-between mt-auto">
      <div className="flex items-center space-x-2">
        <UserAvatar src={postedBy.avatar} alt={postedBy.name} size="sm" />
        <div className="flex flex-col">
          <span className="text-xs line-clamp-1">{postedBy.name}</span>
          <span className="text-xs text-muted-foreground">{formatDistanceToNow(createdAt)}</span>
        </div>
      </div>
      
      <div className="flex space-x-3 text-muted-foreground">
        <div className="flex items-center text-xs">
          <ThumbsUp size={14} className="mr-1 text-success" />
          <span>{verified}</span>
        </div>
        
        {flagged > 0 && (
          <div className="flex items-center text-xs">
            <Flag size={14} className="mr-1 text-destructive" />
            <span>{flagged}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealFooter;
