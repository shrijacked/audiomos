import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, Play, Mic, Save } from 'lucide-react';

export default function VoiceCloning() {
  const [file, setFile] = useState<File | null>(null);
  const [sampleText, setSampleText] = useState('');
  const [clonedAudio, setClonedAudio] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const API_URL = import.meta.env.VITE_API_URL; // Update with your API base URL

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSynthesize = async () => {
    if (!file || !sampleText) {
      alert('Please upload a voice sample and enter text to synthesize.');
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append('reference_file', file);
    formData.append('language', 'en');

    try {
      const response = await axios.post(
        `${API_URL}/vc/synthesize?text=${encodeURIComponent(sampleText)}`,
        formData,
        {
          responseType: 'blob',
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      // Create a URL for the audio blob
      const audioUrl = URL.createObjectURL(response.data);
      setClonedAudio(audioUrl);
    } catch (error) {
      console.error('Voice synthesis failed:', error);
      alert('Failed to synthesize voice. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Voice Cloning</h1>

      <div className="grid gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">1. Upload Voice Sample</h2>
          <div
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer"
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
              Upload voice sample<br />(MP3, WAV, M4A)
            </p>
            {file && (
              <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">{file.name}</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">2. Enter Text to Synthesize</h2>
          <textarea
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            placeholder="Enter text to synthesize..."
            className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          onClick={handleSynthesize}
          disabled={isProcessing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <Save className="w-4 h-4 animate-spin" />
              Synthesizing...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Synthesize Voice
            </>
          )}
        </button>

        {clonedAudio && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4">Generated Speech</h3>
            <audio controls className="w-full">
              <source src={clonedAudio} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
}
