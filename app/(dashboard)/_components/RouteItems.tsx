import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const RouteItems = ({
  icon: Icon,
  ...props
}: {
  icon: LucideIcon;
  label: string;
  href: string;
}) => {
  const pathName = usePathname();

  const isPathActive =
    props.href === pathName || pathName?.startsWith(`${props.href}/`);
  return (
    <Link
      className={cn(
        `flex items-center h-16 gap-4 justify-start pl-6 text-slate-500 text-sm font-[500] transition-all hover:text-sky-600 hover:bg-slate-300/20 ${
          isPathActive
            ? "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
            : ""
        } `
      )}
      href={props.href}
    >
      <div className="flex items-center ">
        <Icon />
      </div>
      <div>{props.label}</div>
      <div className={cn( " ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",isPathActive?"opacity-100 ":"")}/>
    </Link>
  );
};

export default RouteItems;
