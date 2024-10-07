// InputField.js
import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Grid, Avatar } from "@mui/material";
import Select from "react-select";
import presetButtonsData from "./preset_buttons.json";
import noPersonalityIcon from "./image/18210.jpg"; // 画像をインポート
import personaImage from "./image/soushi.jpg";

export default function InputField({ onSend }) {
  const [text, setText] = useState("");
  const [selectedPersonality, setSelectedPersonality] = useState(null); // 初期値をnullに
  const [presetButtons, setPressButtons] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAudiencePersona, setSelectedAudiencePersona] = useState(null);

  useEffect(() => {
    setPressButtons(presetButtonsData);
  }, []);

  const personalityOptions = [
    { value: 0, label: "荘司さんの人格なし", icon: noPersonalityIcon },
    { value: 1, label: "荘司さんの人格あり（ペルソナ）", icon: personaImage },
  ];

  const audiencePersona = [
    {
      value: 0,
      label: "小学生に説明してください",
      prefix: "小学生にもわかるように説明してください。",
    }, // prefixを追加
    {
      value: 1,
      label: "社会人に説明してください",
      prefix: "社会人にもわかるように説明してください。",
    },
  ];

  const questionOptions = presetButtonsData.map((button, index) => ({
    ...button, // 既存のプロパティを引き継ぐ
    value: index, // 番号をvalueとして追加
    label: `${index + 1}. ${button.label}`, // 番号付きのラベルを作成
  }));

  const handleSendClick = () => {
    if (selectedQuestion) {
      // selectedQuestionが選択されている場合のみ送信
      const selectedGroup = selectedPersonality
        ? selectedPersonality.value
        : null;
      let prefix = "";
      if (selectedGroup === 1) {
        prefix = "あなたは荘司幸一郎です。";
      }

      onSend(text, selectedGroup, prefix);
      setSelectedPersonality(null);
      setSelectedQuestion(null);
      setSelectedAudiencePersona(null);
      setText("");
    }
  };

  const handlePersonalityChange = (selectedOption) => {
    setSelectedPersonality(selectedOption);
    setText("");
  };

  const renderPresetButtons = (group) => {
    return presetButtons
      .filter((button) => button.group === group)
      .map((button, index) => (
        <Button
          key={index}
          variant="outlined"
          onClick={() => setText(button.message)}
        >
          {button.label}
        </Button>
      ));
  };

  const handleQuestionChange = (selectedOption) => {
    setSelectedQuestion(selectedOption);
    setText(selectedOption.message);
  };

  const getPersonalityIcon = () => {
    // アイコンを取得する関数を定義
    if (!selectedPersonality) return null; // 未選択の場合は null を返す
    return selectedPersonality.value === 0 ? noPersonalityIcon : personaImage;
  };

  const handleAudiencePersonaChange = (selectedOption) => {
    setSelectedAudiencePersona(selectedOption);

    // テキストボックスの先頭にprefixを追加
    if (selectedOption) {
      setText(selectedOption.prefix + text);
    } else {
      // 選択が解除された場合、prefixを削除
      audiencePersona.forEach((persona) => {
        if (text.startsWith(persona.prefix)) {
          setText(text.slice(persona.prefix.length));
        }
      });
    }
  };

  return (
    <Box className="input-container-wrapper">
      <Grid container spacing={2} justifyContent="center">
        {" "}
        {/* 外側のGrid container */}
        <Grid item xs={12} md={10}>
          {" "}
          {/* 人格セレクト */}
          <Box display="flex" alignItems="center">
            {" "}
            {/* アイコン */}
            <Avatar
              src={getPersonalityIcon()}
              alt="Selected Personality Icon"
              sx={{ width: 56, height: 56, marginRight: 1 }}
            />
            <Select
              value={selectedPersonality}
              onChange={handlePersonalityChange}
              options={personalityOptions}
              placeholder="人格を選択してください"
              className="personality-select"
            />
            <Select
              value={selectedQuestion}
              onChange={handleQuestionChange}
              options={questionOptions}
              placeholder="質問を選択してください"
              className="question-select"
            />
            <Select
              value={selectedAudiencePersona}
              onChange={handleAudiencePersonaChange}
              options={audiencePersona}
              placeholder="聞き手の種類を選択してください"
              className="audience-select"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          {" "}
          {/* テキストボックスと送信ボタン */}
          <Box className="textarea-and-button-wrapper">
            <textarea
              id="story"
              name="story"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              className="send-button"
              variant="contained"
              onClick={handleSendClick}
            >
              送信
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
