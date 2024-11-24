import React, { useState, useEffect } from 'react';
import { Play, Download, Settings2, X } from 'lucide-react';
import axios from 'axios';
import ApiDetails from '../components/ApiDetails';

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
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [showApiDetails, setShowApiDetails] = useState(false);

  useEffect(() => {
    // Fetch models on component mount
    const fetchModels = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tts/models`);
        setModels(response.data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
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
      setVoice('');
      setEmotion('');
      setSpeaker('');
    }
  };

  const handleGenerate = async () => {
    if (!model || !text || !voice) return;
    setAudioUrl('');
    setIsGenerating(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/tts/synthesize`,
        {
          model_name: model,
          text,
          language: voice,
          emotion: emotion || undefined,
          speaker: speaker || undefined,
          speed,
          pitch,
        },
        { responseType: 'blob' }
      );

      const audioUrl = URL.createObjectURL(new Blob([response.data]));
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto dark:bg-gray-900 dark:text-white">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Text to Speech</h1>
          <p className="text-gray-600 dark:text-gray-300">Convert your text into natural-sounding speech.</p>
        </div>
        <button
          onClick={() => setShowApiDetails(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          View API Details
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text to convert</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter the text you want to convert to speech..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Model</label>
            <select
              value={model}
              onChange={(e) => handleModelChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Emotion</label>
              <select
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Speaker</label>
              <select
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
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

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Speed</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">{speed}x</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pitch</label>
            <input
              type="range"
              min="-10"
              max="10"
              value={pitch}
              onChange={(e) => setPitch(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">{pitch}</div>
          </div> */}
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
        </div>

        {audioUrl && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Generated Audio</h3>
              <a
                href={audioUrl}
                download
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500"
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

        {showApiDetails && (
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowApiDetails(false)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative max-w-2xl w-full h-4/5 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowApiDetails(false)}
                className="absolute top-0 right-0 text-white hover:text-red-400 border border-gray-700 bg-gray-800 rounded p-1 transition-colors duration-200 ease-in-out"
              >
                <X className="w-6 h-6" />
              </button>
              <ApiDetails
                endpoint={`${import.meta.env.VITE_API_URL}/tts/synthesize`}
                method="POST"
                description="Synthesize text into speech using the selected model, language, and voice settings."
                sampleRequest={`{
  "model_name": "ParlerTTS",
  "text": "Hello, world!",
  "language": "EN",
  "emotion": "neutral",
  "speaker": "Thomas"
}`}
                sampleResponse={`<Streaming audio in .WAV format>`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
