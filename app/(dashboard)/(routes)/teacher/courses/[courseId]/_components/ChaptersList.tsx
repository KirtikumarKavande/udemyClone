"use client";
import { Chapter } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Badge, Grip, Pencil } from "lucide-react";
interface chapterListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

const ChaptersList = ({ items, onReorder, onEdit }: chapterListProps) => {
  const [chapters, setChapters] = useState(items);
  useEffect(() => {
    setChapters(items);
  }, [items]);
  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;
    const items = Array.from(chapters);
    const [draggedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, draggedItem);
    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter, index) => ({
      id: chapter.id,
      position:
        items.length - (items.findIndex((item) => item.id === chapter.id) + 1),
    }));

    onReorder(bulkUpdateData);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="chapters">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {chapters.map(({ id, title, isPublished, isFree }, index) => (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      className={cn(
                        "flex items-center  gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm"
                      )}
                    >
                      <div
                        className={cn(
                          "flex  w-full justify-between px-2 py-3 border-r-slate-200 hover:bg-slate-300 rounded-l-md transition"
                        )}
                      >
                        <div>
                          <Grip className="h-5 w-5" />
                        </div>

                        <div> {title}</div>
                        <div>
                          {isFree && (
                            <div className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs">
                              Free
                            </div>
                          )}
                        </div>
                        <div className=" pr-2 px-2 py-1 bg-black text-white rounded-full text-xs  gap-x-2">
                          {isPublished ? "Published" : "Draft"}
                        </div>
                        <Pencil
                          onClick={() => onEdit(id)}
                          className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ChaptersList;
