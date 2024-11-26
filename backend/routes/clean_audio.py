
import os
import subprocess
import tempfile
from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import StreamingResponse

from services.db import deduct_credits_by_one

router = APIRouter(prefix="/clean-audio", tags=["Clean Audio"])

@router.get("/")
async def read_root():
    return {"message": "Clean Audio endpoint"}

@router.post("/process")
async def process_audio(audio_file: UploadFile = File(...), api_key: str | None = None):
    file_name = audio_file.filename
    print(f"Processing file: {file_name}")
    assert file_name, "No file name provided."
    suffix = file_name.split(".")[-1]
    with tempfile.TemporaryDirectory() as temp_dir, tempfile.NamedTemporaryFile(suffix="."+suffix) as tmpf:
        with open(tmpf.name, "wb") as f:
            f.write(audio_file.file.read())
            f.flush()
        subprocess.run(f"deepFilter {tmpf.name} --output-dir {temp_dir}", shell=True, text=True)
        files = os.listdir(temp_dir)
        print(files)
        if len(files) == 0:
            raise HTTPException(status_code=400, detail="No audio files found.")
        cleaned_file = files[0]
        cleaned_file_path = os.path.join(temp_dir, cleaned_file)
        if api_key:
            deduct_credits_by_one(api_key)
        # with  as of:
        return StreamingResponse(open(cleaned_file_path, "rb"), media_type="audio/wav")

@router.get("/models")
async def get_models():
    return {"models": ["deepfilternet"]}
