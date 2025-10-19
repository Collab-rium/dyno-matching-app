# Signup Flow Documentation

## Overview

The signup flow module is a complete, modular, Tinder-style onboarding experience for the Dyno Matching App. It provides a multi-step process that collects user information through intuitive, mobile-first screens.

## Architecture

### Component Hierarchy

```
SignupFlow (Container)
├── Header
│   ├── BackButton
│   └── ProgressBar
├── Step Screens (Dynamic)
│   ├── NameScreen
│   ├── BirthdayScreen
│   ├── GenderScreen
│   ├── LocationScreen
│   ├── PhotosScreen
│   ├── InterestsScreen
│   ├── AboutScreen
│   └── PreferencesScreen
├── Footer
│   ├── NextButton
│   └── SkipButton (optional steps only)
└── SuccessModal
```

### Data Flow

1. **User Input** → Screen Component receives input
2. **Data Update** → Screen calls `onDataChange({ field: value })`
3. **State Management** → SignupFlow updates `userData` state
4. **Validation** → Before proceeding, validation function checks data
5. **Navigation** → If valid, move to next step
6. **Completion** → On last step, show success modal
7. **Callback** → Call `onComplete(userData)` with all collected data

## Configuration System

The signup flow is driven by `signupConfig.js`, which defines:

```javascript
{
  id: 'unique-identifier',      // Step identifier
  component: ScreenComponent,    // React component to render
  title: 'Screen Title',        // Display title (optional)
  required: true|false,          // Can user skip this step?
  validate: (data) => boolean,  // Validation function
}
```

### Customization Examples

#### Add a New Step

```javascript
// 1. Create screen component
// screens/HeightScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import RangeSlider from '../../components/RangeSlider';

export default function HeightScreen({ data, onDataChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How tall are you?</Text>
      <RangeSlider
        value={data.height || 170}
        onValueChange={(height) => onDataChange({ height })}
        minimumValue={140}
        maximumValue={220}
        unit="cm"
      />
    </View>
  );
}

// 2. Add to signupConfig.js
import HeightScreen from './screens/HeightScreen';

{
  id: 'height',
  component: HeightScreen,
  title: 'How tall are you?',
  required: false,
  validate: (data) => data.height > 0,
}
```

#### Reorder Steps

Simply move the step objects in the array:

```javascript
// Move photos to after preferences
const signupSteps = [
  { id: 'name', ... },
  { id: 'birthday', ... },
  { id: 'gender', ... },
  { id: 'preferences', ... },  // Moved up
  { id: 'photos', ... },        // Moved down
  // ...
];
```

#### Make Step Conditional

```javascript
{
  id: 'religiousPrefs',
  component: ReligiousPrefsScreen,
  required: false,
  validate: (data) => {
    // Only validate if user indicated they care about religion
    if (data.religionImportant) {
      return data.religiousPrefs && data.religiousPrefs.length > 0;
    }
    return true; // Skip validation otherwise
  },
}
```

## Screen Component Guidelines

Each screen component should:

### Accept These Props

```javascript
function YourScreen({ data, onDataChange }) {
  // data: object containing all user data collected so far
  // onDataChange: function to update user data
}
```

### Follow This Pattern

```javascript
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function YourScreen({ data, onDataChange }) {
  // Local state for UI (if needed)
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (value) => {
    setError(""); // Clear errors
    onDataChange({ yourField: value }); // Update parent
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Question?</Text>
        <Text style={styles.subtitle}>Additional context or instructions</Text>

        {/* Your UI components */}

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#181A20" },
  content: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 32, fontWeight: "bold", color: "#fff", marginBottom: 12 },
  subtitle: {
    fontSize: 16,
    color: "#A3A3A3",
    marginBottom: 32,
    lineHeight: 24,
  },
  error: { color: "#FF5858", fontSize: 14, marginTop: 8 },
});
```

### Use Reusable Components

Always use components from `/components/` folder:

```javascript
import TextInput from "../../components/TextInput";
import SelectionButton from "../../components/SelectionButton";
import MultiSelectChips from "../../components/MultiSelectChips";
import RangeSlider from "../../components/RangeSlider";
import DateInput from "../../components/DateInput";
import PhotoUpload from "../../components/PhotoUpload";
```

## Validation System

### Validation Functions

Each step can have a validation function:

```javascript
validate: (data) => {
  // Return true if data is valid, false otherwise
  return data.fieldName && data.fieldName.length > 0;
};
```

### Common Validation Patterns

#### Required Text Field

```javascript
validate: (data) => {
  return data.name && data.name.trim().length >= 2;
};
```

#### Age Validation

```javascript
validate: (data) => {
  if (!data.birthday) return false;
  const age = calculateAge(data.birthday);
  return age >= 18 && age <= 100;
};
```

#### Array Length

```javascript
validate: (data) => {
  return data.photos && data.photos.length >= 2;
};
```

#### Nested Object

```javascript
validate: (data) => {
  return data.location && data.location.city && data.location.city.length > 0;
};
```

#### Multiple Conditions

```javascript
validate: (data) => {
  return (
    data.preferences &&
    data.preferences.lookingFor &&
    data.preferences.ageMin >= 18 &&
    data.preferences.ageMax <= 100 &&
    data.preferences.ageMin <= data.preferences.ageMax
  );
};
```

#### Optional Field (Always Valid)

```javascript
validate: (data) => true;
// or
validate: null;
```

## Styling Guide

### Theme Colors

