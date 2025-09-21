import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Mountain, MapPin, ChevronDown } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const scrollToCards = () => {
    document.getElementById('explore-cards')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const exploreOptions = [
    {
      title: 'Book Hotels',
      description: 'Discover luxurious stays in the heart of Sikkim with stunning mountain views',
      icon: Building2,
      path: '/hotels',
      gradient: 'from-saffron/80 to-golden-light/60'
    },
    {
      title: 'Visit Places',
      description: 'Explore monasteries, lakes, and cultural sites that define Sikkim\'s heritage',
      icon: MapPin,
      path: '/places',
      gradient: 'from-prayer-flag/80 to-accent/60'
    },
    {
      title: 'View Points',
      description: 'Experience breathtaking panoramic views of the Himalayan peaks',
      icon: Mountain,
      path: '/viewpoints',
      gradient: 'from-mountain-mist/80 to-primary/60'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex flex-col items-center justify-center relative">
        <div className="text-center space-y-6 px-4">
          <h1 className="font-playfair text-6xl md:text-8xl font-bold text-white hero-text">
            Explore Sikkim
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
            Discover the mystical beauty of the Himalayas, where ancient traditions meet breathtaking landscapes
          </p>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 cursor-pointer scroll-indicator"
          onClick={scrollToCards}
        >
          <ChevronDown className="w-8 h-8 text-white/80" />
        </div>
      </section>

      {/* Explore Cards Section */}
      <section id="explore-cards" className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
              Your Journey Begins Here
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your adventure in the enchanting land of Sikkim
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {exploreOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <Card 
                  key={option.title}
                  className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  onClick={() => navigate(option.path)}
                >
                  <CardContent className="p-0">
                    <div className={`h-48 bg-gradient-to-br ${option.gradient} flex items-center justify-center`}>
                      <IconComponent className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-playfair text-2xl font-bold text-foreground mb-3">
                        {option.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {option.description}
                      </p>
                      <Button 
                        className="w-full group-hover:bg-primary/90 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(option.path);
                        }}
                      >
                        Explore Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="font-playfair text-2xl font-bold mb-4">
            Experience the Magic of Sikkim
          </h3>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            From the sacred monasteries to the pristine mountain peaks, 
            Sikkim offers a journey of discovery for the soul and spirit.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;