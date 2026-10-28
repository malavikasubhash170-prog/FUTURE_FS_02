# FUTURE_FS_02 — Client Lead Management System (Mini CRM)

A beginner-friendly CRM for Future Interns Task 2.

## Features
- Admin login
- Lead list with name, email, source and status
- Add, edit, delete leads (CRUD)
- Status: New / Contacted / Converted
- Notes and follow-up dates
- Search, status filter and dashboard totals
- Node.js + Express API and MongoDB database

## Setup
1. Install Node.js LTS and MongoDB Community Server, or create a MongoDB Atlas database.
2. Open this folder in VS Code and open Terminal → New Terminal.
3. Run `npm install`.
4. Copy `.env.example` to a new file named `.env`.
5. Ensure MongoDB is running locally, or put your MongoDB Atlas connection string in `MONGODB_URI` in `.env`.
6. Run `npm start`.
7. Open http://localhost:3000
8. Demo login is `admin` / `ChangeMe123!` unless changed in `.env`.

## Security
Change the demo password and session secret before sharing. Never upload `.env` or database credentials to GitHub. The default in-memory session store is for local learning only, not production deployment.

## API
POST `/api/login`, POST `/api/logout`, GET `/api/session`, GET/POST `/api/leads`, PATCH/DELETE `/api/leads/:id`.


## Author

**Malavika Subhash**

GitHub: https://github.com/malavikasubhash170-prog

LinkedIn:https://www.linkedin.com/in/malavika-subhash/
