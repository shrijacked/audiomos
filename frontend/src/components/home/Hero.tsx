import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Waves } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <div className="text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <Waves className="w-12 h-12 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              AudioMOS
            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 text-transparent bg-clip-text">
          Transform Your Audio Experience
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Advanced AI-powered tools for text-to-speech, voice cloning, and audio processing
        </p>
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/tts')}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 transition-all duration-200 flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigate('/apis')}
            className="px-8 py-4 bg-white dark:bg-gray-800 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-700 rounded-xl hover:bg-primary-50 dark:hover:bg-gray-700 transition-all duration-200"
          >
            Web API Documentation
          </button>
        </div>
      </div>
    </div>
  );
}