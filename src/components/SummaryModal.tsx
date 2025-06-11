// src/components/SummaryModal.tsx
import React from 'react';

interface Props { liked: string[]; onReset: () => void }

export const SummaryModal: React.FC<Props> = ({ liked, onReset }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h2 className="text-2xl mb-4">You liked {liked.length} cats!</h2>
      <div className="grid grid-cols-2 gap-2">
        {liked.map((url) => (
          <img key={url} src={url} className="w-full h-32 object-cover rounded" />
        ))}
      </div>
      <button
        onClick={onReset}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Try Again
      </button>
    </div>
  </div>
);
