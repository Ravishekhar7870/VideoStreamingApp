import React, { ReactNode } from 'react';

interface HoverHintProps {
  hintText: string;
  children: ReactNode;
}

const HoverHint: React.FC<HoverHintProps> = ({ hintText, children }) => {
  return (
    <div className="relative inline-block group">
      {children}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 mt-1">
        {hintText}
      </div>
    </div>
  );
};

export default HoverHint;