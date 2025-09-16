-- Update the existing profiles table to include role
DO $$
BEGIN
  -- Create user_role enum if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE public.user_role AS ENUM ('user', 'admin');
  END IF;
END$$;

-- Add role column to profiles if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='role') THEN
    ALTER TABLE public.profiles ADD COLUMN role user_role DEFAULT 'user';
  END IF;
END$$;

-- Update places table with proper references if needed
DO $$
BEGIN
  -- Add created_by column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='places' AND column_name='created_by') THEN
    ALTER TABLE public.places ADD COLUMN created_by UUID;
  END IF;
END$$;

-- Update RLS policies for profiles to include role-based access
DROP POLICY IF EXISTS "Admins can manage all places" ON public.places;
DROP POLICY IF EXISTS "Users can create places (pending approval)" ON public.places;

-- Create updated RLS policies
CREATE POLICY "Everyone can view active places" 
ON public.places 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Users can create places (pending approval)" 
ON public.places 
FOR INSERT 
WITH CHECK (auth.uid() = created_by);

-- Create security definer function to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role::text FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

CREATE POLICY "Admins can manage all places" 
ON public.places 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

-- Update the handle_new_user function to use user_id instead of id
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert sample Sikkim places data
INSERT INTO public.places (name, description, category, place_type, latitude, longitude, altitude, address, features, rating, best_time_to_visit, price_range, is_featured) VALUES
('Tsomgo Lake', 'A glacial lake in East Sikkim, sacred to locals and surrounded by snow-capped mountains.', 'nature_point', 'lake', 27.3617, 88.7589, 3753, 'East Sikkim', '{"Sacred Lake", "Mountain Views", "Photography"}', 4.5, 'April to October', 'Free', true),
('Rumtek Monastery', 'The largest monastery in Sikkim, home to the Karmapa and center of Tibetan Buddhism.', 'monastery', 'monastery', 27.3556, 88.6486, 1547, 'Gangtok, East Sikkim', '{"Tibetan Architecture", "Prayer Wheels", "Buddhist Art"}', 4.8, 'Year Round', 'Free', true),
('Nathula Pass', 'A mountain pass on the Indo-China border, historically part of the ancient Silk Route.', 'tourist_spot', 'mountain', 27.3919, 88.8431, 4310, 'East Sikkim', '{"Border View", "Historical Significance", "High Altitude"}', 4.3, 'April to October', '₹50 per person', true),
('Pelling Skywalk', 'A hill station offering spectacular views of Kanchenjunga and ancient monasteries.', 'tourist_spot', 'viewpoint', 27.2167, 88.2167, 2150, 'West Sikkim', '{"Kanchenjunga View", "Monasteries", "Sunrise Point"}', 4.4, 'October to May', 'Varies', true),
('Losar Festival', 'Tibetan New Year celebrated across Sikkim with traditional dances and rituals.', 'festival', 'festival', 27.3333, 88.6167, null, 'Throughout Sikkim', '{"Traditional Dances", "Buddhist Rituals", "Local Cuisine"}', 4.7, 'February-March', 'Free', false)
ON CONFLICT (name) DO NOTHING;