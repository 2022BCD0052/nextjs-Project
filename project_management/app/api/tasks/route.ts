import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { db } from "@/src/db"
import { tasks } from "@/src/db/schema"

export async function GET() {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  console.log("Session:", session)

  const userId = parseInt(session.user.id)
  const allTasks = await db.select().from(tasks).where(eq(tasks.userId, userId))

  console.log("Retrieved tasks:", allTasks)

  return NextResponse.json(allTasks)
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = parseInt(session.user.id)
  const body = await req.json()
  const newTask = await db.insert(tasks).values({ title: body.title, userId }).returning()

  return NextResponse.json(newTask[0])
}
