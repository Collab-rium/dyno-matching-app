# Component Documentation

## Overview

This document provides detailed information about all reusable components in the DYNO dating app.

---

## Core Components

### Avatar

**Location:** `components/Avatar.js`

**Purpose:** Displays user profile picture with optional online indicator and notification badge.

**Props:**

- `uri` (string): Image URL
- `size` (number): Diameter in pixels (default: 50)
- `online` (boolean): Show online indicator
- `badge` (number|string): Badge content (e.g., message count)
- `style` (object): Additional styles

**Usage:**

```javascript
<Avatar uri="https://example.com/photo.jpg" size={80} online={true} badge={3} />
```

**Features:**

- Circular image display
- Fallback gradient placeholder with "?"
- Green dot for online status
- Red badge for notifications
- Fully themed (respects light/dark mode)

---

### BottomNavigation

**Location:** `components/BottomNavigation.js`

**Purpose:** Tab bar navigation for main app screens.

**Props:**

- `currentScreen` (string): Active screen name
- `onNavigate` (function): Navigation callback

**Usage:**

```javascript
<BottomNavigation
  currentScreen="home"
  onNavigate={(screen) => navigateTo(screen)}
/>
```

**Features:**

- 4 main tabs: Discover, Matches, Messages, Profile
- Active tab with gradient background
- Inactive tabs with reduced opacity
- Smooth transitions
- Emoji icons for visual appeal

---

### GradientBackground

**Location:** `components/GradientBackground.js`

**Purpose:** Wrapper component that applies gradient background.

**Props:**

- `children` (ReactNode): Content to display
- `type` (string): Gradient type ('primary', 'accent', 'success', etc.)
- `style` (object): Additional styles

**Usage:**

```javascript
<GradientBackground type="primary">
  <Text>Content goes here</Text>
</GradientBackground>
```

**Features:**

- Multiple gradient presets from theme
- Fills entire container
- Supports custom gradients
- Children rendered on top

---

### IconButton

**Location:** `components/IconButton.js`

**Purpose:** Circular button for icons.

**Props:**

- `onPress` (function): Click handler
- `children` (ReactNode): Icon or content
- `size` (number): Button diameter (default: 48)
- `backgroundColor` (string): Override background color
- `style` (object): Additional styles

**Usage:**

```javascript
<IconButton onPress={() => alert("Clicked")} size={60}>
  <Text>❤️</Text>
</IconButton>
```

**Features:**

- Perfect circle shape
- Shadow/elevation
- Customizable size
- Theme-aware colors

---

### MatchModal

**Location:** `components/MatchModal.js`

**Purpose:** Celebration modal displayed when users match.

**Props:**

- `visible` (boolean): Modal visibility
- `matchData` (object): Matched user info { name, image }
- `onClose` (function): Close callback
- `onSendMessage` (function): Send message callback

**Usage:**

```javascript
<MatchModal
  visible={showModal}
  matchData={{ name: "Sarah", image: "..." }}
  onClose={() => setShowModal(false)}
  onSendMessage={handleMessage}
/>
```

**Features:**

- Animated entrance (scale + fade)
- Gradient background
- Both users' photos with heart badges
- "Send Message" and "Keep Swiping" actions
- Full-screen overlay

---

### PrimaryButton

**Location:** `components/PrimaryButton.js`

**Purpose:** Main call-to-action button with gradient background.

**Props:**

- `title` (string): Button text
- `onPress` (function): Click handler
- `type` (string): Gradient type (default: 'primary')
- `style` (object): Additional styles

**Usage:**

```javascript
<PrimaryButton title="Get Started" onPress={handleContinue} type="accent" />
```

**Features:**

- Gradient background from theme
- Rounded corners
- Shadow/elevation
- Bold text
- Active opacity on press
- Fully themed

---

### ProfileCard

**Location:** `components/ProfileCard.js`

**Purpose:** Displays user profile with photo, name, bio, and interests.

**Props:**

- `profile` (object): User data
  - `name` (string)
  - `age` (number)
  - `image` (string): Photo URL
  - `bio` (string)
  - `location` (string)
  - `interests` (array): Interest tags
  - `online` (boolean)
  - `verified` (boolean)
- `onPress` (function): Card click handler
- `style` (object): Additional styles

**Usage:**

```javascript
<ProfileCard
  profile={{
    name: "Sarah",
    age: 28,
    image: "...",
    bio: "Love coffee and hiking",
    location: "2 km away",
    interests: ["Travel", "Music"],
    online: true,
    verified: true,
  }}
  onPress={() => viewProfile()}
/>
```

**Features:**

- Large photo background
- Gradient overlay for text readability
- Name, age, and verification badge
- Location with emoji
- Truncated bio (2 lines)
- Interest tags (first 3 + count)
- Online indicator
- Touchable/pressable

---

### SwipeableCard

**Location:** `components/SwipeableCard.js`

**Purpose:** Card with swipe gesture support for matching interface.

**Props:**

- `children` (ReactNode): Card content (usually ProfileCard)
- `onSwipeLeft` (function): Pass callback
- `onSwipeRight` (function): Like callback
- `onSwipeUp` (function): Super like callback
- `style` (object): Additional styles

**Usage:**

```javascript
<SwipeableCard
  onSwipeLeft={handlePass}
  onSwipeRight={handleLike}
  onSwipeUp={handleSuperLike}>
  <ProfileCard profile={user} />
</SwipeableCard>
```

**Features:**

- Pan gesture recognition
- Animated rotation on drag
- Visual indicators (✕ for pass, ♥ for like, ⭐ for super like)
- Fade opacity based on swipe direction
- Threshold-based action triggering
- Spring-back animation if threshold not met
- Smooth card dismissal animation

