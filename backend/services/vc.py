import os
import shutil
from uuid import uuid4
import torch
import torchaudio
from tortoise.api import TextToSpeech
from tortoise.utils.audio import load_voice, BUILTIN_VOICES_DIR

DIRECTORY = "voices"
PRESET = "fast"

os.makedirs(DIRECTORY, exist_ok=True)

device = "cuda" if torch.cuda.is_available() else "cpu"
tts = TextToSpeech(device=device, kv_cache=True)

def apply_vc_on_tts_file(
    text: str,
    reference_path: str,
    output_path: str,
):
    uuid = str(uuid4())
    tgt = os.path.join(BUILTIN_VOICES_DIR, uuid)
    os.makedirs(tgt, exist_ok=True)
    tgt = os.path.join(tgt, f"{uuid}.wav")
    print("Copying reference file to", tgt)
    shutil.copyfile(reference_path, tgt)
    voice_samples, latents = load_voice(uuid, [BUILTIN_VOICES_DIR])
    gen = tts.tts_with_preset(
        text,
        PRESET,
        voice_samples=voice_samples,
        conditioning_latents=latents,
    )
    torchaudio.save(output_path, gen.squeeze(0).cpu(), 22050)
    os.remove(tgt)
    
if __name__ == "__main__":
    apply_vc_on_tts_file(
        "Hello, how are you?",
        "/Users/arnavmehta/Downloads/muching.wav",
        "output.wav",
    )