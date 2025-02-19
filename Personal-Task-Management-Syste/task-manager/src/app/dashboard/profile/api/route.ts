// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import db from "@/db";

// export async function GET(req: NextRequest) {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const user = await db.query.users.findFirst({
//     where: (u) => u.id === session.user.id,
//   });

//   return NextResponse.json(user);
// }

// export async function PUT(req: NextRequest) {
//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//   const { name } = await req.json();

//   await db.update(users).set({ name }).where((u) => u.id === session.user.id);

//   return NextResponse.json({ message: "Profile updated!" });
// }
