"use client";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import React from "react";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}
const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
  return (
    <div>
      <Button  className="w-full md:w-auto">Enroll for {formatPrice(price)}</Button>
    </div>
  );
};

export default CourseEnrollButton;
