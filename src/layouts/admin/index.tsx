import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/sidebar";
import { SidebarItem } from "@/components/sidebar/components/SidebarItem";

import { MdAddBox, MdFormatListBulleted, MdDeleteSweep } from "react-icons/md";

export const AdminLayout: FC = () => {
  return (
    <main className="flex w-screen">
      <Sidebar>
        <SidebarItem
          icon={<MdAddBox size={26} />}
          text="New Product"
          link="/create"
        />
        <SidebarItem
          icon={<MdFormatListBulleted size={26} />}
          text="Products"
          link="/list"
        />
        <SidebarItem
          icon={<MdDeleteSweep size={26} />}
          text="Recently Deleted"
          link="/recently-deleted"
        />
      </Sidebar>

      <div className="flex min-h-screen grow flex-col">
        <Outlet />
      </div>
    </main>
  );
};
