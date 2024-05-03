"use client";
import CourseSideBar from "./course-sidebar";

import { useRef, useState } from "react";
import { Menu } from "lucide-react"; 
import { Chapter, Course, UserProgress } from "@prisma/client";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseMobileSidebar = ({
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div>
        <Menu  onClick={toggleDrawer} />
      </div>

      <div
        className={` ${
          isOpen ? "translate-x-10" : "translate-x-4 "
        }   absolute h-full  border border-red-600  bg-gray-600`}
      >
        <div className={`  `}>
          <CourseSideBar course={course} progressCount={progressCount} />
        </div>
      </div>
    </div>
  );
};

export default CourseMobileSidebar;
