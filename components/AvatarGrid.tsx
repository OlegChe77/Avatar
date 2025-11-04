import React from 'react';
import { AVATAR_STYLES, AvatarStyleKey } from '../constants';

interface AvatarGridProps {
  isLoading: boolean;
  avatars: string[];
  onAvatarClick: (avatarSrc: string, styleKey: AvatarStyleKey) => void;
}

const AvatarCard: React.FC<{ 
  src?: string; 
  styleKey: AvatarStyleKey, 
  isLoading: boolean,
  onClick: () => void 
}> = ({ src, styleKey, isLoading, onClick }) => {
  const styleInfo = AVATAR_STYLES[styleKey];

  const cardContent = src ? (
    <img src={src} alt={`Аватар в стиле ${styleInfo.name}`} className="w-full h-full object-contain" />
  ) : isLoading ? (
    <div className="w-full h-full animate-pulse bg-gray-700"></div>
  ) : null;

  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group relative"
      onClick={!isLoading && src ? onClick : undefined}
    >
        <div 
          className={`aspect-square w-full bg-gray-700 flex items-center justify-center ${!isLoading && src ? 'cursor-pointer transform group-hover:scale-105' : ''} transition-transform duration-300`}
        >
          {cardContent}
        </div>
        <div className="p-3 bg-gray-800/50">
          <h3 className="font-bold text-base text-white truncate">{styleInfo.name}</h3>
        </div>
    </div>
  );
};

export const AvatarGrid: React.FC<AvatarGridProps> = ({ isLoading, avatars, onAvatarClick }) => {
  const styleKeys = Object.keys(AVATAR_STYLES) as AvatarStyleKey[];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {styleKeys.map((key, index) => (
        <AvatarCard 
          key={key} 
          styleKey={key} 
          isLoading={isLoading && !avatars[index]} 
          src={avatars[index]} 
          onClick={() => avatars[index] && onAvatarClick(avatars[index], key)}
        />
      ))}
    </div>
  );
};