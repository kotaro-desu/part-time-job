import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import "./App.css";
import MessageList from "./MessageList";
import InputField from "./InputField";
import MyComponent from "./MyComponent";

function App() {
  const [messages, setMessages] = useState([
    {
      content: "メッセージを選択し、送信ボタンを押してください",
      role: "assistant",
    },
  ]);

  const [currentMessage, setCurrentMessage] = useState(""); // MyComponent に渡すメッセージを格納

  const handleSend = async (text, group, prefix) => {
    console.log("Received group:", group); // group の値を確認
    console.log("Received prefix:", prefix);

    const combinedText = prefix ? `${prefix}${text}` : text;

    // ユーザーのメッセージを messages state に追加
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: combinedText, role: "user", group: group },
    ]);

    // MyComponent に渡すメッセージを更新
    setCurrentMessage({ text: text, group: group, prefix: prefix });
  };

  // MyComponent からの応答を処理するコールバック関数
  const handleGPTResponse = (assistantMessage) => {
    // GPT の応答を messages state に追加
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: assistantMessage, role: "assistant" },
    ]);
    setCurrentMessage("");
  };

  return (
    <Box className="App">
      <MessageList messages={messages} />
      <InputField onSend={handleSend} />
      <MyComponent message={currentMessage} onGPTResponse={handleGPTResponse} />
    </Box>
  );
}

export default App;
