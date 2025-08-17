-- Ghost Content Database Schema
-- =============================================================================

-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Custom Types
CREATE TYPE user_type_enum AS ENUM ('client', 'freelancer', 'admin');
CREATE TYPE subscription_plan_enum AS ENUM ('starter', 'pro', 'elite');
CREATE TYPE mission_status_enum AS ENUM ('draft', 'pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE payment_status_enum AS ENUM ('pending', 'captured', 'failed', 'refunded');

-- ============================================================================= 
-- PROFILES TABLE
-- =============================================================================

/*
  # Profiles Table

  1. New Tables
    - `profiles` table for user profile information
      - `id` (uuid, references auth.users, primary key)
      - `email` (text, unique, not null)
      - `full_name` (text)
      - `user_type` (user_type_enum, not null)
      - `subscription_plan` (subscription_plan_enum)
      - `avatar_url` (text)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `profiles` table
    - Users can read and update their own profile
    - Admins can read all profiles
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  user_type user_type_enum NOT NULL DEFAULT 'client',
  subscription_plan subscription_plan_enum,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- ============================================================================= 
-- FREELANCERS TABLE
-- =============================================================================

/*
  # Freelancers Extended Profile

  1. New Tables
    - `freelancers` table for freelancer-specific information
      - `id` (uuid, references profiles.id, primary key)
      - `specialties` (text array)
      - `languages` (text array)
      - `hourly_rate` (integer, in euros)
      - `response_time` (text)
      - `portfolio_urls` (text array)
      - `bio` (text)
      - `rating` (decimal, default 0)
      - `completed_projects` (integer, default 0)
      - `is_verified` (boolean, default false)
      - `is_available` (boolean, default true)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `freelancers` table
    - Freelancers can read and update their own data
    - Clients and admins can read all freelancer profiles
*/

CREATE TABLE IF NOT EXISTS freelancers (
  id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  specialties text[] DEFAULT '{}',
  languages text[] DEFAULT '{}',
  hourly_rate integer,
  response_time text DEFAULT '24h',
  portfolio_urls text[] DEFAULT '{}',
  bio text,
  rating decimal(3,2) DEFAULT 0.0,
  completed_projects integer DEFAULT 0,
  is_verified boolean DEFAULT false,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE freelancers ENABLE ROW LEVEL SECURITY;

-- Policies for freelancers
CREATE POLICY "Freelancers can read and update own data"
  ON freelancers
  FOR ALL
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Clients can read freelancer profiles"
  ON freelancers
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND user_type IN ('client', 'admin')
    )
  );

-- ============================================================================= 
-- BRIEFS TABLE
-- =============================================================================

/*
  # Project Briefs

  1. New Tables
    - `briefs` table for project requirements
      - `id` (uuid, primary key)
      - `client_id` (uuid, references profiles.id)
      - `title` (text, not null)
      - `description` (text)
      - `video_type` (text)
      - `platforms` (text array)
      - `duration` (text)
      - `budget_min` (integer)
      - `budget_max` (integer)
      - `deadline` (date)
      - `is_rush` (boolean, default false)
      - `requirements` (jsonb)
      - `status` (text, default 'draft')
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `briefs` table
    - Clients can manage their own briefs
    - Admins can read all briefs
*/

CREATE TABLE IF NOT EXISTS briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  video_type text,
  platforms text[] DEFAULT '{}',
  duration text,
  budget_min integer,
  budget_max integer,
  deadline date,
  is_rush boolean DEFAULT false,
  requirements jsonb DEFAULT '{}',
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE briefs ENABLE ROW LEVEL SECURITY;

-- Policies for briefs
CREATE POLICY "Clients can manage own briefs"
  ON briefs
  FOR ALL
  TO authenticated
  USING (auth.uid() = client_id);

CREATE POLICY "Admins can read all briefs"
  ON briefs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- ============================================================================= 
-- MATCHES TABLE
-- =============================================================================

/*
  # Matching System

  1. New Tables
    - `matches` table for brief-freelancer matches
      - `id` (uuid, primary key)
      - `brief_id` (uuid, references briefs.id)
      - `freelancer_id` (uuid, references freelancers.id)
      - `score` (integer, 0-100)
      - `reasons` (text array)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `matches` table
    - Clients can see matches for their briefs
    - Freelancers can see their matches
    - Admins can see all matches
*/

CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brief_id uuid REFERENCES briefs(id) ON DELETE CASCADE,
  freelancer_id uuid REFERENCES freelancers(id) ON DELETE CASCADE,
  score integer CHECK (score >= 0 AND score <= 100),
  reasons text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  UNIQUE(brief_id, freelancer_id)
);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Policies for matches
CREATE POLICY "Clients can see matches for their briefs"
  ON matches
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM briefs 
      WHERE id = brief_id AND client_id = auth.uid()
    )
  );

