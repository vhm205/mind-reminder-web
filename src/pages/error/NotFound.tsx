import { Link } from "react-router-dom";

export const NotFound = () => {
	return (
		<div className="grow min-h-screen flex flex-col items-center justify-center bg-gray-100">
			<h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
			<p className="text-lg text-gray-600 mb-8">
				Oops! The page you're looking for doesn't seem to exist.
			</p>
			<Link
				to="/"
				className="bg-blue-500 hover:opacity-80 hover:text-white text-white font-medium py-2 px-4 rounded transition-all"
			>
				Go Back Home
			</Link>
		</div>
	);
};
