# REST API Project

A simple REST API built with **Node.js** and **Express** that demonstrates all CRUD operations.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# 3. (Optional) Auto-restart on file changes
npm run dev
```

Server runs at: `http://localhost:3000`

---

## Project Structure

```
rest-api-project/
├── server.js            ← Entry point, creates the Express app
├── routes/
│   └── users.js         ← All /api/users endpoints
├── middleware/
│   └── logger.js        ← Logs every request to the console
└── package.json
```

---

## API Endpoints

### Users

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users?role=admin` | Filter users by role |
| GET | `/api/users/:id` | Get one user |
| POST | `/api/users` | Create a user |
| PUT | `/api/users/:id` | Replace a user fully |
| PATCH | `/api/users/:id` | Update specific fields |
| DELETE | `/api/users/:id` | Delete a user |

---

## Example Requests

### GET all users
```bash
curl http://localhost:3000/api/users
```

### GET one user
```bash
curl http://localhost:3000/api/users/1
```

### POST — create a user
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Dana", "email": "dana@example.com", "role": "user"}'
```

### PUT — replace a user
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Updated", "email": "alice@example.com", "role": "admin"}'
```

### PATCH — update one field
```bash
curl -X PATCH http://localhost:3000/api/users/2 \
  -H "Content-Type: application/json" \
  -d '{"role": "admin"}'
```

### DELETE a user
```bash
curl -X DELETE http://localhost:3000/api/users/3
```

---

## HTTP Status Codes Used

| Code | Meaning |
|------|---------|
| 200 | OK — request succeeded |
| 201 | Created — new resource made |
| 400 | Bad Request — missing required fields |
| 404 | Not Found — user doesn't exist |
| 409 | Conflict — email already in use |

---

## Next Steps to Extend This API

- **Add a real database** — connect PostgreSQL with `pg` or MongoDB with `mongoose`
- **Add authentication** — protect routes with JWT tokens using `jsonwebtoken`
- **Add input validation** — use `joi` or `zod` for stricter validation
- **Add pagination** — `GET /api/users?page=1&limit=10`
- **Deploy it** — host on Railway, Render, or Vercel
