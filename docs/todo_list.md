# Dyno — Full Development Roadmap (MVP)

A complete step-by-step TODO.md roadmap for building Dyno, an AI-powered mobile dating and matching application built with React Native (Expo), Python-based AI microservices, and Supabase for backend data management.

---

## Phase 1: Project Setup and Foundation

### 1. Repository and Version Control

- [x] Initialize `dyno/` repository on GitHub.
- [ ] Create folders:
  - `/frontend/` for React Native app
  - `/backend/` for FastAPI/Python microservices
  - `/ml/` for AI and facial recognition logic
  - `/docs/` for design and planning notes
- [ ] Add `.gitignore` for Node, Python, and Expo.
- [x] Add `README.md` and `TODO.md` placeholders.

### 2. Core Dependencies Setup

- [ ] Install Expo CLI globally.
- [ ] Initialize Expo project with TypeScript template.
- [ ] Install TailwindCSS and configure it for Expo using `nativewind`.
- [ ] Set up Supabase project online and generate API keys.
- [ ] Install Supabase JS client in React Native.
- [ ] Set up Python environment with `venv` or `poetry` for backend.
- [ ] Install FastAPI, Uvicorn, and essential libraries.
- [ ] Create initial API health check route for testing.

---

## Phase 2: UI/UX and Frontend Structure

### 1. Layout and Navigation

- [ ] Implement Expo Router or React Navigation for screen transitions.
- [ ] Create navigation structure:
  - `/LoginScreen`
  - `/RegisterScreen`
  - `/HomeScreen`
  - `/ProfileScreen`
  - `/ChatScreen`
  - `/SettingsScreen`
- [ ] Add smooth transitions using Framer Motion or Reanimated.
- [ ] Implement global theme (light/dark) using Tailwind variables.

### 2. Design System and Components

- [ ] Define brand palette (light blue, white, gradients, transparent overlays).
- [ ] Create reusable UI components:
  - Buttons (Primary, Secondary, Ghost)
  - Inputs (Animated focus states)
  - Cards (ProfileCard, MatchCard)
  - Modals (for pop-ups and alerts)
  - Loaders and placeholders
- [ ] Add blurred transparent headers.
- [ ] Add glowing hover/tap animations using Reanimated.

### 3. Landing / Onboarding Flow

- [ ] Build onboarding slides introducing Dyno.
- [ ] Add animations (slide/fade-in).
- [ ] Implement “Get Started” button linking to Login/Signup.

---

## Phase 3: Authentication and User Profiles

### 1. Authentication (Supabase)

- [ ] Set up Supabase Auth with email/password.
- [ ] Configure secure JWT session management.
- [ ] Build login form with animated transitions.
- [ ] Build signup form with gender, interests, and short bio.
- [ ] Add forgot-password flow.
- [ ] Implement “Stay signed in” with local storage.

### 2. Profile Setup

- [ ] Implement profile photo upload (Expo Image Picker).
- [ ] Connect image upload to Supabase storage.
- [ ] Store photo URL in `users` table.
- [ ] Add gender selector and preference selector.
- [ ] Add location selector (via Expo Location API).
- [ ] Add editable fields: name, age, bio, interests.

---

## Phase 4: Facial Recognition Integration (AI Security)

### 1. Setup Face Recognition Microservice (Python)

- [ ] Create separate microservice folder `/backend/face_service`.
- [ ] Install `opencv-python`, `dlib`, `face_recognition`, and `numpy`.
- [ ] Implement `/register-face` endpoint to capture facial embeddings.
- [ ] Implement `/verify-face` endpoint to check live video frames.
- [ ] Use facial liveness detection (blink/smile/movement).
- [ ] Return JSON response with verification confidence.

### 2. Integration with Frontend

- [ ] Add camera access permission flow in Expo.
- [ ] Implement real-time face scan using Expo Camera.
- [ ] Capture a short sequence (2-3 seconds) for liveness verification.
- [ ] Send frame sequence to backend API.
- [ ] Display result with smooth transition and alert modal.
- [ ] Encrypt and store only facial embeddings in Supabase.

### 3. Security and Privacy

