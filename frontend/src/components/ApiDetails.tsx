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
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl">
          <Code className="w-5 h-5 text-primary-600" />
        </div>
        <h2 className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-primary-800 text-transparent bg-clip-text">
          API Details
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Endpoint</h3>
          <div className="flex items-center gap-2 bg-primary-50 p-3 rounded-xl">
            <span className="text-primary-600 font-mono font-medium">{method}</span>
            <span className="font-mono text-gray-800">{endpoint}</span>
            <button
              onClick={() => copyToClipboard(endpoint)}
              className="ml-auto hover:bg-primary-100 p-1 rounded-lg transition-colors duration-200"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-primary-600" />
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
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto font-mono text-sm">
            {sampleRequest}
          </pre>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Sample Response</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto font-mono text-sm">
            {sampleResponse}
          </pre>
        </div>
      </div>
    </div>
  );
}