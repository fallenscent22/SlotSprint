# Online Sports Slot Booking System

## Tech Stack
- Frontend: React (functional components, hooks), Tailwind CSS (for clean, responsive UI), React Router, Axios
- Backend: Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt
- Reason for Tailwind: Enables quick, utility-based styling for clean layouts without component overhead.

## Environment Variables
- MONGO_URI: MongoDB connection string
- JWT_SECRET: Secret for JWT signing

## Authentication Flow
1. Register: POST /api/v1/auth/register - Hashes password, stores user.
2. Login: POST /api/v1/auth/login - Verifies credentials, returns JWT.
3. Protected routes (e.g., bookings): Use auth middleware to verify JWT.
4. Frontend: Stores token in localStorage, attaches to headers for protected API calls.

## Database Setup and Seeding
- Use MongoDB local or Atlas.
- Collections: users, slots, bookings (as per schema).
- No seeding needed; slots generated on demand with unique indexes.
- Connect via MONGO_URI.

## Key Design Decisions
- Slots generated on fetch with upsert to avoid duplicates.
- Atomic findOneAndUpdate for booking to prevent race conditions.
- Past slots checked using Date comparison.
- Frontend blocks booking UI for unauth users.

## Trade-offs
- Slots not pre-seeded (infinite dates); on-demand creation trades initial fetch time for scalability.
- Simple date input instead of fancy picker for minimal dependencies.
- Assumed 10:00-22:00 slots; can extend.

## Improvements Planned with More Time
- Add user dashboard for my bookings.
- Implement refresh token for JWT.
- Add tests (Jest for frontend, Mocha for backend).
- Enhance UI with modals for errors/confirmations.
- Support timezones.