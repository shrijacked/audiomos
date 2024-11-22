from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
import routes
import routes.separate_tracks
import routes.stt
import routes.tts

app = FastAPI()

app.include_router(routes.separate_tracks.router)
app.include_router(routes.stt.router)
app.include_router(routes.tts.router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)