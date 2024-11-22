# TODO: Consider deleting this file
from typing import Any
from pydantic import BaseModel

class TTSPayload(BaseModel):
    text: str
    voice: str | None = None
    gender: Any | None = None
