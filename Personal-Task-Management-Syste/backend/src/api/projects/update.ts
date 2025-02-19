import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db/index.js";
import { projects } from "../../db/schema.js";
import { protect } from "../../middlewares/authMiddleware";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await protect(req, res, async () => {
    const { projectId, name, description } = req.body;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const updatedProject = await db.update(projects).set({
      name,
      description,
    }).where(eq(projects.id, projectId)).returning();

    res.status(200).json(updatedProject[0]);
  });
}
