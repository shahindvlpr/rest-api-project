const express = require('express');
const router = express.Router();

// In-memory "database" — in a real app, this would be PostgreSQL, MongoDB, etc.
let users = [
  { id: 1, name: 'Alice Rahman', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Hassan', email: 'bob@example.com', role: 'user' },
  { id: 3, name: 'Carol Islam', email: 'carol@example.com', role: 'user' },
];

let nextId = 4;  // auto-increment counter

// ─────────────────────────────────────────────
// GET /api/users
// Returns all users (supports ?role= filter)
// ─────────────────────────────────────────────
router.get('/', (req, res) => {
  let result = users;

  // Optional filter: GET /api/users?role=admin
  if (req.query.role) {
    result = users.filter(u => u.role === req.query.role);
  }

  res.json({
    count: result.length,
    users: result,
  });
});

// ─────────────────────────────────────────────
// GET /api/users/:id
// Returns one user by ID
// ─────────────────────────────────────────────
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ error: `User with id ${req.params.id} not found` });
  }

  res.json(user);
});

// ─────────────────────────────────────────────
// POST /api/users
// Creates a new user
// Body: { name, email, role }
// ─────────────────────────────────────────────
router.post('/', (req, res) => {
  const { name, email, role } = req.body;

  // Validation
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  // Check for duplicate email
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'Email already in use' });
  }

  const newUser = {
    id: nextId++,
    name,
    email,
    role: role || 'user',  // default role is 'user'
  };

  users.push(newUser);

  res.status(201).json(newUser);  // 201 = Created
});

// ─────────────────────────────────────────────
// PUT /api/users/:id
// Replaces a user's data completely
// Body: { name, email, role }
// ─────────────────────────────────────────────
router.put('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: `User with id ${req.params.id} not found` });
  }

  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  users[index] = { id: users[index].id, name, email, role: role || 'user' };

  res.json(users[index]);
});

// ─────────────────────────────────────────────
// PATCH /api/users/:id
// Updates only the fields you provide
// Body: { name?, email?, role? }
// ─────────────────────────────────────────────
router.patch('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ error: `User with id ${req.params.id} not found` });
  }

  // Merge only the fields sent in the body
  if (req.body.name)  user.name  = req.body.name;
  if (req.body.email) user.email = req.body.email;
  if (req.body.role)  user.role  = req.body.role;

  res.json(user);
});

// ─────────────────────────────────────────────
// DELETE /api/users/:id
// Removes a user
// ─────────────────────────────────────────────
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: `User with id ${req.params.id} not found` });
  }

  const deleted = users.splice(index, 1)[0];

  res.json({ message: 'User deleted', deleted });
});

module.exports = router;
