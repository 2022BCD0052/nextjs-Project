import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { projects, tasks, users } from "./schema";
import db from "./index.js";

async function seedDatabase() {
  // Hash password
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create a test user
  await db.insert(users).values([
    { name: "Admin", email: "admin@example.com", password: hashedPassword, role: "admin", isVerified: true },
    { name: "User", email: "user@example.com", password: hashedPassword, role: "user", isVerified: true },
  ]);

  // Create a test project
  await db.insert(projects).values([
    { name: "Project Alpha", description: "First project", userId: 1 },
  ]);

  // Create tasks
  await db.insert(tasks).values([
    { title: "Task 1", description: "Complete documentation", priority: "high", status: "pending", userId: 1, projectId: 1 },
    { title: "Task 2", description: "Fix bugs", priority: "medium", status: "in-progress", userId: 2, projectId: 1 },
  ]);

  console.log("Database seeded successfully!");
}

seedDatabase();
