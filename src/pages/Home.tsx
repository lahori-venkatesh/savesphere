
import React, { useState } from 'react';
import { QrCode } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNavbar from '@/components/layout/BottomNavbar';
import AddDealButton from '@/components/ui/AddDealButton';
import { mockDeals, dealCategories, currentUser } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import NearbyDealsSection from '@/components/home/NearbyDealsSection';
import PersonalizedDealsSection from '@/components/home/PersonalizedDealsSection';
import TrendingSection from '@/components/home/TrendingSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedDealsSection from '@/components/home/FeaturedDealsSection';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Deals");
  
  // Filter deals by category if needed
  const filteredDeals = selectedCategory === "All Deals" 
    ? mockDeals 
    : mockDeals.filter(deal => deal.category === selectedCategory);
  
  // Get personalized deals based on user category
  const getPersonalizedDeals = () => {
    if (!currentUser.category) return mockDeals.slice(0, 3);
    return mockDeals
      .filter(deal => deal.userCategories?.includes(currentUser.category as any))
      .slice(0, 3);
  };

  // Get category-specific deals
  const getStudentDeals = () => {
    return mockDeals
      .filter(deal => deal.userCategories?.includes("student"))
      .slice(0, 4);
  };

  const getFamilyDeals = () => {
    return mockDeals
      .filter(deal => deal.userCategories?.includes("family"))
      .slice(0, 4);
  };

  const getProfessionalDeals = () => {
    return mockDeals
      .filter(deal => deal.userCategories?.includes("professional"))
      .slice(0, 4);
  };
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      
      <main className="pt-16 px-4 max-w-7xl mx-auto">
        <div className="py-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold tracking-tight animate-slide-up">
              SaveSphere
            </h1>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 rounded-full animate-slide-up"
            >
              <QrCode size={16} />
              <span>Scan</span>
            </Button>
          </div>
          <p className="text-muted-foreground mb-6 animate-slide-up" style={{ animationDelay: "50ms" }}>
            Discover crowd-sourced deals, verified by your community.
          </p>
          
          {/* Map section - Moved to the top */}
          <NearbyDealsSection />
          
          {/* Personalized Deals Section */}
          <PersonalizedDealsSection 
            currentUser={currentUser}
            deals={getPersonalizedDeals()}
          />
          
          {/* Trending Sections */}
          <TrendingSection 
            studentDeals={getStudentDeals()}
            familyDeals={getFamilyDeals()}
            professionalDeals={getProfessionalDeals()}
          />
          
          {/* Categories */}
          <CategoriesSection 
            categories={dealCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          {/* Featured deals */}
          <FeaturedDealsSection 
            deals={filteredDeals}
            selectedCategory={selectedCategory}
          />
        </div>
      </main>
      
      <AddDealButton />
      <BottomNavbar />
    </div>
  );
};

export default Home;
