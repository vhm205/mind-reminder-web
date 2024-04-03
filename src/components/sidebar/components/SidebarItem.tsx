import { FC, ReactNode, useContext } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { SidebarContext } from "@/contexts";

type Props = {
	icon: ReactNode;
	text: string;
	link: string;
};

export const SidebarItem: FC<Props> = ({ icon, text, link }) => {
	const { expanded } = useContext(SidebarContext);

	return (
		<NavLink to={link}>
			{({ isActive }) => (
				<li
					className={cn(
						`
      relative flex items-center py-3 px-3 my-2
      font-medium rounded-md cursor-pointer
      transition-colors duration-50 ease-linear group`,
						{
							"bg-gradient-to-r from-slate-500 to-slate-600 text-white":
								isActive,
							"bg-gradient-to-r hover:from-slate-400 hover:to-slate-500 hover:opacity-50 text-gray-600":
								!isActive,
						}
					)}
				>
					{icon}
					<span
						className={cn("overflow-hidden transition-all text-nowrap", {
							"w-52 ml-3": expanded,
							"w-0": !expanded,
						})}
					>
						{text}
					</span>

					{!expanded && (
						<div
							className={`
          absolute left-full rounded-md px-2 py-1 ml-6 bg-slate-800 text-sm text-white
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
						>
							{text}
						</div>
					)}
				</li>
			)}
		</NavLink>
	);
};
