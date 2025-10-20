# Styling Guide - DYNO Dating App

## Overview

This guide explains the centralized theme system and styling conventions used throughout the DYNO dating app.

---

## Theme System Architecture

### Location

- **Theme Config**: `theme/index.js`
- **Theme Context**: `theme/ThemeContext.js`
- **Legacy Support**: `components/themeStyles.js`

### Design Philosophy

1. **Centralized**: Single source of truth for all design tokens
2. **Consistent**: Same values used across entire app
3. **Flexible**: Easy to update and extend
4. **Accessible**: Supports light and dark modes
5. **Selective Gradients**: Used sparingly for impact (buttons, headers, accents)

---

## Theme Structure

### 1. Color Palette

#### Base Colors

```javascript
const baseColors = {
  // Primary brand colors
  brandRed: "#FF0008",
  brandOrange: "#F77502",
  brandBlue: "#4A90E2",

  // Neutrals
  white: "#FFFFFF",
  black: "#000000",

  // Grays
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  // ... more grays

  // Semantic colors
  success: "#4CAF50",
  error: "#FF5858",
  warning: "#FFA726",
  info: "#4A90E2",
};
```

#### Light Theme Colors

```javascript
const lightColors = {
  // Core UI
  background: "#FFFFFF",
  surface: "#F9FAFB",
  card: "#FFFFFF",

  // Text
  text: "#1F2937",
  textSecondary: "#6B7280",

  // Interactive
  primary: "#FF0008",
  primaryHover: "#E60007",

  // Borders and dividers
  border: "#E5E7EB",
  divider: "#F3F4F6",

  // Overlays
  overlay: "rgba(0, 0, 0, 0.5)",

  // Semantic
  success: "#4CAF50",
  error: "#FF5858",
  warning: "#FFA726",
  info: "#4A90E2",
};
```

#### Dark Theme Colors

```javascript
const darkColors = {
  background: "#111827",
  surface: "#1F2937",
  card: "#374151",

  text: "#F9FAFB",
  textSecondary: "#D1D5DB",

  primary: "#FF4B2B",
  primaryHover: "#FF6A00",

  border: "#4B5563",
  divider: "#374151",

  overlay: "rgba(0, 0, 0, 0.7)",

  // Semantic colors stay consistent
  success: "#4CAF50",
  error: "#FF5858",
  warning: "#FFA726",
  info: "#4A90E2",
};
```

### 2. Typography

```javascript
const typography = {
  // Headings
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "bold",
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
  },

  // Body text
  body1: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  body2: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },

  // UI text
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    textTransform: "none",
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
};
```

### 3. Spacing

```javascript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

**Usage:**

- `xs`: Tight spacing (icon padding, small gaps)
- `sm`: Close elements (text and icon, form field gaps)
- `md`: Standard spacing (most common)
- `lg`: Section spacing (cards, groups)
- `xl`: Major sections (screen padding)
- `xxl`: Extra large (screen headers, hero sections)

### 4. Border Radii

```javascript
const radii = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 24,
  full: 9999, // Perfect circles
};
```

**Usage:**

- `sm`: Small elements (chips, tags)
- `md`: Standard (inputs, small cards)
- `lg`: Cards, modals
- `xl`: Large cards, bottom sheets
- `full`: Circular (buttons, avatars)

### 5. Gradients

```javascript
const gradients = {
  primary: {
    colors: ["#FF0008", "#F77502", "#FF4B2B"],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  accent: {
    colors: ["#4A90E2", "#357ABD"],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  success: {
    colors: ["#4CAF50", "#45A049"],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  dark: {
    colors: ["rgba(0,0,0,0.8)", "transparent"],
    start: { x: 0, y: 1 },
    end: { x: 0, y: 0 },
  },
};
```

**When to Use Gradients:**
✅ **Use For:**

- Primary buttons (CTAs)
- Headers and nav bars
- Splash/onboarding screens
- Match celebration modal
- Hero sections
- Accent lines and dividers

❌ **Don't Use For:**

- Regular screen backgrounds (use solid colors)
- Text content areas
- Form inputs
- List items
- Secondary UI elements

### 6. Shadows & Elevation

```javascript
const elevation = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};
```

---

## Using the Theme

### 1. In Components

```javascript
import { useTheme } from "../theme/ThemeContext";

function MyComponent() {
  const { colors, typography, spacing, radii } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        padding: spacing.md,
        borderRadius: radii.lg,
      }}>
      <Text
        style={{
          ...typography.h2,
          color: colors.text,
          marginBottom: spacing.sm,
        }}>
        Hello World
      </Text>
    </View>
  );
}
```

### 2. With StyleSheet

```javascript
import { StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";

function MyComponent() {
  const { colors, spacing } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: spacing.lg,
    },
    text: {
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
    </View>
  );
}
```

### 3. With Gradients

```javascript
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../theme/ThemeContext";

function GradientButton() {
  const { gradients, radii, spacing } = useTheme();
  const gradient = gradients.primary;

  return (
    <TouchableOpacity>
      <LinearGradient
        colors={gradient.colors}
        start={gradient.start}
        end={gradient.end}
        style={{
          borderRadius: radii.full,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.xl,
        }}>
        <Text style={{ color: "white" }}>Press Me</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
```

### 4. Creating Themed Styles Helper

```javascript
import { createThemedStyles } from "./theme";

const useStyles = createThemedStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
}));

