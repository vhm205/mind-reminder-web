import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Tth: FC<Props> = ({ children }) => {
  return (
    <>
      <th
        scope="col"
        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
      >
        {children}
      </th>
    </>
  );
};
