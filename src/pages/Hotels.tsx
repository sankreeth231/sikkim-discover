import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Wifi, Car, Utensils, Dumbbell, Waves, Coffee } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: number;
  image: string;
  description: string;
  amenities: string[];
}

const Hotels = () => {
  const hotels: Hotel[] = [
    {
      id: '1',
      name: 'Mayfair Spa Resort & Casino',
      location: 'Gangtok',
      price: '₹8,500/night',
      rating: 4.8,
      image: '/src/assets/hotel-spa-resort.jpg',
      description: 'Luxury resort with stunning mountain views and world-class spa facilities.',
      amenities: ['Spa', 'Casino', 'Mountain View', 'Restaurant']
    },
    {
      id: '2',
      name: 'WelcomHeritage Denzong Regency',
      location: 'Gangtok',
      price: '₹6,200/night',
      rating: 4.6,
      image: '/src/assets/hotel-heritage.jpg',
      description: 'Heritage hotel offering traditional Sikkimese hospitality with modern amenities.',
      amenities: ['Heritage', 'Restaurant', 'City View', 'WiFi']
    },
    {
      id: '3',
      name: 'Norbu Ghang Resort',
      location: 'Pelling',
      price: '₹5,800/night',
      rating: 4.7,
      image: '/src/assets/hotel-eco-friendly.jpg',
      description: 'Eco-friendly resort with panoramic views of Kanchenjunga and surrounding peaks.',
      amenities: ['Eco-friendly', 'Mountain View', 'Trekking', 'Restaurant']
    },
    {
      id: '4',
      name: 'Summit Newa Regency Hotel',
      location: 'Gangtok',
      price: '₹4,500/night',
      rating: 4.4,
      image: '/src/assets/hotel-modern.jpg',
      description: 'Modern hotel in the heart of Gangtok with easy access to major attractions.',
      amenities: ['Central Location', 'Restaurant', 'WiFi', 'Parking']
    },
    {
      id: '5',
      name: 'Cherry Village Resort',
      location: 'Lachung',
      price: '₹7,000/night',
      rating: 4.5,
      image: '/src/assets/hotel-retreat.jpg',
      description: 'Mountain retreat surrounded by rhododendrons and apple orchards.',
      amenities: ['Mountain View', 'Garden', 'Trekking', 'Local Cuisine']
    },
    {
      id: '6',
      name: 'Hotel Sonam Delek',
      location: 'Namchi',
      price: '₹3,800/night',
      rating: 4.3,
      image: '/src/assets/hotel-mountain-view.jpg',
      description: 'Comfortable stay with views of the famous Char Dham complex.',
      amenities: ['Religious Sites', 'Restaurant', 'WiFi', 'Parking']
    },
    {
      id: '7',
      name: 'Bamboo Retreat',
      location: 'Ravangla',
      price: '₹6,500/night',
      rating: 4.6,
      image: '/src/assets/hotel-bamboo.jpg',
      description: 'Sustainable bamboo resort offering authentic mountain experience.',
      amenities: ['Eco-friendly', 'Buddha Park View', 'Meditation', 'Organic Food']
    },
    {
      id: '8',
      name: 'Yarlam Resort',
      location: 'Ravangla',
      price: '₹5,200/night',
      rating: 4.4,
      image: '/src/assets/hotel-boutique.jpg',
      description: 'Boutique resort showcasing traditional Sikkimese architecture and culture.',
      amenities: ['Cultural Experience', 'Mountain View', 'Restaurant', 'Spa']
    },
    {
      id: '9',
      name: 'Hotel Tashi Delek',
      location: 'Yuksom',
      price: '₹4,200/night',
      rating: 4.2,
      image: '/src/assets/hotel-luxury-resort.jpg',
      description: 'Historic location hotel, gateway to Kanchenjunga National Park.',
      amenities: ['Trekking Base', 'Historic Site', 'Restaurant', 'Guides']
    },
    {
      id: '10',
      name: 'Mystic Mountain Resort',
      location: 'Tsomgo Lake',
      price: '₹8,000/night',
      rating: 4.9,
      image: '/src/assets/hotel-lakeside.jpg',
      description: 'Exclusive lakeside resort offering unparalleled tranquility and mountain views.',
      amenities: ['Lakeside', 'Premium Service', 'Mountain View', 'Fine Dining']
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'WiFi': <Wifi className="w-3 h-3" />,
      'Parking': <Car className="w-3 h-3" />,
      'Restaurant': <Utensils className="w-3 h-3" />,
      'Spa': <Waves className="w-3 h-3" />,
      'Gym': <Dumbbell className="w-3 h-3" />,
      'Cafe': <Coffee className="w-3 h-3" />,
    };
    return icons[amenity] || null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-monastery text-primary-foreground py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
            Luxury Hotels in Sikkim
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Experience comfort and hospitality amidst the majestic Himalayas
          </p>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div 
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${hotel.image})` }}
                >
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {hotel.rating}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="font-playfair text-xl">{hotel.name}</CardTitle>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{hotel.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs flex items-center gap-1">
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <span className="text-2xl font-bold text-primary">{hotel.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">per night</span>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;