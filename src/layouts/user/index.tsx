import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { MdAddBox, MdFormatListBulleted } from "react-icons/md";
import { GrIntegration, GrMemory } from "react-icons/gr";

import { Sidebar } from "@/components/sidebar";
import { SidebarItem } from "@/components/sidebar/components/SidebarItem";
import { DropdownMenu } from "@/components/dropdown/DropdownMenu";
import { Loader } from "@/components/loader";

export const UserLayout: FC = () => {
  return (
    <main className="flex w-screen">
      <Sidebar>
        <SidebarItem
          icon={<MdAddBox size={26} />}
          text="New Note"
          link="/notes/create"
        />
        <SidebarItem
          icon={<MdFormatListBulleted size={26} />}
          text="Notes"
          link="/notes"
          end={true}
        />
        <SidebarItem
          icon={<GrIntegration size={26} />}
          text="Channels"
          link="/channels"
        />
        <SidebarItem
          icon={<GrMemory size={26} />}
          text="Memory Card"
          link="/memory-card"
        />
      </Sidebar>

      <Suspense fallback={<Loader />}>
        <div className="flex max-h-screen grow flex-col">
          <div className="flex justify-end p-4">
            <DropdownMenu />
          </div>
          <Outlet />
        </div>
      </Suspense>
    </main>
  );
};
