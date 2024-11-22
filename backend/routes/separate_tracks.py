from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any

router =  APIRouter(prefix="/separate-tracks", tags=["Separate-Tracks"])

@router.get("/")
async def read_root():
    return {"message": "Separate tracks endpoint"}