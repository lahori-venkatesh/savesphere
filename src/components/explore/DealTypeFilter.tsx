
import React from 'react';
import { Store, Globe, ExternalLink } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DealFilter } from '@/utils/types';

interface DealTypeFilterProps {
  selectedDealType: DealFilter;
  setSelectedDealType: (type: DealFilter) => void;
}

const DealTypeFilter: React.FC<DealTypeFilterProps> = ({
  selectedDealType,
  setSelectedDealType,
}) => {
  return (
    <div className="mt-4">
      <Tabs
        defaultValue="all"
        value={selectedDealType}
        onValueChange={(value) => setSelectedDealType(value as DealFilter)}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="all">All Deals</TabsTrigger>
          <TabsTrigger value="in-store" className="flex items-center justify-center">
            <Store size={14} className="mr-1" />
            In-Store
          </TabsTrigger>
          <TabsTrigger value="online" className="flex items-center justify-center">
            <Globe size={14} className="mr-1" />
            Online
          </TabsTrigger>
          <TabsTrigger value="affiliate" className="flex items-center justify-center">
            <ExternalLink size={14} className="mr-1" />
            Affiliate
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default DealTypeFilter;
