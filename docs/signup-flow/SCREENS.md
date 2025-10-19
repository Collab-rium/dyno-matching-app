````markdown
# Signup Flow - Screen Showcase

This document describes what each screen looks like and its functionality.

## 📱 Screen-by-Screen Breakdown

---

### 1️⃣ Name Screen

**What it looks like:**

```
┌─────────────────────────────────┐
│  ←                    ▬▬▬▬▬▬▬▬ │  Progress: 1/8
│                                 │
│                                 │
│  What's your first name?        │
│                                 │
│  This is how it'll appear on    │
│  your profile and you can't     │
│  change it later.               │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Enter your name         │   │
│  └─────────────────────────┘   │
│                                 │
│  Make sure it matches your ID   │
│  for verification purposes.     │
│                                 │
│                                 │
│                                 │
│                                 │
│  ┌─────────────────────────┐   │
│  │        Next             │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

**Features:**

- Text input with placeholder
- Character limit: 50
- Minimum length: 2 characters
- Auto-focus on mount
- Error message if too short
- Helper text about ID matching

---

### 2️⃣ Birthday Screen

**What it looks like:**

```
┌─────────────────────────────────┐
│  ←                 ▬▬▬▬▬▬▬▬▬▬▬ │  Progress: 2/8
│                                 │
│                                 │
│  Your b-day?                    │
│                                 │
│  Your profile shows your age,   │
│  not your birth date.           │
│                                 │
│  ┌─────────────────────────┐   │
│  │   MM / DD / YYYY        │   │
│  └─────────────────────────┘   │
│       [Date Picker]             │
│                                 │
│  You'll appear as 28 years old  │
│                                 │
│  You must be at least 18        │
│  years old to use this app.     │
│                                 │
│                                 │
│  ┌─────────────────────────┐   │
│  │        Next             │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

**Features:**

- Native date picker
- Age calculation display
- 18+ validation
- Maximum age: 100
- Shows calculated age in real-time
- Platform-specific picker (iOS spinner, Android calendar)

---

### 3️⃣ Gender Screen

**What it looks like:**

```
┌─────────────────────────────────┐
│  ←               ▬▬▬▬▬▬▬▬▬▬▬▬▬ │  Progress: 3/8
│                                 │
│                                 │
│  What's your gender?            │
│                                 │
│                                 │
│  ┌─────────────────────────┐   │
│  │        Woman            │   │ ← Selectable
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │        Man              │   │ ← Selectable
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │        Other            │   │ ← Selectable
│  └─────────────────────────┘   │
│                                 │
│  ┌───────────────────────────┐ │
│  │ Show my gender on my      │ │
│  │ profile              ◉ ON │ │ ← Toggle
│  │ Your gender will be       │ │
│  │ visible to other users    │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌─────────────────────────┐   │
│  │        Next             │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

**Features:**

- Three gender options
- Selected state with accent color
- Visibility toggle switch
- Helper text for toggle
- Must select one to proceed

---

### 4️⃣ Location Screen

**What it looks like:**

```
┌─────────────────────────────────┐
│  ←             ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ │  Progress: 4/8
│                                 │
│                                 │
│  Where are you?                 │
│                                 │
│  This helps us show you people  │
│  nearby. Your exact location    │
│  is never shared.               │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Use my current location │   │ ← GPS
│  └─────────────────────────┘   │
│                                 │
│  Or enter manually              │ ← Link
│                                 │
│  ┌─────────────────────────┐   │
│  │  📍 San Francisco, CA   │   │ ← Display
│  └─────────────────────────┘   │
│                                 │
│                                 │
│                                 │
│  ┌─────────────────────────┐   │
│  │        Next             │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

**Features:**

- GPS location button
- Manual city input option
- Location display with emoji
- Privacy reassurance text
- Toggle between GPS/manual

---

### 5️⃣ Photos Screen

**What it looks like:**

