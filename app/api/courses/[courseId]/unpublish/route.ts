import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
    });
    if (!course) return new NextResponse("course not found", { status: 404 });

    const unPublishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unPublishedCourse);
  } catch (error) {
    console.log("[courseId unPublish]", error);
    return new NextResponse("internal server Error", { status: 500 });
  }
}
