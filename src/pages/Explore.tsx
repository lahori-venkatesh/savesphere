
import React, { useState } from 'react';
import { Compass, Filter, Clock, MapPin, TrendingUp, Store, Globe, ExternalLink } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNavbar from '@/components/layout/BottomNavbar';
import { Button } from '@/components/ui/button';
import { mockDeals } from '@/utils/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Deal, DealFilter } from '@/utils/types';
import { toast } from '@/components/ui/use-toast';
import { SortOption, ViewMode } from '@/components/explore/types';
import SearchBar from '@/components/explore/SearchBar';
import DealTypeFilter from '@/components/explore/DealTypeFilter';
import FilterPanel from '@/components/explore/FilterPanel';
import GridView from '@/components/explore/GridView';
import MapViewContainer from '@/components/explore/MapViewContainer';
import RedemptionDialog from '@/components/explore/RedemptionDialog';

const sortOptions: { value: SortOption; label: string; icon: React.ElementType }[] = [
  { value: 'newest', label: 'Newest', icon: Clock },
  { value: 'expiring', label: 'Expiring Soon', icon: Clock },
  { value: 'popular', label: 'Most Popular', icon: TrendingUp },
  { value: 'distance', label: 'Nearest', icon: MapPin },
];

const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDealType, setSelectedDealType] = useState<DealFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showRedemptionDialog, setShowRedemptionDialog] = useState(false);
  
  // Filter and sort deals
  const filteredDeals = mockDeals.filter(deal => {
    // Filter by deal type
    if (selectedDealType !== 'all' && deal.dealType !== selectedDealType) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !deal.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !deal.store.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !deal.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !(deal.promoCode && deal.promoCode.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !(deal.platform && deal.platform.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory && deal.category !== selectedCategory) {
      return false;
    }
    
    return true;
  });
  
  // Sort deals
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'expiring':
        return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
      case 'popular':
        return b.verified - a.verified;
      case 'distance':
        // In a real app, this would calculate actual distance from user
        // For now, we'll just use a random value
        return Math.random() - 0.5;
      default:
        return 0;
    }
  });

  const handleDealSelect = (deal: Deal) => {
    setSelectedDeal(deal);
  };
  
  const handleRedeemDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    
    if (deal.dealType === 'in-store') {
      setShowRedemptionDialog(true);
    } else if (deal.dealType === 'online') {
      // Copy promo code and open website
      if (deal.promoCode) {
        navigator.clipboard.writeText(deal.promoCode);
        toast({
          title: "Promo code copied!",
          description: `${deal.promoCode} has been copied to your clipboard.`,
        });
      }
      
      // Open website
      window.open(deal.affiliateUrl || `https://${deal.platform?.toLowerCase()}.com`, '_blank');
    } else if (deal.dealType === 'affiliate') {
      // Direct redirect with auto-applied discount
      window.open(deal.affiliateUrl, '_blank');
      toast({
        title: "Redirecting with discount",
        description: "Your discount will be automatically applied.",
      });
    }
  };
  
  const markAsRedeemed = () => {
    setShowRedemptionDialog(false);
    toast({
      title: "Deal Redeemed!",
      description: "Upload your receipt to earn 10 points.",
    });
  };
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header showSearch={false} />
      
      <main className="pt-16 px-4 max-w-7xl mx-auto">
        <div className="py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Compass size={24} className="text-primary" />
              <h1 className="text-2xl font-bold">Explore Deals</h1>
            </div>
          </div>
          
          {/* Search bar */}
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />
          
          {/* Deal Type Filter Tabs */}
          <DealTypeFilter 
            selectedDealType={selectedDealType}
            setSelectedDealType={setSelectedDealType}
          />
          
          {/* Filter panel */}
          <FilterPanel 
            showFilters={showFilters}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOptions={sortOptions}
          />
          
          {/* View mode tabs */}
          <Tabs defaultValue="grid" value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)} className="mb-6">
            <TabsList className="grid w-full max-w-[200px] grid-cols-2">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="grid" className="mt-4">
              <GridView deals={sortedDeals} onRedeem={handleRedeemDeal} />
            </TabsContent>
            
            <TabsContent value="map" className="mt-4">
              <MapViewContainer 
                selectedDeal={selectedDeal} 
                onDealSelect={handleDealSelect} 
                onRedeem={handleRedeemDeal} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* QR Code Redemption Dialog */}
      <RedemptionDialog 
        open={showRedemptionDialog}
        onOpenChange={setShowRedemptionDialog}
        onMarkRedeemed={markAsRedeemed}
      />
      
      <BottomNavbar />
    </div>
  );
};

export default Explore;
