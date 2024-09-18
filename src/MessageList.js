import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";

function Message({ content, role }, index) {
  // （1）
  return (
    // （2）
    <Box key={index} className={`message ${role}`}>
      {content}
    </Box>
  );
}

export default function MessageList({ messages }) {
  // （3）
  const messageListRef = useRef(null); // （4）

  useEffect(() => {
    // （5）
    if (messageListRef.current) {
      console.log("scrolling to bottom");
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    // （6）
    <Box className="message-list" ref={messageListRef}>
      {messages.map((message, index) => Message(message, index))}
    </Box>
  );
}
