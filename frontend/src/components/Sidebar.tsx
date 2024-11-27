import React from 'react';
import { 
  Mic, 
  MessageSquareText, 
  Users, 
  Sliders, 
  BookOpen, 
  Home,
  ChevronLeft,
  ChevronRight,
  Waves // Import Waves icon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  // { icon: Home, label: 'Home', path: '/' },
  { icon: MessageSquareText, label: 'Text to Speech', path: '/tts' },
  { icon: Mic, label: 'Speech to Text', path: '/stt' },
  { icon: Users, label: 'Voice Cloning', path: '/voice-cloning' },
  { icon: Sliders, label: 'Voice Cleaning', path: '/voice-cleaning' },
  { icon: BookOpen, label: 'Web API Documentation', path: '/apis' }
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <div 
      className={`h-screen bg-white/80 dark:bg-gray-800 backdrop-blur-md border-r border-primary-100 fixed left-0 top-0 z-20 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center gap-2 p-4 mb-6">
        <Link to="/">
          <Waves className="w-8 h-8 text-primary-600" /> 
        </Link>
        <span className={`text-xl font-bold transition-opacity duration-200 ${
          isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'
        }`}>
          AudioMOS
        </span>
        <button 
          onClick={onToggle}
          className="ml-auto p-1 hover:bg-primary-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-primary-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-primary-600" />
          )}
        </button>
      </div>
      
      <nav className="space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white' 
                  : 'text-gray-500 hover:bg-primary-50 dark:hover:bg-gray-700'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              <span className={`transition-opacity duration-200 ${
                isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}