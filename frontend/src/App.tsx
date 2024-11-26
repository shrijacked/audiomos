import React, { useState } from 'react';
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
import VoiceCleaning from './pages/VoiceCleaning'; // Import VoiceCleaning page

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [address, setAddress] = useState('');

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <Header address={address} setAddress={setAddress}/>
          <main className="pt-16">
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/" element={<TextToSpeech />} />
              <Route path="/stt" element={<SpeechToText />} />
              <Route path="/voice-cloning" element={<VoiceCloning />} />
              <Route path="/music-separation" element={<MusicSeparation />} />
              <Route path="/voice-cleaning" element={<VoiceCleaning />} /> {/* Add VoiceCleaning route */}
              <Route path="/stats" element={<UsageStats />} />
              <Route path="/apis" element={<Documentation address={address} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;