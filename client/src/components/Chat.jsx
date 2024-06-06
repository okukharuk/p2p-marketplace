import React from "react";
import { usePeerData } from "../hooks/peers";
import Message from "./Message";
import "../index.css";

const Chat = ({ id }) => {
  const currentMessage = React.useRef("");
  const inputRef = React.useRef(null);
  const [peerMessages, sendMessage] = usePeerData(id);

  const [chatMessages, setChatMessages] = React.useState([]);

  const handlePeerMessage = (message) => {
    const decoded = new TextDecoder().decode(message);
    return decoded;
  };

  const handleMessage = (text) => {
    sendMessage(text);
    setChatMessages((prev) => [...prev, { text: text, time: new Date(), isMine: true }]);

    inputRef.current.value = "";
  };

  React.useEffect(() => {
    const message = handlePeerMessage(peerMessages.at(-1));
    if (message === "") return;
    setChatMessages((prev) => [...prev, { text: message, time: new Date(), isMine: false }]);
  }, [peerMessages]);

  return (
    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "column", paddingBottom: "3rem" }}>
        {chatMessages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </div>
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          position: "sticky",
          bottom: "8px",
          outline: "0.5rem white solid",
          background: "white",
        }}
      >
        <input
          ref={inputRef}
          style={{
            width: "100%",
            paddingRight: "3rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            paddingLeft: "0.5rem",
          }}
          type="text"
          placeholder="Your message"
          aria-label="Your message"
          onChange={(e) => {
            currentMessage.current = e.target.value;
          }}
        />
        <div
          style={{
            height: "fit-content",
            position: "absolute",
            right: "1rem",
            cursor: "pointer",
            top: "0",
            bottom: "0",
            marginTop: "auto",
            marginBottom: "auto",
          }}
          onClick={() => handleMessage(currentMessage.current)}
        >
          SEND
        </div>
      </div>
    </div>
  );
};

export default Chat;
