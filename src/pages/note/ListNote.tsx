import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

/**
 * components
 */
import { Button, Skeleton, Text, useToast } from "@chakra-ui/react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

/**
 * assets
 */
import { PlusIcon, BackIcon } from "@/components/icons";
import { AlertCustom } from "@/utils";
import { IHttpResponse } from "@/types/http";
import { request } from "@/apis/axios";
import { Breadcrumbs } from "@/components/breadcrumb";
import { BoxWrapper } from "@/components/box/BoxWrapper";

const ListNote: FC = () => {
  const { id: topicId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState("");
  const [notes, setNotes] = useState([]);

  const toast = useToast();

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);

      try {
        const response: IHttpResponse = await request.get(
          `/notes?topicId=${topicId}`,
        );

        if (response.statusCode !== 200) {
          return AlertCustom(toast, response.message, "warning");
        }

        const { data: notes } = response.data;
        setNotes(notes);
      } catch (error: any) {
        AlertCustom(toast, error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    topicId && fetchNotes();
  }, [refresh, topicId]);

  const handleDeleteNote = async (id: string) => {
    try {
      const response: IHttpResponse = await request.delete(`/notes?id=${id}`);

      if (response.statusCode === 204) {
        AlertCustom(toast, "Delete note successfully", "success");
        setRefresh(Date.now().toString());
      } else {
        AlertCustom(toast, response.message, "warning");
      }
    } catch (error: any) {
      AlertCustom(toast, error.message, "error");
    }
  };

  return (
    <>
      <div className="flex justify-between p-4">
        <div>
          <Link to={`/topics`} className="flex">
            <BackIcon extra="mr-2" />
            <Text fontSize="md">Back</Text>
          </Link>
        </div>
        <Breadcrumbs />
      </div>
      <div className="container flex max-w-full max-h-full overflow-y-auto flex-col px-6 py-3">
        <BoxWrapper>
          <Text fontSize="2xl" fontWeight="bold">
            Notes
          </Text>
          <Skeleton height="100vh" isLoaded={!isLoading}>
            <div className="mt-5 overflow-y-auto flex justify-center">
              <div className="flex flex-wrap justify-center">
                <Button
                  className="mr-10 mb-5"
                  variant="outline"
                  colorScheme="teal"
                  borderColor="green.500"
                  height="250px"
                  width="250px"
                  onClick={() => navigate(`/note/${topicId}/create`)}
                >
                  <PlusIcon extra="size-18" />
                </Button>
                {!!notes.length &&
                  notes.map((note: any) => (
                    <ContextMenu key={note._id}>
                      <ContextMenuTrigger>
                        <Link
                          to={`/note/${note._id}`}
                          className="bg-brand-primary text-white flex flex-col justify-between items-stretch rounded-lg size-64 p-5 mr-10 mb-10 border-solid border-5 hover:drop-shadow-lg hover:cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-102 hover:text-white duration-300"
                        >
                          <div className="mb-2">
                            <Text fontSize="xl">{note.title}</Text>
                          </div>
                          <div>
                            <hr />
                            <Text fontSize="sm" as="i" color="gray.200">
                              {dayjs(note.createdAt).format("DD/MM/YYYY HH:mm")}
                            </Text>
                          </div>
                        </Link>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem
                          className="text-red-500"
                          onClick={() => handleDeleteNote(note._id)}
                        >
                          Delete
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  ))}
              </div>
            </div>
          </Skeleton>
        </BoxWrapper>
      </div>
    </>
  );
};

export default ListNote;
