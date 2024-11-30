import React from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto relative">
      <pre>{'>>'} {code}</pre>
      <button
        onClick={() => copyToClipboard(code)}
        className="absolute top-2 right-2 hover:bg-gray-700 p-1 rounded"
      >
        {copied ? (
          <CheckCircle className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400" />
        )}
      </button>
    </div>
  );
}