-- Create enum types for categories and place types
CREATE TYPE public.place_category AS ENUM (
  'hotel',
  'tourist_spot',
  'monastery',
  'nature_point',
  'festival',
  'cultural_site'
);

CREATE TYPE public.place_type AS ENUM (
  'mountain',
  'monastery',
  'lake',
  'viewpoint',
  'park',
  'festival',
  'hotel',
  'temple',
  'waterfall',
  'trek',
  'village'
);

CREATE TYPE public.user_role AS ENUM (
  'user',
  'admin'
);

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create places table for all tourist attractions
CREATE TABLE public.places (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category place_category NOT NULL,
  place_type place_type NOT NULL,
  latitude NUMERIC,
  longitude NUMERIC,
  altitude INTEGER,
  address TEXT,
  contact_info TEXT,
  website TEXT,
  images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  rating NUMERIC DEFAULT 0,
  difficulty_level TEXT,
  best_time_to_visit TEXT,
  price_range TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create favorites table for user wishlist
CREATE TABLE public.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  place_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can insert own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for places
CREATE POLICY "Everyone can view active places" 
ON public.places 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Users can create places (pending approval)" 
ON public.places 
FOR INSERT 
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Admins can manage all places" 
ON public.places 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Create RLS policies for favorites
CREATE POLICY "Users can view own favorites" 
ON public.favorites 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites" 
ON public.favorites 
FOR ALL 
USING (auth.uid() = user_id);

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_places_updated_at
  BEFORE UPDATE ON public.places
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_places_category ON public.places(category);
CREATE INDEX idx_places_type ON public.places(place_type);
CREATE INDEX idx_places_featured ON public.places(is_featured) WHERE is_featured = true;
CREATE INDEX idx_places_active ON public.places(is_active) WHERE is_active = true;
CREATE INDEX idx_places_location ON public.places(latitude, longitude);
CREATE INDEX idx_favorites_user ON public.favorites(user_id);
CREATE INDEX idx_favorites_place ON public.favorites(place_id);

-- Insert sample data
INSERT INTO public.places (name, description, category, place_type, latitude, longitude, altitude, address, features, rating, best_time_to_visit, price_range, is_featured) VALUES
('Tsomgo Lake', 'A glacial lake in East Sikkim, sacred to locals and surrounded by snow-capped mountains.', 'nature_point', 'lake', 27.3617, 88.7589, 3753, 'East Sikkim', '{"Sacred Lake", "Mountain Views", "Photography"}', 4.5, 'April to October', 'Free', true),
('Rumtek Monastery', 'The largest monastery in Sikkim, home to the Karmapa and center of Tibetan Buddhism.', 'monastery', 'monastery', 27.3556, 88.6486, 1547, 'Gangtok, East Sikkim', '{"Tibetan Architecture", "Prayer Wheels", "Buddhist Art"}', 4.8, 'Year Round', 'Free', true),
('Nathula Pass', 'A mountain pass on the Indo-China border, historically part of the ancient Silk Route.', 'tourist_spot', 'mountain', 27.3919, 88.8431, 4310, 'East Sikkim', '{"Border View", "Historical Significance", "High Altitude"}', 4.3, 'April to October', '₹50 per person', true),
('Pelling', 'A hill station offering spectacular views of Kanchenjunga and ancient monasteries.', 'tourist_spot', 'viewpoint', 27.2167, 88.2167, 2150, 'West Sikkim', '{"Kanchenjunga View", "Monasteries", "Sunrise Point"}', 4.4, 'October to May', 'Varies', true),
('Losar Festival', 'Tibetan New Year celebrated across Sikkim with traditional dances and rituals.', 'festival', 'festival', 27.3333, 88.6167, null, 'Throughout Sikkim', '{"Traditional Dances", "Buddhist Rituals", "Local Cuisine"}', 4.7, 'February-March', 'Free', false);