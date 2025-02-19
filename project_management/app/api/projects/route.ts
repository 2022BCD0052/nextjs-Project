import { NextResponse } from "next/server"
import { db } from "@/db"
import { projects, insertProjectSchema } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

export async function GET(req: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = Number.parseInt(session.user.id)
  const allProjects = await db.select().from(projects).where(eq(projects.userId, userId))
  return NextResponse.json(allProjects)
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = Number.parseInt(session.user.id)
  const body = await req.json()
  const validatedData = insertProjectSchema.parse({ ...body, userId })

  const newProject = await db.insert(projects).values(validatedData).returning()
  return NextResponse.json(newProject[0])
}

