import io
from tempfile import NamedTemporaryFile
from fastapi import APIRouter, File,  UploadFile
from pydantic import BaseModel
from services.db import deduct_credits_by_one
from services.vc import apply_vc_on_tts_file
from fastapi.responses import StreamingResponse

router = APIRouter(prefix="/vc", tags=["vc"])


@router.get("/")
async def read_root():
    return {"message": "VC Endpoint"}


@router.get("/models")
async def get_models():
    return {"models": ["TortoiseTTS"]}


# class SynthesizeTTSRequest(BaseModel):
#     text: str
#     language: str | None = None
#     api_key: str | None = None


@router.post("/synthesize")
async def synthesize_tts(
    text: str,
    reference_file: UploadFile = File(...),
    language: str | None = None,
    api_key: str | None = None,
    
):
    print(f"Request: {text}")
    reference_file_name = reference_file.filename
    assert reference_file_name, "No reference file provided."
    with NamedTemporaryFile(suffix=".wav") as tts_file, NamedTemporaryFile(
        suffix=".wav"
    ) as temp_ref_file:
        temp_ref_file.write(reference_file.file.read())
        temp_ref_file.flush()
        apply_vc_on_tts_file(text, temp_ref_file.name, tts_file.name)
        if api_key:
            deduct_credits_by_one(api_key)
        audio_file = io.BytesIO()
        with open(tts_file.name, "rb") as f:
            audio_file.write(f.read())
        audio_file.seek(0)
        return StreamingResponse(audio_file, media_type="audio/wav")
