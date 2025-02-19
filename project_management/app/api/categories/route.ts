import { NextResponse } from "next/server"
import { db } from "@/db"
import { categories, insertCategorySchema } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

export async function GET(req: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = Number.parseInt(session.user.id)
  const allCategories = await db.select().from(categories).where(eq(categories.userId, userId))
  return NextResponse.json(allCategories)
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = Number.parseInt(session.user.id)
  const body = await req.json()
  const validatedData = insertCategorySchema.parse({ ...body, userId })

  const newCategory = await db.insert(categories).values(validatedData).returning()
  return NextResponse.json(newCategory[0])
}

