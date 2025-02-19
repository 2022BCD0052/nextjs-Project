import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, please login!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };

    const user = await db.select().from(users).where(eq(users.id, decoded.id)).limit(1);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.user = {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed!" });
  }
};
