"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
}
const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
}: CourseProgressButtonProps) => {
    const Icon=isCompleted?XCircle:CheckCircle
  return <Button
  className="w-full md:w-auto"
  type="button"
  variant={isCompleted ? "outline" : "success"}
  >
    {
        isCompleted?"Not completed":"Mark as complete"
        
    }
    <Icon className="w-4 h-4 ml-2" />
  </Button>;
};

export default CourseProgressButton;
