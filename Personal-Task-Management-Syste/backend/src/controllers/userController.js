import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { users } from "../db/schema.js";
import db from "../db/index.mjs";

export const getUsers = async (req, res) => {
  const result = await db.select().from(users);
  res.json(result);
};

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await db
    .insert(users)
    .values({ name, email, password: hashedPassword, role, isVerified: true });
  res.json({ message: "User created successfully" });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  await db.update(users).set(data).where(eq(users.id, id));
  res.json({ message: "User updated successfully" });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await db.delete(users).where(eq(users.id, id));
  res.json({ message: "User deleted successfully" });
};
