# Dyno Matching App

**Dyno - The Match You Deserve**

A modern, culturally-aware matchmaking mobile app that blends swipe-based discovery with intelligent filtering. Find your soulmate with confidence.

## Features

### New: Multi-Step Signup Flow

A complete onboarding experience with 8 customizable screens:

- **Name Input** - User's first name with validation
- **Birthday** - Age verification (18+ required)
- **Gender Selection** - With visibility controls
- **Location** - GPS or manual city input
- **Photo Upload** - 2-6 profile photos
- **Interests** - Select up to 5 interests
- **About/Bio** - Up to 500 character bio
- **Matching Preferences** - Age range, distance, looking for

**[→ View Signup Flow Documentation](./docs/signup-flow/README.md)**

**[→ Quick Start Guide](./docs/signup-flow/QUICKSTART.md)**

## 📁 Project Structure

```
dyno-matching-app/
├── components/               # Reusable UI components
│   ├── TextInput.js
│   ├── SelectionButton.js
│   ├── DateInput.js
│   ├── MultiSelectChips.js
│   ├── RangeSlider.js
│   ├── PhotoUpload.js
│   ├── SuccessModal.js
│   └── ... more components
│
├── signup-flow/             # Complete signup feature module
│   ├── screens/             # Individual signup screens
│   ├── SignupFlow.js        # Main container
│   ├── signupConfig.js      # Easy customization
│   ├── README.md
│   ├── QUICKSTART.md
│   ├── SETUP.md
│   └── examples.js
│
├── docs/                    # Documentation
│   ├── signup-flow.md       # Technical documentation
│   ├── components.md
│   ├── Authentication.md
│   └── ... more docs
│
└── PRD.md                   # Product Requirements Document
```

## Tech Stack

- **Frontend:** React Native
- **Backend:** Node.js + Express (planned)
- **Database:** PostgreSQL (planned)
- **Real-time:** Socket.IO (planned)
- **Storage:** AWS S3 (planned)

## Installation

### Prerequisites

- Node.js (v16+)
- React Native development environment
- iOS/Android emulator or device

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Collab-rium/dyno-matching-app.git
cd dyno-matching-app

# Install dependencies
npm install

# Install native dependencies
npm install @react-native-community/datetimepicker @react-native-community/slider

# iOS setup (if using iOS)
cd ios && pod install && cd ..

# Run the app
npm start
# Then press 'i' for iOS or 'a' for Android
```

## Using the Signup Flow

### Basic Implementation

```javascript
import React from "react";
import { SafeAreaView } from "react-native";
import SignupFlow from "./signup-flow";

export default function App() {
  const handleSignupComplete = (userData) => {
    console.log("User data:", userData);
    // Send to backend, navigate to home, etc.
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignupFlow onComplete={handleSignupComplete} />
    </SafeAreaView>
  );
}
```

**[→ See more examples](./docs/signup-flow/examples.js)**

## Customization

### Add a New Signup Step

1. Create screen component:

```javascript
// signup-flow/screens/YourScreen.js
export default function YourScreen({ data, onDataChange }) {
  return (/* Your UI */);
}
```

2. Add to config:

```javascript
// signup-flow/signupConfig.js
{
  id: 'yourStep',
  component: YourScreen,
  required: true,
  validate: (data) => data.yourField !== undefined,
}
```

### Reorder Steps

Simply reorder objects in `signup-flow/signupConfig.js`

### Remove Steps

Comment out or delete from `signup-flow/signupConfig.js`

**[→ Full Customization Guide](./signup-flow/README.md#customization)**

## Documentation

- **[Signup Flow README](./docs/signup-flow/README.md)** - Complete module documentation
- **[Quick Start Guide](./docs/signup-flow/QUICKSTART.md)** - Get started in 5 minutes
- **[Setup Guide](./docs/signup-flow/SETUP.md)** - Dependencies and configuration
- **[Architecture Guide](./docs/signup-flow/ARCHITECTURE.md)** - Visual diagrams and flow
- **[Project Summary](./docs/signup-flow/PROJECT_SUMMARY.md)** - Overview and statistics
- **[Usage Examples](./docs/signup-flow/examples.js)** - Real-world implementations
- **[PRD](./PRD.md)** - Product Requirements Document

## Design System

### Colors

- Background: `#181A20`
- Cards: `#232526`
- Borders: `#414345`
- Primary: `#FF5858` (Loving Red)
- Secondary: `#FFAE42` (Orange)
- Text: `#fff`, `#A3A3A3`, `#666`

### Components

All components follow a consistent design language with dark theme, smooth animations, and intuitive interactions.

## Development

### Run Tests

```bash
npm test
```

### Code Style

```bash
npm run lint
```

### Build

```bash
# iOS
npm run ios:build

# Android
npm run android:build
```

## 📱 App Features (Planned)

### Core Functionality

- **Multi-step Signup** - Complete onboarding flow
- **User Authentication** - OTP and JWT-based auth
- **Profile Management** - Edit profile, add photos
- **Discovery** - Swipe-based card interface
- **Matching Algorithm** - Smart compatibility matching
- **Real-time Chat** - Messaging between matches
- **Location-based** - Find matches nearby
- **Filters** - Age, distance, interests
- **Notifications** - Push notifications for matches
- **Safety Features** - Report, block, verification

### Premium Features (Future)

- Super likes
- Boost profile
- See who liked you
- Unlimited swipes
- Advanced filters

## Contributing

We welcome contributions! Please see our contributing guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Check the documentation in `/docs/`
- Review the signup flow guides in `/signup-flow/`

## Roadmap

### Phase 1 (Current)

- [x] Signup flow implementation
- [x] Reusable UI components
- [x] Documentation

### Phase 2 (Next)

- [ ] Backend API development
- [ ] User authentication
- [ ] Profile management
- [ ] Database schema

### Phase 3 (Future)

- [ ] Swipe/Discovery feature
- [ ] Matching algorithm
- [ ] Real-time chat
- [ ] Push notifications

### Phase 4 (Future)

- [ ] Advanced filters
- [ ] Premium features
- [ ] Analytics dashboard
- [ ] Admin panel

## Highlights

- **Production-Ready Code** - Clean, modular, well-documented
- **Tinder-Quality UX** - Smooth animations, intuitive flow
- **Fully Customizable** - Config-driven, easy to extend
- **Reusable Components** - Use across entire app
- **Comprehensive Docs** - Multiple guides and examples

---

**Built with ❤️ by the Arslan**

_Finding the match you deserve_
