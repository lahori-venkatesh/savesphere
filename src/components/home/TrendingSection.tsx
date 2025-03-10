
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, GraduationCap, Users, Briefcase } from 'lucide-react';
import CategoryCarousel from '@/components/ui/CategoryCarousel';
import { Deal } from '@/utils/types';

interface TrendingSectionProps {
  studentDeals: Deal[];
  familyDeals: Deal[];
  professionalDeals: Deal[];
}

const TrendingSection: React.FC<TrendingSectionProps> = ({
  studentDeals,
  familyDeals,
  professionalDeals
}) => {
  return (
    <section className="mb-8 animate-slide-up" style={{ animationDelay: "250ms" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <TrendingUp size={20} className="text-primary" />
          <span>Trending Now</span>
        </h2>
      </div>
      
      {/* Students Love These */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <GraduationCap size={18} className="mr-2 text-primary" />
            <h3 className="font-medium">Students Love These</h3>
          </div>
          <Link to="/explore?category=student" className="text-sm text-primary flex items-center hover:underline">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <CategoryCarousel deals={studentDeals} />
      </div>
      
      {/* Top Savings for Families */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Users size={18} className="mr-2 text-primary" />
            <h3 className="font-medium">Top Savings for Families</h3>
          </div>
          <Link to="/explore?category=family" className="text-sm text-primary flex items-center hover:underline">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <CategoryCarousel deals={familyDeals} />
      </div>
      
      {/* Office Goer Specials */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Briefcase size={18} className="mr-2 text-primary" />
            <h3 className="font-medium">Office Goer Specials</h3>
          </div>
          <Link to="/explore?category=professional" className="text-sm text-primary flex items-center hover:underline">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <CategoryCarousel deals={professionalDeals} />
      </div>
    </section>
  );
};

export default TrendingSection;
