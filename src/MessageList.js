import { Box, Grid, Avatar, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import assistantIcon from "./image/soushi.jpg";
import nonpersonaIcon from "./image/18210.jpg";

function Message({ content, role, group }, index) {
  const isUser = role === "user";
  let icon = null;
  if (role === "assistant") {
    icon = group === 1 ? assistantIcon : nonpersonaIcon; // group によってアイコンを切り替え
  }
  // （1）

  const processedContent = content
    .split(/(?<=[。])(?=\S)/)
    .map((sentence, i) => (
      <React.Fragment key={i}>
        {sentence}
        {i < content.split(/(?<=[。])(?=\S)/).length - 1 && <br />}{" "}
        {/* 最後の文以外で改行 */}
      </React.Fragment>
    ));

  return (
    <Grid
      container
      key={index}
      alignItems="center"
      sx={{
        marginBottom: "10px",
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      {/* アシスタントのメッセージの場合のみアイコンを表示 */}
      {!isUser && ( // isUserがfalse（アシスタント）の場合のみレンダリング
        <Grid item xs={0.5} display="flex" justifyContent="flex-start">
          <Avatar
            src={icon}
            alt={role + " icon"}
            sx={{ width: 40, height: 40, marginRight: 1 }}
          />
        </Grid>
      )}
      <Grid
        item
        xs={isUser ? 12 : 11.5}
        display="flex"
        justifyContent={isUser ? "flex-end" : "flex-start"}
      >
        {" "}
        {/* 幅を調整 */}
        <Typography
          variant="body1"
          className={`message ${role}`}
          sx={{ width: "fit-content", maxWidth: "80%", whiteSpace: "pre-wrap" }}
        >
          {processedContent}
        </Typography>
      </Grid>
    </Grid>
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
