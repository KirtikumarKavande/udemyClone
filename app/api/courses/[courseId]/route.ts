import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import mux from "@/lib/mux-configuration";
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("unauthorized", { status: 400 });
    const incomingData = await req.json();
    const { courseId } = params;
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

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await mux.video.assets.delete(chapter.muxData.assetId);
      }
    }
   const deletedCourse= await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json("success");
  } catch (error) {
    console.log("[courseId delete]", error);
    return new NextResponse("internal server Error", { status: 500 });
  }
}
