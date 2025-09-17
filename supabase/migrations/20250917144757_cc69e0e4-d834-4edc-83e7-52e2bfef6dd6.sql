-- Add cultural places showcasing Sikkim's heritage and people
INSERT INTO public.places (
  name, 
  description, 
  category, 
  place_type, 
  address, 
  rating, 
  images, 
  features, 
  best_time_to_visit, 
  price_range, 
  altitude, 
  is_featured,
  is_active
) VALUES 

-- Traditional Culture Experience
(
  'Sikkim Cultural Heritage Tour',
  'Immerse yourself in authentic Sikkim culture by meeting local people in traditional dress, learning about customs, and experiencing the warmth of Sikkimese hospitality. Join cultural programs and witness traditional ceremonies.',
  'cultural',
  'cultural_site',
  'Various Villages, Sikkim',
  4.8,
  ARRAY['/src/assets/sikkim-women-traditional.jpg', '/src/assets/sikkim-culture-1.jpg'],
  ARRAY['Traditional dress experience', 'Cultural performances', 'Local interaction', 'Photography opportunities', 'Authentic cuisine'],
  'October to December, March to May',
  '₹2000-5000',
  '1500-2000',
  true,
  true
),

-- Festival Experience
(
  'Sikkim Festival Celebrations',
  'Experience the vibrant festivals of Sikkim with colorful face paintings, traditional ceremonies, and cultural performances. Participate in Losar, Saga Dawa, and other local festivals celebrating Sikkim''s rich heritage.',
  'cultural',
  'cultural_site',
  'Gangtok and surrounding areas',
  4.9,
  ARRAY['/src/assets/sikkim-girl-festival.jpg', '/src/assets/prayer-flags.jpg'],
  ARRAY['Face painting ceremonies', 'Traditional music', 'Cultural dances', 'Local food stalls', 'Community participation'],
  'February to April, October to December',
  '₹1500-3000',
  '1500-1800',
  true,
  true
),

-- Monastery Life Experience
(
  'Monastery Life & Young Monks Experience',
  'Witness the daily life of young monks in Sikkim''s monasteries. Observe prayer ceremonies, meditation sessions, and traditional music performances under colorful prayer flags.',
  'spiritual',
  'monastery',
  'Rumtek, Enchey, Pemayangtse Monasteries',
  4.7,
  ARRAY['/src/assets/sikkim-monks-ceremony.jpg', '/src/assets/buddha-statue.jpg'],
  ARRAY['Monk interactions', 'Prayer ceremonies', 'Traditional music', 'Meditation sessions', 'Photography allowed'],
  'Throughout the year',
  '₹500-1500',
  '1600-3500',
  true,
  true
),

-- Prayer Wheel Experience
(
  'Sacred Prayer Wheel Circuit',
  'Visit the beautiful prayer wheels scattered across Sikkim''s monasteries and sacred sites. Learn about their significance and participate in the spiritual practice of spinning these ornate wheels.',
  'spiritual',
  'religious_site',
  'Various Monasteries, Sikkim',
  4.6,
  ARRAY['/src/assets/sikkim-prayer-wheel.jpg', '/src/assets/mountain-roads.jpg'],
  ARRAY['Prayer wheel spinning', 'Spiritual guidance', 'Sacred mantras', 'Meditation spots', 'Cultural learning'],
  'Throughout the year',
  '₹300-1000',
  '1400-3000',
  false,
  true
),

-- Buddha Park Enhanced
(
  'Buddha Park - Spiritual Journey',
  'Experience the magnificent Buddha Park in Sikkim featuring the towering golden Buddha statue surrounded by lush green landscapes and mountain views. A perfect place for meditation and spiritual reflection.',
  'spiritual',
  'park',
  'Ravangla, South Sikkim',
  4.8,
  ARRAY['/src/assets/buddha-park-statue.jpg', '/src/assets/buddha-statue.jpg'],
  ARRAY['Giant Buddha statue', 'Mountain views', 'Meditation areas', 'Garden walks', 'Photography spots', 'Spiritual atmosphere'],
  'March to June, September to November',
  '₹100-500',
  '2100',
  true,
  true
),

-- Monastery Architecture
(
  'Ancient Monastery Architecture Tour',
  'Explore the intricate architecture and artistic details of Sikkim''s ancient monasteries. Marvel at ornate doors, colorful murals, and traditional Tibetan Buddhist art that tells stories of centuries-old traditions.',
  'cultural',
  'monastery',
  'Pemayangtse, Tashiding, Rumtek Monasteries',
  4.7,
  ARRAY['/src/assets/sikkim-monastery-door.jpg', '/src/assets/buddha-statue.jpg'],
  ARRAY['Architectural photography', 'Art appreciation', 'Historical significance', 'Guided tours', 'Cultural education'],
  'Throughout the year',
  '₹800-2000',
  '1500-3000',
  false,
  true
);