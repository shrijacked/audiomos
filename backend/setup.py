from faster_whisper import WhisperModel
import torch
from parler_tts import ParlerTTSForConditionalGeneration
from transformers import AutoTokenizer
from tortoise.api import TextToSpeech
print("imports done")

WHISPER_MODEL = "medium"
BATCH_SIZE = 8

device = "cuda" if torch.cuda.is_available() else "cpu"
model = WhisperModel(
    WHISPER_MODEL,
    device=device,
)
print("whisper downloaded")
parler_model = ParlerTTSForConditionalGeneration.from_pretrained("parler-tts/parler-tts-mini-expresso").to(device)
tokenizer = AutoTokenizer.from_pretrained("parler-tts/parler-tts-mini-expresso")
print("parler downloaded")
tts = TextToSpeech(device=device, kv_cache=True)
print("tortoise downloaded")
