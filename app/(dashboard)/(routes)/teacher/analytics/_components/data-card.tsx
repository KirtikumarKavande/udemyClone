import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/format";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}
const DataCard = ({ value, label, shouldFormat }: DataCardProps) => {
  return (
    <div>
      <Card>
        <CardHeader className=" flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{label}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {shouldFormat ? formatPrice(value) : value}
          </div>
        </CardContent>
      
      </Card>
    </div>
  );
};

export default DataCard;