**Gesture Mapping:**

- Swipe left (>120px): Pass
- Swipe right (>120px): Like
- Swipe up (>120px): Super Like
- Release before threshold: Spring back

---

### TextInput

**Location:** `components/TextInput.js`

**Purpose:** Styled text input with label and error support.

**Props:**

- `value` (string): Current value
- `onChangeText` (function): Change handler
- `placeholder` (string): Placeholder text
- `label` (string): Label above input
- `error` (string): Error message to display
- `keyboardType` (string): Input type ('default', 'email-address', 'numeric', etc.)
- `maxLength` (number): Character limit
- `autoFocus` (boolean): Auto-focus on mount
- `multiline` (boolean): Multi-line input
- `numberOfLines` (number): Lines for multiline
- `style` (object): Container styles
- `inputStyle` (object): Input styles

**Usage:**

```javascript
<TextInput
  label="Email"
  placeholder="john@example.com"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  error={emailError}
/>
```

**Features:**

- Optional label above input
- Error message below input
- Error state styling (red border)
- Themed colors and typography
- Support for multiline text areas
- All standard TextInput props supported

---

## Usage Best Practices

### 1. Always Use Theme

```javascript
// ✅ Good
import { useTheme } from '../theme/ThemeContext';
const { colors } = useTheme();
<View style={{ backgroundColor: colors.background }} />

// ❌ Bad
<View style={{ backgroundColor: '#fff' }} />
```

### 2. Component Composition

```javascript
// Combine components for complex UIs
<GradientBackground type="primary">
  <Avatar uri={user.photo} online={user.isOnline} size={100} />
  <PrimaryButton title="Continue" onPress={handleNext} />
</GradientBackground>
```

### 3. Pass Only Required Props

```javascript
// ✅ Good - only pass needed props
<IconButton onPress={handlePress}>
  <Icon name="heart" />
</IconButton>

// ❌ Bad - unnecessary props
<IconButton
  onPress={handlePress}
  size={48}  // already default
  style={{}}  // empty object
>
  <Icon name="heart" />
</IconButton>
```

### 4. Handle Loading States

```javascript
{
  loading ? (
    <ActivityIndicator color={colors.primary} />
  ) : (
    <ProfileCard profile={user} />
  );
}
```

### 5. Error Boundaries

```javascript
// Wrap components that may fail
<ErrorBoundary fallback={<ErrorScreen />}>
  <SwipeableCard>
    <ProfileCard profile={user} />
  </SwipeableCard>
</ErrorBoundary>
```

---

## Component Lifecycle

### 1. Avatar

- Mount: Load image from URI
- Online status updated via props
- Badge count updates dynamically

### 2. SwipeableCard

- Mount: Initialize gesture handler
- Gesture: Track pan position
- Swipe: Animate out and callback
- Spring back: Animate to center

### 3. MatchModal

- Visible changes: Trigger animations
- Entrance: Scale and fade in
- Exit: Fade out

---

## Styling Guidelines

### Use Theme Tokens

All components use centralized theme:

- Colors: `colors.primary`, `colors.background`
- Spacing: `spacing.md`, `spacing.lg`
- Typography: `typography.h1`, `typography.body1`
- Radii: `radii.md`, `radii.full`

### Override Styles

```javascript
<PrimaryButton
  title="Special"
  style={{
    marginTop: spacing.lg,
    width: "100%",
  }}
/>
```

### Avoid Inline Styles

```javascript
// ✅ Good
const styles = StyleSheet.create({
  container: { flex: 1 },
});

// ❌ Bad
<View style={{ flex: 1 }} />;
```

---

## Testing Components

### Manual Testing Checklist

- [ ] Renders correctly
- [ ] Props work as expected
- [ ] Callbacks fire correctly
- [ ] Handles edge cases (null, empty)
- [ ] Looks good in light/dark mode
- [ ] Accessible (screen readers)
- [ ] Works on iOS and Android

### Example Test (Jest)

```javascript
import { render, fireEvent } from "@testing-library/react-native";
import PrimaryButton from "./PrimaryButton";

test("PrimaryButton calls onPress", () => {
  const handlePress = jest.fn();
  const { getByText } = render(
    <PrimaryButton title="Click me" onPress={handlePress} />
  );

  fireEvent.press(getByText("Click me"));
  expect(handlePress).toHaveBeenCalled();
});
```

---

## Future Components (Planned)

### 1. VideoPlayer

- Video profile support
- Play/pause controls
- Mute toggle

### 2. FilterModal

- Age range slider
- Distance slider
- Interest checkboxes

### 3. PhotoGallery

- Swipeable photo carousel
- Zoom support
- Full-screen view

### 4. VoiceMessage

- Record voice messages
- Playback controls
- Waveform visualization

---

## Maintenance

### Adding New Components

1. Create file in `components/` directory
2. Use functional component with hooks
3. Import and use `useTheme`
4. Document props with JSDoc
5. Add to this documentation
6. Write tests

### Updating Components

1. Maintain backward compatibility
2. Update documentation
3. Update tests
4. Test on multiple devices
5. Consider performance impact

---

## Troubleshooting

### Component Not Rendering

- Check ThemeProvider is wrapping app
- Verify imports are correct
- Check console for errors

### Styles Not Applied

- Ensure useTheme() is called
- Check style prop precedence
- Verify theme tokens exist

### Gestures Not Working (SwipeableCard)

- Check gesture handler is installed
- Verify parent doesn't block touches
- Test on physical device (gestures may not work in simulator)

---

For more information, see:

- [Architecture Documentation](./Architecture.md)
- [Styling Guide](./Styling.md)
- [Backend Setup](./Backend.md)
