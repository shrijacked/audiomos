import React, { useState, useRef } from 'react';
import { Upload, Wand2, Download, Settings2, X } from 'lucide-react';
import axios from 'axios';
import ApiDetails from '../components/ApiDetails';

export default function VoiceCleaning() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cleanedAudioUrl, setCleanedAudioUrl] = useState('');
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [showApiDetails, setShowApiDetails] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const fetchModels = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/clean-audio/models`);
      setModels(response.data.models);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const handleProcess = async () => {
    if (!file || !selectedModel) return;

    setIsProcessing(true);
    setCleanedAudioUrl('');

    const formData = new FormData();
    formData.append('audio_file', file);
    formData.append('model', selectedModel);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/clean-audio/process`, formData, {
        responseType: 'blob',
      });

      const audioUrl = URL.createObjectURL(new Blob([response.data]));
      setCleanedAudioUrl(audioUrl);
    } catch (error) {
      console.error('Error processing audio:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  React.useEffect(() => {
    fetchModels();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Voice Cleaning</h1>
          <p className="text-gray-600">Remove background noise and enhance audio clarity.</p>
        </div>
        <button
          onClick={() => setShowApiDetails(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          View API Details
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div
          className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer mb-6"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/*"
            className="hidden"
          />
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 text-center">
            Upload audio file<br />
            (MP3, WAV, M4A)
          </p>
          {file && <p className="mt-2 text-sm text-blue-600">{file.name}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Model</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Original Audio</h3>
        <audio controls className="w-full">
          <source src={file ? URL.createObjectURL(file) : ''} type={file?.type || 'audio/mpeg'} />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Cleaned Audio</h3>
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
              className="bg-white rounded-lg shadow-lg p-6 relative max-w-2xl w-full h-4/5 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowApiDetails(false)}
                className="absolute top-0 right-0 text-white hover:text-red-400 border border-gray-700 bg-gray-800 rounded p-1 transition-colors duration-200 ease-in-out"
              >
                <X className="w-6 h-6" />
              </button>
              <ApiDetails
                endpoint={`${import.meta.env.VITE_API_URL}/clean-audio/process`}
                method="POST"
                description="Process and clean uploaded audio using the selected model."
                sampleRequest={`<Audio file and selected model>`}
                sampleResponse={`<Streaming cleaned audio in .WAV format>`}
              />
              <div className="my-5"></div>
              <ApiDetails
                endpoint={`${import.meta.env.VITE_API_URL}/clean-audio/models`}
                method="GET"
                description="Retrieve available cleaning models."
                sampleRequest={null}
                sampleResponse={null}
                // sampleResponse={`{"models": ["deepfilternet"]}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
