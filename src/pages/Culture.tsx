import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Mountain, Palette } from 'lucide-react';
import sikkimGirlFestival from '@/assets/sikkim-girl-festival.jpg';
import sikkimCulture from '@/assets/sikkim-culture-1.jpg';
import sikkimWomenTraditional from '@/assets/sikkim-women-traditional.jpg';
import sikkimMonksCeremony from '@/assets/sikkim-monks-ceremony.jpg';
import sikkimMonasteryDoor from '@/assets/sikkim-monastery-door.jpg';
import sikkimPrayerWheel from '@/assets/sikkim-prayer-wheel.jpg';
import prayerFlags from '@/assets/prayer-flags.jpg';
import meditationImage from '@/assets/tibetan-meditation.jpg';
import sikkimCulturalIcon from '@/assets/sikkim-cultural-icon.jpg';

const Culture = () => {
  const festivals = [
    {
      name: 'Losar',
      description: 'Tibetan New Year celebrated with great enthusiasm, featuring traditional dances, prayers, and family gatherings. The festival marks the beginning of the lunar calendar.',
      date: 'February/March',
      image: sikkimGirlFestival,
      significance: 'Most important festival for Tibetan Buddhists'
    },
    {
      name: 'Saga Dawa',
      description: 'Sacred month commemorating Buddha\'s birth, enlightenment, and death. Devotees participate in prayer ceremonies and perform good deeds.',
      date: 'May/June',
      image: meditationImage,
      significance: 'Holiest Buddhist celebration'
    },
    {
      name: 'Pang Lhabsol',
      description: 'Unique to Sikkim, this festival is dedicated to Mount Khangchendzonga, the guardian deity of Sikkim. Features traditional Cham dances.',
      date: 'November',
      image: sikkimMonksCeremony,
      significance: 'State festival honoring guardian deity'
    }
  ];

  const traditions = [
    {
      title: 'Traditional Attire',
      description: 'Sikkimese people wear distinct traditional clothing. Women wear Kho (traditional robe) with intricate designs, while men wear Bakhu. Each community has unique styles reflecting their heritage.',
      image: sikkimWomenTraditional,
      communities: ['Bhutia', 'Lepcha', 'Nepali']
    },
    {
      title: 'Monastery Architecture',
      description: 'Sikkim\'s monasteries showcase magnificent Tibetan Buddhist architecture with ornate doors, colorful murals, and sacred symbols. These spiritual centers preserve ancient wisdom and artistic traditions.',
      image: sikkimMonasteryDoor,
      communities: ['Buddhist Heritage', 'Tibetan Art', 'Sacred Architecture']
    },
    {
      title: 'Prayer Rituals',
      description: 'Prayer wheels, colorful flags, and sacred ceremonies are integral to Sikkimese spiritual life. These practices connect the community to their Buddhist heritage and mountain spirit.',
      image: sikkimPrayerWheel,
      communities: ['Buddhist Practices', 'Spiritual Rituals', 'Mountain Worship']
    }
  ];

  const culturalAspects = [
    {
      icon: Users,
      title: 'Communities',
      description: 'Sikkim is home to diverse ethnic groups including Bhutias, Lepchas, and Nepalis, each contributing unique traditions, languages, and customs.',
      details: ['Bhutia: Tibetan origin, Buddhist culture', 'Lepcha: Indigenous people, nature worship', 'Nepali: Hindu traditions, vibrant festivals']
    },
    {
      icon: Mountain,
      title: 'Sacred Mountains',
      description: 'Mountains hold deep spiritual significance in Sikkimese culture. Khangchendzonga is revered as a guardian deity protecting the land and people.',
      details: ['Mount worship traditions', 'Sacred pilgrimage sites', 'Mountain deity festivals']
    },
    {
      icon: Palette,
      title: 'Arts & Crafts',
      description: 'Traditional handicrafts include thangka paintings, wood carving, carpet weaving, and mask making, preserving ancient artistic techniques.',
      details: ['Thangka painting tradition', 'Wooden mask crafting', 'Traditional carpet weaving', 'Bamboo and cane work']
    },
    {
      icon: Calendar,
      title: 'Cultural Calendar',
      description: 'The Sikkimese year is filled with festivals and celebrations that mark seasonal changes, harvest times, and religious observances.',
      details: ['Lunar calendar festivals', 'Harvest celebrations', 'Monastery festivals', 'Cultural performances']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-cultural-warm to-heritage-deep overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${sikkimCulturalIcon})` }}
        />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4">
              Sikkim Culture & Heritage
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Experience the rich tapestry of traditions, festivals, and spiritual heritage that defines the soul of Sikkim
            </p>
          </div>
        </div>
      </section>

      {/* Festivals Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sacred Festivals & Celebrations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the vibrant festivals that bring communities together in joy and spiritual celebration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {festivals.map((festival, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={festival.image} 
                    alt={festival.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90">
                      {festival.date}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-playfair text-xl">{festival.name}</CardTitle>
                  <CardDescription className="text-sm font-medium text-primary">
                    {festival.significance}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {festival.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional Aspects Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
              Living Traditions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the customs, attire, and practices that have been preserved through generations
            </p>
          </div>

          <div className="space-y-12">
            {traditions.map((tradition, index) => (
              <div key={index} className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
                <div className={`space-y-4 ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  <h3 className="font-playfair text-2xl font-bold text-foreground">
                    {tradition.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {tradition.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tradition.communities.map((community, idx) => (
                      <Badge key={idx} variant="outline">{community}</Badge>
                    ))}
                  </div>
                </div>
                <div className={`${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                  <img 
                    src={tradition.image} 
                    alt={tradition.title}
                    className="w-full h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Aspects Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cultural Heritage
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding the deep-rooted elements that shape Sikkimese identity and way of life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {culturalAspects.map((aspect, index) => {
              const IconComponent = aspect.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="font-playfair">{aspect.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {aspect.description}
                    </p>
                    <div className="space-y-2">
                      {aspect.details.map((detail, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground/80 bg-muted/50 p-2 rounded">
                          {detail}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Prayer Flags Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative h-64 rounded-lg overflow-hidden mb-8">
            <img 
              src={prayerFlags} 
              alt="Colorful Prayer Flags"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
            Sacred Prayer Flags
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Colorful prayer flags flutter in the mountain breeze, carrying mantras and prayers across the landscape. 
            These vibrant symbols represent the five elements and spread compassion, peace, and wisdom throughout Sikkim.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="bg-white/50 p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Blue Flags</h4>
              <p className="text-muted-foreground">Represent space and sky</p>
            </div>
            <div className="bg-white/50 p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">White Flags</h4>
              <p className="text-muted-foreground">Symbolize air and wind</p>
            </div>
            <div className="bg-white/50 p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Red Flags</h4>
              <p className="text-muted-foreground">Represent fire energy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Culture;