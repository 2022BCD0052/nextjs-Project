import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db/index.js";
import { tasks } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { protect } from "../../middlewares/authMiddleware";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await protect(req, res, async () => {
    const { taskId } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    await db.delete(tasks).where(eq(tasks.id, taskId));

    res.status(200).json({ message: "Task deleted successfully" });
  });
}
