
import React from 'react';
import { cn } from '@/lib/utils';

interface PointsBadgeProps {
  points: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

const PointsBadge: React.FC<PointsBadgeProps> = ({
  points,
  size = 'md',
  className,
  animated = false,
}) => {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-0.5',
    lg: 'text-base px-3 py-1',
  };
  
  return (
    <div 
      className={cn(
        "bg-primary/10 text-primary rounded-full font-medium flex items-center justify-center",
        sizeClasses[size],
        animated && "animate-pulse-subtle",
        className
      )}
    >
      {points} pts
    </div>
  );
};

export default PointsBadge;
