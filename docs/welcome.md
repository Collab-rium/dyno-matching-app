# welcome-page — Documentation

This document explains the purpose and usage of the files in the `welcome-page/` folder. It was auto-created from the current workspace sources and includes short excerpts and usage notes so you can quickly integrate or modify the welcome screen.

## Overview

The `welcome-page` folder implements a Tinder-style welcome/house-rules screen for React Native. The design follows a separation of concerns:

- UI composition: `WelcomeScreen.js` composes the overall layout.
- Visuals & animations: `GradientBackground.js` provides the animated background.
- Reusable small components: `AppLogo.js`, `IconButton.js`, `InfoBlock.js`, `PrimaryButton.js`.
- Styling: `welcomeStyles.js` (screen-specific) and `themeStyles.js` (theme tokens / alternate styles).
- Logic: `welcomeFunctions.js` contains navigation and external-link handlers.

---

## Files (per-file notes)

### `WelcomeScreen.js`

Purpose: main React Native screen that composes the animated background and the UI components.

Usage notes:

- Exports a default function `WelcomeScreen({ navigation })`.
- Uses `GradientBackground`, `IconButton`, `AppLogo`, `InfoBlock`, and `PrimaryButton`.
- Uses handlers from `welcomeFunctions.js` for close/navigation/linking.

Excerpt (top lines):

```js
import React from "react";
import { View, Text } from "react-native";
import GradientBackground from "../GradientBackground";
import styles from "./welcomeStyles";
import AppLogo from "./AppLogo";
// ...
```

Integration example (register in navigation):

```js
// App.js (React Navigation example)
// import WelcomeScreen from './welcome-page/WelcomeScreen';
// <Stack.Screen name="Welcome" component={WelcomeScreen} />
```

---

### `GradientBackground.js` (project root)

Purpose: animated background component that crossfades two linear gradients to produce a smooth, warm (red→orange) animation.

Key notes:

- Uses `react-native-linear-gradient` for gradient layers.
- Animates opacity between two layers using `Animated` and `Animated.loop`.
- Props supported in the code: `duration` (ms) and `style` (extra styling) — can be extended.

Excerpt (top lines):

```js
import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function GradientBackground({ duration = 6000, style }) {
  const anim = useRef(new Animated.Value(0)).current;
  // ...
```

Dependency: `react-native-linear-gradient` (install with `npm install react-native-linear-gradient` or `expo install react-native-linear-gradient` for Expo).

---

### `welcomeStyles.js`

Purpose: screen-local StyleSheet used by `WelcomeScreen` and several components (logo, buttons, rule text).

Key tokens included:

- `container`, `title`, `subtitle`, `rulesContainer`
- `ruleTitle`, `ruleText`, `link`
- `agreeButton`, `agreeText` (used by `PrimaryButton`)

Excerpt (top lines):

```js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A20",
    padding: 24,
    justifyContent: "center",
  },
  closeButton: { position: "absolute", top: 40, left: 20, zIndex: 1 },
  closeText: { fontSize: 40, color: "#A3A3A3" },
  logo: { width: 60, height: 60, marginBottom: 24, alignSelf: "flex-start" },
  // ...
});
```

Editing these values will change layout and sizes across the welcome screen.

---

### `welcomeFunctions.js`

Purpose: UI event handlers and small utilities for navigation and links.

Exports:

- `handleClose(navigation)` — calls `navigation.goBack()`.
- `handleAgree(navigation)` — `navigation.navigate('NextPage')` (placeholder; replace `'NextPage'` with your actual route name).
- `handleDateSafelyLink()` — opens `https://www.gotinder.com/safety` via `Linking.openURL`.

Excerpt:

```js
import { Linking } from "react-native";

export function handleClose(navigation) {
  navigation.goBack();
}

export function handleAgree(navigation) {
  navigation.navigate("NextPage"); // Replace 'NextPage' with your next screen name
}
```

---

### `AppLogo.js`

Purpose: small reusable component rendering the logo image.

Notes:

