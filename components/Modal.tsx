import React from 'react';
import { DownloadIcon, CloseIcon } from './Icons';

interface ModalProps {
  src: string;
  styleName: string;
  fileName: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ src, styleName, fileName, onClose }) => {
  if (!src) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">{styleName}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Закрыть"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow p-4 overflow-auto">
          <img src={src} alt={`Аватар в стиле ${styleName}`} className="w-full h-auto max-h-[65vh] object-contain" />
        </div>
        <div className="p-4 border-t border-gray-700 flex justify-end">
          <a
            href={src}
            download={fileName}
            className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg font-semibold"
          >
            <DownloadIcon className="w-5 h-5 mr-2" />
            Скачать
          </a>
        </div>
      </div>
    </div>
  );
};