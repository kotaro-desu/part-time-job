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
      const selectedGroup = selectedButton
        ? parseInt(selectedButton.split("-")[0])
        : null;

      let prefix = "";
      if (selectedGroup === 1) {
        prefix = "あなたは荘司幸一郎です。";
      }

      onSend(text, selectedGroup, prefix);

      setText("");
      setSelectedButton(null);
    }
  };

  const handlePresetMessage = (message, group) => {
    setText(message); // prefix 無しのメッセージのみを格納
    setSelectedButton(`${group}-${message}`);
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
