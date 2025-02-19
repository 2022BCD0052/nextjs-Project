import express from "express";
import dotenv from "dotenv";
import { db, schema } from "./db/index.ts"; // Import Drizzle DB

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// \u2705 Fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await db.select().from(schema.users);
    res.json(users);
  } catch (error) {
    console.error("\u274c Error fetching users:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

// \u2705 Fetch all projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await db.select().from(schema.projects);
    res.json(projects);
  } catch (error) {
    console.error("\u274c Error fetching projects:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

// \u2705 Fetch all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await db.select().from(schema.tasks);
    res.json(tasks);
  } catch (error) {
    console.error("\u274c Error fetching tasks:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

// \u2705 Start server
app.listen(port, () => {
  console.log(`\U0001f680 Server is running on http://localhost:${port}`);
});
