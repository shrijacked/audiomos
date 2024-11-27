from faster_whisper import WhisperModel, BatchedInferencePipeline
import torch

BATCH_SIZE = 8

device = "cuda" if torch.cuda.is_available() else "cpu"
model_medium = WhisperModel(
    "medium",
    device=device,
    compute_type="float16" if device == "cuda" else "default",
)
print(device)

batched_model_medium = BatchedInferencePipeline(model_medium)

def transcribe_audio(audio_file_path, **kwargs):
    segments, _ = batched_model_medium.transcribe(audio_file_path, batch_size=BATCH_SIZE, **kwargs)
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
