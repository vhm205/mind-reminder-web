import { FC, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * components
 */
import {
  useToast,
  Button,
  Divider,
  useColorMode,
  Checkbox,
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
import { BoxWrapper } from "@/components/box/BoxWrapper";

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

type Props = {
  note: Note;
};

const EditNote: FC<Props> = ({ note }) => {
  const { id: noteId } = useParams();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [formData, setFormdata] = useState<Record<string, string | boolean>>({
    pushNotification: note.pushNotification,
  });

  const toast = useToast();
  const editor = useCreateBlockNote({
    initialContent: JSON.parse(note.blocks),
  });
  const { colorMode } = useColorMode();

  const handleSubmit = async () => {
    const blocks = editor.document;

    try {
      setIsSubmitLoading(true);

      const response: IHttpResponse = await request.patch("/notes", {
        ...formData,
        blocks: JSON.stringify(blocks),
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

  const handlePushNotiChange = () => {
    setFormdata((prev) => ({
      ...prev,
      pushNotification: !prev.pushNotification,
    }));
  };

  return (
    <div className="flex flex-col mb-5">
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
            defaultChecked={note.pushNotification}
            onChange={handlePushNotiChange}
          >
            Push notification
          </Checkbox>
          <Button size="lg" isLoading={isSubmitLoading} onClick={handleSubmit}>
            Update
          </Button>
        </div>
      </BoxWrapper>
    </div>
  );
};

export default EditNote;
