import React, { useState, useEffect } from "react";
import axios from "axios";

function MyComponent({ message, onGPTResponse }) {
  const [data, setData] = useState("");

  useEffect(() => {
    console.log("Received message:", message);
    if (message) {
      // message が存在する場合のみリクエストを送信
      axios
        .post("http://localhost:8000/api/gpt", { message: message }) // POST リクエストに変更
        .then((response) => {
          onGPTResponse(response.data.message);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [message, onGPTResponse]);
}

export default MyComponent;
