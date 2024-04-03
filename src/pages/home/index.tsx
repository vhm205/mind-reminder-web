import { FC } from "react";

export const HomePage: FC = () => {
	return (
		<div className="grow min-h-screen bg-gray-100 flex flex-col items-center justify-center">
			<div className="container mx-auto max-w-md p-8 bg-white rounded-lg shadow-md">
				<h1 className="text-3xl font-bold text-center mb-6">Welcome!</h1>
				<p className="text-gray-600 text-center mb-8">
					This is your starting point. Build something great!
				</p>
			</div>
		</div>
	);
};
