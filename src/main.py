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
openai.base_url = ""
openai.api_version = "" 
openai.api_key = "" 

# Set Credentials
search_endpoint = ""
search_api_key = ""
index_name = ""
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

    

def askGPT(question,search_ans):
    response = openai.chat.completions.create(
        model="sol-gpt4-32k-token20k",
        messages=[
            {"role": "system", "content": "小学生の私でもわかるように説明してください。"},
            {"role": "user", "content": "情報に不足なく日本語で文章を補完してください"},
            {"role":"user","content":search_ans},
            {"role": "user", "content": question},
        ]
    )
    return response.choices[0].message.content

@app.post("/api/gpt") 
async def gpt_response(request: Request):
    body = await request.json()
    question = body.get("message") 

    if question:
        print(f"Received question: {question}")
        ai_search = questionAiSearch(question)
        response = askGPT(question,ai_search)
        print(f"GPT response: {response}")
        return {"message": response}
    else:
        return {"message": "質問がありません。"}
