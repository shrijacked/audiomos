
# AudioMOS

**AudioMOS** is a comprehensive platform for audio processing models, including Text to Speech (TTS), Speech to Text (STT), and Voice Cloning, built on the Akash Network. It offers both API access and a web dashboard for seamless audio processing.

## 🚀 Features

### Text to Speech (TTS)
- Multiple model support
- Language and voice options
- Real-time synthesis

### Speech to Text (STT)
- Accurate transcription
- Multiple language support
- File upload capability

### Voice Cloning
- Create synthetic voices
- Reference audio support
- High-quality output

### Audio Processing
- Noise reduction
- Audio enhancement
- Format conversion

## 🛠 Installation

### Docker Setup (Recommended)
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/audiomos.git
   cd audiomos
   ```

2. **Launch services**
   ```bash
   docker-compose up -d
   ```

3. **Create a virtual environment**
   ```bash
   conda create -n audiomos python=3.9
   conda activate audiomos
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Setup backend**
   ```bash
   python setup.py
   ```

6. **Start the server**
   ```bash
   sh run.sh
   ```

## 📜 Example Usage

### TTS Example
To convert text to speech:
```python
import requests

response = requests.post(
    "http://localhost:8000/api/tts",
    json={"text": "Hello World", "model": "basic"}
)

# Print the generated audio
with open("output.wav", "wb") as f:
    f.write(response.content)
```

### STT Example
To transcribe speech to text:
```python
import requests

files = {"audio": open("sample.wav", "rb")}
response = requests.post(
    "http://localhost:8000/api/stt",
    files=files
)

# Print the transcribed text
print(response.json()["text"])
```

## 🔧 Tech Stack

### Backend
- **FastAPI**: High-performance API framework
- **PyTorch**: Deep learning framework for model training and inference
- **Docker**: Containerization for easy deployment
- **MongoDB**: Database for storing data

### Frontend
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Tailwind CSS**: Utility-first CSS framework for building custom designs

## 📝 License
MIT License