```
┌─────────────────────────────────┐
│  ←           ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ │  Progress: 5/8
│                                 │
│  Add your photos                │
│                                 │
│  Add at least 2 photos to       │
│  continue. Your first photo     │
│  will be your main profile      │
│  picture.                       │
│                                 │
│  ┌────┐ ┌────┐ ┌────┐          │
│  │ 📷 │ │ 📷 │ │ +  │          │ ← Horizontal
│  │[1] │ │[2] │ │Add │          │   scroll
│  │Main│ │    │ │    │          │
│  └────┘ └────┘ └────┘          │
│                                 │
│  2 of 6 photos added            │
│                                 │
│  ┌───────────────────────────┐ │
│  │ Photo Tips               │ │
│  │ • Use clear, recent photos│ │
│  │ • Show your face clearly  │ │
│  │ • Avoid group photos      │ │
│  │ • Include photos that     │ │
│  │   show your interests     │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌─────────────────────────┐   │
│  │        Next             │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

**Features:**

- Horizontal photo grid
- Add button (opens picker)
- Remove button (× on each photo)
- "Main" badge on first photo
- Photo counter (2 of 6)
- Tips box
- Minimum 2, maximum 6 photos

---

### 6️⃣ Interests Screen

**What it looks like:**

```
┌─────────────────────────────────┐
│  ←         ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ │  Progress: 6/8
│                                 │
│  Your interests                 │
│                                 │
│  Let others know what you're    │
│  passionate about. Select up    │
│  to 5 interests.                │
│                                 │
│  [ Travel ] [ Cooking ] [ Reading ]│
│  [ Music  ] [ Sports  ] [ Fitness ]│
│  [ Art    ] [ Photography ] [Gaming]│
│  [ Movies ] [ Dancing ] [ Yoga  ] │
│  [ Technology ] [ Fashion ] ...  │
│                                 │
│  Select up to 5 (3/5)           │
│                                 │
│  You can always change these    │
│  later in your profile settings.│
│                                 │
│                                 │
│  ┌─────────────────────────┐   │
│  │        Next             │   │
│  └─────────────────────────┘   │
│         Skip                    │ ← Optional
└─────────────────────────────────┘
```

**Features:**

- Chip-based multi-selection
- Max 5 selections
- Counter showing progress (3/5)
- Selected chips highlighted
- Wrap to multiple rows
- Skip button (optional step)
- 24 predefined interests

---

### 7️⃣ About/Bio Screen

**What it looks like:**

```
┌─────────────────────────────────┐
│  ←       ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ │  Progress: 7/8
│                                 │
│  About you                      │
│                                 │
│  Write a short bio to tell      │
│  people about yourself. What    │
│  makes you unique?              │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Tell us about yourself..│   │
│  │                         │   │ ← Multiline
│  │                         │   │   text area
│  │                         │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  475 characters remaining       │
│                                 │
│  ┌───────────────────────────┐ │
│  │ Bio Examples:             │ │
│  │ "Coffee enthusiast ☕ |   │ │
│  │  Adventure seeker 🏔️"     │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌─────────────────────────┐   │
│  │        Next             │   │
│  └─────────────────────────┘   │
│         Skip                    │ ← Optional
└─────────────────────────────────┘
```

**Features:**

- Multiline text input
- 500 character limit
- Character counter
- Example bios
- Skip button (optional)
- Placeholder text

---

### 8️⃣ Preferences Screen

**What it looks like:**

```
┌─────────────────────────────────┐
│  ←     ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ │  Progress: 8/8
│                                 │
│  Your preferences               │
│                                 │
│  Tell us who you'd like to meet.│
│  You can always change this     │
│  later.                         │
│                                 │
│  I'm looking for                │
│  ┌─────────────────────────┐   │
│  │       Women             │   │ ← Selectable
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │        Men              │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │      Everyone           │   │
│  └─────────────────────────┘   │
│                                 │
│  Age range                      │
│  Minimum age        25 years    │
│  ├───●─────────────────────┤   │ ← Slider
│                                 │
│  Maximum age        35 years    │
│  ├──────────────●──────────┤   │ ← Slider
│                                 │
│  Maximum distance   50 km       │
│  ├─────────●──────────────┤   │ ← Slider
│                                 │
│  ┌─────────────────────────┐   │
│  │      Complete           │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

**Features:**

- Gender preference selection
- Age range sliders (18-100)
- Distance slider (1-200 km)
- Real-time value display
- Sliders with accent colors
- Complete button (last step)

---

### 🎉 Success Modal

**What it looks like:**

```
┌─────────────────────────────────┐
│ [OVERLAY - DARK BACKGROUND]     │
│                                 │
│   ┌─────────────────────────┐  │
│   │                         │  │
│   │          👋             │  │
│   │                         │  │
│   │   Welcome to Dyno!      │  │
│   │                         │  │
│   │  There's a lot out there│  │
│   │  to discover. But let's │  │
│   │  get your profile set up│  │
│   │  first.                 │  │
│   │                         │  │
│   │  ┌──────────────────┐  │  │
│   │  │    Let's go      │  │  │
│   │  └──────────────────┘  │  │
│   │                         │  │
│   └─────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

**Features:**

- Modal overlay
- Animated entrance (spring)
- Emoji celebration
- Welcome message
- Action button
- Calls onComplete callback
- Passes all collected data

---

## 🎨 Visual Design Language

### Colors

- **Background:** Dark (`#181A20`)
- **Cards:** Slightly lighter (`#232526`)
- **Borders:** Subtle gray (`#414345`)
- **Primary:** Red (`#FF5858`)
- **Text Primary:** White (`#fff`)
- **Text Secondary:** Gray (`#A3A3A3`)
- **Text Hint:** Dark gray (`#666`)

### Typography

- **Title:** 32px, Bold
- **Subtitle:** 16px, Regular
- **Body:** 14-18px
- **Helper:** 13px

### Spacing

- **Container padding:** 24px
- **Element spacing:** 16-32px
- **Compact spacing:** 8-12px

### Interactive Elements

- **Buttons:** Rounded (30px radius)
- **Inputs:** Rounded (12px radius)
- **Cards:** Rounded (12px radius)
- **Border width:** 2px

### Animations

- **Screen transitions:** Smooth
- **Progress bar:** Animated width
- **Modal:** Spring animation
- **Button press:** Opacity feedback (0.7)

---

## 📱 Responsive Behavior

All screens are:

- **Mobile-first** designed
- **SafeArea aware** (respects notch, status bar)
- **Keyboard avoiding** (inputs don't get hidden)
- **Portrait optimized** (primary orientation)
- **Landscape compatible** (degrades gracefully)

---

## ♿ Accessibility Features

- **High contrast** text
- **Large touch targets** (min 44x44pt)
- **Clear error messages**
- **Readable fonts**
- **Visual feedback** on interactions
- **Skip options** for optional content

---

This showcase provides a clear picture of what users will experience when going through the signup flow. Each screen is designed to be intuitive, beautiful, and efficient.
````
