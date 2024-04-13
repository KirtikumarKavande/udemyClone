import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("unauthorized", { status: 400 });
    const incomingData = await req.json();
    const { courseId } = params;
    console.log(courseId);
    await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...incomingData,
      },
    });
    return NextResponse.json("success");
  } catch (error) {
    return new NextResponse("internal server Error", { status: 500 });
  }
}
