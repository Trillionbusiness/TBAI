

import React, { useState } from 'react';

interface CopyableBlockProps {
  content: string;
  title: string;
  isStatic?: boolean;
}

const CopyableBlock: React.FC<CopyableBlockProps> = ({ content, title, isStatic = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
  };

  return (
    <div className="mt-4 p-4 rounded-lg border" style={{backgroundColor: 'var(--bg-light)', borderColor: 'var(--border-color)'}}>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-bold uppercase tracking-wider" style={{color: 'var(--primary-color)'}}>{title}</p>
        {!isStatic && (
          <button
            onClick={handleCopy}
            className={`px-3 py-1 text-xs font-bold rounded ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            } transition-colors`}
            style={{color: copied ? 'white' : 'var(--text-dark)'}}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>
      <pre className="text-sm whitespace-pre-wrap font-mono p-3 rounded" style={{backgroundColor: 'var(--bg-muted)', color: 'var(--text-dark)'}}>
        <code>{content}</code>
      </pre>
    </div>
  );
};

export default CopyableBlock;