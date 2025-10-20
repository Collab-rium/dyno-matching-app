# Supabase Backend Setup Guide

## Overview

This document provides instructions for setting up the Supabase backend for the DYNO dating application.

## Prerequisites

- Supabase account (https://supabase.com)
- Node.js and npm installed
- React Native development environment

## Setup Steps

### 1. Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Enter project details:
   - Name: `dyno-dating-app`
   - Database Password: (generate a strong password)
   - Region: (select closest to your users)
4. Wait for project provisioning (~2 minutes)

### 2. Run Database Schema

1. Navigate to SQL Editor in Supabase Dashboard
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste and click "Run"
5. Verify tables are created in the Table Editor

### 3. Configure Environment Variables

1. Get your project credentials from Supabase Dashboard > Settings > API
2. Create a `.env` file in project root:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Install Dependencies

```bash
npm install @supabase/supabase-js @react-native-async-storage/async-storage
```

### 5. Set Up Storage for Profile Photos

1. Go to Storage in Supabase Dashboard
2. Create a new bucket named `profile-photos`
3. Set policies:
   - **Upload**: Users can upload to their own folder
   - **Select**: Public read access

## Database Structure

### Tables

#### `profiles`

Stores user profile information including personal details, preferences, and location.

**Key Fields:**

- `id`: UUID (references auth.users)
- `email`, `phone`, `full_name`, `birthday`
- `gender`, `bio`, `interests`
- `location`: PostGIS geography point
- `photos`: Array of image URLs
- `verified`, `is_online`, `last_active`

#### `swipes`

Records user actions (like, pass, super_like) on other profiles.

**Key Fields:**

- `user_id`: Who performed the action
- `target_user_id`: Who received the action
- `action`: 'like' | 'pass' | 'super_like'

#### `matches`

Stores mutual likes between users.

**Key Fields:**

- `user1_id`, `user2_id`: The matched users (ordered)
- Automatically created when mutual likes occur

#### `messages`

Stores chat messages between matched users.

**Key Fields:**

- `match_id`: Reference to the match
- `sender_id`: Who sent the message
- `content`: Message text
- `read`: Read status

#### `reports`

Handles user reports for moderation.

#### `blocks`

Manages blocked users.

## Row Level Security (RLS)

All tables have RLS enabled with policies ensuring:

- Users can only view/modify their own data
- Users cannot see blocked profiles
- Messages are only visible to matched users
- Matches are created automatically by database triggers

## Key Functions

### `check_and_create_match()`

Automatically creates a match when two users mutually like each other. Triggered after each swipe insertion.

### `update_updated_at()`

Updates the `updated_at` timestamp on profile updates.

## Usage Examples

### Initialize Supabase Client

```javascript
import { supabase } from "./lib/supabase";
```

### Create User Profile

```javascript
const { data, error } = await supabase.from("profiles").insert({
  id: user.id,
  email: user.email,
  full_name: "John Doe",
  birthday: "1995-01-01",
  gender: "male",
  bio: "Love hiking and coffee",
  interests: ["Travel", "Music", "Hiking"],
});
```

### Get Potential Matches

```javascript
const { data, error } = await supabase
  .from("profiles")
  .select("*")
  .neq("id", currentUserId)
  .limit(10);
```

### Swipe on a Profile

```javascript
const { data, error } = await supabase.from("swipes").insert({
  user_id: currentUserId,
  target_user_id: targetUserId,
  action: "like",
});
```

### Get Matches

```javascript
const { data, error } = await supabase
  .from("matches")
  .select(
    `
    *,
    user1:profiles!matches_user1_id_fkey(*),
    user2:profiles!matches_user2_id_fkey(*)
  `
  )
  .or(`user1_id.eq.${userId},user2_id.eq.${userId}`);
```

### Send Message

```javascript
const { data, error } = await supabase.from("messages").insert({
  match_id: matchId,
  sender_id: currentUserId,
  content: "Hello!",
});
```

### Subscribe to New Messages (Real-time)

```javascript
const subscription = supabase
  .channel("messages")
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "messages",
      filter: `match_id=eq.${matchId}`,
    },
    (payload) => {
      console.log("New message:", payload.new);
    }
  )
  .subscribe();
```

### Upload Profile Photo

```javascript
const { data, error } = await supabase.storage
  .from("profile-photos")
  .upload(`${userId}/photo-${Date.now()}.jpg`, photoFile, {
    contentType: "image/jpeg",
  });

const publicUrl = supabase.storage
  .from("profile-photos")
  .getPublicUrl(data.path).data.publicUrl;
```

## Testing

### Test Data

The schema includes commented-out test data. To use:

1. Uncomment the INSERT statements at the end of `schema.sql`
2. Create corresponding auth users first via Supabase Auth
3. Run the inserts

### Manual Testing

1. Use Supabase Dashboard > Table Editor to view/edit data
2. Test RLS policies by switching between different user sessions
3. Monitor real-time subscriptions in the Supabase Dashboard

## Security Considerations

1. **Never expose your service_role key** - Use only anon key in client
2. **Validate all user inputs** on the client side
3. **Use RLS policies** - All tables have RLS enabled
4. **Rate limiting** - Consider implementing for API calls
5. **Image moderation** - Implement for uploaded photos
6. **Location privacy** - Store only approximate locations

## Troubleshooting

### Common Issues

**Error: "new row violates row-level security policy"**

- Check RLS policies are correctly configured
- Ensure user is authenticated

**Error: "relation does not exist"**

- Run the schema.sql file
- Check table names are correct

**Storage upload fails**

- Verify storage policies are set
- Check file size limits

### Getting Help

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- GitHub Issues: Create an issue in the repository

## Next Steps

1. Implement authentication flow
2. Connect screens to Supabase data
3. Add real-time features
4. Implement photo upload
5. Add search/filter functionality
6. Set up push notifications
