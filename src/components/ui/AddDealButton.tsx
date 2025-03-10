
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddDealButtonProps {
  className?: string;
}

const AddDealButton: React.FC<AddDealButtonProps> = ({
  className,
}) => {
  return (
    <Link 
      to="/add-deal"
      className={cn(
        "fixed z-30 flex items-center justify-center",
        "bottom-20 right-4",
        "bg-primary text-primary-foreground",
        "w-14 h-14 rounded-full shadow-md",
        "transition-all duration-300 transform hover:scale-105",
        "hover:shadow-lg active:scale-95",
        "animate-bounce-gentle",
        className
      )}
    >
      <span className="sr-only">Add a new deal</span>
      <div className="relative">
        <Plus size={24} className="absolute -left-3 -top-3 opacity-0 transition-all group-hover:opacity-100" />
        <Camera size={22} />
      </div>
    </Link>
  );
};

export default AddDealButton;
