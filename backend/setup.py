from faster_whisper import WhisperModel
import torch
from parler_tts import ParlerTTSForConditionalGeneration
from transformers import AutoTokenizer

WHISPER_MODEL = "tiny"
BATCH_SIZE = 8

device = "cuda" if torch.cuda.is_available() else "cpu"
model = WhisperModel(
    WHISPER_MODEL,
    device=device,
)
parler_model = ParlerTTSForConditionalGeneration.from_pretrained("parler-tts/parler-tts-mini-expresso").to(device)
tokenizer = AutoTokenizer.from_pretrained("parler-tts/parler-tts-mini-expresso")
        