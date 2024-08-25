import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { MdAddBox } from "react-icons/md";
import { GrIntegration, GrMemory } from "react-icons/gr";

import { Sidebar } from "@/components/sidebar";
import { SidebarItem } from "@/components/sidebar/components/SidebarItem";
import { DropdownMenu } from "@/components/dropdown/DropdownMenu";
import { Loader } from "@/components/loader";
import { ToggleColorMode } from "@/components/button/ToggleColorMode";
import { PopupNotification } from "@/components/notification/PopupNotification";
import { InputSearch } from "@/components/inputs/InputSearch";

export const UserLayout: FC = () => {
  return (
    <main className="flex w-screen">
      <Sidebar>
        <SidebarItem
          icon={<MdAddBox size={26} />}
          text="New Topic"
          link="/topics"
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
          <Box boxShadow="md" className="flex justify-between p-4 min-w-max">
            <div className="w-2/3">
              <InputSearch />
            </div>
            <div>
              <PopupNotification extra="mr-2" />
              <ToggleColorMode extra="mr-2" />
              <DropdownMenu />
            </div>
          </Box>
          <Outlet />
        </div>
      </Suspense>
    </main>
  );
};
