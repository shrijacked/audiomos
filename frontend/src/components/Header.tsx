import React, { useState, useEffect } from 'react';
import { Bell, Sun, Moon } from 'lucide-react';

export default function Header() {
  const [isDark, setIsDark] = useState(() => {
    // Check the initial theme from local storage or default to false
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <header className="h-16 bg-white/80 dark:bg-gray-800 backdrop-blur-md border-b border-primary-100 fixed top-0 right-0 left-0 z-10 transition-all duration-300">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1"></div> {/* This div will take up the remaining space */}
        <div className="flex items-center gap-4">
          <button 
            className="p-2 hover:bg-primary-50 dark:hover:bg-gray-700 rounded-xl relative transition-colors duration-200"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-primary-600" />
            ) : (
              <Moon className="w-5 h-5 text-primary-600" />
            )}
          </button>

          {/* <button className="p-2 hover:bg-primary-50 dark:hover:bg-gray-700 rounded-xl relative transition-colors duration-200">
            <Bell className="w-5 h-5 text-primary-600" />
          </button> */}
        </div>
      </div>
    </header>
  );
}