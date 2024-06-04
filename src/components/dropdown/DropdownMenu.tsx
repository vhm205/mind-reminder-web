import { FC } from "react";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineMenu, MdLogout } from "react-icons/md";

import { request, defaultConfig } from "@/apis/axios";

export const DropdownMenu: FC = () => {
  const handleLogout = async () => {
    try {
      const { server } = defaultConfig;
      await request.get(`${server.baseUrl}/auth/logout`);
      window.location.replace("/auth/login");
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<MdOutlineMenu />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<IoSettingsOutline />} command="⌘S">
          Profile
        </MenuItem>
        <MenuDivider />
        <MenuItem
          icon={<MdLogout />}
          onClick={handleLogout}
          command="⌘O"
          color="tw.red.500"
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
