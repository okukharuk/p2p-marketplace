import React from "react";
import { useSelector } from "react-redux";
import openSocket from "socket.io-client";

import { usePeer } from "./peers";

const socket = openSocket("localhost:5001", {
  transports: ["websocket", "xhr-polling"],
  origins: "*:*",
});

const useSocket = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { peerControls } = usePeer();

  const [status, setStatus] = React.useState(null);

  React.useEffect(() => {
    socket.on("connect", () => {
      setStatus("connect");
    });
    socket.on("disconnect", () => {
      setStatus("disconnect");
    });
    socket.on("error", () => {
      setStatus("error");
    });
    socket.on("reconnect", () => {
      setStatus("reconnect");
    });

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      if (userInfo) {
        socket.off(userInfo._id);
        socket.emit("user_out", userInfo._id || 0);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  React.useEffect(() => {
    if (userInfo && status === "connect") {
      socket.emit("user", userInfo._id);
      socket.on(userInfo._id, (data) => {
        switch (data.type) {
          case "offer": {
            const { data: connectionData, user } = data;
            peerControls.initPeer({ id: user, data: connectionData });
            break;
          }
          case "accept": {
            const { data: connectionData, user } = data;
            peerControls.handleAccept(user, connectionData, true);
          }
        }
      });

      return () => {
        socket.off(userInfo._id);
        socket.emit("user_out", userInfo._id || 0);
      };
    }
  }, [userInfo, status]);

  React.useEffect(() => {
    if (status !== "connect") socket.connect();
  }, [status]);

  return socket;
};

const useSocketControl = () => {
  return { socket };
};

export { useSocket, useSocketControl };
