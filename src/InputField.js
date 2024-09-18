// InputField.js
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

export default function InputField({ onSend }) {
  const [text, setText] = useState("");
  const [selectedButton, setSelectedButton] = useState(null); // 選択されたボタンを管理する state

  const handleSendClick = () => {
    if (text.trim() !== "") {
      onSend(text);
      setText("");
      setSelectedButton(null); // 送信後に選択状態を解除
    }
  };

  const handlePresetMessage = (message, group) => {
    // group パラメータを追加
    let prefix = "";
    if (group === 0) {
      prefix = "";
    } else if (group === 1) {
      prefix = "あなたは荘司幸一郎です。";
    } else if (group === 2) {
      prefix = "あなたは荘司幸一郎の様に振舞ってください。";
    }
    const fullMessage = `${prefix}${message}`;
    setText(fullMessage);
    setSelectedButton(`${group}-${message}`); // ボタンを選択したときに state を更新
  };

  return (
    <Box className="input-container-wrapper">
      <Box className="input-container">
        <Box className="preset-group">
          <Typography variant="subtitle1" gutterBottom>
            <p>ノーペルソナ</p>
          </Typography>
          <Box className="preset-buttons">
            <Button
              variant="outlined"
              onClick={() =>
                handlePresetMessage("アップルバナナついて教えてください。", 0)
              }
              className={`preset-button ${
                selectedButton === "0-アップルバナナついて教えてください。"
                  ? "selected"
                  : ""
              }`}
            >
              アップルバナナ
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                handlePresetMessage(
                  "マルエスファームについて教えてください。",
                  0
                )
              }
              className={`preset-button ${
                selectedButton === "0-マルエスファームについて教えてください。"
                  ? "selected"
                  : ""
              }`}
            >
              マルエスファーム
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                handlePresetMessage(
                  "アップルバナナの美味しい食べ方について教えてください。",
                  0
                )
              }
              className={`preset-button ${
                selectedButton ===
                "0-アップルバナナの美味しい食べ方について教えてください。"
                  ? "selected"
                  : ""
              }`}
            >
              アップルバナナの美味しい食べ方
            </Button>
          </Box>
        </Box>
        <Box className="preset-group">
          <Typography variant="subtitle1" gutterBottom>
            <p>オーディエンスペルソナパターン</p>
          </Typography>
          <Box className="preset-buttons">
            <Button
              variant="outlined"
              onClick={() =>
                handlePresetMessage("アップルバナナついて教えてください。", 1)
              }
              className={`preset-button ${
                selectedButton === "1-アップルバナナついて教えてください。"
                  ? "selected"
                  : ""
              }`}
            >
              アップルバナナ
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                handlePresetMessage(
                  "マルエスファームについて教えてください。",
                  1
                )
              }
              className={`preset-button ${
                selectedButton === "1-マルエスファームについて教えてください。"
                  ? "selected"
                  : ""
              }`}
            >
              マルエスファーム
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                handlePresetMessage("キッチンカーについて教えてください。", 1)
              }
              className={`preset-button ${
                selectedButton === "1-キッチンカーについて教えてください。"
                  ? "selected"
                  : ""
              }`}
            >
              キッチンカー
            </Button>
          </Box>
        </Box>
        <Box className="preset-group">
          <Typography variant="subtitle1" gutterBottom>
            <p>ペルソナパターン</p>
          </Typography>
          <Box className="preset-buttons">
            <Button
              variant="outlined"
              onClick={() =>
                handlePresetMessage(
                  "アップルバナナの美味しい食べ方を教えてください。",
                  2
                )
              }
              className={`preset-button ${
                selectedButton ===
                "2-アップルバナナの美味しい食べ方を教えてください。"
                  ? "selected"
                  : ""
              }`}
            >
              アップルバナナの美味しい食べ方
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                handlePresetMessage(
                  "マルエスファームではアップルバナナ以外に何を栽培していますか？",
                  2
                )
              }
              className={`preset-button ${
                selectedButton ===
                "2-マルエスファームではアップルバナナ以外に何を栽培していますか？"
                  ? "selected"
                  : ""
              }`}
            >
              マルエスファームで栽培しているもの
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                handlePresetMessage(
                  "台風の多い沖縄ではどのような備えをしますか？",
                  2
                )
              }
              className={`preset-button ${
                selectedButton ===
                "2-台風の多い沖縄ではどのような備えをしますか？"
                  ? "selected"
                  : ""
              }`}
            >
              台風の備え
            </Button>
          </Box>
        </Box>
      </Box>
      <Button
        className="send-button"
        variant="contained"
        onClick={handleSendClick}
      >
        送信
      </Button>
    </Box>
  );
}
