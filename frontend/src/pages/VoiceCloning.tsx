import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, Play, Mic, Save, Square } from 'lucide-react';

export default function VoiceCloning() {
  const [file, setFile] = useState<File | null>(null);
  const [sampleText, setSampleText] = useState('');
  const [clonedAudio, setClonedAudio] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          sampleSize: 16,
          volume: 1.0
        }
      });
      
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 16000
      });
      
      audioChunks.current = [];
  
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
  
      mediaRecorder.current.onstop = async () => {
        try {
          const audioBlob = new Blob(audioChunks.current, { 
            type: 'audio/webm;codecs=opus' 
          });
          
          // Convert webm to wav using AudioContext
          const audioContext = new AudioContext({
            sampleRate: 16000
          });
          const audioBuffer = await audioBlob.arrayBuffer();
          const audioData = await audioContext.decodeAudioData(audioBuffer);
          
          // Create WAV blob
          const wavBlob = await convertToWav(audioData);
          setRecordedAudio(wavBlob);
          setFile(new File([wavBlob], 'recorded-sample.wav', { type: 'audio/wav' }));
        } catch (err) {
          console.error('Error processing audio:', err);
        } finally {
          stream.getTracks().forEach(track => track.stop());
          audioContext?.close();
        }
      };
  
      // Start recording with 250ms timeslices
      mediaRecorder.current.start(250);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone');
    }
  };
  
  // Helper function to convert AudioBuffer to WAV
  const convertToWav = async (audioBuffer: AudioBuffer): Promise<Blob> => {
    const numOfChannels = audioBuffer.numberOfChannels;
    const length = audioBuffer.length * numOfChannels * 2;
    const buffer = new ArrayBuffer(44 + length);
    const view = new DataView(buffer);
    const channels = [];
    let offset = 0;
    let pos = 0;
  
    // Write WAV header
    setUint32(0x46464952);                         // "RIFF"
    setUint32(36 + length);                        // file length
    setUint32(0x45564157);                         // "WAVE"
    setUint32(0x20746D66);                         // "fmt " chunk
    setUint32(16);                                 // length = 16
    setUint16(1);                                  // PCM (uncompressed)
    setUint16(numOfChannels);
    setUint32(audioBuffer.sampleRate);
    setUint32(audioBuffer.sampleRate * 2 * numOfChannels); // avg. bytes/sec
    setUint16(numOfChannels * 2);                  // block-align
    setUint16(16);                                 // 16-bit
    setUint32(0x61746164);                         // "data" - chunk
    setUint32(length);                             // chunk length
  
    // Write interleaved audio data
    for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
      channels.push(audioBuffer.getChannelData(i));
    }
  
    while (pos < audioBuffer.length) {
      for (let i = 0; i < numOfChannels; i++) {
        let sample = Math.max(-1, Math.min(1, channels[i][pos]));
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(44 + offset, sample, true);
        offset += 2;
      }
      pos++;
    }
  
    function setUint16(data: number) {
      view.setUint16(pos, data, true);
      pos += 2;
    }
  
    function setUint32(data: number) {
      view.setUint32(pos, data, true);
      pos += 4;
    }
  
    return new Blob([buffer], { type: 'audio/wav' });
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
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
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            1. Upload Voice Sample
          </h2>
          
          <div className="flex flex-col gap-4">
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
              {file && !isRecording && (
                <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">{file.name}</p>
              )}
            </div>

            <div className="flex flex-col items-center gap-4 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="flex items-center gap-4">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`p-4 rounded-full transition-all ${
                    isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {isRecording ? (
                    <Square className="h-6 w-6 text-white" />
                  ) : (
                    <Mic className="h-6 w-6 text-white" />
                  )}
                </button>
                <span className={`text-sm ${isRecording ? 'text-red-500' : 'text-gray-500'}`}>
                  {isRecording ? 'Recording in progress...' : 'Click to start recording'}
                </span>
              </div>
              {recordedAudio && !isRecording && (
                <audio controls className="w-full">
                  <source src={URL.createObjectURL(recordedAudio)} type="audio/wav" />
                </audio>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            2. Enter Text to Synthesize
          </h2>
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
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4">
              Generated Speech
            </h3>
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