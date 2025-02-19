import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db/index.js";
import { projects } from "../../db/schema.js";
import { protect } from "../../middlewares/authMiddleware";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await protect(req, res, async () => {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const newProject = await db.insert(projects).values({
      name,
      description,
      userId: req.user.id,
    }).returning();

    res.status(201).json(newProject[0]);
  });
}
