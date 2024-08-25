import { FC, useState, useEffect } from "react";
import TelegramLoginButton from "telegram-login-button";
import { useToast } from "@chakra-ui/react";
import { FaFacebookMessenger, FaTelegramPlane } from "react-icons/fa";
import { request, defaultConfig } from "@/apis/axios";
import type { IHttpResponse } from "@/types/http";
import { AlertCustom, getUID } from "@/utils";
import cn from "classnames";

interface ChannelSupport {
  telegram: boolean;
  messenger: boolean;
}

interface Channel {
  name: string;
  type: string;
  status: string;
}

const ListChannel: FC = () => {
  const toast = useToast();
  const uid = getUID();

  const [channelsSupport, setChannelsSupport] = useState<ChannelSupport>({
    telegram: false,
    messenger: false,
  });

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response: IHttpResponse = await request.get("/channels");

        if (response.statusCode !== 200) {
          return AlertCustom(toast, response.message, "warning");
        }

        const { data: channels } = response.data;
        const channelsConnected: ChannelSupport = { ...channelsSupport };

        channels.map((channel: Channel) => {
          channelsConnected[channel.type as keyof ChannelSupport] = true;
        });

        setChannelsSupport(channelsConnected);
      } catch (error: any) {
        return AlertCustom(toast, error.message, "error");
      }
    };

    fetchChannels();
  }, []);

  const handleConnectMessenger = () => {
    toast({
      title: "Tính năng đang phát triển",
      status: "info",
      duration: 1000,
      isClosable: true,
    });
  };

  return (
    <div className="container flex max-w-full max-h-full overflow-y-auto flex-col px-6 py-3">
      <div className="mt-5 overflow-y-auto justify-center flex">
        <div className="grid grid-cols-3 gap-8 justify-items-center w-3/4 text-white text-xl">
          <div className="bg-telegram-200 flex justify-center items-center rounded-lg size-64">
            {channelsSupport.telegram ? (
              <button
                disabled
                className="btn-social bg-telegram-100 cursor-not-allowed"
              >
                <FaTelegramPlane className="btn-icon-social" />
                <span>Telegram Connected</span>
              </button>
            ) : (
              <TelegramLoginButton
                botName={import.meta.env.VITE_TELEGRAM_BOT}
                dataAuthUrl={`${defaultConfig.server.baseUrl}/auth/telegram?uid=${uid}`}
              />
            )}
          </div>
          <div className="bg-messenger-200 flex justify-center items-center rounded-lg size-64">
            <button
              className={cn("btn-social bg-messenger-100 cursor-pointer", {
                "cursor-not-allowed": channelsSupport.messenger,
              })}
              onClick={handleConnectMessenger}
              disabled={channelsSupport.messenger}
            >
              <FaFacebookMessenger className="btn-icon-social" />
              {channelsSupport.messenger ? (
                <span>Messenger Connected</span>
              ) : (
                <span>Connect Messenger</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListChannel;
