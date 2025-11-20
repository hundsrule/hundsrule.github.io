import React from 'react';
import { motion } from 'framer-motion';

interface RansomTextProps {
  text: string;
  baseSize?: string; // e.g. 'text-xl', 'text-4xl'
  className?: string;
}

const FONTS = ['font-sans', 'font-marker', 'font-brush', 'font-comic'];
const COLORS = ['text-white', 'text-black', 'text-p5red', 'text-yellow-400'];
const BGS = ['bg-black', 'bg-white', 'bg-transparent', 'bg-p5red'];

export const RansomText: React.FC<RansomTextProps> = ({ text, baseSize = 'text-2xl', className = '' }) => {
  // Deterministic randomness based on index to prevent jitter on re-render
  const chars = text.split('');

  return (
    <div className={`flex flex-wrap justify-center items-center gap-1 ${className}`}>
      {chars.map((char, i) => {
        if (char === ' ') return <span key={i} className="w-4" />;
        
        const rot = (i * 33 % 20) - 10; // deterministic random -10 to 10
        const scale = 1 + (i * 7 % 4) / 10; // 1.0 to 1.3
        const font = FONTS[i % FONTS.length];
        const color = COLORS[i % COLORS.length];
        const bg = BGS[(i + 1) % BGS.length];
        const isInverted = i % 3 === 0;

        return (
          <motion.span
            key={i}
            className={`
              inline-block px-1 py-0.5 rounded-sm shadow-sm
              ${baseSize} ${font}
              ${isInverted ? 'bg-black text-white' : 'bg-white text-black'}
              border-2 border-black
            `}
            initial={{ opacity: 0, y: 50, rotate: Math.random() * 360 }}
            animate={{ opacity: 1, y: 0, rotate: rot }}
            whileHover={{ scale: 1.5, rotate: 0, zIndex: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: i * 0.03 }}
          >
            {char}
          </motion.span>
        );
      })}
    </div>
  );
};