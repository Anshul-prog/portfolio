import React, { ReactNode } from 'react';
import { Card3DWrapper } from './3d-card-wrapper';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const sizeMap = { sm: 'w-48 h-64', md: 'w-64 h-80', lg: 'w-80 h-96' };

const GlowCard: React.FC<GlowCardProps> = ({ children, className = '', size = 'md', width, height, customSize = false }) => {
  const getSizeClasses = () => { if (customSize) return ''; return sizeMap[size]; };

  return (
    <Card3DWrapper
      className={`${getSizeClasses()} ${!customSize ? 'aspect-[3/4]' : ''} rounded-2xl relative shadow-[0_1rem_2rem_-1rem_black] p-4 border border-white/[0.08] backdrop-blur-[5px] ${className}`}
    >
      <div 
        style={{
          ...(width !== undefined && { width: typeof width === 'number' ? `${width}px` : width }),
          ...(height !== undefined && { height: typeof height === 'number' ? `${height}px` : height }),
        }}
        className="w-full h-full flex flex-col"
      >
        {children}
      </div>
    </Card3DWrapper>
  );
};

export { GlowCard };
