import { ChangeEvent, FC, useEffect, useState } from "react";
import { Badge, Input, Skeleton, Text, useToast } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { request } from "@/apis/axios";
import { IHttpResponse } from "@/types/http";
import { AlertCustom } from "@/utils";
import debounce from "lodash.debounce";
import dayjs from "dayjs";

const ListNote: FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const uid = query.get("uid");

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    uid && localStorage.setItem("uid", uid);
  }, [uid]);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);

      try {
        const response: IHttpResponse = await request.get(
          `/notes?keyword=${keyword}`,
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

    fetchNotes();
  }, [keyword]);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
  };

  return (
    <div className="container flex max-w-full max-h-full overflow-y-auto flex-col px-6 py-3">
      <div className="flex justify-center mb-5">
        <Input
          variant="filled"
          w="50rem"
          autoFocus
          placeholder="Search anything..."
          onChange={debounce(onSearch, 700)}
        />
      </div>

      <Skeleton isLoaded={!isLoading}>
        <div className="mt-5 overflow-y-auto justify-center flex">
          <div className="grid grid-cols-3 gap-8 justify-items-center w-3/4 text-white text-xl">
            {!!notes.length &&
              notes.map((note: any) => (
                <div
                  key={note._id}
                  className="bg-brand-primary flex flex-col justify-between items-stretch rounded-lg size-64 p-5"
                >
                  <div className="mb-2">{note.content.slice(0, 100)}...</div>
                  <div className=" ">
                    <div className="mb-2">
                      {!!note.tags.length &&
                        note.tags.map((tag: string) => (
                          <Badge mr={2} fontSize="0.5em">
                            {tag}
                          </Badge>
                        ))}
                    </div>
                    <hr />
                    <Text fontSize="md">
                      {dayjs(note.createdAt).format("DD/MM/YYYY HH:mm")}
                    </Text>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default ListNote;
