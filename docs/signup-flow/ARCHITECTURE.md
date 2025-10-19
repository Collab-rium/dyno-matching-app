````markdown
# Signup Flow - Visual Architecture

## Component Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         SignupFlow.js                            │
│                    (Main Container Component)                    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Header                                                  │   │
│  │  ┌──────────────┐  ┌────────────────────────────────┐  │   │
│  │  │ Back Button  │  │     ProgressBar (1/8, 2/8...)  │  │   │
│  │  └──────────────┘  └────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Dynamic Screen Content (from signupConfig.js)          │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  Current Step Component (e.g., NameScreen)      │   │   │
│  │  │                                                  │   │   │
│  │  │  - Receives: data, onDataChange                 │   │   │
│  │  │  - Renders: UI specific to this step            │   │   │
│  │  │  - Uses: Reusable components from /components/  │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Footer                                                  │   │
│  │  ┌──────────────────────┐  ┌──────────────────────┐    │   │
│  │  │   Next/Complete      │  │   Skip (optional)    │    │   │
│  │  │      Button          │  │       Button         │    │   │
│  │  └──────────────────────┘  └──────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  SuccessModal (shown at end)                            │   │
│  │  - Animated popup                                        │   │
│  │  - Calls onComplete(userData)                           │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌──────────────┐
│   App.js     │
└──────┬───────┘
       │ renders
       ▼
┌──────────────────────────────────────┐
│  SignupFlow                          │
│                                      │
│  State: {                            │
│    currentStepIndex: 0,              │
│    userData: {},                     │
│    showSuccess: false                │
│  }                                   │
└──────────┬───────────────────────────┘
           │
           │ reads config
           ▼
┌──────────────────────────────────────┐
│  signupConfig.js                     │
│  [                                   │
│    { id: 'name', component: Name... }│
│    { id: 'birthday', ... }           │
│    ...                               │
│  ]                                   │
└──────────┬───────────────────────────┘
           │
           │ renders current step
           ▼
┌──────────────────────────────────────┐
│  NameScreen                          │
│  (receives: data, onDataChange)      │
│                                      │
│  User types: "John"                  │
│                                      │
│  Calls: onDataChange({ name: "John" })│
└──────────┬───────────────────────────┘
           │
           │ updates state
           ▼
┌──────────────────────────────────────┐
│  SignupFlow                          │
│  userData: { name: "John" }          │
└──────────┬───────────────────────────┘
           │
           │ user clicks "Next"
           ▼
┌──────────────────────────────────────┐
│  Validation runs                     │
│  if (validate(userData)) {...}       │
└──────────┬───────────────────────────┘
           │
           ├─ Valid ─────► currentStepIndex++
           │
           └─ Invalid ──► Show error message

           ... repeat for all steps ...

           │
           │ last step complete
           ▼
┌──────────────────────────────────────┐
│  SuccessModal                        │
│  - Shows celebration                 │
│  - User clicks "Let's go"            │
└──────────┬───────────────────────────┘
           │
           │ calls callback
           ▼
┌──────────────────────────────────────┐
│  onComplete(userData)                │
│  {                                   │
│    name: "John",                     │
│    birthday: Date(...),              │
│    gender: "Man",                    │
│    ...                               │
│  }                                   │
└──────────────────────────────────────┘
```

## Screen Flow Visualization

```
START
  │
  ▼
┌─────────────────┐
│  1. NameScreen  │ ← What's your first name?
│  Required       │   • TextInput component
│  Validates: 2+  │   • Min 2 characters
└────────┬────────┘
         │ Next
         ▼
┌─────────────────┐
│ 2. Birthday     │ ← Your b-day?
│  Required       │   • DateInput component
│  Validates: 18+ │   • Must be 18+ years old
└────────┬────────┘
         │ Next
         ▼
┌─────────────────┐
│ 3. Gender       │ ← What's your gender?
│  Required       │   • SelectionButton components
│  Validates:     │   • Show/hide toggle
│  Must select    │
└────────┬────────┘
         │ Next
         ▼
┌─────────────────┐
│ 4. Location     │ ← Where are you?
│  Required       │   • GPS or manual input
│  Validates:     │   • City required
│  Has location   │
└────────┬────────┘
         │ Next
         ▼
