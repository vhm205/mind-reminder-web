import { createContext } from "react";

type Props = {
  refresh: string;
};

export const RefreshContext = createContext<Props>({
  refresh: "",
});
