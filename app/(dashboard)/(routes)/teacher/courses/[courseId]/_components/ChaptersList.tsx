"use client";
import { Chapter } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { cn } from "@/lib/utils";
interface chapterListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; postion: number }[]) => void;
  onEdit: (id: string) => void;
}

const ChaptersList = ({ items, onReorder, onEdit }: chapterListProps) => {
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setChapters(items);
  }, [items]);
  return <div>ChaptersList</div>;
};

export default ChaptersList;
