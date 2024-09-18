import React, { useState } from "react";
import { Box } from "@mui/material";
import "./App.css";
import MessageList from "./MessageList";
import InputField from "./InputField";
import AzureOpenAI from "./AzureOpenAI";

function App() {
  const [messages, setMessages] = useState([
    {
      content: "メッセージを選択し、送信ボタンを押してください",
      role: "assistant",
    },
  ]); // （1）

  const handleSend = async (text) => {
    // （2）
    // メッセージを追加する
    setMessages((prevMessages) => [
      // （3）
      ...prevMessages,
      { content: text, role: "user" },
    ]);

    const assistantMessage = await AzureOpenAI([
      ...messages,
      { content: text, role: "user" },
    ]);

    // メッセージを追加する
    setMessages((prevMessages) => [
      // （5）
      ...prevMessages,
      { content: assistantMessage, role: "assistant" },
    ]);
  };

  return (
    // （6）
    <Box className="App">
      <MessageList messages={messages} />
      <InputField onSend={handleSend} />
    </Box>
  );
}

export default App;
