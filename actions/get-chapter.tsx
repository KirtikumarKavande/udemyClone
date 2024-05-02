interface getChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

import { db } from "@/lib/db";
import {
  Attachment,
  Chapter,
  Course,
  MuxData,
  Purchases,
  UserProgress,
} from "@prisma/client";
import React from "react";

interface ChapterData {
  chapter: Chapter | null;
  course: Course | null;
  muxData: MuxData | null; // Adjust the type accordingly
  attachments: Attachment[] | null; // Define the Attachment type
  nextChapter: Chapter | null; // Define the Chapter type
  userProgress: UserProgress | null; // Adjust the type accordingly
  purchase: Purchases | null; // Adjust the type accordingly
}

const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: getChapterProps): Promise<ChapterData> => {
  try {
    const purchase = await db.purchases.findUnique({
      where: { userId_courseId: { userId: userId, courseId: courseId } },
    });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error("chapter or course not found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }
    if (chapter.isFree || purchase) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId,
        },
      });
      nextChapter = await db.chapter.findFirst({
        where: {
          position: {
            gt: chapter?.position,
          },
          courseId,
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      });
    }
    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });
    return {
      chapter,
      course,

      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (error) {
    console.log("[GET_CHAPTER]", error);

    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};

export default getChapter;
