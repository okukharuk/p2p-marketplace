import React from "react";

const Message = (props) => {
  const { text, time, isMine } = props;

  const label = isMine ? "You" : "Peer";
  const style = isMine ? { marginRight: "auto" } : { marginLeft: "auto" };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        wordBreak: "break-all",
        maxWidth: "48%",
        ...style,
      }}
    >
      <div style={style}>{label}</div>
      <div>{text}</div>
    </div>
  );
};

export default Message;
