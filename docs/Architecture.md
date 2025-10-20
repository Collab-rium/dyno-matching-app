# DYNO Dating App - Complete Documentation

## Project Overview

DYNO is a modern, feature-rich dating application built with React Native and Expo, featuring swipe-based matching, real-time messaging, and a beautiful gradient-accented UI.

## Technology Stack

### Frontend

- **Framework**: React Native with Expo
- **Language**: JavaScript (ES6+)
- **UI Components**: Custom components with theme system
- **Styling**: StyleSheet API with centralized theme
- **Animations**: React Native Animated API
- **Gradients**: expo-linear-gradient
- **State Management**: React Hooks (useState, useContext)

### Backend

- **BaaS**: Supabase
- **Database**: PostgreSQL with PostGIS
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage for photos
- **Real-time**: Supabase Realtime subscriptions

## Project Structure

```
dyno-matching-app/
├── App.js                      # Main app entry point with navigation
├── theme/                      # Centralized theme system
│   ├── index.js               # Theme configuration (colors, fonts, spacing)
│   └── ThemeContext.js        # React Context for theme
├── lib/                        # Utilities and configurations
│   └── supabase.js            # Supabase client initialization
├── components/                 # Reusable UI components
│   ├── Avatar.js              # User avatar with online indicator
│   ├── BottomNavigation.js    # Tab bar navigation
│   ├── GradientBackground.js  # Gradient container component
│   ├── IconButton.js          # Circular icon button
│   ├── MatchModal.js          # Match celebration modal
│   ├── PrimaryButton.js       # Main CTA button with gradient
│   ├── ProfileCard.js         # User profile card display
│   ├── SwipeableCard.js       # Swipeable card with gestures
│   ├── TextInput.js           # Themed text input
│   └── themeStyles.js         # Legacy theme compatibility layer
├── screens/                    # Application screens
│   ├── splash/                # Splash screen
│   ├── onboarding/            # Onboarding flow
│   ├── auth/                  # Login and signup
│   ├── home/                  # Main discovery/swipe screen
│   ├── profile/               # User profile and edit
│   ├── matches/               # Match list
│   ├── chat/                  # Chat list and conversation
│   └── settings/              # App settings
├── supabase/                   # Backend configuration
│   └── schema.sql             # Database schema and RLS policies
├── docs/                       # Documentation
│   ├── Backend.md             # Backend setup guide
│   ├── Styling.md             # Theme and styling guide
│   └── Components.md          # Component documentation
└── assets/                     # Images, fonts, etc.

```

## Key Features

### 1. Authentication

- Phone-based authentication
- Email verification
- Profile creation flow

### 2. Discovery & Matching

- Swipe-based interface (left: pass, right: like, up: super like)
- Gesture-based interactions with visual feedback
- Real-time match detection
- Match celebration modal

### 3. Profile Management

- Photo upload (up to 6 photos)
- Bio and interests
- Location-based matching
- Preference settings (age range, distance)

### 4. Messaging

- Real-time chat with matches
- Message read receipts
- Typing indicators (planned)

### 5. Settings

- Privacy controls
- Notification preferences
- Account management
- Block/report users

## Theme System

### Design Tokens

Located in `theme/index.js`:

**Colors:**

- Primary: Gradient from #FF0008 to #F77502
- Accent: Gradient from #4A90E2 to #357ABD
- Semantic: success, error, warning, info
- Light/Dark modes supported

**Typography:**

- h1, h2, h3: Headings
- body1, body2: Body text
- button, caption, label: UI text

**Spacing:**

- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, xxl: 48px

**Radii:**

- sm: 4px, md: 8px, lg: 12px, xl: 24px, full: 9999px

### Using the Theme

```javascript
import { useTheme } from "./theme/ThemeContext";

function MyComponent() {
  const { colors, typography, spacing, radii } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background, padding: spacing.md }}>
      <Text style={{ ...typography.h1, color: colors.text }}>Hello World</Text>
    </View>
  );
}
```

## Navigation

Custom navigation system using state management in `App.js`:

