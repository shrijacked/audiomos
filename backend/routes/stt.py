from tempfile import NamedTemporaryFile
from fastapi import FastAPI, APIRouter, File, HTTPException, UploadFile
from pydantic import BaseModel
from typing import Dict, Any
from services.db import deduct_credits_by_one
from services.stt import transcribe_audio

router =  APIRouter(prefix="/stt", tags=["Speech-to-Text"])

@router.get("/")
async def read_root():
    return {"message": "STT endpoint"}

# TODO: See if we can add a few more model choices here
@router.post("/transcribe")
async def transcribe(audio_file: UploadFile = File(...), language: str = "en", api_key: str | None = None):
    file_name = audio_file.filename
    print(f"File name: {file_name}")
    assert file_name, "No file name provided."
    suffix = file_name.split(".")[-1]
    with NamedTemporaryFile(suffix=suffix) as temp_file:
        temp_file.write(audio_file.file.read())
        temp_file.flush()
        output = {"transcription": transcribe_audio(temp_file.name, language=language)}
        if api_key:
            deduct_credits_by_one(api_key)
        return output

@router.get("/models")
async def get_models():
    return {"models": ["whisper-medium", "whisper-tiny"]}