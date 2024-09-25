import requests
import json
import os
import openai
import re
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS設定
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_type = "azure"
openai.base_url = "https://gpt4-australia-region.openai.azure.com/openai/deployments/sol-gpt4-Australia/chat/completions?api-version=2023-07-01-preview"  # Your Azure OpenAI resource's endpoint value.
openai.api_version = "2023-07-01-preview" 
openai.api_key = "05f217cda07f440b980511b5b5fa3d55" 

def askGPT(prefecture, city, cropGroup, question):
    response = openai.chat.completions.create(
        model="sol-gpt4-32k-token20k",
        messages=[
            {"role": "system", "content": "数値の情報は必須です"},
            {"role": "assistant", "content": prefecture + "の" + city + "に住んでいる"},
            {"role": "assistant", "content": cropGroup + "を育てようとしている"},
            {"role": "user", "content": "情報に不足なく日本語で文章を補完してください"},
            {"role": "user", "content": question},
        ]
    )
    return response.choices[0].message.content

# 利用者情報 (必要に応じて変更)
prefecture = "沖縄県"
city = "那覇市"
cropGroup = "トマト"

@app.post("/api/gpt") 
async def gpt_response(request: Request):
    body = await request.json()
    question = body.get("message") 

    if question:
        print(f"Received question: {question}")
        response = askGPT(prefecture, city, cropGroup, question)
        print(f"GPT response: {response}")
        return {"message": response}
    else:
        return {"message": "質問がありません。"}