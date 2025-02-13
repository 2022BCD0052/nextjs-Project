import express from 'express';
import { createUser, getUsers, updateUser, deleteUser } from './db/index.js';

const app = express();
app.use(express.json());

// Routes
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    await createUser(name, email);
    res.status(201).json({ message: 'User created!', user: { name, email } });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user', details: error });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users', details: error });
  }
});

app.put('/users/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { name } = req.body;
    await updateUser(email, name);
    res.json({ message: 'User updated!' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user', details: error });
  }
});

app.delete('/users/:email', async (req, res) => {
  try {
    const { email } = req.params;
    await deleteUser(email);
    res.json({ message: 'User deleted!' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user', details: error });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
