import React, { useState, useRef } from 'react';
import { Upload, Music, Mic, Waves, Download } from 'lucide-react';
import ApiDetails from '../components/ApiDetails';

export default function MusicSeparation() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [separatedTracks, setSeparatedTracks] = useState<{
    vocals?: string;
    instrumental?: string;
    drums?: string;
    bass?: string;
  }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSeparate = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setSeparatedTracks({
        vocals: 'https://cdn.audiomos.com/demo-vocals.mp3',
        instrumental: 'https://cdn.audiomos.com/demo-instrumental.mp3',
        drums: 'https://cdn.audiomos.com/demo-drums.mp3',
        bass: 'https://cdn.audiomos.com/demo-bass.mp3'
      });
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Music Separation</h1>
        <p className="text-gray-600">Separate any song into vocals, instruments, drums, and bass.</p>
      </div>

      <div className="grid gap-6">
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
              Upload music file<br />
              (MP3, WAV, M4A)
            </p>
            {file && (
              <p className="mt-2 text-sm text-blue-600">{file.name}</p>
            )}
          </div>

          <button
            onClick={handleSeparate}
            disabled={!file || isProcessing}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {isProcessing ? (
              <>
                <Waves className="w-4 h-4 animate-pulse" />
                Separating Tracks...
              </>
            ) : (
              <>
                <Music className="w-4 h-4" />
                Separate Tracks
              </>
            )}
          </button>

          {Object.keys(separatedTracks).length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(separatedTracks).map(([track, url]) => (
                <div key={track} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-700 capitalize">{track}</h3>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  <audio controls className="w-full">
                    <source src={url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))}
            </div>
          )}
        </div>

        <ApiDetails
          endpoint="https://api.audiomos.com/separate"
          method="POST"
          description="Separate a music track into individual components using AI."
          sampleRequest={`{
  "audio_file": "song.mp3",
  "components": ["vocals", "instrumental", "drums", "bass"],
  "quality": "high"
}`}
          sampleResponse={`{
  "success": true,
  "tracks": {
    "vocals": "https://cdn.audiomos.com/separated/vocals.mp3",
    "instrumental": "https://cdn.audiomos.com/separated/instrumental.mp3",
    "drums": "https://cdn.audiomos.com/separated/drums.mp3",
    "bass": "https://cdn.audiomos.com/separated/bass.mp3"
  }
}`}
        />
      </div>
    </div>
  );
}