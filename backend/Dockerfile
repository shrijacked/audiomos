
# Dockerfile for GPUs
# FROM nvidia/cuda:12.1.1-runtime-ubuntu20.04 --platform=linux/amd64

# RUN apt-get update && \
#     apt-get install -y python3-pip python3-dev python-is-python3 && \
#     rm -rf /var/lib/apt/lists/*

# WORKDIR /app
# RUN pip install unidic
# RUN python -m unidic download

# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt


# COPY . .

# EXPOSE 8000

# CMD ["sh", "run.sh"]


# Dockerfile for CPUs/MacOS
FROM python:3.11-bullseye
WORKDIR /app
RUN pip install unidic
RUN python -m unidic download
COPY requirements.txt .

# RUN pip install --no-cache-dir -r requirements.txt
# NOTE: Shitty Hack
RUN cat requirements.txt | sed -e '/^\s*#.*$/d' -e '/^\s*$/d' | xargs -n 1 python -m pip install
RUN pip install --upgrade transformers

RUN apt-get update && apt-get install libsndfile1 ffmpeg -y
COPY setup.py setup.py
RUN python setup.py

COPY . .
EXPOSE 8000
# RUN python setup.py
CMD ["sh", "run.sh"]