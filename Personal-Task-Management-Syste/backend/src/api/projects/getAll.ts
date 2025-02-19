import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db/index.js";
import { projects } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { protect } from "../../middlewares/authMiddleware";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await protect(req, res, async () => {
    const userProjects = await db.select().from(projects).where(eq(projects.userId, req.user.id));

    res.status(200).json(userProjects);
  });
}
