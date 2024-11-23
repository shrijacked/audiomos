import React, { useState, useEffect } from 'react';
import { Play, Download, Settings2 } from 'lucide-react';
import axios from 'axios';

export default function TextToSpeech() {
  const [text, setText] = useState('');
  const [model, setModel] = useState('');
  const [models, setModels] = useState([]);
  const [voice, setVoice] = useState('');
  const [voices, setVoices] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [emotion, setEmotion] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    // Fetch models on component mount
    const fetchModels = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tts/models`);
      setModels(response.data);
    };
    fetchModels();
  }, []);

  const handleModelChange = (selectedModel) => {
    setModel(selectedModel);
    const modelData = models.find((m) => m.name === selectedModel);
    if (modelData) {
      setVoices(modelData.languages);
      setEmotions(modelData.emotions || []);
      setSpeakers(modelData.speakers || []);
      setVoice(''); // Reset voice selection
      setEmotion('');
      setSpeaker('');
    }
  };

  const handleGenerate = async () => {
    if (!model || !text || !voice) return;
    setAudioUrl('');
    setIsGenerating(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/tts/synthesize`, {
        model_name: model,
        text,
        language: voice,
        emotion: emotion || undefined,
        speaker: speaker || undefined,
      }, { responseType: 'blob' });

      const audioUrl = URL.createObjectURL(new Blob([response.data]));
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Text to Speech</h1>
        <p className="text-gray-600">Convert your text into natural-sounding speech.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text to convert
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the text you want to convert to speech..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model
            </label>
            <select
              value={model}
              onChange={(e) => handleModelChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a model</option>
              {models.map((m) => (
                <option key={m.name} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={!voices.length}
            >
              <option value="">Select a voice</option>
              {voices.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          {emotions.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emotion
              </label>
              <select
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select an emotion</option>
                {emotions.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          )}

          {speakers.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speaker
              </label>
              <select
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a speaker</option>
                {speakers.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleGenerate}
            disabled={!text || !model || !voice || isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'Generate Speech'}
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <Settings2 className="w-4 h-4" />
            Advanced Settings
          </button>
        </div>

        {audioUrl && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700">Generated Audio</h3>
              <a
                href={audioUrl}
                download="audio.wav"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
}
