import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundProps {
  active: boolean;
}

export const Background: React.FC<BackgroundProps> = ({ active }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-p5gray">
      {/* Base Red Layer */}
      <div className="absolute inset-0 bg-p5red mix-blend-multiply" />
      
      {/* Halftone Overlay */}
      <div className="absolute inset-0 opacity-20 halftone-pattern" />

      {/* Rotating Starburst - Faster */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250vw] h-[250vw] opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 left-1/2 h-full w-24 origin-bottom bg-black"
            style={{ transform: `rotate(${i * 22.5}deg) translateX(-50%)` }}
          />
        ))}
      </motion.div>

      {/* Diagonal Stripes Animation - Aggressive */}
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
        >
          <motion.div 
            className="absolute top-0 -left-1/4 w-[150%] h-40 bg-black -rotate-6 transform translate-y-20 mix-blend-overlay"
            animate={{ y: [20, 40, 20] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-0 -left-1/4 w-[150%] h-80 bg-black rotate-3 transform -translate-y-10 opacity-40"
            animate={{ rotate: [3, 1, 3] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          />
          
          {/* Random Glitch Lines */}
          <motion.div 
            className="absolute top-1/4 left-0 w-full h-2 bg-white opacity-50"
            animate={{ x: [-1000, 1000], opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.div>
      )}

      {/* Floating Particles - Chaotic */}
      {active && Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-white/30 font-comic text-2xl"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight, 
            scale: 0 
          }}
          animate={{ 
            y: [null, Math.random() * -200],
            x: [null, (Math.random() - 0.5) * 50],
            opacity: [0, 1, 0],
            scale: [0, Math.random() * 2, 0],
            rotate: Math.random() * 720
          }}
          transition={{
            duration: 1 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut"
          }}
        >
          {i % 2 === 0 ? '★' : '♦'}
        </motion.div>
      ))}
    </div>
  );
};