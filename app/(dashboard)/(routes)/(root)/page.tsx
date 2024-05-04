import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
import GetDashboardCourses from "@/actions/get-dashboard-courses";
import CoursesList from "@/components/courses.list";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const { completedCourses, coursesInProgress } = await GetDashboardCourses(
    userId
  );
  console.log("completed courses", completedCourses);
  console.log("coursesInProgress", coursesInProgress);
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>{/* TODO:INFO CARD */}</div>
        <div>{/* TODO:INFO CARD */}</div>
      </div>

      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
