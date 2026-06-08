const express = require('express');
const usersRouter = require('./routes/users');
const logger = require('./middleware/logger');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());   // parse JSON request bodies
app.use(logger);           // log every request

// Routes
app.use('/api/users', usersRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the REST API!', version: '1.0.0' });
});

// 404 handler (must be last)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Try: GET http://localhost:3000/api/users');
});
