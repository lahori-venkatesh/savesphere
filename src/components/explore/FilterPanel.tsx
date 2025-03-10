
import React from 'react';
import { Tag, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SortOption } from '@/components/explore/types';
import { dealCategories } from '@/utils/mockData';

interface FilterPanelProps {
  showFilters: boolean;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
  sortOptions: { value: SortOption; label: string; icon: React.ElementType }[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  showFilters,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  sortOptions,
}) => {
  if (!showFilters) return null;

  return (
    <div className="mt-4 p-4 bg-background rounded-lg border shadow-md animate-scale-in">
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Tag size={16} className="mr-2" />
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="rounded-full text-xs"
          >
            All Deals
          </Button>
          {dealCategories.filter(c => c !== "All Deals").map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <TrendingUp size={16} className="mr-2" />
          Sort By
        </h3>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <Button
              key={option.value}
              variant={sortBy === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy(option.value)}
              className="rounded-full text-xs flex items-center"
            >
              <option.icon size={12} className="mr-1" />
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
