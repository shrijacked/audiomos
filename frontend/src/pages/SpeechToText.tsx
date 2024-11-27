import React, { useState, useRef, useEffect } from 'react';
import { Upload, Mic, FileText, Settings2, X } from 'lucide-react';
import axios from 'axios';
import ApiDetails from '../components/ApiDetails';

export default function SpeechToText() {
  const [file, setFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showApiDetails, setShowApiDetails] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch available models
  useEffect(() => {
    async function fetchModels() {
      try {
        const response = await axios.get(`${API_URL}/stt/models`);
        setModels(response.data.models);
        if (response.data.models.length) setSelectedModel(response.data.models[0]);
      } catch (error) {
        console.error('Failed to fetch models:', error);
      }
    }
    fetchModels();
  }, [API_URL]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      handleConversion(selectedFile);
    }
  };

  const handleConversion = async (audioFile: File | Blob) => {
    if (!selectedModel) {
      alert('Please select a transcription model.');
      return;
    }

    setIsConverting(true);
    const formData = new FormData();
    formData.append('audio_file', audioFile);
    formData.append('language', 'en'); // Default language

    try {
      const response = await axios.post(`${API_URL}/stt/transcribe`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const transcriptionData = response.data.transcription;
      const formattedTranscription = transcriptionData
        .map((segment: any) => `${segment.start} - ${segment.end}: ${segment.text}`)
        .join('\n');
      setTranscription(formattedTranscription);
    } catch (error) {
      console.error('Transcription failed:', error);
      alert('Failed to transcribe the audio. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        const chunks: Blob[] = [];

        recorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        recorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
          handleConversion(audioFile);
        };

        recorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Failed to start recording:', error);
        alert('Could not access microphone. Please check your permissions.');
      }
    } else {
      mediaRecorder?.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto dark:bg-gray-900 dark:text-white">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Speech to Text</h1>
          <p className="text-gray-600 dark:text-gray-300">Convert audio into text with high accuracy.</p>
        </div>
        <button
          onClick={() => setShowApiDetails(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          View API Details
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              Click to upload or drag and drop<br />
              MP3, WAV, or M4A file
            </p>
            {file && <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">{file.name}</p>}
          </div>

          <div className="flex flex-col items-center justify-center p-8 border-2 border-gray-300 dark:border-gray-600 rounded-lg">
            <button
              onClick={toggleRecording}
              className={`p-8 rounded-full ${
                isRecording
                  ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 animate-pulse'
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800'
              }`}
            >
              <Mic className="w-8 h-8" />
            </button>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {isRecording ? 'Recording...' : 'Click to start recording'}
            </p>
          </div>
        </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Transcription Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

        {isConverting ? (
          <div className="h-32 flex items-center justify-center">
            <div className="animate-pulse text-gray-600 dark:text-gray-400">Converting audio to text...</div>
          </div>
        ) : (
          <textarea
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Transcription will appear here..."
          />
        )}

        {transcription && (
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              onClick={() => navigator.clipboard.writeText(transcription)}
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>

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
              endpoint={`${API_URL}/stt/process`}
              method="POST"
              description="Process an audio file and transcribe the speech into text."
              sampleRequest={`<Audio file and selected transcription model>`}
              sampleResponse={`{
  "transcription": "This is a sample transcription of the audio."
}`}
            />
            <div className="my-5"></div>
            <ApiDetails
              endpoint={`${API_URL}/stt/models`}
              method="GET"
              description="Retrieve available transcription models."
              sampleRequest={null}
              sampleResponse={null}
            />
          </div>
        </div>
      )}
    </div>
  );
}
