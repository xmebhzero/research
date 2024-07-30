from fastapi import FastAPI, Request
from pydantic import BaseModel

app = FastAPI()

class Message(BaseModel):
  message: str

@app.post("/http")
async def chatbot_response(msg: Message):
  response_message = f"Chatbot AI received your message: {msg.message}"
  return {"message": response_message}

if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="0.0.0.0", port=5000)