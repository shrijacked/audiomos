import React, { useState } from 'react';
import { Bell, Sun, Moon } from 'lucide-react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-primary-100 fixed top-0 right-0 left-0 z-10 transition-all duration-300">
      <div className="h-full px-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold bg-gradient-to-r from-primary-600 to-primary-800 text-transparent bg-clip-text">
          Dashboard
        </h1>
        
        <div className="flex items-center gap-4">
          <button 
            className="p-2 hover:bg-primary-50 rounded-xl relative transition-colors duration-200"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-primary-600" />
            ) : (
              <Moon className="w-5 h-5 text-primary-600" />
            )}
          </button>

          <button className="p-2 hover:bg-primary-50 rounded-xl relative transition-colors duration-200">
            <Bell className="w-5 h-5 text-primary-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 cursor-pointer hover:bg-primary-50 py-1 px-2 rounded-xl transition-colors duration-200"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-8 h-8 rounded-xl object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">john@audiomos.com</p>
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-primary-100 py-1">
                <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50">
                  Your Profile
                </a>
                <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50">
                  Settings
                </a>
                <hr className="my-1 border-primary-100" />
                <a href="#logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-primary-50">
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}