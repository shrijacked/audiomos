import React, { useState, useRef } from 'react';
import { Upload, Wand2, Download, Settings2 } from 'lucide-react';
import ApiDetails from '../components/ApiDetails';

export default function VoiceCleaning() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cleanedAudio, setCleanedAudio] = useState('');
  const [settings, setSettings] = useState({
    noiseReduction: 50,
    clarity: 50,
    dereverberation: 50,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleClean = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setCleanedAudio('https://cdn.audiomos.com/demo-cleaned.mp3');
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto dark:bg-gray-900 dark:text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Voice Cleaning</h1>
        <p className="text-gray-600 dark:text-gray-300">Remove background noise, enhance clarity, and improve audio quality.</p>
      </div>

      <div className="grid gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div 
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer mb-6"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="audio/*"
              className="hidden"
            />
            <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Upload audio file<br />
              (MP3, WAV, M4A)
            </p>
            {file && (
              <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">{file.name}</p>
            )}
          </div>

          <div className="space-y-6 mb-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Noise Reduction
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">{settings.noiseReduction}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.noiseReduction}
                onChange={(e) => setSettings(prev => ({ ...prev, noiseReduction: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Voice Clarity
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">{settings.clarity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.clarity}
                onChange={(e) => setSettings(prev => ({ ...prev, clarity: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dereverberation
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">{settings.dereverberation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.dereverberation}
                onChange={(e) => setSettings(prev => ({ ...prev, dereverberation: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleClean}
              disabled={!file || isProcessing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Wand2 className="w-4 h-4 animate-spin" />
                  Cleaning Audio...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Clean Audio
                </>
              )}
            </button>

            <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              <Settings2 className="w-4 h-4" />
              Advanced Settings
            </button>
          </div>

          {cleanedAudio && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Cleaned Audio</h3>
                <a href={cleanedAudio} download className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500">
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Original</p>
                  <audio controls className="w-full">
                    <source src={file ? URL.createObjectURL(file) : ''} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Enhanced</p>
                  <audio controls className="w-full">
                    <source src={cleanedAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            </div>
          )}
        </div>

        <ApiDetails
          endpoint="https://api.audiomos.com/clean"
          method="POST"
          description="Clean and enhance audio using advanced AI algorithms."
          sampleRequest={`{
  "audio_file": "recording.mp3",
  "settings": {
    "noise_reduction": 50,
    "clarity": 50,
    "dereverberation": 50
  },
  "output_format": "mp3"
}`}
          sampleResponse={`{
  "success": true,
  "cleaned_audio_url": "https://cdn.audiomos.com/cleaned/output.mp3",
  "original_duration": 65.4,
  "enhancement_level": "high"
}`}
        />
      </div>
    </div>
  );
}