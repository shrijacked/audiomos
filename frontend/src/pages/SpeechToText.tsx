import React, { useState, useRef } from 'react';
import { Upload, Mic, FileText, Settings2 } from 'lucide-react';

export default function SpeechToText() {
  const [file, setFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [transcription, setTranscription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Simulate conversion
      handleConversion();
    }
  };

  const handleConversion = () => {
    setIsConverting(true);
    // Simulate API call
    setTimeout(() => {
      setTranscription(
        "This is a sample transcription of the audio file. In a real implementation, this would be the actual text converted from the audio using our STT API."
      );
      setIsConverting(false);
    }, 2000);
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate recording for 5 seconds
      setTimeout(() => {
        setIsRecording(false);
        handleConversion();
      }, 5000);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Speech to Text</h1>
        <p className="text-gray-600">Convert audio into text with high accuracy.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
               onClick={() => fileInputRef.current?.click()}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="audio/*"
              className="hidden"
            />
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 text-center">
              Click to upload or drag and drop<br />
              MP3, WAV, or M4A file
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
              {isRecording ? 'Recording...' : 'Click to start recording'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium text-gray-700">Transcription</h3>
          </div>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <Settings2 className="w-4 h-4" />
            Settings
          </button>
        </div>

        {isConverting ? (
          <div className="h-32 flex items-center justify-center">
            <div className="animate-pulse text-gray-600">Converting audio to text...</div>
          </div>
        ) : (
          <textarea
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Transcription will appear here..."
          />
        )}

        {transcription && (
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => navigator.clipboard.writeText(transcription)}
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}