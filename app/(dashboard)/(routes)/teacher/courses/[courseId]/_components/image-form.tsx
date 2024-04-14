"use client";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PencilIcon, PlusCircle } from "lucide-react";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "@uploadthing/react/styles.css";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/file-upload";

interface ImageFormProps {
  initialData: Course;
}
const formSchema = z.object({
  imageUrl: z.string().min(2, {
    message: "Image is required.",
  }),
});
const ImageForm = ({ initialData }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { imageUrl: initialData.imageUrl || "" },
  });
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.patch(`/api/courses/${initialData.id}`, values);
      toast.success("description updated success");
      router.refresh();

      setIsEditing((isEditing) => !isEditing);
    } catch (error) {
      toast.error("something went wrong");
    }
    console.log("form", values);
  }
  const { isSubmitting, isValid } = form.formState;

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button
          variant={"ghost"}
          onClick={() => setIsEditing((isEditing) => !isEditing)}
        >
          {isEditing && <p>cancel</p>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2 ">
            <Image
              alt="upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              onSubmit({ imageUrl: url || "" });
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
