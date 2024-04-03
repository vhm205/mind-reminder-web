import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const THeader: FC<Props> = ({ children }) => {
  return (
    <>
      <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
    </>
  );
};
