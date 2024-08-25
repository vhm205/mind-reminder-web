import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Skeleton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";

/**
 * components
 */
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ModalCreateTopic } from "./components/ModalCreateTopic";

import { PlusIcon } from "@/components/icons";
import { AlertCustom } from "@/utils";
import type { IHttpResponse } from "@/types/http";
import { request } from "@/apis/axios";
import { Breadcrumbs } from "@/components/breadcrumb";
import { BoxWrapper } from "@/components/box/BoxWrapper";

const ListTopic: FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const uid = query.get("uid");

  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState("");
  const [topics, setTopics] = useState([]);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    uid && localStorage.setItem("uid", uid);
  }, [uid]);

  useEffect(() => {
    const fetchTopics = async () => {
      setIsLoading(true);

      try {
        const response: IHttpResponse = await request.get(`/topics`);

        if (!response || response.statusCode !== 200) {
          return AlertCustom(toast, response.message, "warning");
        }

        const { data: topics } = response.data;

        setTopics(topics);
      } catch (error: any) {
        AlertCustom(toast, error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, [refresh]);

  const onSubmit = () => setRefresh(`${Date.now()}`);

  const handleDeleteTopic = async (id: string) => {
    try {
      const response: IHttpResponse = await request.delete(
        `/topics?topicId=${id}`,
      );

      if (response.statusCode === 204) {
        AlertCustom(toast, "Delete topic successfully", "success");
        setRefresh(`${Date.now()}`);
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
          <Text fontSize="2xl" fontWeight="bold">
            Topics
          </Text>
        </div>
        <Breadcrumbs />
      </div>
      <div className="container flex max-w-full max-h-full overflow-y-auto flex-col px-6 py-3">
        <BoxWrapper>
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
                  onClick={onOpen}
                >
                  <PlusIcon />
                </Button>
                {!!topics.length &&
                  topics.map((topic: any) => (
                    <ContextMenu key={topic._id}>
                      <ContextMenuTrigger>
                        <Link
                          to={`/topic/${topic._id}`}
                          className="bg-brand-primary text-white flex flex-col justify-between items-stretch rounded-lg size-64 p-5 mr-10 mb-10 border-solid border-5 hover:drop-shadow-lg hover:cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 hover:text-white"
                        >
                          <div className="mb-2">
                            <Text fontSize="xl">{topic.title}</Text>
                          </div>
                          <div>
                            <hr />
                            <Text fontSize="sm" as="i" color="gray.200">
                              {dayjs(topic.createdAt).format(
                                "DD/MM/YYYY HH:mm",
                              )}
                            </Text>
                          </div>
                        </Link>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem
                          className="text-red-500"
                          onClick={() => handleDeleteTopic(topic._id)}
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
      <ModalCreateTopic isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} />
    </>
  );
};

export default ListTopic;
