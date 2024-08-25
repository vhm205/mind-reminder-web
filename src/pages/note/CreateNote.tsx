import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useToast,
  Badge,
  Button,
  Divider,
  Input,
  Checkbox,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import { AlertCustom, getRandomItem } from "@/utils";
import { request } from "@/apis/axios";
import { IHttpResponse } from "@/types/http";
import { BackIcon } from "@/components/icons";
import { BoxWrapper } from "@/components/box/BoxWrapper";

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
  const { id: topicId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>(["UNKNOWN"]);
  const [pushNotification, setPushNotification] = useState(true);
  const [title, setTitle] = useState("");

  const toast = useToast();
  const editor = useCreateBlockNote();
  const { colorMode } = useColorMode();

  const handleSubmit = async () => {
    const blocks = editor.document;
    const markdown = await editor.blocksToMarkdownLossy(blocks);
    const html = await editor.blocksToHTMLLossy(blocks);

    try {
      setIsLoading(true);

      let newTags = [...tags];

      if (tags.length > 1) {
        newTags = newTags
          .filter((tag) => tag !== "UNKNOWN" && tag)
          .map((tag) => tag.trimStart());
      }

      if (!title) {
        return AlertCustom(toast, "Please enter title", "warning");
      }

      if (!html) {
        return AlertCustom(toast, "Please enter content", "warning");
      }

      const response: IHttpResponse = await request.post("/notes", {
        topicId,
        tags: newTags,
        title,
        markdown,
        html,
        blocks: JSON.stringify(blocks),
        pushNotification,
      });

      if (response.statusCode !== 201) {
        return AlertCustom(toast, response.message, "warning");
      }

      editor.replaceBlocks(editor.document, []);
      setTags(["UNKNOWN"]);
      setTitle("");

      return AlertCustom(toast, "Create note success", "success");
    } catch (error: any) {
      return AlertCustom(toast, error.message, "error");
    } finally {
      setIsLoading(false);
    }
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
    <>
      <div className="container flex justify-center max-w-full max-h-full overflow-y-auto px-6 py-3">
        <div className="flex flex-col mb-5">
          <BoxWrapper
            width={[200, 500, 650, 800]}
            extra="flex flex-col justify-center p-6 mb-3"
          >
            <Link to={`/topic/${topicId}`} className="mb-5 flex">
              <BackIcon extra="mr-2" />
              <Text>Back</Text>
            </Link>
            <div className="text-3xl font-semibold mb-1">New note</div>
            <Divider className="mb-3" />
            <div className="mb-4">
              <Input
                placeholder="Title"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
            </div>
            <div className="mb-2">
              <BlockNoteView
                editor={editor}
                theme={colorMode}
                style={{ minHeight: 300 }}
              />
            </div>
          </BoxWrapper>
          <BoxWrapper
            width={[200, 500, 650, 800]}
            extra="flex flex-col justify-center p-6"
          >
            <div className="mb-1">
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
              <Input
                placeholder="Add tags (ex: knowledge, life)"
                onKeyUp={handleKeyUp}
              />
            </div>
            <Divider mb={3} mt={2} />
            <div className="flex justify-between">
              <Checkbox
                defaultChecked
                onChange={() => setPushNotification(!pushNotification)}
              >
                Push notification
              </Checkbox>
              <Button size="lg" isLoading={isLoading} onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </BoxWrapper>
        </div>
      </div>
    </>
  );
};

export default CreateNote;
