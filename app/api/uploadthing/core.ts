import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId };
};
export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      return {success:"true" };
    }),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      return {success:"true" };

    }),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
        return {success:"true" };

    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
