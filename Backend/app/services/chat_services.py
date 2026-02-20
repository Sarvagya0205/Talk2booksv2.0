from app.db.mongo import db

def get_chat_response(question :str):
    # implement 
    # search vectors
    # call LLM
    #  fetch context
    db.chats.insert_one({
        "question":question,
        "source":"test"
    })
    
    return f"you asked: {question}"
