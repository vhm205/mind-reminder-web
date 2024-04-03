import { FC, useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import cn from "classnames";

import brand from "@/assets/img/m2t-logo-transparent.png";
import avatar from "@/assets/img/vhm-brand.png";

import { SidebarContext } from "@/contexts"

type Props = {
  children: React.ReactNode
}

export const Sidebar: FC<Props> = ({ children }) => {
	const [expanded, setExpanded] = useState(true);

	return (
		<aside className="h-screen">
			<nav className="h-full flex flex-col border-r shadow-sm bg-slate-800 text-white">
				<div className="p-4 pb-2 flex justify-between items-center">
					<img
						src={brand}
						alt="Brand"
						className={cn("overflow-hidden transition-all", {
							"w-0": !expanded,
							"w-52": expanded,
						})}
					/>
					<button
						className="p-1.5 outline-none rounded-lg bg-transparent"
						onClick={() => setExpanded((curr) => !curr)}
					>
						<MdOutlineMenu size={26} />
					</button>
				</div>

				<SidebarContext.Provider value={{ expanded }}>
					<ul className="flex-1 px-3">{children}</ul>
				</SidebarContext.Provider>

				<div className="border-t border-slate-700 flex p-3">
					<img src={avatar} alt="user" className="w-10 h-10 object-cover rounded-md" />
					<div
						className={cn(
							"flex justify-between items-center overflow-hidden transition-all",
							{
								"w-52 ml-3": expanded,
								"w-0": !expanded,
							}
						)}
					>
						<div className="leading-4">
							<h4 className="font-semibold">Vũ Huỳnh Minh</h4>
							<span className="text-xs text-gray-300">
								minhvh.tech@gmail.com
							</span>
						</div>
					</div>
				</div>
			</nav>
		</aside>
	);
};
