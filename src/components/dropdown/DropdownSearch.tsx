import { FC, InputHTMLAttributes, useState } from "react";
import debounce from "lodash.debounce";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	children: React.ReactNode;
	onSearch: (k: string) => void;
}

export const DropdownSearch: FC<Props> = ({ children, onSearch, ...props }) => {
	const [isSearching] = useState(false);

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onSearch?.(event.target.value);
	};

	return (
		<div className="relative z-10">
			<div className="h-10 bg-white flex border border-gray-200 rounded items-center">
				<input
					name="select"
					id="select"
					onChange={debounce(handleOnChange, 700)}
					className="px-4 appearance-none outline-none text-gray-800 w-full"
					defaultChecked
          {...props}
				/>
				<button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600">
					<svg
						className="w-4 h-4 mx-2 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1={18} y1={6} x2={6} y2={18} />
						<line x1={6} y1={6} x2={18} y2={18} />
					</svg>
				</button>
				<label
					htmlFor="show_more"
					className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600"
				>
					<svg
						className="w-4 h-4 mx-2 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<polyline points="18 15 12 9 6 15" />
					</svg>
				</label>
			</div>
			<input
				type="checkbox"
				name="show_more"
				id="show_more"
				className="hidden peer"
				defaultChecked={isSearching}
			/>
			<div className="absolute rounded drop-shadow-md bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200">
				{children}
			</div>
		</div>
	);
};

export const DropdownSearchItem: FC<{ id: string; name: string }> = ({
	id,
	name,
}) => {
	return (
		<div className="cursor-pointer group border-t" key={id}>
			<a className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 border-blue-600 group-hover:bg-gray-100">
				{name}
			</a>
		</div>
	);
};
