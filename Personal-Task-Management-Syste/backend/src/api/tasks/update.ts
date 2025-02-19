import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db/index.js";
import { tasks } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { protect } from "../../middlewares/authMiddleware";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await protect(req, res, async () => {
    const { taskId, title, description, dueDate, priority, status } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const updatedTask = await db.update(tasks).set({
      title,
      description,
      dueDate,
      priority,
      status,
    }).where(eq(tasks.id, taskId)).returning();

    res.status(200).json(updatedTask[0]);
  });
}
