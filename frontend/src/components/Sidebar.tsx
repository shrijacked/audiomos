import React from 'react';
import { 
  Mic, 
  MessageSquareText, 
  Users, 
  Waves, 
  Music, 
  BookOpen, 
  BarChart3,
  Home
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  // { icon: Home, label: 'Dashboard', path: '/' },
  { icon: MessageSquareText, label: 'Text to Speech', path: '/' },
  { icon: Mic, label: 'Speech to Text', path: '/stt' },
  { icon: Users, label: 'Voice Cloning', path: '/voice-cloning' },
  { icon: Waves, label: 'Voice Cleaning', path: '/voice-cleaning' },
  // { icon: Music, label: 'Music Separation', path: '/music-separation' },
  { icon: BarChart3, label: 'Usage Stats', path: '/stats' },
  // { icon: BookOpen, label: 'Documentation', path: '/docs' }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 fixed left-0 top-0">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Waves className="w-8 h-8 text-blue-400" />
        <span className="text-xl font-bold">AudioMOS</span>
      </div>
      
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}