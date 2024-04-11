"use client";

import guestRoutes from "@/utilities/guestroutes";
import RouteItems from "./RouteItems";
import { usePathname } from "next/navigation";
import teacherRoutes from "@/utilities/teacherRoutes";
export const SidebarRoutes = () => {
  const pathName=usePathname()
const isTeacherRoutes=pathName.includes('/teacher')
console.log("isTeacherRoute",isTeacherRoutes)
let currentPath=isTeacherRoutes?teacherRoutes:guestRoutes
  return (
    <div className="flex flex-col w-full">
      {currentPath.map((route) => (
        <RouteItems
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
