import React, { useState, useRef, useEffect } from 'react';
import { Upload, Wand2, Download, Settings2, X } from 'lucide-react';
import axios from 'axios';
import ApiDetails from '../components/ApiDetails';

export default function VoiceCleaning() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cleanedAudioUrl, setCleanedAudioUrl] = useState('');
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [showApiDetails, setShowApiDetails] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(`${API_URL}/clean-audio/models`);
        setModels(response.data.models);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };
    fetchModels();
  }, [API_URL]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleProcess = async () => {
    if (!file || !selectedModel) {
      alert('Please upload a file and select a model.');
      return;
    }

    setIsProcessing(true);
    setCleanedAudioUrl('');

    const formData = new FormData();
    formData.append('audio_file', file);
    formData.append('model', selectedModel);

    try {
      const response = await axios.post(`${API_URL}/clean-audio/process`, formData, {
        responseType: 'blob',
      });

      const audioUrl = URL.createObjectURL(new Blob([response.data]));
      setCleanedAudioUrl(audioUrl);
    } catch (error) {
      console.error('Error processing audio:', error);
      alert('Failed to process the audio file. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto dark:bg-gray-900 dark:text-white">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Voice Cleaning</h1>
          <p className="text-gray-600 dark:text-gray-300">Remove background noise and enhance audio clarity.</p>
        </div>
        <button
          onClick={() => setShowApiDetails(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          View API Details
        </button>
      </div>

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
          {file && <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">{file.name}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Model</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select a model</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleProcess}
            disabled={!file || !selectedModel || isProcessing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <Wand2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Clean Audio
              </>
            )}
          </button>
        </div>

        {cleanedAudioUrl && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Original Audio</h3>
                <audio controls className="w-full">
                  <source src={file ? URL.createObjectURL(file) : ''} type={file?.type || 'audio/mpeg'} />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Cleaned Audio</h3>
                <audio controls className="w-full">
                  <source src={cleanedAudioUrl} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <a
                href={cleanedAudioUrl}
                download="cleaned_audio.wav"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                Download Cleaned Audio
              </a>
            </div>
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
                endpoint={`${API_URL}/clean-audio/process`}
                method="POST"
                description="Process and clean uploaded audio using the selected model."
                sampleRequest={`<Audio file and selected model>`}
                sampleResponse={`<Streaming cleaned audio in .WAV format>`}
              />
              <div className="my-5"></div>
              <ApiDetails
                endpoint={`${API_URL}/clean-audio/models`}
                method="GET"
                description="Retrieve available cleaning models."
                sampleRequest={null}
                sampleResponse={null}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}