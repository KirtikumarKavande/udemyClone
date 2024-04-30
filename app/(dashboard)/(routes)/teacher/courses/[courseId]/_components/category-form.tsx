"use client";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CategoryFormProps {
  initialData: {
    categoryId: string | null;
    id: string;
  };
  options: {
    label: string;
    value: string;
  }[];
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
import MyCombobox from "@/components/ui/combobox";

const formSchema = z.object({
  categoryId: z.string().min(1),
});
const CategoryForm = ({ initialData, options }: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [getCategory, setGetCategory] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { categoryId: initialData.categoryId || "" },
  });
  const router = useRouter();
  async function onSubmit(value: string) {
    try {
      const res = await axios.patch(`/api/courses/${initialData.id}`, {
        categoryId: value,
      });
      toast.success("category updated success");
      router.refresh();

      setIsEditing((isEditing) => !isEditing);
    } catch (error) {
      toast.error("something went wrong");
    }
  }
  useEffect(() => {
    getCategoryFromId();
  }, [initialData.categoryId]);

  async function getCategoryFromId() {
    if (!initialData.categoryId) return;
    const res = await axios.get(`/api/category/${initialData.categoryId}`);
    setGetCategory(res.data?.name);
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Category
        <Button
          variant={"ghost"}
          onClick={() => setIsEditing((isEditing) => !isEditing)}
        >
          {isEditing ? (
            <p>cancel</p>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit Category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="text-sm ">
          {getCategory || <p className="text-sm mt-1 italic">No Category</p>}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {options && (
                      <MyCombobox List={options} onSubmit={onSubmit} />
                    )}
                  </FormControl>
                  <p className="text-sm text-red-600">gets saved automatically after Edit</p>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </div>
  );
};

export default CategoryForm;
