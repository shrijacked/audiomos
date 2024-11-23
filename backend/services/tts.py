from melo.api import TTS
from abc import abstractmethod, ABC

import torch
from parler_tts import ParlerTTSForConditionalGeneration
from transformers import AutoTokenizer, set_seed
import soundfile as sf

set_seed(42)

class AbstractTTS(ABC):
    @abstractmethod
    def get_languages(self): pass
    @abstractmethod
    def get_emotions(self): pass
    @abstractmethod
    def run_tts(self, text: str, output_path: str, language: str, **kwargs): pass
    @abstractmethod
    def get_speakers(self): pass

print("loading the parler models, may take time")
parler_device = "cuda:0" if torch.cuda.is_available() else "cpu"
parler_model = ParlerTTSForConditionalGeneration.from_pretrained("parler-tts/parler-tts-mini-expresso").to(parler_device)
tokenizer = AutoTokenizer.from_pretrained("parler-tts/parler-tts-mini-expresso")
        
class MeloTTS(AbstractTTS):
    def __init__(self) -> None:
        self.device = 'auto'

    def get_languages(self):
        return ['EN-US', 'EN-BR', 'EN-INDIA', 'ES', 'FR',  'JA', 'ZH', "KR"]

    def get_emotions(self):
        return []
    def get_speakers(self):
        return []

    def run_tts(self, text: str, output_path: str, language: str, **kwargs):
        assert language in self.get_languages(), f"Language {language} not supported"
        if language.startswith("EN"):
            model = TTS(language="EN", device=self.device)
        else:
            model = TTS(language=language, device=self.device)
            
        speaker_ids = model.hps.data.spk2id
        print(speaker_ids)
        if language == "EN-US":
            pass
        elif "-" in language and language != "EN-BR":
            language = language.replace("-", "_")
        model.tts_to_file(text, speaker_ids[language], output_path, speed=1.0)

class ParlerTTS(AbstractTTS):
    def __init__(self) -> None:
        pass

    def get_languages(self):
        return ['EN']

    def get_emotions(self):
        return ['sad', 'happy', 'neutral']
    
    def get_speakers(self):
        return ['Thomas', 'Jerry', 'Talia']

    def run_tts(self, text: str, output_path: str, language: str, **kwargs):
        assert language in self.get_languages(), f"Language {language} not supported"
        emotion = kwargs.get('emotion', 'neutral')
        speaker = kwargs.get('speaker', 'Thomas')
        description = f"{speaker} speaks in a {emotion} tone with emphasis and high quality audio."
        print(description)
        input_ids = tokenizer(description, return_tensors="pt").input_ids.to(parler_device)
        prompt_input_ids = tokenizer(text, return_tensors="pt").input_ids.to(parler_device)
        generation = parler_model.generate(input_ids=input_ids, prompt_input_ids=prompt_input_ids)
        audio_arr = generation.cpu().numpy().squeeze()
        sf.write(output_path, audio_arr, parler_model.config.sampling_rate)

def get_supported_models_and_metadata():
    models = [MeloTTS(), ParlerTTS()]
    # TODO: Could've been an enum
    return [
        {
            "name": model.__class__.__name__,
            "languages": model.get_languages(),
            "emotions": model.get_emotions(),
            "speakers": model.get_speakers(),
        }
        for model in models
    ]
    
def run_tts(model_name: str, text: str, output_path: str, language: str, **kwargs):
    models = [MeloTTS(), ParlerTTS()]
    for model in models:
        if model.__class__.__name__ == model_name:
            model.run_tts(text, output_path, language, **kwargs)
            return
    raise ValueError(f"Model {model_name} not found.")