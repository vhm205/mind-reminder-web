import { ChangeEvent, FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

/**
 * components
 */
import { useToast, Text, useColorMode, Badge } from "@chakra-ui/react";
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
import EditNote from "./EditNote";
import { InputEditable } from "@/components/editable/InputEditable";

interface Note {
  id: string;
  title: string;
  blocks: string;
  status: string;
  pushNotification: boolean;
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
  const [note, setNote] = useState<Note | null>(null);
  const [editMode, setEditMode] = useState(false);

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

  const toggleEditModeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setEditMode(checked);
  };

  const handleUpdateTitle = async (newTitle: string) => {
    try {
      const response: IHttpResponse = await request.patch("/notes", {
        title: newTitle,
        noteId,
      });

      if (response.statusCode !== 200) {
        return AlertCustom(toast, response.message, "warning");
      }

      return AlertCustom(toast, "Update title success", "success");
    } catch (error: any) {
      return AlertCustom(toast, error.message, "error");
    }
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
          <div className="flex justify-between">
            <Link to={`/topic/${note.topic._id}`} className="mb-5 flex">
              <BackIcon extra="mr-2" />
              <Text>Back</Text>
            </Link>
            <label className="label cursor-pointer">
              <span className="label-text mr-2">Edit mode</span>
              <input
                type="checkbox"
                className="toggle toggle-md"
                onChange={toggleEditModeChange}
              />
            </label>
          </div>
          <div className="mb-1">
            <InputEditable
              content={note.title}
              approve={handleUpdateTitle}
              props={{
                fontWeight: "semibold",
                fontSize: "2xl",
              }}
            />
          </div>
          <div className="hidden">
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
        </BoxWrapper>
        {editMode ? (
          <EditNote note={note} />
        ) : (
          <BoxWrapper
            width={[200, 500, 650, 800]}
            className="flex flex-col justify-center p-6"
          >
            <BlockNoteView
              editor={editor}
              theme={colorMode}
              style={{ minHeight: 300 }}
              editable={editMode}
            />
          </BoxWrapper>
        )}
      </div>
    </div>
  );
};

export default DetailNote;
