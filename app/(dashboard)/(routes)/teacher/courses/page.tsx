import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const CoursesPage = async() => {
  const {userId}=auth()

  if(!userId){
    return redirect("/")
  }

  const courses = await db.course.findMany({
    
    where: { userId },orderBy: {createdAt: "desc"}
  })
  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses}/>
      <Link href="/teacher/create">
        <Button >New Courses</Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
