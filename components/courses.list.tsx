import { Category, Course } from "@prisma/client";
import React from "react";
type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  progress: number | null;
  chapters: { id: string }[];
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}
const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      {items.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
    </div>
  );
};

export default CoursesList;
