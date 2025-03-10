
import React from 'react';
import { Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import DealCard from '@/components/ui/DealCard';
import { Deal, User } from '@/utils/types';

interface PersonalizedDealsSectionProps {
  currentUser: User;
  deals: Deal[];
}

const PersonalizedDealsSection: React.FC<PersonalizedDealsSectionProps> = ({
  currentUser,
  deals
}) => {
  // Get title based on user category
  const getSectionTitle = () => {
    if (currentUser.category === "student") return "Deals for Students";
    if (currentUser.category === "family") return "Family Specials";
    if (currentUser.category === "professional") return "Office Goer Specials";
    return "Recommended for You";
  };

  return (
    <section className="mb-8 animate-slide-up" style={{ animationDelay: "150ms" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Award size={20} className="text-primary" />
          {getSectionTitle()}
        </h2>
        <button className="text-sm text-primary flex items-center hover:underline">
          View all <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {deals.map((deal, index) => (
          <DealCard
            key={deal.id}
            deal={deal}
            compact
            className="animate-slide-up"
            style={{ animationDelay: `${200 + index * 50}ms` }}
          />
        ))}
      </div>
    </section>
  );
};

export default PersonalizedDealsSection;