CREATE POLICY "Freelancers can see their matches"
  ON matches
  FOR SELECT
  TO authenticated
  USING (auth.uid() = freelancer_id);

CREATE POLICY "Admins can see all matches"
  ON matches
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- ============================================================================= 
-- MISSIONS TABLE
-- =============================================================================

/*
  # Missions (Active Projects)

  1. New Tables
    - `missions` table for active projects with escrow
      - `id` (uuid, primary key)
      - `brief_id` (uuid, references briefs.id)
      - `freelancer_id` (uuid, references freelancers.id)
      - `client_id` (uuid, references profiles.id)
      - `amount` (integer, in cents)
      - `commission_amount` (integer, in cents)
      - `status` (mission_status_enum)
      - `payment_intent_id` (text)
      - `deliverables` (jsonb)
      - `feedback` (text)
      - `rating` (integer, 1-5)
      - `created_at` (timestamptz, default now())
      - `completed_at` (timestamptz)

  2. Security
    - Enable RLS on `missions` table
    - Participants can manage their missions
    - Admins can see all missions
*/

CREATE TABLE IF NOT EXISTS missions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brief_id uuid REFERENCES briefs(id),
  freelancer_id uuid REFERENCES freelancers(id),
  client_id uuid REFERENCES profiles(id),
  amount integer NOT NULL,
  commission_amount integer NOT NULL,
  status mission_status_enum DEFAULT 'pending',
  payment_intent_id text,
  deliverables jsonb DEFAULT '{}',
  feedback text,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE missions ENABLE ROW LEVEL SECURITY;

-- Policies for missions
CREATE POLICY "Mission participants can manage missions"
  ON missions
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (client_id, freelancer_id));

CREATE POLICY "Admins can manage all missions"
  ON missions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- ============================================================================= 
-- SUBSCRIPTIONS & PAYMENTS
-- =============================================================================

/*
  # Subscription & Payment Management

  1. New Tables
    - `subscriptions` table for managing user subscriptions
    - `payments` table for payment tracking

  2. Security
    - Enable RLS with appropriate policies
*/

CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_subscription_id text UNIQUE,
  plan subscription_plan_enum NOT NULL,
  status text NOT NULL,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  mission_id uuid REFERENCES missions(id),
  stripe_payment_intent_id text UNIQUE,
  amount integer NOT NULL,
  status payment_status_enum DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  captured_at timestamptz
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================= 
-- SKILL TESTS & ADMIN
-- =============================================================================

/*
  # Skill Testing System

  1. New Tables
    - `skill_tests` table for available tests
    - `test_assignments` table for assigned tests
    - `test_scores` table for results
    - `admin_counters` table for homepage counters

  2. Security
    - Enable RLS with role-based access
*/

CREATE TABLE IF NOT EXISTS skill_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text,
  questions jsonb NOT NULL,
  duration_minutes integer DEFAULT 60,
  passing_score integer DEFAULT 70,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE skill_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Freelancers can read active tests"
  ON skill_tests
  FOR SELECT
  TO authenticated
  USING (
    is_active = true AND 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND user_type = 'freelancer'
    )
  );

CREATE TABLE IF NOT EXISTS test_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id uuid REFERENCES freelancers(id),
  test_id uuid REFERENCES skill_tests(id),
  assigned_at timestamptz DEFAULT now(),
  deadline timestamptz,
  status text DEFAULT 'assigned'
);

ALTER TABLE test_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Freelancers can see own assignments"
  ON test_assignments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = freelancer_id);

CREATE TABLE IF NOT EXISTS test_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid REFERENCES test_assignments(id),
  freelancer_id uuid REFERENCES freelancers(id),
  score integer,
  answers jsonb,
  completed_at timestamptz DEFAULT now()
);

ALTER TABLE test_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Freelancers can see own scores"
  ON test_scores
  FOR SELECT
  TO authenticated
  USING (auth.uid() = freelancer_id);

