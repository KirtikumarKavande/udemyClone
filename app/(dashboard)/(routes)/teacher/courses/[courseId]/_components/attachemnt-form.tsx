"use client";
import { Button } from "@/components/ui/button";
import {
  File,
  ImageIcon,
  Loader2,
  Pencil,
  PencilIcon,
  PlusCircle,
  X,
} from "lucide-react";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "@uploadthing/react/styles.css";

import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
}
const formSchema = z.object({
  url: z.string().min(1),
});
const AttachmentForm = ({ initialData }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [delectingId, setDeletingId] = useState<string | null>("");

  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("kirtikumar", values);
      const res = await axios.post(
        `/api/courses/${initialData.id}/attachments`,
        values
      );
      toast.success("Image updated success");
      router.refresh();

      setIsEditing((isEditing) => !isEditing);
    } catch (error) {
      toast.error("something went wrong");
    }
  }
async function onDelete(id:string){
  try {
    setDeletingId(id)
    await axios.delete(`/api/courses/${initialData.id}/attachments/${id}`)
    toast.success("Attachment deleted successfully")
    router.refresh()

  } catch (error) {
    toast.error("something went wrong")
    
  }finally{
    setDeletingId(null)
  }
  console.log("id ",id)
}
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachment
        <Button
          variant={"ghost"}
          onClick={() => setIsEditing((isEditing) => !isEditing)}
        >
          {isEditing && <p>cancel</p>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an Attachment
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 italic">No Attachments Yet</p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border border-sky-200 text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0 " />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {delectingId === attachment.id && (
                    <Loader2 className="h-4 w-4 mr-2  animate-spin" />
                  )}
                  {
                    delectingId!==attachment.id &&(
                      <button onClick={()=>{onDelete(attachment.id)}}>
                        <X className="h-4 w-4"/>
                      </button>
                    )
                  }
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              onSubmit({ url: url || "" });
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything you want to add to your course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
