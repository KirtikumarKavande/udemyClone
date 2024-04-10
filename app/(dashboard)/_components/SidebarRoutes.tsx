"use client";

import guestRoutes from "@/utilities/routes";
import RouteItems from "./RouteItems";

export const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {guestRoutes.map((route) => (
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
