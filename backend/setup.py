import subprocess

process = subprocess.Popen(
    ["python", "-m", "unidic", "download"],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True,
)

# Live show the logs in terminal
for line in iter(process.stdout.readline, ''):
    print(line, end='')

for line in iter(process.stderr.readline, ''):
    print(line, end='')

process.stdout.close()
process.stderr.close()
process.wait()


from faster_whisper import WhisperModel, BatchedInferencePipeline
import torch

WHISPER_MODEL = "small"
BATCH_SIZE = 8

model = WhisperModel(
    WHISPER_MODEL,
    device="cuda" if torch.cuda.is_available() else "cpu",
    compute_type="float16",
)