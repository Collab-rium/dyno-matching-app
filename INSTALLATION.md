# Installation & Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 16.x ([Download](https://nodejs.org/))
- **npm** >= 8.x (comes with Node.js)
- **Expo CLI** (will be installed via npx)
- **Git** ([Download](https://git-scm.com/))

### For Mobile Development:

- **iOS**: Xcode (Mac only) + iOS Simulator
- **Android**: Android Studio + Android Emulator
- **Physical Device**: Expo Go app ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/dyno-matching-app.git
cd dyno-matching-app
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:

- React Native & Expo
- Supabase client
- Async Storage
- Image picker
- Location services
- Linear gradient
- Gesture handler
- And more...

## Step 3: Setup Supabase Backend

### 3.1: Create Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in:
   - **Name**: dyno-dating-app
   - **Database Password**: (generate strong password - save it!)
   - **Region**: (choose closest to your users)
4. Click "Create new project" (takes ~2 minutes)

### 3.2: Run Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy entire contents of `supabase/schema.sql`
4. Paste and click **Run**
5. Verify in **Table Editor** that all tables were created

### 3.3: Setup Storage Bucket

1. Go to **Storage** in Supabase Dashboard
2. Click **New Bucket**
3. Name it `profile-photos`
4. Set it to **Public**
5. Create policies:
   - Users can upload to their own folder
   - Anyone can view photos

### 3.4: Get API Keys

1. Go to **Settings** > **API**
2. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key

## Step 4: Configure Environment Variables

1. Copy the example file:

```bash
cp .env.example .env
```

2. Edit `.env` and add your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ **Important**: Never commit the `.env` file to git!

## Step 5: Start the Development Server

```bash
npm start
```

This will:

- Start the Metro bundler
- Show a QR code in the terminal
- Open Expo DevTools in your browser

## Step 6: Run on Device/Simulator

Choose your platform:

### Option A: Physical Device (Recommended for testing gestures)

1. Install **Expo Go** app:

   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code:

   - iOS: Use Camera app
   - Android: Use Expo Go app

3. App will load on your device!

### Option B: iOS Simulator (Mac only)

```bash
npm run ios
```

Or press `i` in the terminal after running `npm start`

### Option C: Android Emulator

1. Ensure Android Studio is installed
2. Create an AVD (Android Virtual Device)
3. Run:

```bash
npm run android
```

Or press `a` in the terminal after running `npm start`

### Option D: Web Browser

```bash
npm run web
```

Or press `w` in the terminal after running `npm start`

## Step 7: Verify Installation

Test that everything works:

1. **App launches**: You should see the splash screen
2. **Navigation works**: Can swipe through onboarding
3. **Theme applies**: Colors and gradients display correctly
4. **Backend ready**: Supabase tables are set up

## Troubleshooting

### Problem: "Cannot find module '@supabase/supabase-js'"

**Solution:**

```bash
npm install @supabase/supabase-js @react-native-async-storage/async-storage
```

### Problem: "Expo command not found"

**Solution:**

```bash
# Use npx instead
npx expo start

# Or install globally
npm install -g expo-cli
```

### Problem: Metro bundler errors

**Solution:**

```bash
# Clear cache
npm start -- --clear

# Or use the script
npm run start:clean
```

### Problem: iOS build fails

**Solution:**

```bash
cd ios
pod install
cd ..
npm run ios
```

### Problem: Android build fails

**Solution:**

1. Open Android Studio
2. Tools > SDK Manager
3. Ensure Android SDK Platform 33 is installed
4. Accept all licenses:

```bash
cd ~/Library/Android/sdk
./tools/bin/sdkmanager --licenses
```

### Problem: Supabase connection error

**Solution:**

- Check `.env` file exists and has correct values
- Verify project URL includes `https://`
- Ensure Supabase project is active (not paused)
- Check network connectivity

### Problem: Gestures not working

**Solution:**

- Test on a physical device (simulator gestures are unreliable)
- Ensure gesture handler is installed:

```bash
npm install react-native-gesture-handler
```

### Problem: Images not loading

**Solution:**

- Check internet connection
- Verify image URLs are accessible
- Check expo-image-picker is installed

## Next Steps

After successful installation:

1. **Read the documentation:**

   - [Architecture Guide](./docs/Architecture.md)
   - [Backend Setup](./docs/Backend.md)
   - [Styling Guide](./docs/Styling.md)
   - [Component Reference](./docs/Components.md)

2. **Explore the app:**

   - Try the onboarding flow
   - Test the swipe gestures
   - Check light/dark mode toggle

3. **Start developing:**

   - Connect screens to Supabase data
   - Implement authentication
   - Add real-time features
   - Upload photos

4. **Customize:**
   - Modify theme in `theme/index.js`
   - Add new screens
   - Extend components
   - Add features

## Development Workflow

```bash
# Start development
npm start

# Clear cache if needed
npm run start:clean

# Run tests (when implemented)
npm test

# Lint code (when ESLint configured)
npm run lint

# Build for production
npm run build:ios      # iOS
npm run build:android  # Android
```

## Environment Setup Summary

✅ **What you need:**

- [ ] Node.js installed
- [ ] Project cloned
- [ ] Dependencies installed
- [ ] Supabase project created
- [ ] Database schema deployed
- [ ] `.env` file configured
- [ ] App running on device/simulator

## Getting Help

If you encounter issues:

1. **Check Documentation**: See `/docs` folder
2. **Common Issues**: Review troubleshooting section above
3. **Expo Docs**: https://docs.expo.dev/
4. **Supabase Docs**: https://supabase.com/docs
5. **React Native Docs**: https://reactnative.dev/docs/getting-started
6. **GitHub Issues**: Create an issue with error details

## Useful Commands Reference

```bash
# Project management
npm install              # Install dependencies
npm start               # Start dev server
npm run start:clean     # Start with cache clear

# Platform-specific
npm run ios             # Run on iOS
npm run android         # Run on Android
npm run web             # Run in browser

# Building
npm run build:ios       # Build iOS app
npm run build:android   # Build Android app

# Maintenance
npm update              # Update dependencies
npm audit fix           # Fix security issues
```

## Resource Links

- **Expo Documentation**: https://docs.expo.dev/
- **React Native**: https://reactnative.dev/
- **Supabase**: https://supabase.com/docs
- **React Navigation**: https://reactnavigation.org/
- **Expo Go App**: https://expo.dev/client

---

**You're all set! Happy coding! 🚀**

For questions or issues, refer to the comprehensive documentation in the `/docs` folder.
