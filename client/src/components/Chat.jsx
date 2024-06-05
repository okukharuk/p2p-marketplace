import React from "react";
import { usePeerData } from "../hooks/peers";
import Message from "./Message";
import { Button, Form, InputGroup } from "react-bootstrap";

const Chat = ({ id }) => {
  const currentMessage = React.useRef("");
  const [yourMessages, setYourMessages] = React.useState([]);

  const peerMessages = usePeerData(id);

  const [chatMessages, setChatMessages] = React.useState([]);

  const handlePeerMessage = (message) => {
    return new TextDecoder().decode(message);
  };

  const handleMessage = (text) => {
    setChatMessages((prev) => [...prev, { text: text, time: new Date(), isMine: true }]);
    console.log(currentMessage.current);
    currentMessage.current = "";
  };

  React.useEffect(() => {
    const message = handlePeerMessage(peerMessages[-1]);
    console.log(message);
    setChatMessages((prev) => [...prev, { text: message, time: new Date(), isMine: false }]);
  }, [peerMessages]);

  return (
    <div>
      <div className="flex flex-col">
        {chatMessages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </div>
      <InputGroup className="mt-auto">
        <Form.Control
          placeholder="Your message"
          aria-label="Your message"
          onChange={(e) => {
            currentMessage.current = e.target.value;
          }}
        />
        <Button onClick={() => handleMessage(currentMessage.current)}>Send</Button>
      </InputGroup>
    </div>
  );
};

export default Chat;
