import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import db from "../../db/index.js";
import { users } from "../../db/schema.js";
import { generateToken } from "../../auth/jwt";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  const user = await db.select().from(users).where(eq(users.email, email));

  if (user.length === 0) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user[0].password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    id: user[0].id,
    name: user[0].name,
    email: user[0].email,
    token: generateToken(user[0].id),
  });
}
