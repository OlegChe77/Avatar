import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
          AI Avatar Generator
        </h1>
      </div>
    </header>
  );
};
