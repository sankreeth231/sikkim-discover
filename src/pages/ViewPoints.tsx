import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Mountain, Eye, Sunrise, Camera, Clock } from 'lucide-react';

interface ViewPoint {
  id: string;
  name: string;
  location: string;
  description: string;
  altitude: string;
  bestTime: string;
  highlights: string[];
  image: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  views: string[];
}

const ViewPoints = () => {
  const viewPoints: ViewPoint[] = [
    {
      id: '1',
      name: 'Nathula Pass',
      location: 'India-China Border',
      description: 'Historic Indo-China border pass offering breathtaking high-altitude views and a glimpse into Tibet. A must-visit destination with incredible mountain panoramas.',
      altitude: '4,310m',
      bestTime: 'Morning (permits required)',
      highlights: ['Border Views', 'Tibet Views', 'Historical Significance', 'High Altitude'],
      image: '/src/assets/nathula-pass.jpg',
      difficulty: 'Challenging',
      views: ['Tibet Plateau', 'Eastern Himalayas', 'Border Landscape']
    },
    {
      id: '2',
      name: 'Tsomgo Lake',
      location: 'East Sikkim',
      description: 'Glacial lake set amongst mountainous terrain, featuring tranquil views, yak rides, and a Shiva temple, with cable car rides for panoramic vistas.',
      altitude: '3,753m',
      bestTime: 'Morning and afternoon',
      highlights: ['Glacial Lake', 'Yak Rides', 'Shiva Temple', 'Cable Car'],
      image: '/src/assets/tsomgo-lake.jpg',
      difficulty: 'Moderate',
      views: ['Alpine Lake', 'Surrounding Peaks', 'Glacial Landscape']
    },
    {
      id: '3',
      name: 'Gurudongmar Lake',
      location: 'North Sikkim',
      description: 'High-altitude lake surrounded by snow-capped peaks and clear blue skies, presenting unique terrain for nature enthusiasts. Sacred lake with spiritual significance.',
      altitude: '5,430m',
      bestTime: 'Early morning (weather permitting)',
      highlights: ['Sacred Lake', 'High Altitude', 'Snow Peaks', 'Spiritual Site'],
      image: '/src/assets/gurudongmar-lake.jpg',
      difficulty: 'Challenging',
      views: ['Himalayan Peaks', 'Alpine Lake', 'Tibetan Plateau']
    },
    {
      id: '4',
      name: 'Yumthang Valley',
      location: 'Lachung, North Sikkim',
      description: 'Valley of flowers with hot springs, rhododendron blooms, and spectacular mountain views. A lifetime experience especially beautiful in March.',
      altitude: '3,564m',
      bestTime: 'March to May (flower season)',
      highlights: ['Valley of Flowers', 'Hot Springs', 'Rhododendrons', 'Mountain Views'],
      image: '/src/assets/yumthang-valley.jpg',
      difficulty: 'Moderate',
      views: ['Flower Valley', 'Snow Peaks', 'Alpine Meadows']
    },
    {
      id: '5',
      name: 'Buddha Park Ravangla',
      location: 'Ravangla, South Sikkim',
      description: 'Panoramic views surrounding the 130-foot Buddha statue with magnificent Himalayan backdrop and spiritual ambiance. A serene meditation spot.',
      altitude: '2,100m',
      bestTime: 'Morning and evening',
      highlights: ['Buddha Statue', 'Spiritual Experience', 'Mountain Views', 'Meditation Spot'],
      image: '/src/assets/buddha-park-sikkim.jpg',
      difficulty: 'Easy',
      views: ['Kanchenjunga Range', 'Buddha Statue', 'Ravangla Valley']
    },
    {
      id: '6',
      name: 'MG Marg Viewpoint',
      location: 'Gangtok',
      description: 'Bustling hub with mountain views, local eateries, upscale dining, and diverse shops. Enjoy leisurely walks and lively nightlife in this pedestrian-friendly setting.',
      altitude: '1,650m',
      bestTime: 'Evening and night',
      highlights: ['City Views', 'Shopping', 'Dining', 'Nightlife'],
      image: '/src/assets/mg-marg.jpg',
      difficulty: 'Easy',
      views: ['Gangtok City', 'Distant Mountains', 'Urban Landscape']
    },
    {
      id: '7',
      name: 'Baba Harbhajan Singh Memorial Temple',
      location: 'Near Nathula Pass',
      description: 'Memorial temple with surrounding mountain views maintained by the Indian Army. A place of reverence with spectacular high-altitude vistas.',
      altitude: '4,000m',
      bestTime: 'Morning (permits required)',
      highlights: ['Memorial Temple', 'Army Maintained', 'Mountain Views', 'Spiritual Site'],
      image: '/src/assets/baba-harbhajan-temple.jpg',
      difficulty: 'Challenging',
      views: ['High Himalayas', 'Temple Complex', 'Border Area']
    },
    {
      id: '8',
      name: 'Rumtek Monastery Viewpoint',
      location: 'Rumtek, East Sikkim',
      description: 'One of the largest monasteries in Sikkim with panoramic valley views and traditional Tibetan Buddhist architecture.',
      altitude: '1,550m',
      bestTime: 'Morning and evening',
      highlights: ['Monastery Views', 'Buddhist Architecture', 'Valley Views', 'Cultural Site'],
      image: '/src/assets/rumtek-monastery.jpg',
      difficulty: 'Easy',
      views: ['Gangtok Valley', 'Monastery Complex', 'Surrounding Hills']
    },
    {
      id: '9',
      name: 'Nathu La Pass Viewpoint',
      location: 'India-China Border',
      description: 'Historic trade route and border pass offering unique views into Tibet and the highest motorable viewpoints.',
      altitude: '4,310m',
      bestTime: 'Morning (permits required)',
      highlights: ['Border Views', 'Historical Significance', 'Tibet Views', 'High Altitude'],
      image: '/src/assets/sikkim-girl-festival.jpg',
      difficulty: 'Challenging',
      views: ['Tibet Plateau', 'Border Landscape', 'High Himalayas']
    },
    {
      id: '10',
      name: 'Buddha Park Viewpoint',
      location: 'Ravangla',
      description: 'Panoramic views surrounding the 130-foot Buddha statue with magnificent Himalayan backdrop and spiritual ambiance.',
      altitude: '2,100m',
      bestTime: 'Morning and evening',
      highlights: ['Buddha Statue', 'Spiritual Experience', 'Mountain Views', 'Meditation Spot'],
      image: '/src/assets/sikkim-monks-ceremony.jpg',
      difficulty: 'Easy',
      views: ['Kanchenjunga Range', 'Buddha Statue', 'Ravangla Valley']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Easy': 'bg-green-100 text-green-700 border-green-300',
      'Moderate': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Challenging': 'bg-red-100 text-red-700 border-red-300'
    };
    return colors[difficulty as keyof typeof colors] || colors.Easy;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-mountain-mist to-prayer-flag text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
            Scenic Viewpoints
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Witness the breathtaking beauty of the Himalayas from Sikkim's most spectacular vantage points
          </p>
        </div>
      </div>

      {/* ViewPoints Grid */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {viewPoints.map((viewPoint) => (
              <Card key={viewPoint.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div 
                  className="h-48 bg-cover bg-center relative group"
                  style={{ backgroundImage: `url(${viewPoint.image})` }}
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className={getDifficultyColor(viewPoint.difficulty)}>
                      {viewPoint.difficulty}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center text-sm font-medium">
                      <Mountain className="w-4 h-4 mr-1" />
                      {viewPoint.altitude}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {viewPoint.views.length} views
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="font-playfair text-xl">{viewPoint.name}</CardTitle>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {viewPoint.location}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {viewPoint.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    {viewPoint.bestTime}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Mountain Views:</h4>
                      <div className="flex flex-wrap gap-1">
                        {viewPoint.views.map((view) => (
                          <Badge key={view} variant="outline" className="text-xs">
                            {view}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Highlights:</h4>
                      <div className="flex flex-wrap gap-1">
                        {viewPoint.highlights.slice(0, 3).map((highlight) => (
                          <Badge key={highlight} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                        {viewPoint.highlights.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{viewPoint.highlights.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 mt-4">
                    <Camera className="w-4 h-4 mr-2" />
                    Plan Visit
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

export default ViewPoints;