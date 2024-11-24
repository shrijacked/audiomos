import React from 'react';
import { BarChart3, TrendingUp, Clock, Calendar } from 'lucide-react';
import UsageStats from '../components/UsageStats';

const apiUsageData = [
  { date: '2024-03-01', calls: 1234 },
  { date: '2024-03-02', calls: 2341 },
  { date: '2024-03-03', calls: 1834 },
  { date: '2024-03-04', calls: 2756 },
  { date: '2024-03-05', calls: 3219 },
  { date: '2024-03-06', calls: 2845 },
  { date: '2024-03-07', calls: 3567 }
];

export default function UsageStatsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto dark:bg-gray-900 dark:text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Usage Statistics</h1>
        <p className="text-gray-600 dark:text-gray-300">Monitor your API usage and performance metrics.</p>
      </div>

      <UsageStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">API Usage by Service</h2>
            <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Text to Speech', usage: 45, color: 'bg-blue-500' },
              { name: 'Speech to Text', usage: 30, color: 'bg-purple-500' },
              { name: 'Voice Cloning', usage: 15, color: 'bg-green-500' },
              { name: 'Music Separation', usage: 10, color: 'bg-yellow-500' }
            ].map((service) => (
              <div key={service.name}>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>{service.name}</span>
                  <span>{service.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className={`${service.color} h-2 rounded-full`}
                    style={{ width: `${service.usage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Daily API Calls</h2>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 text-sm">Export Data</button>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {apiUsageData.map((day) => (
              <div key={day.date} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors rounded-t"
                  style={{ height: `${(day.calls / 4000) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}