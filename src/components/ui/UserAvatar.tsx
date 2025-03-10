
import React from 'react';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  border?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt,
  size = 'md',
  className,
  border = false,
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };
  
  return (
    <div 
      className={cn(
        "rounded-full overflow-hidden bg-muted flex-shrink-0",
        sizeClasses[size],
        border && "border-2 border-background",
        className
      )}
    >
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default UserAvatar;
