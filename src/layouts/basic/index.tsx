import { FC } from "react";
import { Outlet } from "react-router-dom";

export const BasicLayout: FC = () => {
	return (
		<main className="flex w-screen">
			<div className="flex min-h-screen grow flex-col">
				<Outlet />
			</div>
		</main>
	);
};
