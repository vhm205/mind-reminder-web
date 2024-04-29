import { ChangeEvent, FC, MouseEvent, useState } from "react";
import {
	useToast,
	Badge,
	Button,
	Textarea,
	Divider,
	Input,
} from "@chakra-ui/react";
import debounce from "lodash.debounce";

import { AlertCustom, getRandomItem } from "@/utils";
import { request } from "@/apis/axios";
import { IHttpResponse } from "@/types/http";

const colorsScheme = [
	"green",
	"purple",
	"red",
	"blue",
	"pink",
	"orange",
	"yellow",
	"teal",
	"gray",
];

const CreateNote: FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [tags, setTags] = useState<string[]>(["UNKNOWN"]);
	const [content, setContent] = useState<string>("");

	const toast = useToast();

	const handleSubmit = async () => {
		try {
			setIsLoading(true);

			let newTags = [...tags];

			if (tags.length > 1) {
				newTags = newTags
					.filter((tag) => tag !== "UNKNOWN")
					.map((tag) => tag.trimStart());
			}

			const response: IHttpResponse = await request.post("/notes", {
				tags: newTags,
				content,
				channel: "",
			});

			if (response.statusCode !== 201) {
				return AlertCustom(toast, response.message, "warning");
			}

			setTags(["UNKNOWN"]);
			setContent("");
			return AlertCustom(toast, "Create note success", "success");
		} catch (error: any) {
			return AlertCustom(toast, error.message, "error");
		} finally {
			setIsLoading(false);
		}
	};

	const handleChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(event.target.value);
	};

	const handleKeyUp = (event: any) => {
		if (event.key === "Enter") {
			const value = event.target.value;
			const split = value.split(",");
			let newValues = [value];

			if (split.length) {
				newValues = split;
			}

			setTags((curr) => {
				newValues = newValues.filter((val) => !curr.includes(val));
				return [...curr, ...newValues];
			});
			event.target.value = "";
		}
	};

	const handleClickTag = (event: MouseEvent<HTMLElement>) => {
		const value = event.currentTarget.innerText;

		if (value === "UNKNOWN") return;

		setTags((curr) => {
			const newValues = curr.filter((val) => val !== value);
			return newValues;
		});
		event.currentTarget.remove();
	};

	return (
		<div className="container flex max-w-full max-h-full overflow-y-auto flex-col px-6 py-3">
			<div className="flex justify-center mb-5">
				<div className="flex flex-col justify-center w-2/4 card-new-note p-6">
					<div className="text-3xl font-semibold mb-1">Create new note</div>
					<Divider className="mb-3" />
					<div className="mb-4">
						<Input
							placeholder="Add tags (ex: knowledge, life)"
							onKeyUp={handleKeyUp}
						/>
						{!!tags.length &&
							tags.map((tag) => (
								<Badge
									key={tag}
									mr={2}
									colorScheme={getRandomItem(colorsScheme)}
									onClick={handleClickTag}
									className="cursor-pointer"
								>
									{tag}
								</Badge>
							))}
					</div>
					<div className="mb-2">
						<Textarea
							placeholder="Note something..."
							size="lg"
							resize="vertical"
							rows={10}
							value={content}
							onChange={handleChangeContent}
						/>
					</div>
					<div className="flex justify-end">
						<Button
							variant="primary"
							isLoading={isLoading}
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateNote;
