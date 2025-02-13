import express from 'express';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { usersTable } from './db/schema';
import { eq } from 'drizzle-orm';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Setup PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Personal Task Management System API!');
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await db.select().from(usersTable);
  res.json(users);
});

// Create a new user
app.post('/users', async (req, res) => {
  const { name, age, email } = req.body;
  const newUser = { name, age, email };

  await db.insert(usersTable).values(newUser);
  res.json({ message: 'User created!', user: newUser });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
