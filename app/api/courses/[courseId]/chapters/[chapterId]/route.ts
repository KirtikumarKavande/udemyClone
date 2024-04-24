import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = await auth();
    console.log("userId", userId);
    const {isPublished,...values} = await req.json();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });

   console.log(params.courseId)
    const isOwner = await db.course.findUnique({
      where: {
        id:params.courseId,
        userId,
      },
    });
    if (!isOwner) return new NextResponse("unauthorized", { status: 401 });

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });
//tod handle video upload
    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[course chapter id]", error);
    return new NextResponse("internal server Error", { status: 500 });
  }
}