- Accepts `source` prop (falls back to a CDN icon URL) and `style` to override `welcomeStyles.logo`.

Excerpt:

```js
import React from "react";
import { Image } from "react-native";
import styles from "./welcomeStyles";

export default function AppLogo({ source, style }) {
  const src = source || {
    uri: "https://cdn-icons-png.flaticon.com/512/2111/2111702.png",
  };
  return <Image source={src} style={[styles.logo, style]} />;
}
```

---

### `IconButton.js`

Purpose: generic icon/close button.

Notes:

- Renders its children inside a `TouchableOpacity` positioned by `welcomeStyles.closeButton`.
- The default usage in the screen is the close button using the × character.

Excerpt:

```js
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./welcomeStyles";

export default function IconButton({ onPress, children, style }) {
  return (
    <TouchableOpacity style={[styles.closeButton, style]} onPress={onPress}>
      <Text style={styles.closeText}>{children}</Text>
    </TouchableOpacity>
  );
}
```

---

### `PrimaryButton.js`

Purpose: reusable primary action button used for the "I Agree" action.

Props:

- `title` (string)
- `onPress` (function)
- `style` (extra style override)

Excerpt:

```js
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./welcomeStyles";

export default function PrimaryButton({ title = "Action", onPress, style }) {
  return (
    <TouchableOpacity style={[styles.agreeButton, style]} onPress={onPress}>
      <Text style={styles.agreeText}>{title}</Text>
    </TouchableOpacity>
  );
}
```

---

### `InfoBlock.js`

Purpose: small titled block for the house/rule items.

Usage: `<InfoBlock title="Be yourself.">Make sure your photos...</InfoBlock>`

Excerpt:

```js
import React from "react";
import { View, Text } from "react-native";
import styles from "./welcomeStyles";

export default function InfoBlock({ title, children }) {
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={styles.ruleTitle}>{title}</Text>
      <Text style={styles.ruleText}>{children}</Text>
    </View>
  );
}
```

---

### `themeStyles.js`

Purpose: theme token definitions and a `getThemeStyles` helper to produce a themed StyleSheet.

Notes:

- Exports `lightColors` and `darkColors` along with `getThemeStyles(colors)` which returns a StyleSheet.
- Useful when implementing a theme toggle — `ThemeTestScreen.js` (if present) demonstrates usage.

Excerpt (definition start):

```js
export const lightColors = {
  background: "#fff",
  primaryGradientStart: "#FF5858",
  primaryGradientEnd: "#FFAE42",
  text: "#181A20",
  // ...
};
```

---

## Dependencies and setup notes

- `react-native-linear-gradient` is required by `GradientBackground.js`.
  - Managed Expo: `expo install react-native-linear-gradient`
  - Bare RN: `npm install react-native-linear-gradient` and follow native linking steps if needed
- No `package.json` was present in the repo snapshot used to generate this documentation; to run locally, ensure you have a React Native project with appropriate dependencies.

## Quick integration example

1. Add `WelcomeScreen` to your navigation stack (React Navigation):

```js
import WelcomeScreen from "./welcome-page/WelcomeScreen";

// in your navigator
<Stack.Screen name="Welcome" component={WelcomeScreen} />;
```

2. Install the gradient dependency and run the app.

## Editable spots & recommended small improvements

- `welcomeFunctions.handleAgree` navigates to `'NextPage'` — replace with your real route name.
- Make `GradientBackground` accept `colors` and `paused` props so designers can tweak the palette/duration without editing component internals.
- Consider moving tokens from `welcomeStyles.js` to `themeStyles.js` and deriving styles to support a runtime theme toggle.
- Add unit tests for `InfoBlock` / `PrimaryButton` to ensure copy and layout remain stable.

---

## Where to go from here

If you want, I can:

- Add a components props table (document each component props and default values).
- Embed screenshots into this `.md` (or the `.docx` already created) by running an Expo instance and capturing the screen.
- Convert the file into a small README inside `welcome-page/` with usage and install steps.

If you'd like any of the above, tell me which and I'll update the Markdown accordingly.
