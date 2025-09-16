import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const filterOptions = [
  { id: 'mountain', label: 'Mountains', category: 'place_type' },
  { id: 'monastery', label: 'Monasteries', category: 'place_type' },
  { id: 'lake', label: 'Lakes', category: 'place_type' },
  { id: 'viewpoint', label: 'Viewpoints', category: 'place_type' },
  { id: 'park', label: 'Parks', category: 'place_type' },
  { id: 'festival', label: 'Festivals', category: 'place_type' },
  { id: 'hotel', label: 'Hotels', category: 'category' },
  { id: 'tourist_spot', label: 'Tourist Spots', category: 'category' },
  { id: 'nature_point', label: 'Nature Points', category: 'category' },
  { id: 'cultural_site', label: 'Cultural Sites', category: 'category' },
];

interface SearchBarProps {
  onSearch: (query: string, filters: string[]) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "Search places in Sikkim..." }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onSearch(query, selectedFilters);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query, selectedFilters, onSearch]);

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-20 py-6 text-lg bg-card border-2 focus:border-primary/50 rounded-xl shadow-sm"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1"
              >
                <Filter className="h-4 w-4" />
                {selectedFilters.length > 0 && (
                  <Badge variant="secondary" className="px-1 text-xs">
                    {selectedFilters.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filters</h4>
                  {selectedFilters.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                
                <div className="grid gap-3">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Place Types</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {filterOptions.filter(f => f.category === 'place_type').map((filter) => (
                        <div key={filter.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={filter.id}
                            checked={selectedFilters.includes(filter.id)}
                            onCheckedChange={() => handleFilterToggle(filter.id)}
                          />
                          <Label htmlFor={filter.id} className="text-sm">
                            {filter.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Categories</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {filterOptions.filter(f => f.category === 'category').map((filter) => (
                        <div key={filter.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={filter.id}
                            checked={selectedFilters.includes(filter.id)}
                            onCheckedChange={() => handleFilterToggle(filter.id)}
                          />
                          <Label htmlFor={filter.id} className="text-sm">
                            {filter.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFilters.map((filterId) => {
            const filter = filterOptions.find(f => f.id === filterId);
            if (!filter) return null;
            
            return (
              <Badge
                key={filterId}
                variant="secondary"
                className="px-3 py-1 cursor-pointer hover:bg-secondary/80"
                onClick={() => handleFilterToggle(filterId)}
              >
                {filter.label}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}