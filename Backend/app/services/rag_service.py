from langchain_openai import OpenAI , ChatOpenAI
from langchain_core.prompts import PromptTemplate
from app.services.search_service import search_books
from dotenv import load_dotenv
import os
load_dotenv()

llm =ChatOpenAI(model="gpt-5",temperature=0.2 ,max_completion_tokens=200)
#prompt 
template="""You are a helpful assistant answering questions from books.

Use ONLY the context below.
Answer in maximum 4-5 sentences.
Be concise.

Context:
{context}

Question:
{question}

Answer
    """
prompt = PromptTemplate(
    template=template,
    input_variables=["context","question"]
)
#RAG pipline
def rag_query(question:str):
    results=search_books(question,top_k=5)

    context = "\n\n".join([r["text"][:500]for r in results])

    formatted_prompt=prompt.format(
        context=context,
        question=question
    )

    response=llm.invoke(formatted_prompt)

    return{
        "answer":response.content,
        "sources":results
    }