- Screen transitions via `navigateTo(screenName)`
- Back navigation with `goBack()`
- Bottom tab navigation for main screens
- Conditional rendering based on authentication state

## State Management

### Local State

- Component-level: `useState` for UI state
- App-level: Context API for theme

### Backend State

- Supabase for persistent data
- Real-time subscriptions for live updates

## API Integration

### Supabase Client

```javascript
import { supabase } from './lib/supabase';

// Fetch data
const { data, error } = await supabase
  .from('table_name')
  .select('*');

// Insert data
await supabase
  .from('table_name')
  .insert({ ...data });

// Subscribe to changes
supabase
  .channel('channel_name')
  .on('postgres_changes', {...}, callback)
  .subscribe();
```

## Development Setup

### Prerequisites

```bash
node >= 16.x
npm >= 8.x
expo-cli
```

### Installation

```bash
# Clone repository
git clone <repository-url>
cd dyno-matching-app

# Install dependencies
npm install

# Create .env file
echo "EXPO_PUBLIC_SUPABASE_URL=your_url" > .env
echo "EXPO_PUBLIC_SUPABASE_ANON_KEY=your_key" >> .env

# Start development server
npx expo start
```

### Running on Devices

```bash
# iOS
npx expo start --ios

# Android
npx expo start --android

# Web
npx expo start --web
```

## Building for Production

### iOS

```bash
npx expo build:ios
```

### Android

```bash
npx expo build:android
```

### Web

```bash
npx expo build:web
```

## Testing

### Manual Testing

1. Test authentication flow
2. Test swipe gestures
3. Test matching system
4. Test real-time chat
5. Test profile updates

### Automated Testing (Planned)

- Unit tests with Jest
- Component tests with React Native Testing Library
- E2E tests with Detox

## Performance Optimization

### Current Optimizations

- Lazy loading for images
- Memoization with useMemo
- Optimized re-renders with React.memo
- Efficient list rendering with FlatList

### Future Improvements

- Image caching
- Pagination for large lists
- Background sync
- Offline support

## Security

### Client-Side

- Input validation
- Sanitization of user content
- Secure storage with AsyncStorage
- No sensitive data in state

### Server-Side (Supabase)

- Row Level Security (RLS) on all tables
- Auth-based access control
- Secure API keys via environment variables
- HTTPS for all requests

## Deployment

### Backend (Supabase)

1. Create production project
2. Run schema.sql
3. Configure RLS policies
4. Set up storage buckets
5. Enable required extensions

### Frontend (Expo)

1. Update .env with production URLs
2. Build production bundle
3. Submit to app stores (iOS/Android)
4. Deploy web version to hosting

## Troubleshooting

### Common Issues

**Expo not starting:**

```bash
npx expo start -c  # Clear cache
```

**Supabase connection errors:**

- Check .env configuration
- Verify network connectivity
- Check Supabase project status

**Theme not applied:**

- Ensure ThemeProvider wraps app
- Check useTheme() is called inside provider

## Contributing

### Code Style

- Use ES6+ features
- Follow React best practices
- Use functional components
- Comment complex logic

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git commit -m "feat: add your feature"

# Push and create PR
git push origin feature/your-feature
```

## Roadmap

### Phase 1 (Current)

- [x] Core UI/UX with theme system
- [x] Authentication screens
- [x] Swipe functionality
- [x] Basic matching
- [x] Supabase backend setup

### Phase 2 (Next)

- [ ] Complete backend integration
- [ ] Real-time messaging
- [ ] Photo upload
- [ ] Push notifications
- [ ] Video chat (planned)

### Phase 3 (Future)

- [ ] Advanced filters
- [ ] AI-powered matching
- [ ] Premium features
- [ ] Social media integration
- [ ] Events and activities

## Support

### Documentation

- [Backend Setup](./Backend.md)
- [Styling Guide](./Styling.md)
- [Component Reference](./Components.md)

### Contact

- Email: support@dyno.app (example)
- Discord: [Community Server]
- GitHub: [Repository Issues]

## License

[Add your license here]

## Credits

Built with ❤️ using React Native, Expo, and Supabase.
