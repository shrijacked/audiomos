from faster_whisper import WhisperModel, BatchedInferencePipeline
import torch

WHISPER_MODEL = "small"
BATCH_SIZE = 8

device = "cuda" if torch.cuda.is_available() else "cpu"
model = WhisperModel(
    WHISPER_MODEL,
    device=device,
    compute_type="float16" if device == "cuda" else "default",
)
batched_model = BatchedInferencePipeline(model)

def transcribe_audio(audio_file_path, **kwargs):
    segments, _ = batched_model.transcribe(audio_file_path, batch_size=BATCH_SIZE, **kwargs)
    segments = list(segments)
    segments = [
        {
            "start": float(s.start),
            "end": float(s.end),
            "text": s.text,
        }
        for s in segments
    ]
    return segments
