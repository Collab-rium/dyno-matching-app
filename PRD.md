Dyno-Matching — Detailed Product
Requirements Document (PRD)
Stack: HTML, CSS, JavaScript (Frontend & Backend)
1. Executive Summary
Create Dyno-Matching, a mobile-first matchmaking app blending swipe-based discovery (like
Tinder) with culturally-aware filtering and features inspired by Muzz. This PRD defines scope, MVP,
features, data model, APIs, UX flows, non-functional requirements, and a plan for two developers
using HTML/CSS/JS for both frontend and backend.
2. Goals & Success Metrics
- Launch functional MVP in ~8–12 weeks with 2 developers. - Key metrics: D1/D7 retention,
DAU/MAU, matches/day, messages/day, conversion to paid.
3. Target Personas
- Young adults (20–35) seeking culturally-aware dating/marriage connections. - Community leaders
helping family-focused introductions. - Power users wanting verified, safe interactions.
4. MVP Scope (must-haves)
Frontend screens: 1. Onboarding / Signup (email/phone OTP) 2. Profile Setup (photos, bio,
religion/intent, age, location) 3. Discovery (swipe cards, filters) 4. Matches list 5. Chat (real-time
messages & images) 6. Settings & Reports Backend features: - Auth (OTP & JWT sessions) - User
CRUD & profile media handling - Discovery API with geofence & filter logic - Swipe action recording
& match creation - Real-time chat via WebSocket - Notifications (FCM integration) - Reports & basic
admin moderation endpoints
5. Technology Stack (JS/HTML/CSS focused)
Frontend: - HTML5, CSS3 (Tailwind CSS recommended for speed) or plain CSS, Vanilla JS or a
lightweight framework (Svelte, or React if you prefer). Backend (JavaScript): - Node.js with
Express.js (or Fastify) as the HTTP server (all JS). Use Socket.IO for WebSocket chat. - Database:
PostgreSQL (recommended) or MongoDB if you prefer document DB. Use node-postgres (pg) or
mongoose accordingly. - Storage: AWS S3 or DigitalOcean Spaces (signed URL uploads). - Auth:
JWT tokens; OTP through Twilio or local SMS provider.
6. System Architecture Overview
Clients (mobile web / PWA / hybrid app) <--> REST API (Node/Express) <--> PostgreSQL
Real-time channel: Socket.IO server (can run alongside Express). Media: direct S3 uploads with
signed URLs. Deployment: Docker containers on DigitalOcean/Render; use Nginx as reverse
proxy; enable HTTPS with Let's Encrypt.
7. Data Model (Core Tables/Collections)
Users: - id, name, email, phone, password_hash, dob, gender, location_lat, location_lng, city,
country, religion, sect, practice_level, intent_tags, bio, photos[], verified_flags, preferences(json)Swipes: - id, user_id, target_user_id, action (like/pass), timestamp Matches: - id, user_a_id,
user_b_id, created_at, status Messages: - id, match_id, sender_id, text, media_url, timestamp, read
Reports: - id, reporter_id, reported_user_id, reason, evidence_url, status
8. API Spec (Selected Endpoints)
- POST /api/auth/signup {phone,email,password} - POST /api/auth/otp/send {phone} - POST
/api/auth/otp/verify {phone,code} - POST /api/auth/login {email,password} - GET /api/users/me -
PUT /api/users/me {profile fields} - GET
/api/discover?lat=&lng;=&radius;=&age;_min=&age;_max=&filters; - POST /api/swipe
{target_id,action} - GET /api/matches - GET /api/matches/{id}/messages - POST /api/reports
{reported_id,reason,evidence} - WebSocket namespace /chat for real-time messages (emit
message, receive message events)
9. Chat Implementation Details
- Use Socket.IO for real-time messaging. Each match has a room channel named match:. -
Message flow: client emits 'message' with {match_id, text, media_key}; server validates sender and
room, persists message to DB, emits to other client(s). - Store messages in DB; media uploaded to
S3 with signed URL; store S3 URL in message record. - Use FCM to push notifications for offline
users.
10. UI/UX Considerations
- Mobile-first responsive design; consider building a PWA for quick launch. - Keep onboarding
short: require 1 photo + age + location first, ask for more details later. - Accessibility: readable fonts,
proper color contrast, clear report buttons.
11. Security & Privacy Requirements
- HTTPS mandatory, secure JWT storage in client (httpOnly cookies or secure storage in app). -
Hash passwords with bcrypt; rotate secrets; rate-limit auth endpoints. - Image moderation: integrate
automated checks to reject explicit images. - Data deletion endpoint for user-requested account
deletion to satisfy privacy expectations.
12. Non-Functional Requirements
- Performance: API p95 response < 300ms for core endpoints under expected load. - Availability:
99.9% for MVP (use managed DB, monitoring, alerts). - Scalability: Socket.IO horizontally scalable
with Redis adapter when needed.
13. Admin & Moderation Tools
- Simple admin dashboard: search users, view reports, ban/unban, see metrics. - Workflow:
incoming reports → triage → action (warn/ban) → record resolution.
14. Analytics & Monitoring
- Track events: signup, profile completion, swipe, match, message_sent, report_submitted. - Use
Sentry for errors; use Prometheus/Grafana or hosted like Datadog for metrics; Mixpanel for product
analytics.15. Deployment & CI/CD
- Use GitHub Actions to run tests and build; Dockerize app; deploy to Render/DigitalOcean. Use
environment variables for secrets. - Backups: daily DB backups; test restore monthly.
16. Development Plan & Division of Work (2 devs)
Suggested split: - Dev A (Frontend/UI & Product): Figma designs, frontend implementation
(HTML/CSS/JS or React), PWA wrapper, client-side auth & socket handling. - Dev B (Backend &
Infra): Node.js server, DB schema, auth, discovery APIs, Socket.IO server, S3 signed URLs,
deployment, admin endpoints. Sprint plan (10 sprints, 1 week each): 1: Wireframes + project setup
2: Auth + user model 3: Profile creation + media uploads 4: Discovery API + basic UI 5: Swipe +
match 6: Chat (Socket.IO) basic 7: Notifications + reports 8: Admin dashboard + moderation 9:
Testing & polish 10: Beta launch & bugfixes
17. QA & Testing
- Unit tests for backend logic; integration tests for API flows. - E2E tests for signup → swipe →
match → chat. - Manual exploratory testing for moderation and abuse cases.
18. MVP Launch Checklist
- All core flows working: signup, profile, discover, match, chat. - GDPR-style privacy notice and
terms in app. - Moderation and report pipeline working. - Crash and error reporting enabled. -
Payment flow stubbed (if paid features planned).
19. Risks & Mitigations
- Safety & abuse risk: mitigate with moderation, verification, fast response. - Scaling chat
complexity: design with Redis adapter early. - Legal/privacy: prepare TOS and privacy policy
templates and get legal review if expanding internationally.
20. Next Steps (Immediate)
- Set up repos and basic project scaffolding. - Create Figma wireframes for the 6 core screens. -
Implement auth and DB schema in parallel. - Start simple PW