┌─────────────────┐
│ 5. Photos       │ ← Add your photos
│  Required       │   • PhotoUpload component
│  Validates:     │   • Min 2 photos
│  2+ photos      │   • Max 6 photos
└────────┬────────┘
         │ Next
         ▼
┌─────────────────┐
│ 6. Interests    │ ← Your interests
│  OPTIONAL       │   • MultiSelectChips
│  Validates: N/A │   • Max 5 selections
└────────┬────────┘   • Can skip
         │ Next/Skip
         ▼
┌─────────────────┐
│ 7. About        │ ← About you
│  OPTIONAL       │   • TextInput (multiline)
│  Validates: N/A │   • Max 500 characters
└────────┬────────┘   • Can skip
         │ Next/Skip
         ▼
┌─────────────────┐
│ 8. Preferences  │ ← Your preferences
│  Required       │   • SelectionButton
│  Validates:     │   • RangeSlider (age)
│  Has prefs      │   • RangeSlider (distance)
└────────┬────────┘
         │ Complete
         ▼
┌─────────────────┐
│ Success Modal   │ ← 👋 Welcome!
│                 │   • Animated popup
│                 │   • Celebration
└────────┬────────┘
         │ Let's go
         ▼
   onComplete(data)
         │
         ▼
       END
```

## Component Dependency Tree

```
SignupFlow.js
├── signupConfig.js (imports all screens)
│   ├── NameScreen.js
│   │   └── TextInput.js
│   │
│   ├── BirthdayScreen.js
│   │   └── DateInput.js
│   │       └── @react-native-community/datetimepicker
│   │
│   ├── GenderScreen.js
│   │   ├── SelectionButton.js
│   │   └── Switch (React Native)
│   │
│   ├── LocationScreen.js
│   │   ├── TextInput.js
│   │   └── PrimaryButton.js
│   │
│   ├── PhotosScreen.js
│   │   └── PhotoUpload.js
│   │
│   ├── InterestsScreen.js
│   │   └── MultiSelectChips.js
│   │
│   ├── AboutScreen.js
│   │   └── TextInput.js
│   │
│   └── PreferencesScreen.js
│       ├── SelectionButton.js
│       └── RangeSlider.js
│           └── @react-native-community/slider
│
├── ProgressBar.js
├── PrimaryButton.js
└── SuccessModal.js
```

## File Size Reference

```
signup-flow/
├── SignupFlow.js           ~150 lines  (navigation & state)
├── signupConfig.js         ~100 lines  (configuration)
├── index.js                ~10 lines   (exports)
├── README.md               ~400 lines  (documentation)
├── QUICKSTART.md           ~300 lines  (quick guide)
├── SETUP.md                ~300 lines  (dependencies)
├── PROJECT_SUMMARY.md      ~350 lines  (overview)
├── examples.js             ~150 lines  (usage examples)
└── screens/
    ├── NameScreen.js       ~70 lines
    ├── BirthdayScreen.js   ~90 lines
    ├── GenderScreen.js     ~80 lines
    ├── LocationScreen.js   ~120 lines
    ├── PhotosScreen.js     ~110 lines
    ├── InterestsScreen.js  ~80 lines
    ├── AboutScreen.js      ~90 lines
    └── PreferencesScreen.js ~130 lines

Total: ~2,530 lines
```

## State Management Flow

```
┌─────────────────────────────────────────────────┐
│  SignupFlow Component State                     │
├─────────────────────────────────────────────────┤
│                                                  │
│  currentStepIndex: number                       │
│  ├─ Tracks which step user is on                │
│  └─ Range: 0 to (signupSteps.length - 1)       │
│                                                  │
│  userData: object                                │
│  ├─ Accumulates all user input                  │
│  ├─ Starts empty: {}                            │
│  ├─ Grows as user progresses                    │
│  └─ Final: { name, birthday, gender, ... }      │
│                                                  │
│  showSuccess: boolean                            │
│  ├─ Controls success modal visibility           │
│  ├─ Default: false                              │
│  └─ Set to true when last step complete         │
│                                                  │
│  error: string                                   │
│  └─ Validation error message                    │
│                                                  │
└─────────────────────────────────────────────────┘

State Update Methods:
─────────────────────
• setCurrentStepIndex()  → Navigate between steps
• setUserData()          → Update user data
• setShowSuccess()       → Show/hide modal
• setError()             → Show/hide errors
```
````
