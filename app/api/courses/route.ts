import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title } = await req.json();
    const course = await db.course.create({
      data: { title, userId },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[courses]",error,)
    return new NextResponse("internal Server Error",{status:500})
  }
}
