````markdown
# Signup Flow - Quick Start Guide

## Installation

### 1. Install Dependencies (Expo / web)

This project targets Expo (including expo.dev web). Use the Expo-friendly packages and commands below.

```bash
# Install community packages via npm/yarn
npm install @react-navigation/native @react-navigation/stack @reduxjs/toolkit react-redux

# Expo SDK packages
expo install @react-native-community/datetimepicker @react-native-community/slider expo-image-picker expo-location
```

### 2. Run on Expo / web

Start the dev server and open the web preview:

```bash
expo start --web
# or
expo start
```

## Basic Usage

### Step 1: Import the Component

```javascript
import SignupFlow from "./signup-flow";
```

### Step 2: Add to Your App

```javascript
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import SignupFlow from "./signup-flow";

export default function App() {
  const handleSignupComplete = (userData) => {
    console.log("User completed signup:", userData);
    // Send to backend, navigate to home, etc.
  };

  return (
    <SafeAreaView style={styles.container}>
      <SignupFlow onComplete={handleSignupComplete} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A20",
  },
});
```

### Step 3: Run Your App

```bash
npm start
# or
yarn start
```

## What You Get

### ✅ 8 Pre-built Screens

1. **Name** - User's first name
2. **Birthday** - Date of birth with age validation (18+)
3. **Gender** - Gender selection with visibility toggle
4. **Location** - City/location input
5. **Photos** - Upload 2-6 profile photos
6. **Interests** - Select up to 5 interests
7. **About** - Bio text (up to 500 characters)
8. **Preferences** - Matching preferences (gender, age range, distance)

### ✅ Reusable Components

All in `/components/` folder:

- TextInput
- SelectionButton
- DateInput
- MultiSelectChips
- RangeSlider
- PhotoUpload
- ProgressBar
- SuccessModal
- PrimaryButton

### ✅ Features

- ✓ Progress bar showing completion
- ✓ Back navigation
- ✓ Skip button for optional steps
- ✓ Field validation
- ✓ Success modal on completion
- ✓ Smooth animations
- ✓ Dark theme UI

## Collected Data Structure

After completion, `userData` contains:

```javascript
{
  name: "John Doe",
  birthday: Date,
  gender: "Woman" | "Man" | "Other",
  showGender: boolean,
  location: {
    city: "San Francisco",
    state: "CA",
    country: "USA",
    latitude: 37.7749,
    longitude: -122.4194
  },
  photos: ["uri1", "uri2", ...],
  interests: ["Travel", "Cooking", ...],
  bio: "About me text...",
  preferences: {
    lookingFor: "Woman" | "Man" | "Everyone",
    ageMin: 25,
    ageMax: 35,
    maxDistance: 50
  }
}
```

## Customization

### Change Step Order

Edit `signup-flow/signupConfig.js`:

```javascript
export const signupSteps = [
  { id: 'name', ... },
  { id: 'photos', ... },  // Moved photos earlier
  { id: 'birthday', ... },
  // ... rest of steps
];
```

### Add New Step

1. Create screen in `signup-flow/screens/YourScreen.js`
2. Add to `signupConfig.js`:

```javascript
import YourScreen from './screens/YourScreen';

{
  id: 'yourStep',
  component: YourScreen,
  required: true,
  validate: (data) => data.yourField !== undefined,
}
```

### Remove Step

Comment out or delete from `signupConfig.js`:

```javascript
// {
//   id: 'interests',
//   component: InterestsScreen,
//   ...
// },
```

### Make Step Optional

Set `required: false`:

```javascript
{
  id: 'about',
  component: AboutScreen,
  required: false,  // Can be skipped
  validate: (data) => true,
}
```

## Integration Examples

### With React Navigation

```javascript
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupFlow from "./signup-flow";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup">
          {({ navigation }) => (
            <SignupFlow
              onComplete={(userData) => {
                // Save data
                console.log(userData);
                // Navigate to home
                navigation.replace("Home");
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### With Backend API

```javascript
const handleSignupComplete = async (userData) => {
  try {
    const response = await fetch("https://api.yourapp.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (result.success) {
      // Store auth token
      await AsyncStorage.setItem("token", result.token);
      // Navigate to home
      navigation.replace("Home");
    }
  } catch (error) {
    Alert.alert("Error", "Failed to create account");
  }
};

return <SignupFlow onComplete={handleSignupComplete} />;
```

### With Redux/State Management

```javascript
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";

function SignupScreen() {
  const dispatch = useDispatch();

  const handleSignupComplete = (userData) => {
    // Save to Redux store
    dispatch(setUserData(userData));
    // Navigate to next screen
  };

  return <SignupFlow onComplete={handleSignupComplete} />;
}
```

## Troubleshooting

### Issue: DatePicker not showing

**Solution:** Install the dependency:

```bash
npm install @react-native-community/datetimepicker
```

### Issue: Slider not working

**Solution:** Install the dependency:

```bash
npm install @react-native-community/slider
```

### Issue: Photos not uploading

**Solution:** The PhotosScreen currently uses demo placeholders. Implement your own image picker:

```javascript
import * as ImagePicker from "expo-image-picker";

const handleAddPhoto = async () => {
  // Request permission
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    Alert.alert("Permission needed", "Please grant photo library access");
    return;
  }

  // Launch picker
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [3, 4],
    quality: 0.8,
  });

  if (!result.canceled) {
    const newPhotos = [...(data.photos || []), result.assets[0].uri];
    onDataChange({ photos: newPhotos });
  }
};
```

### Issue: Validation not working

**Solution:** Check that your validate function returns a boolean:

```javascript
validate: (data) => {
  console.log("Validating:", data);
  return Boolean(data.fieldName);
};
```

## Next Steps

1. **Customize screens** - Modify UI to match your brand
2. **Add more steps** - Create custom screens for your needs
3. **Integrate backend** - Send data to your API
4. **Add analytics** - Track user progress
5. **Test thoroughly** - Try all flows and edge cases

## Resources

- 📄 Full Documentation: `docs/signup-flow.md`
- 💡 Examples: `signup-flow/examples.js`
- 📖 README: `signup-flow/README.md`
- 🎨 Components: `components/` folder
- 🖥️ Screens: `signup-flow/screens/` folder

## Support

Need help? Check:

1. Documentation files listed above
2. Component prop documentation in source files
3. PRD.md for project requirements

---

**Quick tip:** Start by running the app as-is to see the full flow, then customize step by step!
````
