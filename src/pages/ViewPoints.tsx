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
      name: 'Tashi View Point',
      location: 'Gangtok',
      description: 'Famous for sunrise views over Kanchenjunga and surrounding peaks. One of the most accessible viewpoints with spectacular panoramic views.',
      altitude: '2,590m',
      bestTime: 'Early morning (5:30-7:00 AM)',
      highlights: ['Kanchenjunga View', 'Sunrise Point', 'Photography', 'Easy Access'],
      image: '/src/assets/mountain-roads.jpg',
      difficulty: 'Easy',
      views: ['Kanchenjunga', 'Siniolchu', 'Pandim Peak']
    },
    {
      id: '2',
      name: 'Ganesh Tok',
      location: 'Gangtok',
      description: 'A small temple dedicated to Lord Ganesha offering 360-degree views of Gangtok city and distant mountains.',
      altitude: '2,150m',
      bestTime: 'Morning and evening',
      highlights: ['City Views', 'Temple Visit', 'Cable Car Access', '360° Panorama'],
      image: '/src/assets/buddha-park-statue.jpg',
      difficulty: 'Easy',
      views: ['Gangtok City', 'Distant Himalayas', 'Valley Views']
    },
    {
      id: '3',
      name: 'Hanuman Tok',
      location: 'Gangtok',
      description: 'Highest viewpoint in Gangtok with a temple dedicated to Lord Hanuman and stunning mountain vistas.',
      altitude: '2,200m',
      bestTime: 'Morning (6:00-10:00 AM)',
      highlights: ['Highest Point', 'Hanuman Temple', 'Mountain Views', 'Peaceful Setting'],
      image: '/src/assets/prayer-flags.jpg',
      difficulty: 'Easy',
      views: ['Kanchenjunga Range', 'Sikkim Himalayas', 'Tibet Border']
    },
    {
      id: '4',
      name: 'Tiger Hill',
      location: 'Darjeeling (Near Sikkim)',
      description: 'World-famous sunrise point offering magnificent views of Everest, Kanchenjunga, and other Himalayan peaks.',
      altitude: '2,573m',
      bestTime: 'Sunrise (4:30-6:00 AM)',
      highlights: ['Everest View', 'Sunrise Spectacle', 'World Famous', 'Multiple Peaks'],
      image: '/src/assets/buddha-statue.jpg',
      difficulty: 'Moderate',
      views: ['Mount Everest', 'Kanchenjunga', 'Makalu', 'Lhotse']
    },
    {
      id: '5',
      name: 'Pelling Skywalk',
      location: 'Pelling',
      description: 'Glass skywalk offering thrilling views of Kanchenjunga and the Pelling valley below.',
      altitude: '2,150m',
      bestTime: 'Morning and late afternoon',
      highlights: ['Glass Skywalk', 'Thrilling Experience', 'Valley Views', 'Photography Hub'],
      image: '/src/assets/sikkim-monastery-door.jpg',
      difficulty: 'Moderate',
      views: ['Kanchenjunga', 'Pelling Valley', 'Himalayan Range']
    },
    {
      id: '6',
      name: 'Rabdentse Ruins Viewpoint',
      location: 'Pelling',
      description: 'Historical ruins of the former Sikkim capital with panoramic mountain views and ancient palace remains.',
      altitude: '2,100m',
      bestTime: 'Morning and evening',
      highlights: ['Historical Significance', 'Palace Ruins', 'Mountain Views', 'Cultural Heritage'],
      image: '/src/assets/sikkim-culture-1.jpg',
      difficulty: 'Easy',
      views: ['Kanchenjunga Range', 'Rabdentse Valley', 'Historical Landscape']
    },
    {
      id: '7',
      name: 'Saramsa Garden Viewpoint',
      location: 'Gangtok',
      description: 'Beautiful garden with viewpoint offering serene mountain views amidst colorful flowers and landscaped gardens.',
      altitude: '1,800m',
      bestTime: 'All day (best in spring)',
      highlights: ['Garden Views', 'Flower Displays', 'Peaceful Setting', 'Family Friendly'],
      image: '/src/assets/sikkim-women-traditional.jpg',
      difficulty: 'Easy',
      views: ['Garden Valley', 'Distant Mountains', 'Terraced Landscapes']
    },
    {
      id: '8',
      name: 'Doka La Pass',
      location: 'En route to Tsomgo Lake',
      description: 'High altitude pass offering spectacular 360-degree views of the Eastern Himalayas and prayer flag displays.',
      altitude: '4,020m',
      bestTime: 'Morning (weather permitting)',
      highlights: ['High Altitude', 'Prayer Flags', '360° Views', 'Pass Experience'],
      image: '/src/assets/sikkim-prayer-wheel.jpg',
      difficulty: 'Challenging',
      views: ['Eastern Himalayas', 'Multiple Peaks', 'Alpine Landscape']
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