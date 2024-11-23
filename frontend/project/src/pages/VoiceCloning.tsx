import React, { useState, useRef } from 'react';
import { Upload, Play, Mic, Save } from 'lucide-react';
import ApiDetails from '../components/ApiDetails';

export default function VoiceCloning() {
  const [file, setFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [sampleText, setSampleText] = useState('');
  const [clonedAudio, setClonedAudio] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleTrain = () => {
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
      setClonedAudio('https://cdn.audiomos.com/demo-cloned.mp3');
    }, 3000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
    } else {
      // Start recording
      setIsRecording(true);
      setTimeout(() => setIsRecording(false), 5000);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Voice Cloning</h1>
        <p className="text-gray-600">Clone any voice with just 30 seconds of audio.</p>
      </div>

      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">1. Upload Voice Sample</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div 
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
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
                Upload voice sample<br />
                (MP3, WAV, M4A)
              </p>
              {file && (
                <p className="mt-2 text-sm text-blue-600">{file.name}</p>
              )}
            </div>

            <div className="flex flex-col items-center justify-center p-8 border-2 border-gray-300 rounded-lg">
              <button
                onClick={toggleRecording}
                className={`p-8 rounded-full ${
                  isRecording 
                    ? 'bg-red-100 text-red-600 animate-pulse' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                <Mic className="w-8 h-8" />
              </button>
              <p className="mt-4 text-sm text-gray-600">
                {isRecording ? 'Recording...' : 'Record voice sample'}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">2. Test Cloned Voice</h2>
            <textarea
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              placeholder="Enter text to test the cloned voice..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handleTrain}
              disabled={(!file && !isRecording) || isTraining}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTraining ? (
                <>
                  <Save className="w-4 h-4 animate-spin" />
                  Training Model...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Generate Speech
                </>
              )}
            </button>
          </div>

          {clonedAudio && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-4">Generated Speech</h3>
              <audio controls className="w-full">
                <source src={clonedAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>

        <ApiDetails
          endpoint="https://api.audiomos.com/voice-clone"
          method="POST"
          description="Clone a voice using a short audio sample and generate speech with the cloned voice."
          sampleRequest={`{
  "audio_file": "voice-sample.mp3",
  "text": "Hello, this is my cloned voice!",
  "enhancement": true
}`}
          sampleResponse={`{
  "success": true,
  "voice_id": "cloned_voice_123",
  "audio_url": "https://cdn.audiomos.com/cloned/output.mp3",
  "duration": 2.5
}`}
        />
      </div>
    </div>
  );
}