
# Dockerfile for GPUs
FROM nvidia/cuda:12.1.1-runtime-ubuntu22.04

RUN apt-get update && \
    apt-get install -y python3-pip python3-dev python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

ENV DEBIAN_FRONTEND noninteractive

# Install Rust and Cargo
RUN apt-get update && apt-get install -y curl && \
    curl https://sh.rustup.rs -sSf | sh -s -- -y


ENV PATH="/root/.cargo/bin:${PATH}"
RUN pip install tokenizers

WORKDIR /app
RUN pip install unidic
RUN python -m unidic download

COPY requirements.txt .
RUN cat requirements.txt | sed -e '/^\s*#.*$/d' -e '/^\s*$/d' | xargs -n 1 python -m pip install || true
RUN pip install --upgrade transformers

RUN apt-get install -y libsndfile1 ffmpeg
RUN apt-get install git -y
RUN pip install git+https://github.com/huggingface/parler-tts.git

COPY setup.py .
RUN python3 -c "from parler_tts import ParlerTTSForConditionalGeneration; model = ParlerTTSForConditionalGeneration.from_pretrained('parler-tts/parler-tts-mini-expresso').to('cpu')"
RUN python3 -c "from tortoise.api import TextToSpeech; tts = TextToSpeech(device='cpu', kv_cache=True)"
RUN python3 setup.py
RUN pip install git+https://github.com/myshell-ai/MeloTTS.git
RUN pip install --upgrade transformers
RUN python3 -c "from faster_whisper import WhisperModel; model = WhisperModel('medium', device='cpu')"
COPY . .
EXPOSE 8000

CMD ["sh", "run.sh"]

# Dockerfile for CPUs/MacOS
# FROM python:3.11-bullseye
# WORKDIR /app
# RUN pip install unidic
# RUN python -m unidic download
# COPY requirements.txt .

# # RUN pip install --no-cache-dir -r requirements.txt
# # NOTE: Shitty Hack
# RUN cat requirements.txt | sed -e '/^\s*#.*$/d' -e '/^\s*$/d' | xargs -n 1 python -m pip install
# RUN pip install --upgrade transformers

# RUN apt-get update && apt-get install libsndfile1 ffmpeg -y
# COPY setup.py setup.py
# RUN python setup.py

# COPY . .
# EXPOSE 8000
# # RUN python setup.py
# CMD ["sh", "run.sh"]