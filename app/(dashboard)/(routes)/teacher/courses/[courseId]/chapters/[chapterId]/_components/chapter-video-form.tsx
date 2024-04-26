"use client";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PencilIcon, PlusCircle, VideoIcon } from "lucide-react";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "@uploadthing/react/styles.css";

import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Chapter, Course, MuxData } from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/file-upload";

interface chapterVideoProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}
const formSchema = z.object({
  videoUrl: z.string().min(2),
});
const ChapterVideoForm = ({ initialData, courseId, chapterId }: chapterVideoProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("chapter updated success");
      router.refresh();

      setIsEditing((isEditing) => !isEditing);
    } catch (error) {
      toast.error("something went wrong");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button
          variant={"ghost"}
          onClick={() => setIsEditing((isEditing) => !isEditing)}
        >
          {isEditing && <p>cancel</p>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a Video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <VideoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2 ">
            video uploaded!
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              onSubmit({ videoUrl: url || "" });
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
      Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {!isEditing && initialData.videoUrl && (
        <div className="text-xs text-muted-foreground mt-2 ">Videos can take a few minutes to process. Refresh the page id video does not appear.</div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
