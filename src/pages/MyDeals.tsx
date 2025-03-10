
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNavbar from '@/components/layout/BottomNavbar';
import DealCard from '@/components/ui/DealCard';
import { Button } from '@/components/ui/button';
import { mockDeals, currentUser } from '@/utils/mockData';

const MyDeals: React.FC = () => {
  const navigate = useNavigate();
  
  // Filter deals posted by the current user
  const userDeals = mockDeals.filter(deal => deal.postedBy.id === currentUser.id);
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header showSearch={false} />
      
      <main className="pt-16 px-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 text-foreground/80 hover:text-foreground"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold ml-2">My Deals</h1>
          </div>
          
          <Button onClick={() => navigate('/add-deal')} size="sm">
            <Plus size={16} className="mr-1" />
            Add Deal
          </Button>
        </div>
        
        {userDeals.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-fade-in">
            {userDeals.map((deal, index) => (
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
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">No deals posted yet</h3>
            <p className="text-muted-foreground max-w-md">
              Share your first deal with the community and earn points!
            </p>
            <Button 
              onClick={() => navigate('/add-deal')}
              className="mt-6"
            >
              <Plus size={16} className="mr-1" />
              Post Your First Deal
            </Button>
          </div>
        )}
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default MyDeals;
