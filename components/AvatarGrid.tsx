import React from 'react';
import { AVATAR_STYLES, AvatarStyleKey } from '../constants';
import { DownloadIcon } from './Icons';

interface AvatarGridProps {
  isLoading: boolean;
  avatars: string[];
}

const AvatarCard: React.FC<{ src?: string; styleKey: AvatarStyleKey, isLoading: boolean }> = ({ src, styleKey, isLoading }) => {
  const styleInfo = AVATAR_STYLES[styleKey];
  const fileName = `avatar-${styleKey.toLowerCase().replace(/\s/g, '-')}.png`;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 group relative">
      <div className="aspect-square w-full bg-gray-700 flex items-center justify-center">
        {isLoading ? (
          <div className="w-full h-full animate-pulse bg-gray-700"></div>
        ) : (
          src && <img src={src} alt={`${styleInfo.name} avatar`} className="w-full h-full object-contain" />
        )}
      </div>
      
      {src && !isLoading && (
        <a
          href={src}
          download={fileName}
          className="absolute top-3 right-3 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/75 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label={`Download ${styleInfo.name} avatar`}
          title={`Download ${styleInfo.name} avatar`}
        >
          <DownloadIcon className="w-5 h-5" />
        </a>
      )}

      <div className="p-4 bg-gray-800/50">
        <h3 className="font-bold text-lg text-white">{styleInfo.name}</h3>
      </div>
    </div>
  );
};

export const AvatarGrid: React.FC<AvatarGridProps> = ({ isLoading, avatars }) => {
  const styleKeys = Object.keys(AVATAR_STYLES) as AvatarStyleKey[];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {styleKeys.map((key, index) => (
        <AvatarCard 
          key={key} 
          styleKey={key} 
          isLoading={isLoading} 
          src={avatars[index]} 
        />
      ))}
    </div>
  );
};