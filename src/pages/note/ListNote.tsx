import { FC, useEffect, useState } from "react";
import { Input, useToast } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { request } from "@/apis/axios";
import { IHttpResponse } from "@/types/http";
import { AlertCustom } from "@/utils";
import { Loader } from "@/components/loader";

const ListNote: FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const uid = query.get("uid");

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    uid && localStorage.setItem("uid", uid);
  }, [uid]);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const response: IHttpResponse = await request.get("/notes");

        if (response.statusCode !== 200) {
          return AlertCustom(toast, response.message, "warning");
        }

        const { data: notes } = response.data;
        console.log({ notes: response.data });

        setNotes(notes);
      } catch (error: any) {
        AlertCustom(toast, error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

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
          {!!notes.length &&
            notes.map((note: any) => (
              <div
                key={note._id}
                className="bg-brand-primary flex justify-center items-center rounded-lg size-64"
              >
                {note.content}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ListNote;
