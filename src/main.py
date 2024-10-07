import openai
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from azure.core.credentials import AzureKeyCredential
from azure.search.documents.indexes import SearchIndexClient
from azure.search.documents import SearchClient

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
openai.base_url = ""  # Your Azure OpenAI resource's endpoint value.
openai.api_version = "2023-07-01-preview"
openai.api_key = ""

search_endpoint = ""
search_api_key = ""
index_name = "applebanana-index"
credential = AzureKeyCredential(search_api_key)

# Run an empty query (returns selected fields, all documents)
search_client = SearchClient(endpoint=search_endpoint,
                      index_name=index_name,
                      credential=credential)

def questionAiSearch(qes): 
    results =  search_client.search(query_type='simple',
        search_text=qes ,
        select='chunk',
        include_total_count=True,
        top=1)
    
    for result in results:
        #score = result["@search.score"]
        chunk = result["chunk"]

    return chunk

    

def askGPT_prefix(question,search_ans,character_info):
    response = openai.chat.completions.create(
        model="sol-gpt4-32k-token20k",
        messages=[
            {"role": "user", "content": "情報に不足なく日本語で文章を補完してください"},
            {"role": "user", "content": character_info},
            {"role":"user","content": search_ans},
            {"role": "user", "content": question},
        ]
    )
    return response.choices[0].message.content

def askGPT_nonprefix(question,search_ans):
    response = openai.chat.completions.create(
        model="sol-gpt4-32k-token20k",
        messages=[
            {"role": "user", "content": "情報に不足なく日本語で文章を補完してください"},
            {"role":"user","content":search_ans},
            {"role": "user", "content": question},
        ]
    )
    return response.choices[0].message.content

soushi = "荘司幸一郎とはどんなん人物ですか？"

@app.post("/api/gpt") 
async def gpt_response(request: Request):
    body = await request.json()
    messages = body.get("messages") 
    group = body.get("group") # group を受け取る

    if group==0:
        question=messages[0]["content"]
        message=question
    else:
        message=messages[1]["content"]
        question=messages[0]["content"]+message

    if question:
        print(f"Received question: {question}")
        print(f"Received masseges: {messages}")
        soushi_character = questionAiSearch(soushi)
        soushi_character = "次の文章は荘司幸一郎に関する情報です。" + soushi_character
        ai_search = questionAiSearch(message)
        print(ai_search)
        if group==0:
            response = askGPT_nonprefix(question,ai_search)
        else:
            response = askGPT_prefix(question,ai_search,soushi_character)
        print(f"GPT response: {response}")
        return {"message": response}
    else:
        return {"message": "質問がありません。"}

