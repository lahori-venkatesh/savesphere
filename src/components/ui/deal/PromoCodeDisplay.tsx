
import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface PromoCodeDisplayProps {
  code: string;
  className?: string;
}

const PromoCodeDisplay: React.FC<PromoCodeDisplayProps> = ({
  code,
  className = ""
}) => {
  const copyPromoCode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied!",
      description: `${code} has been copied to your clipboard.`,
    });
  };

  return (
    <div className={`bg-muted/70 p-2 rounded-md flex items-center justify-between ${className}`}>
      <code className="text-sm font-mono">{code}</code>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-7"
        onClick={copyPromoCode}
      >
        <Copy size={14} />
      </Button>
    </div>
  );
};

export default PromoCodeDisplay;
