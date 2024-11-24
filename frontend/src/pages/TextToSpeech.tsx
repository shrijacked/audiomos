import React, { useState } from 'react';
import { Play, Download, Settings2 } from 'lucide-react';

export default function TextToSpeech() {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('en-US-1');
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  const voices = [
    { id: 'en-US-1', name: 'Emma (US Female)' },
    { id: 'en-US-2', name: 'James (US Male)' },
    { id: 'en-GB-1', name: 'Oliver (UK Male)' },
    { id: 'en-GB-2', name: 'Sophie (UK Female)' },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setAudioUrl('https://cdn.audiomos.com/demo-tts.mp3');
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto dark:bg-gray-900 dark:text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Text to Speech</h1>
        <p className="text-gray-600 dark:text-gray-300">Convert your text into natural-sounding speech.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text to convert
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter the text you want to convert to speech..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Voice
            </label>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {voices.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Speed
            </label>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pitch
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              value={pitch}
              onChange={(e) => setPitch(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">{pitch}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleGenerate}
            disabled={!text || isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'Generate Speech'}
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <Settings2 className="w-4 h-4" />
            Advanced Settings
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
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
}