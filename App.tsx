import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { AvatarGrid } from './components/AvatarGrid';
import { generateAvatarFromImage } from './services/geminiService';
import { fileToBase64 } from './utils/imageUtils';
import { AVATAR_STYLES, AvatarStyleKey } from './constants';

interface UploadedImage {
  file: File;
  previewUrl: string;
  base64: string;
  mimeType: string;
}

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [generatedAvatars, setGeneratedAvatars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }
    setError(null);
    const previewUrl = URL.createObjectURL(file);
    try {
      const { base64, mimeType } = await fileToBase64(file);
      setUploadedImage({ file, previewUrl, base64, mimeType });
      setGeneratedAvatars([]);
    } catch (err) {
      setError('Failed to process image file.');
      console.error(err);
    }
  }, []);

  const handleGenerateAvatars = useCallback(async () => {
    if (!uploadedImage) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedAvatars([]);

    try {
      const avatarPromises = Object.keys(AVATAR_STYLES).map(style =>
        generateAvatarFromImage(
          uploadedImage.base64,
          uploadedImage.mimeType,
          AVATAR_STYLES[style as AvatarStyleKey].prompt
        )
      );
      
      const results = await Promise.all(avatarPromises);
      setGeneratedAvatars(results);

    } catch (err) {
      console.error(err);
      setError('An error occurred while generating avatars. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [uploadedImage]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mt-4 text-lg text-gray-400">
            Upload your photo to generate six unique avatars in iconic cartoon styles. Our AI keeps your face recognizable!
          </p>
        </div>

        <div className="mt-10 max-w-2xl mx-auto">
          <ImageUploader
            onImageUpload={handleImageUpload}
            previewUrl={uploadedImage?.previewUrl}
            onGenerate={handleGenerateAvatars}
            isLoading={isLoading}
            imageLoaded={!!uploadedImage}
          />
        </div>

        {error && (
          <div className="mt-6 text-center text-red-400 bg-red-900/20 p-3 rounded-md max-w-2xl mx-auto">
            <p>{error}</p>
          </div>
        )}

        <div className="mt-12">
          <AvatarGrid isLoading={isLoading} avatars={generatedAvatars} />
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
