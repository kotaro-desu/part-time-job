// AzureOpenAI.js
import React from "react";

const API_KEY = "05f217cda07f440b980511b5b5fa3d55"; // Azure OpenAI API キー
const API_ENDPOINT =
  "https://gpt4-australia-region.openai.azure.com/openai/deployments/sol-gpt4-Australia/chat/completions?api-version=2023-07-01-preview"; // Azure OpenAI API エンドポイント

const AzureOpenAI = async (
  messages,
  model = "sol-gpt4-Australia",
  maxTokens = 150
) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        messages: messages,
        model: model,
        max_tokens: maxTokens,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Azure OpenAI API エラー:", error);
    return "エラーが発生しました。"; // エラーメッセージを返す
  }
};

export default AzureOpenAI;
