import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db/index.js";
import { projects } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { protect } from "../../middlewares/authMiddleware";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await protect(req, res, async () => {
    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    await db.delete(projects).where(eq(projects.id, projectId));

    res.status(200).json({ message: "Project deleted successfully" });
  });
}
