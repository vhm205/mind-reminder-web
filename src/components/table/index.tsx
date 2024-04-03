import { FC, ReactNode } from "react";
import { TPaginate } from "./components/TPaginate";

type Props = {
  children: ReactNode;
  totalRecord: number
};

export const Table: FC<Props> = ({ children, totalRecord }) => {
  return (
    <>
      <section className="container mx-auto px-4">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  {children}
                </table>
              </div>
            </div>
          </div>
        </div>

        <TPaginate totalRecord={totalRecord} />
      </section>
    </>
  );
};
