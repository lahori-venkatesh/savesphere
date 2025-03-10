
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  MapPin, 
  Clock, 
  ThumbsUp, 
  Flag,
  ExternalLink,
  Info,
  Copy,
  QrCode,
  ShoppingCart,
  Camera,
  CheckCircle,
  Upload,
  AlertCircle,
  Store,
  Globe
} from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNavbar from '@/components/layout/BottomNavbar';
import UserAvatar from '@/components/ui/UserAvatar';
import { mockDeals, formatTimeRemaining, getExpiryColor, formatDistanceToNow } from '@/utils/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

const DealDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [hasVerified, setHasVerified] = useState(false);
  const [hasFlagged, setHasFlagged] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [showReceiptUpload, setShowReceiptUpload] = useState(false);
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  
  // Find the deal in our mock data
  const deal = mockDeals.find(d => d.id === id);
  
  if (!deal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Deal not found</h2>
          <p className="text-muted-foreground mb-4">
            The deal you're looking for doesn't exist or has been removed.
          </p>
          <button 
            onClick={() => navigate('/')} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  const handleVerify = () => {
    if (!hasVerified) {
      setHasVerified(true);
      toast({
        title: "Deal Verified",
        description: "Thanks for verifying this deal! You've earned 5 points.",
      });
    }
  };
  
  const handleFlag = () => {
    if (!hasFlagged) {
      setHasFlagged(true);
      toast({
        title: "Deal Flagged",
        description: "Thanks for letting us know this deal might have expired.",
      });
    }
  };

  const copyPromoCode = () => {
    if (deal.promoCode) {
      navigator.clipboard.writeText(deal.promoCode);
      toast({
        title: "Code Copied!",
        description: `${deal.promoCode} has been copied to your clipboard.`,
      });
    }
  };

  const showRedemptionCode = () => {
    setShowQRCode(true);
  };

  const markAsRedeemed = () => {
    setIsRedeemed(true);
    setShowQRCode(false);
    
    if (deal.dealType === 'in-store') {
      toast({
        title: "Deal Redeemed!",
        description: "Please upload your receipt to earn 10 points.",
      });
      setShowReceiptUpload(true);
    } else if (deal.dealType === 'online') {
      toast({
        title: "Deal Marked as Used",
        description: "You've earned 5 points for using this deal.",
      });
    } else {
      toast({
        title: "Deal Redeemed!",
        description: "Thanks for using this affiliate deal.",
      });
    }
  };

  const handleShopNow = () => {
    // In a real app, this would redirect to the store with your affiliate link
    window.open(deal.affiliateUrl || `https://${deal.platform?.toLowerCase()}.com`, '_blank');
    
    setTimeout(() => {
      toast({
        title: "Shopping at " + deal.platform,
        description: "Remember to mark as used when you complete your purchase!",
      });
    }, 1000);
  };

  const handleAffiliateRedirect = () => {
    // In a real app, this would redirect with your affiliate code auto-applied
    window.open(deal.affiliateUrl, '_blank');
    setTimeout(() => {
      toast({
        title: "Discount Auto-Applied",
        description: "Your discount will be applied at checkout.",
      });
      setIsRedeemed(true);
    }, 1000);
  };

  const handleReceiptUpload = () => {
    // Simulate receipt upload
    setReceiptUploaded(true);
    setShowReceiptUpload(false);
    toast({
      title: "Receipt Uploaded",
      description: "Your receipt is being verified. You've earned 10 points!",
    });
  };

  const getDealTypeIcon = () => {
    switch (deal.dealType) {
      case 'in-store':
        return <Store size={18} className="mr-2 text-primary" />;
      case 'online':
        return <Globe size={18} className="mr-2 text-blue-500" />;
      case 'affiliate':
        return <ExternalLink size={18} className="mr-2 text-orange-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header transparent />
      
      <div className="relative">
        <div className="relative w-full h-64 sm:h-80 bg-muted overflow-hidden">
          <img 
            src={deal.image} 
            alt={deal.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        
        <button 
          className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-sm"
        >
          <Share2 size={20} />
        </button>
      </div>
      
      <main className="px-4 -mt-16 relative z-10 max-w-3xl mx-auto">
        <div className="bg-background rounded-xl shadow-soft p-5 border animate-scale-in">
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex space-x-2 mb-2">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground inline-block">
                    {deal.category}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary inline-block flex items-center">
                    {getDealTypeIcon()}
                    {deal.dealType === 'in-store' ? 'In-Store' : 
                     deal.dealType === 'online' ? 'Online' : 'Affiliate'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold">{deal.title}</h1>
              </div>
              
              <div className={cn(
                "text-sm font-medium px-3 py-1 rounded-full",
                getExpiryColor(deal.expiresAt)
              )}>
                {formatTimeRemaining(deal.expiresAt)}
              </div>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              <span className="font-medium text-foreground">{deal.store}</span>
              <span className="mx-1.5">•</span>
              {deal.dealType === 'in-store' ? (
                <span className="flex items-center">
                  <MapPin size={14} className="mr-0.5" />
                  <span>{deal.location.address}</span>
                </span>
              ) : (
                <span className="flex items-center">
                  {deal.platform && (
                    <>
                      <Globe size={14} className="mr-0.5" />
                      <span>{deal.platform}</span>
                    </>
                  )}
                </span>
              )}
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <div className="font-bold text-2xl sm:text-3xl text-primary">
                {deal.discount} OFF
              </div>
              
              {!isRedeemed ? (
                <div className="flex space-x-2">
                  {deal.dealType === 'in-store' && (
                    <Button 
                      onClick={showRedemptionCode}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center"
                    >
                      <QrCode size={16} className="mr-2" />
                      Show Code
                    </Button>
                  )}
                  
                  {deal.dealType === 'online' && deal.promoCode && (
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline"
                        onClick={copyPromoCode}
                        className="hover:bg-muted transition-colors flex items-center"
                      >
                        <Copy size={16} className="mr-2" />
                        Copy Code
                      </Button>
                      
                      <Button 
                        onClick={handleShopNow}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center"
                      >
                        <ShoppingCart size={16} className="mr-2" />
                        Shop Now
                      </Button>
                    </div>
                  )}
                  
                  {deal.dealType === 'affiliate' && (
                    <Button 
                      onClick={handleAffiliateRedirect}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Order Now
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-success">
                  <CheckCircle size={20} />
                  <span className="font-medium">Redeemed</span>
                  
                  {deal.dealType === 'in-store' && !receiptUploaded && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowReceiptUpload(true)}
                      className="ml-2 text-xs"
                    >
                      <Upload size={14} className="mr-1" />
                      Upload Receipt
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            {deal.dealType === 'online' && deal.promoCode && (
              <div className="mt-4 flex items-center">
                <div className="bg-muted p-2 rounded border flex-1 text-center font-mono">
                  {deal.promoCode}
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">Description</h2>
            <p className="text-muted-foreground">
              {deal.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <UserAvatar src={deal.postedBy.avatar} alt={deal.postedBy.name} />
              <div className="ml-3">
                <p className="font-medium">{deal.postedBy.name}</p>
                <p className="text-sm text-muted-foreground">
                  Posted {formatDistanceToNow(deal.createdAt)}
                </p>
              </div>
            </div>
            
            <button 
              className="text-xs text-muted-foreground hover:text-foreground flex items-center"
            >
              <Info size={14} className="mr-1" />
              Report Poster
            </button>
          </div>
          
          <div className="flex border-t pt-4">
            <button 
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-3 rounded-lg transition-colors hover:bg-muted",
                hasVerified && "text-success"
              )}
              onClick={handleVerify}
            >
              <ThumbsUp size={20} className="mb-1" />
              <span className="text-sm">Verify ({deal.verified + (hasVerified ? 1 : 0)})</span>
            </button>
            
            <div className="mx-1 border-r"></div>
            
            <button 
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-3 rounded-lg transition-colors hover:bg-muted",
                hasFlagged && "text-destructive"
              )}
              onClick={handleFlag}
            >
              <Flag size={20} className="mb-1" />
              <span className="text-sm">Flag Expired ({deal.flagged + (hasFlagged ? 1 : 0)})</span>
            </button>
          </div>
        </div>
      </main>
      
      {/* QR Code/Redemption dialog */}
      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Show this to the cashier</DialogTitle>
            <DialogDescription>
              The store will scan this QR code or enter the redemption ID to apply your discount.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="bg-white p-4 rounded-lg shadow-inner mb-4">
              <QrCode size={200} className="text-primary" />
            </div>
            <p className="text-lg font-mono text-center mb-4">
              {deal.redemptionId || 'SS-' + Math.random().toString(36).substring(2, 8).toUpperCase()}
            </p>
            <Button onClick={markAsRedeemed} className="w-full">
              <CheckCircle size={16} className="mr-2" />
              Mark as Redeemed
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Receipt upload dialog */}
      <Dialog open={showReceiptUpload} onOpenChange={setShowReceiptUpload}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Receipt for Verification</DialogTitle>
            <DialogDescription>
              Upload a photo of your receipt to verify your purchase and earn 10 points.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-full h-48 bg-muted/50 rounded-lg flex flex-col items-center justify-center mb-4 border-2 border-dashed border-muted-foreground/20">
              <Camera size={48} className="text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Tap to take a photo or upload</p>
            </div>
            <Button onClick={handleReceiptUpload} className="w-full">
              <Upload size={16} className="mr-2" />
              Upload Receipt
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <BottomNavbar />
    </div>
  );
};

export default DealDetails;
