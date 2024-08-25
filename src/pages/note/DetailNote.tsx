import { ChangeEvent, FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import debounce from "lodash.debounce";

/**
 * components
 */
import {
  useToast,
  Button,
  Divider,
  Text,
  useColorMode,
  Checkbox,
  Input,
  Badge,
} from "@chakra-ui/react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

/**
 * assets
 */
import { AlertCustom, getRandomItem } from "@/utils";
import { request } from "@/apis/axios";
import { IHttpResponse } from "@/types/http";
import { BackIcon } from "@/components/icons";
import { BoxWrapper } from "@/components/box/BoxWrapper";
import { Loader } from "@/components/loader";

interface Note {
  id: string;
  title: string;
  blocks: string;
  status: string;
  tags: string[];
  createdAt: string;
  topic: {
    _id: string;
    title: string;
  };
}

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

const DetailNote: FC = () => {
  const { id: noteId } = useParams();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [note, setNote] = useState<Note | null>(null);
  const [pushNotification, setPushNotification] = useState(true);
  const [formData, setFormdata] = useState<Record<string, string>>({
    title: "",
  });

  const toast = useToast();
  const editor = useCreateBlockNote();
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response: IHttpResponse = await request.get(`/notes/${noteId}`);

        if (response.statusCode !== 200) {
          return AlertCustom(toast, response.message, "warning");
        }

        setNote(response.data);
      } catch (error: any) {
        return AlertCustom(toast, error.message, "error");
      }
    };

    noteId && fetchNote();
  }, [noteId]);

  useEffect(() => {
    if (!note || !note.blocks) return;
    editor.replaceBlocks(editor.document, JSON.parse(note.blocks));
  }, [note]);

  const handleSubmit = async () => {
    const blocks = editor.document;

    try {
      setIsSubmitLoading(true);

      // const [{ id: block1 }, { id: block2 }, { id: block3 }] = blocks;
      // const newBlocks = [
      //   { id: block1, content: JSON.stringify(docs) },
      //   { id: block2, content: markdown },
      //   { id: block3, content: html },
      // ];

      const response: IHttpResponse = await request.patch("/notes", {
        ...formData,
        content: JSON.stringify(blocks),
        noteId,
      });

      if (response.statusCode !== 200) {
        return AlertCustom(toast, response.message, "warning");
      }

      return AlertCustom(toast, "Update note success", "success");
    } catch (error: any) {
      return AlertCustom(toast, error.message, "error");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!note) {
    return <Loader />;
  }

  return (
    <div className="container flex justify-center max-w-full max-h-full overflow-y-auto px-6 py-3">
      <div className="flex flex-col mb-5">
        <BoxWrapper
          width={[200, 500, 650, 800]}
          className="flex flex-col justify-center p-6 mb-3"
        >
          <Link to={`/topic/${note.topic._id}`} className="mb-5 flex">
            <BackIcon extra="mr-2" />
            <Text>Back</Text>
          </Link>
          <div className="mb-1">
            <Input
              size="lg"
              name="title"
              placeholder="Title"
              defaultValue={note.title}
              onChange={debounce(handleFormChange, 500)}
            />
          </div>
        </BoxWrapper>
        <BoxWrapper
          width={[200, 500, 650, 800]}
          className="flex flex-col justify-center p-6"
        >
          <div className="mb-2">
            <BlockNoteView
              editor={editor}
              theme={colorMode}
              style={{ minHeight: 300 }}
            />
          </div>
          <div>
            <Divider mb={2} />
            {!!note.tags.length &&
              note.tags.map((tag) => (
                <Badge
                  key={tag}
                  mr={2}
                  colorScheme={getRandomItem(colorsScheme)}
                  className="cursor-pointer"
                >
                  {tag}
                </Badge>
              ))}
          </div>
          <div className="flex justify-between">
            <Checkbox
              defaultChecked
              onChange={() => setPushNotification(!pushNotification)}
            >
              Push notification
            </Checkbox>
            <Button
              size="lg"
              isLoading={isSubmitLoading}
              onClick={handleSubmit}
            >
              Update
            </Button>
          </div>
        </BoxWrapper>
      </div>
    </div>
  );
};

export default DetailNote;
