# Stress Analyzer – Backend

This repository contains the **backend (server-side)** implementation of the Stress Analyzer project.  
The backend acts as the **brain of the application**, handling logic, data storage, authentication, and secure access.

This is intentionally **not an AI system**. It is a rule-based, logic-driven application designed to understand real backend fundamentals.

---

## Why This Backend Exists

A common beginner mistake is assuming frontend code is enough.

This backend exists to:
- Protect business logic from the browser
- Store stress analysis data persistently
- Control admin-only operations
- Enforce security using authentication
- Act as a single source of truth

Without a backend, the project would be easily manipulated and unreliable.

---

## How the Backend Works (Conceptually)

1. Frontend sends user data via HTTP requests
2. Backend receives and validates the request
3. Stress score is calculated or verified
4. Data is stored in the database
5. Backend responds with JSON data
6. Admin routes require authentication using JWT

This follows a **request → process → response** lifecycle.

---

## Tech Stack

**Runtime**
- Node.js

**Framework**
- Express.js

**Database**
- MongoDB (via Mongoose)

**Authentication**
- JSON Web Tokens (JWT)

**Other Tools**
- dotenv (environment variables)
- CORS (cross-origin handling)

---

## API Responsibilities

The backend handles:
- Submitting stress test results
- Fetching leaderboard data
- Admin login authentication
- Protected admin actions (view/delete data)

All sensitive logic is enforced **server-side**, not in the frontend.

---

## Authentication & Security

- Admin login generates a JWT
- Token is required for protected routes
- Token validation happens on every admin request
- Frontend cannot bypass backend security rules

Important realization:
> Hiding admin pages is not security.  
> Backend validation is security.

---

## Database Design (High Level)

Stored data includes:
- User name
- Age group
- Stress score
- Timestamp

Although MongoDB is NoSQL, schemas are used to maintain **data discipline and consistency**.

---

## Deployment

- Backend deployed on Render
- Environment variables used for:
  - Database URI
  - JWT secret
  - Port configuration

Difference learned:
> Localhost success does not guarantee production success.

---

## Challenges Faced

Some real issues encountered:
- CORS errors after deployment
- Environment variable misconfiguration
- Hardcoded URLs during early stages
- Misunderstanding frontend vs backend trust
- Token handling mistakes

Each issue improved system understanding.

---

## What This Backend Taught Me

- Client–server separation
- Stateless authentication using JWT
- Secure API design
- Debugging backend errors logically
- Real-world deployment constraints

This project shifted my thinking from *writing code* to *engineering systems*.

---

## Future Improvements

- Role-based access control
- Pagination for leaderboard
- Rate limiting
- Improved validation
- Analytics over time

---

## Related Repositories

- Frontend repository: (add link here)

---

## Author

Mohammed Mavia Shariff  
Backend-focused full-stack learner

