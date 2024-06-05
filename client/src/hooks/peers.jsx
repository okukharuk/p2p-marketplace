import React, { useContext } from "react";
import Peer from "simple-peer";
import { useSocketControl } from "./socket";
import RootContext from "./context";
import { useNewWindow } from "./newWindow";
import Chat from "../components/Chat";
import { toast } from "react-toastify";

const peers = new Map();

const usePeer = () => {
  const { socket } = useSocketControl();
  const { openNewWindow } = useNewWindow();

  const savePeer = (peer, sendRoomId) => {
    peers.set(sendRoomId, peer);
  };

  const initPeer = ({ id, data, isInitiator }) => {
    const peer = new Peer({ initiator: !!isInitiator, trickle: false });
    savePeer(peer, id);
    data ? handleAccept(id, data) : handleOffer(id);
  };

  const handleOffer = (id) => {
    console.log(peers, id);
    const peer = peers.get(id);
    console.log(peer);

    peer.on("signal", (data) => {
      console.log(1);
      console.log("SIGNAL", JSON.stringify(data));
      socket.emit("offer", { user_id: id, data: JSON.stringify(data) });
    });
  };

  const handleAccept = (id, data, isInitiator) => {
    const peer = peers.get(id);
    console.log(data, id, data);

    peer.on("signal", (data) => {
      console.log("SIGNAL", data);
      !isInitiator && socket.emit("accept", { user_id: id, data: JSON.stringify(data) });
    });

    peer.on("connect", () => {
      openNewWindow(<Chat id={id} />);
    });

    peer.on("close", () => {
      toast.error("Connection is closed");
    });

    peer.on("error", (err) => {
      toast.error(err?.data?.message || err.error);
    });

    peer.signal(JSON.parse(data));
  };

  return { savePeer, peers, peerControls: { handleOffer, handleAccept, initPeer } };
};

const usePeerData = (id) => {
  const [messages, setMessages] = React.useState([]);
  console.log(peers);
  const peer = React.useMemo(() => peers.get(id), [peers.get(id)]);

  React.useEffect(() => {
    if (!peer) return;
    peer.on("data", (data) => {
      setMessages((prev) => [...prev, data]);
      console.log("message", data);
    });
  }, []);

  return messages;
};

export { usePeer, usePeerData };
