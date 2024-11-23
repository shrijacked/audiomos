import React from 'react';
import { Code, Copy, CheckCircle } from 'lucide-react';

interface ApiDetailsProps {
  endpoint: string;
  method: string;
  description: string;
  sampleRequest: string;
  sampleResponse: string;
}

export default function ApiDetails({
  endpoint,
  method,
  description,
  sampleRequest,
  sampleResponse
}: ApiDetailsProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Code className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">API Details</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Endpoint</h3>
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
            <span className="text-green-600 font-mono">{method}</span>
            <span className="font-mono text-gray-800">{endpoint}</span>
            <button
              onClick={() => copyToClipboard(endpoint)}
              className="ml-auto hover:bg-gray-200 p-1 rounded"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Description</h3>
          <p className="text-gray-700">{description}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Sample Request</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {sampleRequest}
          </pre>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Sample Response</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {sampleResponse}
          </pre>
        </div>
      </div>
    </div>
  );
}