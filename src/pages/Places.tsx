import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Clock, Calendar, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  place_type: string;
  address: string;
  rating: number;
  images: string[];
  features: string[];
  best_time_to_visit: string;
  price_range: string;
  altitude: number;
}

const Places = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

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
      setFavorites(data?.map(fav => fav.place_id) || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const toggleFavorite = async (placeId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to save favorites",
        variant: "destructive"
      });
      return;
    }

    const isFavorited = favorites.includes(placeId);

    try {
      if (isFavorited) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('place_id', placeId);

        if (error) throw error;
        setFavorites(prev => prev.filter(id => id !== placeId));
        toast({ title: "Removed from favorites" });
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({ user_id: user.id, place_id: placeId });

        if (error) throw error;
        setFavorites(prev => [...prev, placeId]);
        toast({ title: "Added to favorites" });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive"
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'tourist_spots': 'bg-prayer-flag/20 text-prayer-flag border-prayer-flag/30',
      'monasteries': 'bg-monastery/20 text-monastery border-monastery/30',
      'nature_points': 'bg-mountain-mist/20 text-accent border-accent/30',
      'cultural': 'bg-saffron/20 text-saffron border-saffron/30',
      'spiritual': 'bg-primary/20 text-primary border-primary/30'
    };
    return colors[category] || 'bg-muted/20 text-muted-foreground border-muted/30';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-prayer-flag to-accent text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
            Discover Sikkim
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Explore sacred monasteries, pristine lakes, and cultural treasures of the Himalayas
          </p>
        </div>
      </div>

      {/* Places Grid */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place) => (
              <Card key={place.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div 
                  className="h-48 bg-cover bg-center relative group"
                  style={{ 
                    backgroundImage: `url(${place.images?.[0] || '/src/assets/buddha-park-statue.jpg'})` 
                  }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className={getCategoryColor(place.category)}>
                      {place.category.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggleFavorite(place.id)}
                      className="bg-white/20 hover:bg-white/30 text-white"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(place.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center text-white text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    {place.rating}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="font-playfair text-xl">{place.name}</CardTitle>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {place.address}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {place.description}
                  </p>
                  
                  {place.features && place.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {place.features.slice(0, 3).map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {place.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{place.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <div className="space-y-2 text-sm">
                    {place.best_time_to_visit && (
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Best time: {place.best_time_to_visit}
                      </div>
                    )}
                    
                    {place.price_range && (
                      <div className="flex items-center text-primary font-semibold">
                        <span className="text-lg">{place.price_range}</span>
                      </div>
                    )}
                    
                    {place.altitude && (
                      <div className="text-muted-foreground text-xs">
                        Altitude: {place.altitude}m
                      </div>
                    )}
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 mt-4">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Places;