CREATE TABLE IF NOT EXISTS admin_counters (
  id text PRIMARY KEY,
  value integer NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Initialize default counters
INSERT INTO admin_counters (id, value) VALUES 
  ('freelancers_count', 847),
  ('projects_completed', 3280),
  ('clients_satisfied', 912),
  ('avg_delivery_hours', 48)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE admin_counters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can read counters"
  ON admin_counters
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update counters"
  ON admin_counters
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- ============================================================================= 
-- SEED DATA
-- =============================================================================

/*
  # Seed Data for Demo

  Insert sample freelancers and test data
*/

-- Insert sample freelancers (only if not exists)
DO $$
BEGIN
  -- Create demo freelancer profiles if they don't exist
  INSERT INTO auth.users (id, email, created_at) 
  SELECT gen_random_uuid(), email, now()
  FROM (
    VALUES 
      ('sophie.martin@demo.com'),
      ('alex.dubois@demo.com'),
      ('emma.rodriguez@demo.com'),
      ('julien.bernard@demo.com'),
      ('marie.petit@demo.com')
  ) AS demo_emails(email)
  WHERE NOT EXISTS (
    SELECT 1 FROM auth.users WHERE auth.users.email = demo_emails.email
  );
END $$;

-- Insert profiles for demo freelancers
INSERT INTO profiles (id, email, full_name, user_type)
SELECT 
  u.id, 
  u.email, 
  CASE u.email
    WHEN 'sophie.martin@demo.com' THEN 'Sophie Martin'
    WHEN 'alex.dubois@demo.com' THEN 'Alexandre Dubois'
    WHEN 'emma.rodriguez@demo.com' THEN 'Emma Rodriguez'
    WHEN 'julien.bernard@demo.com' THEN 'Julien Bernard'
    WHEN 'marie.petit@demo.com' THEN 'Marie Petit'
  END,
  'freelancer'
FROM auth.users u
WHERE u.email IN (
  'sophie.martin@demo.com',
  'alex.dubois@demo.com',
  'emma.rodriguez@demo.com',
  'julien.bernard@demo.com',
  'marie.petit@demo.com'
)
ON CONFLICT (id) DO NOTHING;

-- Insert freelancer extended profiles
INSERT INTO freelancers (id, specialties, languages, hourly_rate, response_time, rating, completed_projects, is_verified)
SELECT 
  p.id,
  CASE p.email
    WHEN 'sophie.martin@demo.com' THEN ARRAY['Motion Design', 'After Effects', '2D Animation']
    WHEN 'alex.dubois@demo.com' THEN ARRAY['Montage Vidéo', 'YouTube', 'Réseaux Sociaux']
    WHEN 'emma.rodriguez@demo.com' THEN ARRAY['Animation 3D', 'Publicité', 'VFX']
    WHEN 'julien.bernard@demo.com' THEN ARRAY['Tournage', 'Documentaire', 'Interview']
    WHEN 'marie.petit@demo.com' THEN ARRAY['Illustration', 'Motion Graphics', 'Branding']
  END,
  CASE p.email
    WHEN 'sophie.martin@demo.com' THEN ARRAY['Français', 'Anglais']
    WHEN 'alex.dubois@demo.com' THEN ARRAY['Français']
    WHEN 'emma.rodriguez@demo.com' THEN ARRAY['Français', 'Anglais', 'Espagnol']
    WHEN 'julien.bernard@demo.com' THEN ARRAY['Français', 'Anglais']
    WHEN 'marie.petit@demo.com' THEN ARRAY['Français', 'Anglais']
  END,
  CASE p.email
    WHEN 'sophie.martin@demo.com' THEN 85
    WHEN 'alex.dubois@demo.com' THEN 60
    WHEN 'emma.rodriguez@demo.com' THEN 120
    WHEN 'julien.bernard@demo.com' THEN 95
    WHEN 'marie.petit@demo.com' THEN 75
  END,
  CASE p.email
    WHEN 'sophie.martin@demo.com' THEN '2h'
    WHEN 'alex.dubois@demo.com' THEN '1h'
    WHEN 'emma.rodriguez@demo.com' THEN '30min'
    WHEN 'julien.bernard@demo.com' THEN '4h'
    WHEN 'marie.petit@demo.com' THEN '3h'
  END,
  CASE p.email
    WHEN 'sophie.martin@demo.com' THEN 4.9
    WHEN 'alex.dubois@demo.com' THEN 4.8
    WHEN 'emma.rodriguez@demo.com' THEN 5.0
    WHEN 'julien.bernard@demo.com' THEN 4.7
    WHEN 'marie.petit@demo.com' THEN 4.8
  END,
  CASE p.email
    WHEN 'sophie.martin@demo.com' THEN 127
    WHEN 'alex.dubois@demo.com' THEN 89
    WHEN 'emma.rodriguez@demo.com' THEN 156
    WHEN 'julien.bernard@demo.com' THEN 73
    WHEN 'marie.petit@demo.com' THEN 98
  END,
  true
FROM profiles p
WHERE p.email IN (
  'sophie.martin@demo.com',
  'alex.dubois@demo.com',
  'emma.rodriguez@demo.com',
  'julien.bernard@demo.com',
  'marie.petit@demo.com'
)
ON CONFLICT (id) DO NOTHING;