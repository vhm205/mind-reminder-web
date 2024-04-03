import { FC } from "react";

type Props = {
  totalRecord: number,
}

export const TPaginate: FC<Props> = ({ totalRecord }) => {
	return (
		<div className="flex justify-between mt-6">
			<div>
				<span className="mr-2">Showing </span>
				<select className="select select-bordered w-20 max-w-xs">
					<option selected>10</option>
					<option>50</option>
					<option>100</option>
				</select>
				<span className="ml-2"> of {totalRecord} entries </span>
			</div>
			<div className="flex items-center justify-end">
				<a
					href="#"
					className="flex mr-2 items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="h-5 w-5 rtl:-scale-x-100"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
						/>
					</svg>
					<span>previous</span>
				</a>
				<a
					href="#"
					className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
				>
					<span>Next</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="h-5 w-5 rtl:-scale-x-100"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
						/>
					</svg>
				</a>
			</div>
		</div>
	);
};
