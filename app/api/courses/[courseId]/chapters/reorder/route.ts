import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const { userId } = auth();

    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const isOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!isOwner) return new NextResponse("unauthorized", { status: 401 });
    const { updateData } = await req.json();
    console.log(updateData)
    for (let chapter of updateData) {
     const response= await db.chapter.update({
        data: {
          position: chapter.position,
        },
        where: {
          id: chapter.id,
        },
      });
    }
    return new NextResponse("success", { status: 200 });
  } catch (error) {
    console.log("[Reorder]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}