- [ ] Implement backend encryption for embeddings using Fernet or AES.
- [ ] Ensure HTTPS/TLS for all backend communications.
- [ ] Add rate limiting and logging middleware to FastAPI.

---

## Phase 5: AI Matching and Compatibility Engine

### 1. AI Matching Microservice

- [ ] Create `/backend/match_service/`.
- [ ] Implement AI matching using personality-based scoring.
- [ ] Store user preferences, interests, and traits in Supabase.
- [ ] Use cosine similarity on embeddings and preference vectors.
- [ ] Return ranked list of potential matches.

### 2. Frontend Matching Logic

- [ ] Fetch suggested matches from backend.
- [ ] Display user cards in swipeable carousel (like Tinder).
- [ ] Add animations for swipe left/right (Framer Motion).
- [ ] Trigger match animation (confetti/glow effect) on match.

### 3. Compatibility Scoring

- [ ] Add visual compatibility score (progress ring or number).
- [ ] Fetch compatibility data from match_service.
- [ ] Display “Top Matches” section on home screen.

---

## Phase 6: Chat and Interaction System

### 1. Chat Setup

- [ ] Create `/backend/chat_service/` microservice or use Supabase Realtime.
- [ ] Define tables: `messages`, `matches`.
- [ ] Enable real-time listeners in Supabase client.
- [ ] Build chat interface with bubble layout.
- [ ] Add message send animation and delivery confirmation.

### 2. Match Events

- [ ] Create event-driven updates when two users match.
- [ ] Trigger chat room creation automatically.
- [ ] Add in-app notifications for matches and messages.

---

## Phase 7: Data Storage and Cloud Management

### 1. Supabase Schema Design

- [ ] Tables:
  - `users` (id, name, email, bio, gender, preferences, embeddings)
  - `matches` (user_id, match_id, score, timestamp)
  - `messages` (chat_id, sender_id, content, timestamp)
  - `photos` (user_id, photo_url)
- [ ] Create Supabase policies for row-level security.
- [ ] Enable public/private buckets for media storage.

### 2. Backend Integration

- [ ] Connect FastAPI microservices to Supabase via REST API or Supabase Python client.
- [ ] Handle async calls for fetching and writing data.
- [ ] Add caching for match results to reduce compute time.

---

## Phase 8: UI Enhancements and Motion Polish

### 1. Animations and Transitions

- [ ] Add animated pop-ups for new matches.
- [ ] Smooth swipe animations with Reanimated.
- [ ] Apply pulse/bounce effects to interactive elements.
- [ ] Implement confetti animation using Lottie.

### 2. Responsive Design

- [ ] Test layout on multiple device sizes.
- [ ] Adjust margins and scaling for smaller screens.

---

## Phase 9: Testing and Debugging

### 1. Frontend Testing

- [ ] Use Jest for component/unit tests.
- [ ] Test navigation and API integration.
- [ ] Run app in Expo dev mode and test on physical device.

### 2. Backend Testing

- [ ] Write unit tests for FastAPI endpoints.
- [ ] Simulate face verification using test images.
- [ ] Load-test matching service for scalability.

---

## Phase 10: Deployment and Documentation

### 1. Deployment

- [ ] Deploy FastAPI microservices on Render (free tier).
- [ ] Deploy Supabase database in production mode.
- [ ] Configure environment variables in Expo and backend.
- [ ] Build Expo app for Android and iOS using EAS.

### 2. Documentation

- [ ] Write clear setup instructions in README.md.
- [ ] Add API documentation for all microservices.
- [ ] Document AI model usage and data flow.
- [ ] Create privacy statement for facial data handling.

---

## Phase 11: Future Enhancements (Post-MVP)

- [ ] Add voice-based matching and emotion detection.
- [ ] Add AI chatbot for match suggestions.
- [ ] Build desktop web version using Next.js.
- [ ] Improve scalability with microservice orchestration.
- [ ] Integrate advanced analytics for engagement metrics.
- [ ] Optimize image and video compression for uploads.

---

This roadmap covers every layer of the Dyno MVP — from setup to deployment — with step-by-step guidance for implementation. Designed to be used as `TODO.md` in the project repository.
