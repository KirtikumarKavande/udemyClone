"use clients";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React from "react";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}
const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <Button
        // onClick={() => {}}
        disabled={disabled}
        variant={"outline"}
        size={"sm"}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <div >
        <Trash size={"sm"} className="h-6 w-6"/>
      </div>
    </div>
  );
};

export default ChapterActions;
