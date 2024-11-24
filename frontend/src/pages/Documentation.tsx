import React from 'react';
import { Book, Code, Terminal, Zap } from 'lucide-react';

const guides = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of AudioMOS API and how to make your first API call.',
    icon: Book,
    link: '#getting-started'
  },
  {
    title: 'API Reference',
    description: 'Detailed documentation of all API endpoints, parameters, and responses.',
    icon: Code,
    link: '#api-reference'
  },
  {
    title: 'Code Examples',
    description: 'Ready-to-use code samples in various programming languages.',
    icon: Terminal,
    link: '#code-examples'
  },
  {
    title: 'Best Practices',
    description: 'Tips and recommendations for optimal API usage and performance.',
    icon: Zap,
    link: '#best-practices'
  }
];

export default function Documentation() {
  return (
    <div className="p-6 max-w-4xl mx-auto dark:bg-gray-900 dark:text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Documentation</h1>
        <p className="text-gray-600 dark:text-gray-300">Everything you need to know about using AudioMOS API.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {guides.map((guide) => {
          const Icon = guide.icon;
          return (
            <a
              key={guide.title}
              href={guide.link}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{guide.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{guide.description}</p>
                </div>
              </div>
            </a>
          )
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Quick Start Guide</h2>
        <div className="prose prose-blue dark:prose-dark max-w-none">
          <h3>1. Authentication</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`curl -X POST https://api.audiomos.com/v1/auth \\
  -H "Content-Type: application/json" \\
  -d '{"api_key": "your_api_key"}'`}
          </pre>

          <h3>2. Making Your First API Call</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`curl -X POST https://api.audiomos.com/v1/tts \\
  -H "Authorization: Bearer your_access_token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Hello, welcome to AudioMOS!",
    "voice_id": "en-US-1"
  }'`}
          </pre>

          <h3>3. SDK Installation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">npm</p>
              <pre className="bg-gray-900 text-gray-100 p-2 rounded-lg">
                npm install audiomos
              </pre>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">pip</p>
              <pre className="bg-gray-900 text-gray-100 p-2 rounded-lg">
                pip install audiomos
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 rounded-lg p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
        <p className="mb-4">Our support team is available 24/7 to assist you with any questions.</p>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 dark:bg-gray-200 dark:text-blue-800 dark:hover:bg-gray-300">
            Contact Support
          </button>
          <button className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 dark:bg-blue-900 dark:hover:bg-blue-950">
            Join Discord
          </button>
        </div>
      </div>
    </div>
  );
}