// In component
function MyComponent() {
  const styles = useStyles();
  return <View style={styles.container} />;
}
```

---

## Common Patterns

### 1. Screen Layout

```javascript
function MyScreen() {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      {/* Gradient header - GOOD use of gradient */}
      <GradientBackground type="primary">
        <View style={{ padding: spacing.lg }}>
          <Text>Header Content</Text>
        </View>
      </GradientBackground>

      {/* Solid background content - NO gradient */}
      <ScrollView style={{ flex: 1, padding: spacing.md }}>
        <Text>Main content here</Text>
      </ScrollView>
    </View>
  );
}
```

### 2. Card Component

```javascript
function Card({ children }) {
  const { colors, spacing, radii, elevation } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: radii.lg,
        padding: spacing.md,
        ...elevation.md,
      }}>
      {children}
    </View>
  );
}
```

### 3. Form Input

```javascript
function ThemedInput({ label, value, onChangeText }) {
  const { colors, typography, spacing, radii } = useTheme();

  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text
        style={{
          ...typography.label,
          color: colors.text,
          marginBottom: spacing.sm,
        }}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radii.md,
          padding: spacing.md,
          color: colors.text,
          ...typography.body1,
        }}
      />
    </View>
  );
}
```

### 4. Button Variants

```javascript
// Primary (with gradient)
<PrimaryButton title="Continue" onPress={handleContinue} />;

// Secondary (outline)
function SecondaryButton({ title, onPress }) {
  const { colors, spacing, radii } = useTheme();

  return (
    <TouchableOpacity
      style={{
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: radii.full,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
      }}
      onPress={onPress}>
      <Text style={{ color: colors.primary }}>{title}</Text>
    </TouchableOpacity>
  );
}
```

---

## Dark Mode Support

### Toggle Theme

```javascript
import { useTheme } from "./theme/ThemeContext";

function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useTheme();

  return <Switch value={isDarkMode} onValueChange={toggleTheme} />;
}
```

### Auto-Detect System Theme

The theme automatically detects the device's color scheme on mount:

```javascript
// In ThemeContext.js
const colorScheme = useColorScheme();
const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
```

---

## Best Practices

### ✅ Do's

1. **Always use theme tokens:**

   ```javascript
   backgroundColor: colors.background; // ✅
   ```

2. **Use spacing scale:**

   ```javascript
   padding: spacing.md; // ✅
   ```

3. **Apply gradients sparingly:**

   ```javascript
   // ✅ Good - button/header
   <LinearGradient colors={gradients.primary.colors} />
   ```

4. **Keep styles consistent:**

   ```javascript
   // All cards use same radii
   borderRadius: radii.lg; // ✅
   ```

5. **Use semantic colors:**
   ```javascript
   // Error messages
   color: colors.error; // ✅
   ```

### ❌ Don'ts

1. **No hardcoded colors:**

   ```javascript
   backgroundColor: "#fff"; // ❌
   ```

2. **No magic numbers:**

   ```javascript
   padding: 17; // ❌ Use spacing scale
   ```

3. **No gradient overuse:**

   ```javascript
   // ❌ Bad - every screen background
   <LinearGradient style={{ flex: 1 }} />
   ```

4. **No inconsistent spacing:**

   ```javascript
   marginTop: 15,  // ❌
   marginBottom: 23,  // ❌
   ```

5. **No mixed theme systems:**
   ```javascript
   // ❌ Don't mix with hardcoded values
   <View
     style={{
       backgroundColor: colors.background, // ✅
       padding: 12, // ❌
     }}
   />
   ```

---

## Responsive Design

### Screen Sizes

```javascript
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Responsive calculations
const cardWidth = width - spacing.md * 2;
const isSmallDevice = width < 375;
```

### Adaptive Spacing

```javascript
const adaptiveSpacing = {
  padding: isSmallDevice ? spacing.sm : spacing.md,
  fontSize: isSmallDevice ? 14 : 16,
};
```

---

## Accessibility

### Color Contrast

- Ensure 4.5:1 contrast ratio for normal text
- 3:1 for large text (18pt+)
- Test with color contrast tools

### Touch Targets

- Minimum 44x44 points for touchable elements
- Use appropriate spacing around buttons

### Font Scaling

- Support dynamic type
- Test with larger text sizes

```javascript
import { PixelRatio } from "react-native";

const scaledFontSize = fontSize * PixelRatio.getFontScale();
```

---

## Migration from Old Styles

### Before (Hardcoded)

```javascript
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
```

### After (Themed)

```javascript
function Component() {
  const { colors, spacing, radii, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      padding: spacing.lg,
      borderRadius: radii.lg,
    },
    text: {
      ...typography.body1,
      color: colors.text,
    },
  });

  return <View style={styles.container} />;
}
```

---

## Troubleshooting

### Theme Not Applied

**Problem**: Styles not updating with theme

**Solution**: Ensure component is wrapped in ThemeProvider

```javascript
// App.js
<ThemeProvider>
  <AppContent />
</ThemeProvider>
```

### Colors Look Wrong

**Problem**: Wrong colors in dark mode

**Solution**: Use semantic color names

```javascript
// ✅ Adapts to theme
color: colors.text;

// ❌ Fixed color
color: "#000";
```

### Gradients Everywhere

**Problem**: Too many gradients, app looks busy

**Solution**: Use solid backgrounds for content areas

```javascript
// ✅ Gradient for header only
<GradientBackground>
  <Header />
</GradientBackground>
<View style={{ backgroundColor: colors.background }}>
  <Content />
</View>
```

---

## Resources

- [React Native Styling Docs](https://reactnative.dev/docs/style)
- [Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Material Design Color System](https://material.io/design/color)

---

For more information, see:

- [Architecture Documentation](./Architecture.md)
- [Component Reference](./Components.md)
- [Backend Setup](./Backend.md)
