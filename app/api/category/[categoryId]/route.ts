import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const data = await db.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("internal server Error", { status: 500 });
  }
}
