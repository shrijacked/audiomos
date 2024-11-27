import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Hero from './components/home/Hero';
import TextToSpeech from './pages/TextToSpeech';
import SpeechToText from './pages/SpeechToText';
import VoiceCloning from './pages/VoiceCloning';
import VoiceCleaning from './pages/VoiceCleaning';
import Api from './pages/api';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [address, setAddress] = useState('');

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <Header address={address} setAddress={setAddress} />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/tts" element={<TextToSpeech />} />
              <Route path="/stt" element={<SpeechToText />} />
              <Route path="/voice-cloning" element={<VoiceCloning />} />
              <Route path="/voice-cleaning" element={<VoiceCleaning />} />
              <Route path="/apis" element={<Api address={address} />} />
              <Route path="*" element={<div className="text-gray-800 dark:text-gray-200">404 - Page Not Found</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;