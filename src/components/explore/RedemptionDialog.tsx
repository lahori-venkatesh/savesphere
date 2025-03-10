
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface RedemptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkRedeemed: () => void;
}

const RedemptionDialog: React.FC<RedemptionDialogProps> = ({
  open,
  onOpenChange,
  onMarkRedeemed,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Show this to the cashier</DialogTitle>
          <DialogDescription>
            The store will scan this QR code or enter the redemption ID to apply your discount.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-4">
          <div className="bg-white p-4 rounded-lg shadow-inner mb-4">
            {/* In a real app, this would be a dynamically generated QR code */}
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SAVESPHERE-12345"
              alt="QR Code"
              className="w-[200px] h-[200px]"
            />
          </div>
          <p className="text-lg font-mono text-center mb-4">
            SS-{Math.random().toString(36).substring(2, 8).toUpperCase()}
          </p>
          <Button onClick={onMarkRedeemed} className="w-full">
            Mark as Redeemed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RedemptionDialog;
