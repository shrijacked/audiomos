import React from 'react';
import { Code, Copy, CheckCircle } from 'lucide-react';

interface ApiDetailsProps {
  endpoint: string;
  method: string;
  description: string;
  sampleRequest: string;
  sampleResponse: string | undefined | null;
}

export default function ApiDetails({
  endpoint,
  method,
  description,
  sampleRequest,
  sampleResponse
}: ApiDetailsProps) {
  const [copied, setCopied] = React.useState(false);
  const [getResponse, setGetResponse] = React.useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const testGetEndpoint = async () => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setGetResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error fetching GET endpoint:', error);
      setGetResponse('Error fetching data');
    }
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
          {method === "GET" && (
            <button
              onClick={testGetEndpoint}
              className="mt-2 px-4 my-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              Test GET Endpoint
            </button>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Description</h3>
          <p className="text-gray-700">{description}</p>
        </div>

        {sampleRequest && (
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Sample Request</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              {sampleRequest}
            </pre>
          </div>
        )}

        {sampleResponse && (
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Sample Response</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              {sampleResponse}
            </pre>
          </div>
        )}

        {method === "GET" && getResponse && (
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">GET Response</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              {getResponse}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}