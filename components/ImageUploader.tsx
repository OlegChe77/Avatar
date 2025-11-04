import React, { useRef } from 'react';
import { UploadIcon, SparklesIcon } from './Icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  previewUrl?: string;
  onGenerate: () => void;
  isLoading: boolean;
  imageLoaded: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  previewUrl,
  onGenerate,
  isLoading,
  imageLoaded,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl p-6 flex flex-col items-center transition-all duration-300">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      
      {!previewUrl ? (
        <button
          onClick={handleUploadClick}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-purple-400 transition-colors"
        >
          <UploadIcon className="w-12 h-12 mb-2" />
          <span className="font-semibold">Click to upload your photo</span>
          <span className="text-sm">PNG, JPG, or WEBP</span>
        </button>
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="mb-4 w-40 h-40 rounded-xl overflow-hidden border-4 border-gray-600 shadow-lg bg-gray-700">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
          </div>
          <div className="flex space-x-4">
             <button
              onClick={handleUploadClick}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors text-sm font-medium"
            >
              Change Photo
            </button>
            <button
              onClick={onGenerate}
              disabled={isLoading || !imageLoaded}
              className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg font-semibold"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  Generate Avatars
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};