// InputField.js
import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import presetButtonsData from "./preset_buttons.json";

export default function InputField({ onSend }) {
  const [text, setText] = useState("");
  const [selectedButton, setSelectedButton] = useState(null); // 選択されたボタンを管理する state
  const [presetButtons, setPressButtons] = useState([]);

  useEffect(() => {
    setPressButtons(presetButtonsData);
  }, []);

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
      prefix =
        "あなたは荘司幸一郎です。小学生の私にもわかるように説明してください。";
    }

    const fullMessage = `${prefix}
    ${message}`;
    setText(fullMessage);
    setSelectedButton(`${group}-${message}`); // ボタンを選択したときに state を更新
  };

  const renderPresetButtons = (group) => {
    return presetButtons
      .filter((button) => button.group === group)
      .map((button, index) => (
        <Button
          key={index}
          variant="outlined"
          onClick={() => handlePresetMessage(button.message, button.group)}
          className={`preset-button ${
            selectedButton === `${button.group}-${button.message}`
              ? "selected"
              : ""
          }`}
        >
          {button.label}
        </Button>
      ));
  };

  return (
    <Box className="input-container-wrapper">
      <Box className="input-container">
        <Box className="preset-group">
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              paddingLeft: "16px",
              marginTop: "-10px",
              marginBottom: "-15px",
            }}
          >
            <p>荘司さんの人格なし</p>
          </Typography>
          <Box
            className="preset-buttons"
            style={{ display: "flex", fexWrap: "wrap" }}
          >
            {renderPresetButtons(0)}
          </Box>
        </Box>
        <Box className="preset-group">
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              paddingLeft: "16px",
              marginTop: "-10px",
              marginBottom: "-15px",
            }}
          >
            <p>荘司さんの人格あり（ペルソナ）</p>
          </Typography>
          <Box
            className="preset-buttons"
            style={{ display: "flex", flexWap: "wrap" }}
          >
            {renderPresetButtons(1)}
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
