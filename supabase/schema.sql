-- DYNO Dating App Database Schema
-- This file contains the complete database structure for the DYNO dating application

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- =============================================
-- USERS TABLE
-- =============================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    phone TEXT UNIQUE,
    full_name TEXT NOT NULL,
    birthday DATE NOT NULL,
    gender TEXT CHECK (gender IN ('male', 'female', 'non-binary', 'other')),
    bio TEXT,
    location GEOGRAPHY(POINT, 4326),
    location_name TEXT,
    max_distance INT DEFAULT 50, -- in kilometers
    age_min INT DEFAULT 18,
    age_max INT DEFAULT 99,
    interested_in TEXT[] DEFAULT ARRAY['all'],
    interests TEXT[] DEFAULT ARRAY[]::TEXT[],
    photos TEXT[] DEFAULT ARRAY[]::TEXT[],
    verified BOOLEAN DEFAULT FALSE,
    is_online BOOLEAN DEFAULT FALSE,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- SWIPES TABLE
-- =============================================
CREATE TABLE public.swipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    target_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    action TEXT CHECK (action IN ('like', 'pass', 'super_like')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, target_user_id)
);

-- =============================================
-- MATCHES TABLE
-- =============================================
CREATE TABLE public.matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user1_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    user2_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CHECK (user1_id < user2_id), -- Ensure consistent ordering
    UNIQUE(user1_id, user2_id)
);

-- =============================================
-- MESSAGES TABLE
-- =============================================
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE NOT NULL,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- REPORTS TABLE
-- =============================================
CREATE TABLE public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    reported_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    reason TEXT NOT NULL,
    description TEXT,
    status TEXT CHECK (status IN ('pending', 'reviewed', 'resolved')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- BLOCKS TABLE
-- =============================================
CREATE TABLE public.blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    blocked_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, blocked_user_id)
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_profiles_location ON public.profiles USING GIST(location);
CREATE INDEX idx_profiles_gender ON public.profiles(gender);
CREATE INDEX idx_profiles_birthday ON public.profiles(birthday);
CREATE INDEX idx_swipes_user_id ON public.swipes(user_id);
CREATE INDEX idx_swipes_target_user_id ON public.swipes(target_user_id);
CREATE INDEX idx_matches_user1_id ON public.matches(user1_id);
CREATE INDEX idx_matches_user2_id ON public.matches(user2_id);
CREATE INDEX idx_messages_match_id ON public.messages(match_id);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Users can view non-blocked profiles" ON public.profiles
    FOR SELECT USING (
        id = auth.uid() OR
        id NOT IN (
            SELECT blocked_user_id FROM public.blocks WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (id = auth.uid());

-- SWIPES POLICIES
CREATE POLICY "Users can view own swipes" ON public.swipes
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own swipes" ON public.swipes
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- MATCHES POLICIES
CREATE POLICY "Users can view own matches" ON public.matches
    FOR SELECT USING (user1_id = auth.uid() OR user2_id = auth.uid());

CREATE POLICY "System can create matches" ON public.matches
    FOR INSERT WITH CHECK (true);

-- MESSAGES POLICIES
CREATE POLICY "Users can view messages in their matches" ON public.messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.matches
            WHERE id = match_id
            AND (user1_id = auth.uid() OR user2_id = auth.uid())
        )
    );

CREATE POLICY "Users can send messages in their matches" ON public.messages
    FOR INSERT WITH CHECK (
        sender_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.matches
            WHERE id = match_id
            AND (user1_id = auth.uid() OR user2_id = auth.uid())
        )
    );

CREATE POLICY "Users can update own messages" ON public.messages
    FOR UPDATE USING (sender_id = auth.uid());

-- REPORTS POLICIES
CREATE POLICY "Users can create reports" ON public.reports
    FOR INSERT WITH CHECK (reporter_id = auth.uid());

CREATE POLICY "Users can view own reports" ON public.reports
    FOR SELECT USING (reporter_id = auth.uid());

-- BLOCKS POLICIES
CREATE POLICY "Users can view own blocks" ON public.blocks
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create blocks" ON public.blocks
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own blocks" ON public.blocks
    FOR DELETE USING (user_id = auth.uid());

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to check for mutual likes and create matches
CREATE OR REPLACE FUNCTION public.check_and_create_match()
RETURNS TRIGGER AS $$
BEGIN
    -- Only proceed if this is a like or super_like
    IF NEW.action IN ('like', 'super_like') THEN
        -- Check if the other user also liked
        IF EXISTS (
            SELECT 1 FROM public.swipes
            WHERE user_id = NEW.target_user_id
            AND target_user_id = NEW.user_id
            AND action IN ('like', 'super_like')
        ) THEN
            -- Create a match (ensure consistent ordering)
            INSERT INTO public.matches (user1_id, user2_id)
            VALUES (
                LEAST(NEW.user_id, NEW.target_user_id),
                GREATEST(NEW.user_id, NEW.target_user_id)
            )
            ON CONFLICT (user1_id, user2_id) DO NOTHING;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create matches
CREATE TRIGGER on_swipe_check_match
    AFTER INSERT ON public.swipes
    FOR EACH ROW
    EXECUTE FUNCTION public.check_and_create_match();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles updated_at
CREATE TRIGGER on_profile_update
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

-- =============================================
-- TEST DATA (for development)
-- =============================================

-- Note: In production, users would be created through Supabase Auth
-- This is sample data for testing purposes only

-- Insert test profiles (requires corresponding auth.users entries)
-- INSERT INTO public.profiles (id, email, full_name, birthday, gender, bio, location_name, interests)
-- VALUES
-- (uuid_generate_v4(), 'sarah@example.com', 'Sarah Johnson', '1995-03-15', 'female', 'Coffee enthusiast ☕ | Love hiking 🏔️', 'San Francisco, CA', ARRAY['Travel', 'Coffee', 'Hiking']),
-- (uuid_generate_v4(), 'emma@example.com', 'Emma Wilson', '1998-07-22', 'female', 'Photographer | Travel enthusiast 📸', 'Los Angeles, CA', ARRAY['Photography', 'Travel', 'Art']);

-- =============================================
-- STORAGE BUCKETS (for profile photos)
-- =============================================
-- Run these in Supabase Dashboard Storage section:
-- 1. Create a bucket named 'profile-photos'
-- 2. Set it to public or create policies as needed

-- Storage Policy for profile photos
-- CREATE POLICY "Users can upload own photos" ON storage.objects
--     FOR INSERT WITH CHECK (
--         bucket_id = 'profile-photos' AND
--         auth.uid()::text = (storage.foldername(name))[1]
--     );

-- CREATE POLICY "Anyone can view photos" ON storage.objects
--     FOR SELECT USING (bucket_id = 'profile-photos');
