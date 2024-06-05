import React from "react";

const Message = (props) => {
  console.log(props);
  const { text, time, isMine } = props;
  console.log(text, time, isMine);
  const style = isMine ? "mr-auto" : "ml-auto";

  return <div className={`flex ${style}`}>{text}</div>;
};

export default Message;
