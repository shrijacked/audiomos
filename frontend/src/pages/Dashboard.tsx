import React from 'react';
import UsageStats from '../components/UsageStats';
import ApiDetails from '../components/ApiDetails';

export default function Dashboard() {
  return (
    <div className="p-6 max-w-4xl mx-auto dark:bg-gray-900 dark:text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Welcome back, John!</h1>
        <p className="text-gray-600 dark:text-gray-300">Here's what's happening with your API usage today.</p>
      </div>

      <UsageStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApiDetails
          endpoint="https://api.audiomos.com/tts"
          method="POST"
          description="Convert text to natural-sounding speech using our advanced TTS models."
          sampleRequest={`{
  "text": "Hello, welcome to AudioMOS!",
  "voice_id": "en-US-1",
  "speed": 1.0,
  "pitch": 0
}`}
          sampleResponse={`{
  "success": true,
  "audio_url": "https://cdn.audiomos.com/tts/output.mp3",
  "duration": 2.5,
  "char_count": 24
}`}
        />

        <ApiDetails
          endpoint="https://api.audiomos.com/stt"
          method="POST"
          description="Convert audio to text with high accuracy using our STT models."
          sampleRequest={`{
  "audio_url": "https://example.com/audio.mp3",
  "language": "en-US",
  "enhanced": true
}`}
          sampleResponse={`{
  "success": true,
  "text": "Hello, welcome to AudioMOS!",
  "confidence": 0.98,
  "duration": 2.5
}`}
        />
      </div>
    </div>
  );
}