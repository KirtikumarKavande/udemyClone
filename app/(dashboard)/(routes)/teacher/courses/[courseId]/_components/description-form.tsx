"use client";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface DescriptionFormProps {
  initialData: {
    description: string | null;
    id: string;
  };
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

const formSchema = z.object({
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
});
const DescriptionForm = ({ initialData }: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: initialData.description || "" },
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
  }
  const { isSubmitting, isValid } = form.formState;

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Description
        <Button
          variant={"ghost"}
          onClick={() => setIsEditing((isEditing) => !isEditing)}
        >
          {isEditing ? (
            <p>cancel</p>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit Description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="text-sm ">
          {initialData?.description || <p className="text-sm mt-1 italic">No Description</p>}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
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
    </div>
  );
};

export default DescriptionForm;
