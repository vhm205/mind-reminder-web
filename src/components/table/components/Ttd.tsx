import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Ttd: FC<Props> = ({ children }) => {
  return (
    <>
      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">
        {children}
      </td>
    </>
  );
};
