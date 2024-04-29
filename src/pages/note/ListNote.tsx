import { FC, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const ListNote: FC = () => {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const uid = query.get("uid");

	useEffect(() => {
		uid && localStorage.setItem("uid", uid);
	}, [uid]);

	return (
		<div className="container flex max-w-full max-h-full overflow-y-auto flex-col px-6 py-3">
			<div className="flex justify-center mb-5">
				<Input
					variant="filled"
					w="50rem"
					autoFocus
					placeholder="Search anything..."
				/>
			</div>

			<div className="mt-5 overflow-y-auto justify-center flex">
				<div className="grid grid-cols-3 gap-8 justify-items-center w-3/4 text-white text-xl">
					<div className="bg-brand-primary flex justify-center items-center rounded-lg size-64">
						01
					</div>
					<div className="bg-brand-primary flex justify-center items-center rounded-lg size-64">
						01
					</div>
					<div className="bg-brand-primary flex justify-center items-center rounded-lg size-64">
						01
					</div>
					<div className="bg-brand-primary flex justify-center items-center rounded-lg size-64">
						01
					</div>
					<div className="bg-brand-primary flex justify-center items-center rounded-lg size-64">
						01
					</div>
					<div className="bg-brand-primary flex justify-center items-center rounded-lg size-64">
						01
					</div>
					<div className="bg-brand-primary flex justify-center items-center rounded-lg size-64">
						01
					</div>
					<div className="bg-brand-primary flex justify-center items-center rounded-lg size-64">
						01
					</div>
					<div className="bg-brand-primary flex justify-center items-center rounded-lg size-64">
						01
					</div>
					<div className="bg-brand-primary flex justify-center items-center rounded-lg size-64">
						01
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListNote;
