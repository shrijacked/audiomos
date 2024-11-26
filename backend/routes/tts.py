from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from services.db import deduct_credits_by_one
from services.tts import get_supported_models_and_metadata, run_tts
import io

router = APIRouter(prefix="/tts", tags=["Text-to-Speech"])

@router.get("/")
async def read_root():
    return {"message": "TTS endpoint"}

@router.get("/models")
async def get_models():
    return get_supported_models_and_metadata()

class SynthesizeTTSRequest(BaseModel):
    model_name: str
    text: str
    language: str
    emotion: str | None = None
    speaker: str | None = None
    
    api_key: str | None = None

@router.post("/synthesize")
async def synthesize_tts(request: SynthesizeTTSRequest):
    print(f"Request: {request}")
    output_path = "output.wav"
    try:
        run_tts(
            model_name=request.model_name,
            text=request.text,
            output_path=output_path,
            language=request.language,
            emotion=request.emotion,
            speaker=request.speaker
        )
        if request.api_key:
            deduct_credits_by_one(request.api_key)
        audio_file = io.BytesIO()
        with open(output_path, "rb") as f:
            audio_file.write(f.read())
        audio_file.seek(0)
        return StreamingResponse(audio_file, media_type="audio/wav")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
