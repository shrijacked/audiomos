from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import routes
import routes.clean_audio
import routes.vc
import routes.stt
import routes.apis
import routes.tts

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes.vc.router)
app.include_router(routes.stt.router)
app.include_router(routes.tts.router)
app.include_router(routes.clean_audio.router)
app.include_router(routes.apis.router)
app.include_router(routes.vc.router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)