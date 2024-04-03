import { createContext } from "react";

type Props = {
	expanded: boolean;
};

export const SidebarContext = createContext<Props>({
	expanded: true,
});