```javascript
const theme = {
  background: "#181A20", // Main background
  card: "#232526", // Card/input background
  border: "#414345", // Borders
  primary: "#FF5858", // Primary actions/accent
  secondary: "#FFAE42", // Secondary accent
  textPrimary: "#fff", // Main text
  textSecondary: "#A3A3A3", // Secondary text
  textHint: "#666", // Hints/placeholders
  error: "#FF5858", // Error messages
};
```

### Standard Styles

```javascript
const commonStyles = {
  container: { flex: 1, backgroundColor: "#181A20" },
  content: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 32, fontWeight: "bold", color: "#fff", marginBottom: 12 },
  subtitle: {
    fontSize: 16,
    color: "#A3A3A3",
    marginBottom: 32,
    lineHeight: 24,
  },
  hint: { fontSize: 13, color: "#666", marginTop: 8 },
  error: { fontSize: 14, color: "#FF5858", marginTop: 4 },
};
```

## State Management

### User Data Structure

```javascript
{
  // Required fields
  name: string,
  birthday: Date,
  gender: 'Woman' | 'Man' | 'Other',
  showGender: boolean,
  location: {
    city: string,
    state: string,
    country: string,
    latitude: number,
    longitude: number,
  },
  photos: string[],

  // Optional fields
  interests: string[],
  bio: string,
  preferences: {
    lookingFor: 'Woman' | 'Man' | 'Everyone',
    ageMin: number,
    ageMax: number,
    maxDistance: number,
  },

  // Extendable - add your own fields
  customField: any,
}
```

### Updating Data

From within a screen component:

```javascript
// Update single field
onDataChange({ fieldName: value });

// Update multiple fields
onDataChange({
  field1: value1,
  field2: value2,
});

// Update nested object
onDataChange({
  location: {
    ...data.location,
    city: newCity,
  },
});

// Append to array
onDataChange({
  photos: [...(data.photos || []), newPhoto],
});
```

## Navigation Flow

### Step Progression

1. User lands on first step
2. Fills out required information
3. Presses "Next" button
4. Validation runs
5. If valid → next step, if invalid → show error
6. Repeat until last step
7. On last step, "Complete" button shows success modal
8. Modal calls `onComplete` callback with all data

### Back Navigation

- Back button appears on all steps except first
- Pressing back returns to previous step
- Data is preserved when going back
- No validation when going backwards

### Skip Button

- Only appears on optional steps (`required: false`)
- Allows user to bypass without entering data
- Still advances to next step
- Skipped data fields remain undefined/null

## Error Handling

### Display Errors

```javascript
const [error, setError] = useState("");

// Show error
setError("Please enter a valid name");

// Clear error
setError("");

// In JSX
{
  error ? <Text style={styles.errorText}>{error}</Text> : null;
}
```

### Validation Errors

The SignupFlow component automatically shows validation errors when user tries to proceed with invalid data.

### Common Error Messages

```javascript
const errorMessages = {
  nameTooShort: "Please enter at least 2 characters",
  invalidAge: "You must be at least 18 years old",
  noGender: "Please select your gender",
  noPhotos: "Please add at least 2 photos",
  noLocation: "Please provide your location",
};
```

## Testing

### Manual Testing Checklist

- [ ] Can complete all required steps
- [ ] Validation blocks invalid data
- [ ] Back button works correctly
- [ ] Skip button appears only on optional steps
- [ ] Progress bar updates correctly
- [ ] Success modal appears after completion
- [ ] Data is correctly passed to onComplete callback
- [ ] Photos can be added and removed
- [ ] Date picker enforces age limit (18+)
- [ ] Location can be entered manually or via GPS

### Sample Test Data

```javascript
const testUser = {
  name: "John Doe",
  birthday: new Date("1995-06-15"),
  gender: "Man",
  showGender: true,
  location: { city: "San Francisco", state: "CA", country: "USA" },
  photos: ["photo1.jpg", "photo2.jpg"],
  interests: ["Travel", "Cooking", "Music"],
  bio: "Software developer who loves hiking",
  preferences: {
    lookingFor: "Woman",
    ageMin: 25,
    ageMax: 35,
    maxDistance: 50,
  },
};
```

## Performance Considerations

- Screens only render when active
- Data persists across navigation
- Images are loaded lazily
- Animations use native driver where possible
- Validation runs only when needed

## Accessibility

- All interactive elements are touchable
- Text is readable with proper contrast
- Font sizes are appropriate
- Error messages are clear and helpful
- Progress is communicated visually and textually

## Future Enhancements

Potential features to add:

1. **Save and Resume** - Allow users to save progress and continue later
2. **A/B Testing** - Different step orders for different user segments
3. **Analytics** - Track completion rates, drop-off points
4. **Dynamic Steps** - Show/hide steps based on previous answers
5. **Multi-language** - Internationalization support
6. **Animations** - Enhanced transitions between steps
7. **Tooltips** - Contextual help for each field
8. **Auto-save** - Persist data to local storage automatically

## Troubleshooting

### Common Issues

**Issue:** Photos not displaying

- Check image picker permissions
- Verify image URIs are valid
- Ensure images are not too large

**Issue:** Date picker not showing

- Install `@react-native-community/datetimepicker`
- Check platform-specific implementation

**Issue:** Validation not working

- Verify validate function returns boolean
- Check data structure matches expectations
- Console.log userData to debug

**Issue:** Success modal not appearing

- Ensure all required steps have valid data
- Check onComplete callback is defined
- Verify modal component is imported

## Support

For issues or questions:

- Check the README.md in signup-flow folder
- Review examples.js for usage patterns
- Consult component documentation in /components/
- Review PRD.md for project requirements

---

**Version:** 1.0  
**Last Updated:** October 2025  
**Maintainer:** Dyno Matching App Team
