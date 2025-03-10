
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNavbar from '@/components/layout/BottomNavbar';
import DealCard from '@/components/ui/DealCard';
import { mockDeals } from '@/utils/mockData';

const SavedDeals: React.FC = () => {
  const navigate = useNavigate();
  // For demo purposes, we'll just use the first few mock deals as "saved" deals
  const savedDeals = mockDeals.slice(0, 3);
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header showSearch={false} />
      
      <main className="pt-16 px-4 max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-foreground/80 hover:text-foreground"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold ml-2">Saved Deals</h1>
        </div>
        
        {savedDeals.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-fade-in">
            {savedDeals.map((deal, index) => (
              <DealCard
                key={deal.id}
                deal={deal}
                className="h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No saved deals yet</h3>
            <p className="text-muted-foreground max-w-md">
              When you find great deals, save them for later by tapping the bookmark icon.
            </p>
            <button
              onClick={() => navigate('/explore')}
              className="mt-6 bg-primary/10 text-primary font-medium px-4 py-2 rounded-lg"
            >
              Explore Deals
            </button>
          </div>
        )}
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default SavedDeals;
