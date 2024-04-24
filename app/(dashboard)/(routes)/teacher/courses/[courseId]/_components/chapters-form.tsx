"use client";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusCircle } from "lucide-react";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
}

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
import { Chapter, Course } from "@prisma/client";
import ChaptersList from "./ChaptersList";

const formSchema = z.object({
  title: z.string().min(1),
});
const ChaptersForm = ({ initialData }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(
        `/api/courses/${initialData.id}/chapters`,
        values
      );
      toast.success("chapter added success");
      router.refresh();

      setIsCreating((isCreating) => !isCreating);
    } catch (error) {
      toast.error("something went wrong");
    }
    console.log("form", values);
  }
  const { isSubmitting, isValid } = form.formState;

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${initialData.id}/chapters/reorder`, {
        updateData,
      });
      toast.success("chapters reordered successfully");
      router.refresh();
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Description
        <Button
          variant={"ghost"}
          onClick={() => setIsCreating((isCreating) => !isCreating)}
        >
          {isCreating ? (
            <p>cancel</p>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Chapter
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="e.g. This course is about... "
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={!isValid || isSubmitting} type="submit">
              Save
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic "
          )}
        >
          {!initialData.chapters.length && "No Chapters"}
          <ChaptersList
            onEdit={() => {}}
            onReorder={onReorder}
            items={initialData.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and Drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ChaptersForm;
