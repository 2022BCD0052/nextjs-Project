import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import db from "../../db/index.js";
import { users } from "../../db/schema.js";
import { generateToken } from "../../auth/jwt";
import { eq } from "drizzle-orm"; // Replace "drizzle-orm" with the actual module name

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, password } = req.body;

  const existingUser = await db.select().from(users).where(eq(users.email, email));

  if (existingUser.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
    isVerified: false,
  }).returning();

  res.status(201).json({
    id: newUser[0].id,
    name: newUser[0].name,
    email: newUser[0].email,
    token: generateToken(newUser[0].id),
  });
}
