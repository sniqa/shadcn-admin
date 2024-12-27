import { useEffect } from "react";
import { socket } from "@/lib/socket";

const SocketProvider = () => {
  useEffect(() => {
    function onConnect() {
      console.log("connect");
    }

    function onDisconnect() {
      console.log("disconnect");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return <></>;
};

export default SocketProvider;
