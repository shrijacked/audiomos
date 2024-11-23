import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import TextToSpeech from './pages/TextToSpeech';
import SpeechToText from './pages/SpeechToText';
import VoiceCloning from './pages/VoiceCloning';
import MusicSeparation from './pages/MusicSeparation';
import UsageStats from './pages/UsageStats';
import Documentation from './pages/Documentation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-64">
          <Header />
          <main className="pt-16">
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/" element={<TextToSpeech />} />
              <Route path="/stt" element={<SpeechToText />} />
              <Route path="/voice-cloning" element={<VoiceCloning />} />
              <Route path="/music-separation" element={<MusicSeparation />} />
              <Route path="/stats" element={<UsageStats />} />
              <Route path="/docs" element={<Documentation />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;