import React from 'react';
import { BarChart, Activity, ArrowUp, ArrowDown } from 'lucide-react';

export default function UsageStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-green-600 flex items-center gap-1">
            <ArrowUp className="w-4 h-4" />
            12%
          </span>
        </div>
        <h3 className="text-gray-600 text-sm">Total API Calls</h3>
        <p className="text-2xl font-semibold text-gray-800">24,589</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Activity className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-red-600 flex items-center gap-1">
            <ArrowDown className="w-4 h-4" />
            3%
          </span>
        </div>
        <h3 className="text-gray-600 text-sm">Success Rate</h3>
        <p className="text-2xl font-semibold text-gray-800">99.2%</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <Activity className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-green-600 flex items-center gap-1">
            <ArrowUp className="w-4 h-4" />
            8%
          </span>
        </div>
        <h3 className="text-gray-600 text-sm">Active Models</h3>
        <p className="text-2xl font-semibold text-gray-800">12</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Activity className="w-6 h-6 text-yellow-600" />
          </div>
          <span className="text-green-600 flex items-center gap-1">
            <ArrowUp className="w-4 h-4" />
            5%
          </span>
        </div>
        <h3 className="text-gray-600 text-sm">Usage Credits</h3>
        <p className="text-2xl font-semibold text-gray-800">842,157</p>
      </div>
    </div>
  );
}