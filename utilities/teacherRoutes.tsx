import { BarChart, List, LucideIcon } from "lucide-react";
interface route{
  icon:LucideIcon,
  label:string,
  href:string
}
const teacherRoutes:route[] = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export default teacherRoutes