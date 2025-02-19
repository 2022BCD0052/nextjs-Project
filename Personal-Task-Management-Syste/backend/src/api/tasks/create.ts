import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db/index.js";
import { tasks } from "../../db/schema.js";
import { protect } from "../../middlewares/authMiddleware";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await protect(req, res, async () => {
    const { title, description, dueDate, priority, projectId } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ message: "Title and due date are required" });
    }

    const newTask = await db.insert(tasks).values({
      title,
      description,
      dueDate,
      priority,
      projectId,
      userId: req.user.id,
      status: "pending",
    }).returning();

    res.status(201).json(newTask[0]);
  });
}
