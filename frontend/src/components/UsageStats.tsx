import React from 'react';
import { BarChart, Activity, ArrowUp, ArrowDown } from 'lucide-react';

export default function UsageStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="card p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl">
            <BarChart className="w-6 h-6 text-primary-600" />
          </div>
          <span className="text-primary-600 flex items-center gap-1 text-sm font-medium px-2 py-1 bg-primary-50 rounded-lg">
            <ArrowUp className="w-4 h-4" />
            12%
          </span>
        </div>
        <h3 className="text-gray-600 text-sm font-medium">Total API Calls</h3>
        <p className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 text-transparent bg-clip-text">
          24,589
        </p>
      </div>

      <div className="card p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl">
            <Activity className="w-6 h-6 text-primary-600" />
          </div>
          <span className="text-red-600 flex items-center gap-1 text-sm font-medium px-2 py-1 bg-red-50 rounded-lg">
            <ArrowDown className="w-4 h-4" />
            3%
          </span>
        </div>
        <h3 className="text-gray-600 text-sm font-medium">Success Rate</h3>
        <p className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 text-transparent bg-clip-text">
          99.2%
        </p>
      </div>

      <div className="card p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl">
            <Activity className="w-6 h-6 text-primary-600" />
          </div>
          <span className="text-primary-600 flex items-center gap-1 text-sm font-medium px-2 py-1 bg-primary-50 rounded-lg">
            <ArrowUp className="w-4 h-4" />
            8%
          </span>
        </div>
        <h3 className="text-gray-600 text-sm font-medium">Active Models</h3>
        <p className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 text-transparent bg-clip-text">
          12
        </p>
      </div>

      <div className="card p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl">
            <Activity className="w-6 h-6 text-primary-600" />
          </div>
          <span className="text-primary-600 flex items-center gap-1 text-sm font-medium px-2 py-1 bg-primary-50 rounded-lg">
            <ArrowUp className="w-4 h-4" />
            5%
          </span>
        </div>
        <h3 className="text-gray-600 text-sm font-medium">Usage Credits</h3>
        <p className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 text-transparent bg-clip-text">
          842,157
        </p>
      </div>
    </div>
  );
}