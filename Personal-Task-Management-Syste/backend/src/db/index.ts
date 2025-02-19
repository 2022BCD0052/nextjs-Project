import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from "dotenv";
import * as schema from "../db/schema"; // If using TypeScript

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this is in .env
});

const db = drizzle(pool, { schema });

export { db, schema };
