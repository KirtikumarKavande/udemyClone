"use client";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}
const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      alert("copy this card number for payment 4000003560000008")
      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Something went wrong with your purchase");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Button
        className="w-full md:w-auto"
        onClick={onClick}
        disabled={isLoading}
      >

        Enroll for {formatPrice(price)}
      </Button>
    </div>
  );
};

export default CourseEnrollButton;
