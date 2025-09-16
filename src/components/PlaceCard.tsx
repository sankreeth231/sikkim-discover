import React, { useState } from 'react';
import { Heart, MapPin, Star, Clock, DollarSign, Mountain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

interface PlaceCardProps {
  place: Place;
  isFavorited?: boolean;
  onFavoriteToggle?: (placeId: string, isFavorited: boolean) => void;
}

const categoryColors = {
  hotel: 'bg-blue-100 text-blue-800',
  tourist_spot: 'bg-green-100 text-green-800',
  monastery: 'bg-saffron/20 text-monastery',
  nature_point: 'bg-prayer-flag/20 text-prayer-flag',
  festival: 'bg-purple-100 text-purple-800',
  cultural_site: 'bg-orange-100 text-orange-800',
};

const typeIcons = {
  mountain: Mountain,
  monastery: MapPin,
  lake: MapPin,
  viewpoint: Mountain,
  park: MapPin,
  festival: Clock,
  hotel: MapPin,
  temple: MapPin,
  waterfall: MapPin,
  trek: Mountain,
  village: MapPin,
};

export function PlaceCard({ place, isFavorited = false, onFavoriteToggle }: PlaceCardProps) {
  const [isToggling, setIsToggling] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const TypeIcon = typeIcons[place.place_type as keyof typeof typeIcons] || MapPin;

  const handleFavoriteToggle = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save favorites.",
        variant: "destructive",
      });
      return;
    }

    setIsToggling(true);

    try {
      if (isFavorited) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('place_id', place.id);

        if (error) throw error;

        toast({
          title: "Removed from favorites",
          description: `${place.name} has been removed from your favorites.`,
        });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            place_id: place.id,
          });

        if (error) throw error;

        toast({
          title: "Added to favorites",
          description: `${place.name} has been added to your favorites.`,
        });
      }

      onFavoriteToggle?.(place.id, !isFavorited);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      <div className="relative">
        {/* Image placeholder or actual image */}
        <div className="h-48 bg-gradient-to-br from-mountain-mist to-prayer-flag flex items-center justify-center relative overflow-hidden">
          <TypeIcon className="w-16 h-16 text-white/50 animate-mountain-fade" />
          {place.is_featured && (
            <Badge className="absolute top-3 left-3 bg-saffron text-monastery">
              Featured
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteToggle}
            disabled={isToggling}
            className={`absolute top-3 right-3 h-8 w-8 p-0 rounded-full ${
              isFavorited 
                ? 'bg-primary text-primary-foreground hover:bg-primary/80' 
                : 'bg-black/20 text-white hover:bg-black/40'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-monastery group-hover:text-primary transition-colors">
                {place.name}
              </h3>
              {place.address && (
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  {place.address}
                </p>
              )}
            </div>
            {place.rating > 0 && (
              <div className="flex items-center bg-saffron/20 px-2 py-1 rounded-full">
                <Star className="w-3 h-3 fill-current text-saffron mr-1" />
                <span className="text-xs font-medium">{place.rating}</span>
              </div>
            )}
          </div>

          {/* Categories and Type */}
          <div className="flex flex-wrap gap-2">
            <Badge className={categoryColors[place.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}>
              {place.category.replace('_', ' ')}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {place.place_type.replace('_', ' ')}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {place.description}
          </p>

          {/* Features */}
          {place.features.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {place.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                  {feature}
                </Badge>
              ))}
              {place.features.length > 3 && (
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  +{place.features.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
              {place.best_time_to_visit && (
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {place.best_time_to_visit}
                </div>
              )}
              {place.price_range && (
                <div className="flex items-center">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {place.price_range}
                </div>
              )}
            </div>
            {place.altitude && (
              <div className="text-xs text-muted-foreground flex items-center">
                <Mountain className="w-3 h-3 mr-1" />
                {place.altitude}m
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}