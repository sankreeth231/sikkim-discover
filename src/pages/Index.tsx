import React, { useState, useEffect } from 'react';
import { Plus, Heart } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { PlaceCard } from '@/components/PlaceCard';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import buddhaImage from '@/assets/buddha-statue.jpg';
import buddhaParksLandscape from '@/assets/buddha-park-landscape.jpg';

interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  place_type: string;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  address?: string;
  images: string[];
  features: string[];
  rating: number;
  best_time_to_visit?: string;
  price_range?: string;
  is_featured: boolean;
}

const Index = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchPlaces();
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchPlaces = async () => {
    try {
      const { data, error } = await supabase
        .from('places')
        .select('*')
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('rating', { ascending: false });

      if (error) throw error;
      setPlaces(data || []);
      setFilteredPlaces(data || []);
    } catch (error) {
      console.error('Error fetching places:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('place_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setFavorites(data.map(fav => fav.place_id));
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const handleSearch = (query: string, filters: string[]) => {
    let filtered = places;

    if (query.trim()) {
      const searchTerms = query.toLowerCase().trim().split(' ');
      filtered = filtered.filter(place =>
        searchTerms.some(term =>
          place.name.toLowerCase().includes(term) ||
          place.description?.toLowerCase().includes(term) ||
          place.address?.toLowerCase().includes(term) ||
          place.features.some(feature => feature.toLowerCase().includes(term))
        )
      );
    }

    if (filters.length > 0) {
      filtered = filtered.filter(place =>
        filters.some(filter =>
          place.category === filter || place.place_type === filter
        )
      );
    }

    setFilteredPlaces(filtered);
  };

  const handleFavoriteToggle = (placeId: string, isFavorited: boolean) => {
    setFavorites(prev =>
      isFavorited
        ? [...prev, placeId]
        : prev.filter(id => id !== placeId)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-lotus-bloom text-monastery">
          <Heart className="w-12 h-12 mx-auto mb-2" />
          <p className="text-lg">Loading Sikkim's wonders...</p>
        </div>
      </div>
    );
  }

  const featuredPlaces = filteredPlaces.filter(place => place.is_featured).slice(0, 3);
  const regularPlaces = filteredPlaces.filter(place => !place.is_featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${buddhaImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-monastery/80 via-monastery/60 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <SidebarTrigger className="text-white hover:bg-white/10" />
              <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-saffron" />
                <h1 className="text-xl font-bold text-white hidden sm:block">Explore Sikkim</h1>
              </div>
            </div>
            <Button size="sm" className="bg-saffron hover:bg-saffron/90 text-monastery">
              <Plus className="w-4 h-4 mr-1" />
              Add Place
            </Button>
          </header>

          {/* Hero Content */}
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center space-y-6 max-w-4xl">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold text-white animate-mountain-fade">
                  Explore Sikkim
                </h1>
                <p className="text-xl md:text-2xl text-golden-light font-light">
                  Discover the mystical beauty of the Himalayas
                </p>
                <p className="text-lg text-white/90 max-w-2xl mx-auto">
                  From ancient monasteries to pristine lakes, experience the spiritual heart of the Himalayas
                </p>
              </div>

              {/* Search Bar */}
              <div className="max-w-3xl mx-auto">
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Featured Places */}
          {featuredPlaces.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-monastery mb-8 text-center">
                Featured Destinations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPlaces.map((place) => (
                  <PlaceCard
                    key={place.id}
                    place={place}
                    isFavorited={favorites.includes(place.id)}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Places */}
          {regularPlaces.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-monastery mb-8 text-center">
                All Destinations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {regularPlaces.map((place) => (
                  <PlaceCard
                    key={place.id}
                    place={place}
                    isFavorited={favorites.includes(place.id)}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredPlaces.length === 0 && (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-monastery mb-2">No places found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find more destinations.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer with Buddhist elements */}
      <footer 
        className="mt-20 py-12 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${buddhaParksLandscape})` }}
      >
        <div className="absolute inset-0 bg-monastery/80" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="text-golden-light space-y-4">
            <Heart className="w-12 h-12 mx-auto animate-prayer-wheel" />
            <h3 className="text-2xl font-bold">Om Mani Padme Hum</h3>
            <p className="text-lg">
              May all beings find peace and happiness in their journey through Sikkim
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
