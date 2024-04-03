import { FC } from "react";
import cn from "classnames";

type Props = {
	extra?: string;
};

export const Loader: FC<Props> = ({ extra }) => {
	return (
		<div className="grow min-h-screen flex item-centers justify-between backdrop-opacity-15 backdrop-invert bg-white/3">
			<div className={cn("loader", extra)}></div>
		</div>
	);
};
