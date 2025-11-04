import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { AvatarGrid } from './components/AvatarGrid';
import { Modal } from './components/Modal';
import { generateAvatarFromImage } from './services/geminiService';
import { fileToBase64 } from './utils/imageUtils';
import { AVATAR_STYLES, AvatarStyleKey } from './constants';

interface UploadedImage {
  file: File;
  previewUrl: string;
  base64: string;
  mimeType: string;
}

interface SelectedAvatar {
  src: string;
  styleKey: AvatarStyleKey;
}

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [generatedAvatars, setGeneratedAvatars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<SelectedAvatar | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, загрузите действительный файл изображения.');
      return;
    }
    setError(null);
    const previewUrl = URL.createObjectURL(file);
    try {
      const { base64, mimeType } = await fileToBase64(file);
      setUploadedImage({ file, previewUrl, base64, mimeType });
      setGeneratedAvatars([]);
    } catch (err) {
      setError('Не удалось обработать файл изображения.');
      console.error(err);
    }
  }, []);

  const handleGenerateAvatars = useCallback(async () => {
    if (!uploadedImage) {
      setError('Пожалуйста, сначала загрузите изображение.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedAvatars([]);

    try {
      const styleKeys = Object.keys(AVATAR_STYLES) as AvatarStyleKey[];
      const generated: string[] = [];

      for (const styleKey of styleKeys) {
        const result = await generateAvatarFromImage(
          uploadedImage.base64,
          uploadedImage.mimeType,
          AVATAR_STYLES[styleKey].prompt
        );
        generated.push(result);
        setGeneratedAvatars([...generated]);
      }
    } catch (err: any) {
      console.error(err);
      const errStr = String(err.message || err);
      if (errStr.includes('429') || errStr.includes('RESOURCE_EXHAUSTED')) {
        setError('Достигнут лимит запросов. Пожалуйста, попробуйте еще раз через минуту.');
      } else {
        setError('Произошла ошибка при создании аватаров. Пожалуйста, попробуйте еще раз.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [uploadedImage]);
  
  const handleAvatarClick = (src: string, styleKey: AvatarStyleKey) => {
    setSelectedAvatar({ src, styleKey });
  };

  const handleCloseModal = () => {
    setSelectedAvatar(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mt-4 text-lg text-gray-400">
            Загрузите свою фотографию, чтобы создать шесть уникальных аватаров в культовых мультяшных стилях. Наш ИИ сохранит узнаваемость вашего лица!
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

        {(isLoading || generatedAvatars.length > 0) && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
              Ваши аватары
            </h2>
            <AvatarGrid 
              isLoading={isLoading} 
              avatars={generatedAvatars} 
              onAvatarClick={handleAvatarClick} 
            />
          </div>
        )}
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Работает на Gemini AI</p>
      </footer>

      {selectedAvatar && (
        <Modal
          src={selectedAvatar.src}
          styleName={AVATAR_STYLES[selectedAvatar.styleKey].name}
          fileName={`avatar-${selectedAvatar.styleKey.toLowerCase().replace(/\s/g, '-')}.png`}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;