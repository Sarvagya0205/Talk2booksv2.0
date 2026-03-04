from langchain_openai import OpenAI , ChatOpenAI
from langchain_core.prompts import PromptTemplate
from app.services.search_service import search_books
from app.utils.text_processing import detect_lang
from app.config.settings import get_settings

settings=get_settings()
llm =ChatOpenAI(
    model=settings.OPENAI_MODEL,
    temperature=0.2,
    api_key=settings.OPENAI_API_KEY
    )
#prompt 
# lang detect 
template="""You are a helpful assistant answering questions from books.

Use ONLY the context below.
Answer in maximum 4-5 sentences.
Be concise.

Reply in same language as {text}

Context:
{context}

Question:
{question}

Answer
"""
prompt = PromptTemplate(
    template=template,
    input_variables=["context","question","text"]
)
#RAG pipline
def rag_query(question:str , book_id:str):
    results=search_books(question,top_k=5,book_id=book_id)
    language=detect_lang(question)
    context = "\n\n".join([r["text"][:500]for r in results])

    formatted_prompt=prompt.format(
        context=context,
        question=question,
        text=language
    )

    response=llm.invoke(formatted_prompt)

    return{
        "answer":response.content,
    }
