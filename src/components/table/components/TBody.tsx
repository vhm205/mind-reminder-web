import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const TBody: FC<Props> = ({ children }) => {
  return (
    <>
      <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
        {children}
      </tbody>
    </>
  );
};
