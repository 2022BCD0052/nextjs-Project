import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { usersTable } from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool); // <-- Define `db` properly here

async function seedDatabase() {
  try {
    console.log('Seeding database...');

    // Sample users
    const users = [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
      { name: 'Charlie', email: 'charlie@example.com' },
    ];

    // Insert users
    await db.insert(usersTable).values(users);
    console.log('Users inserted successfully!');

    // Close DB connection
    await pool.end();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seed function
seedDatabase();
