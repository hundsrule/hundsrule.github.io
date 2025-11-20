import React from 'react';
import { motion } from 'framer-motion';

export const IntroSequence: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* Flash Effect */}
      <motion.div 
        className="fixed inset-0 bg-white z-50 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      <motion.div
        initial={{ scale: 5, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="z-20"
      >
        <h1 className="text-9xl font-comic text-white drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] stroke-black tracking-tighter">
          TAKE
        </h1>
      </motion.div>

      <motion.div
        initial={{ x: -1000, skewX: 45 }}
        animate={{ x: 0, skewX: 12 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 20 }}
        className="z-20 -mt-4"
      >
        <h1 className="text-8xl font-comic text-black bg-white px-6 border-4 border-black shadow-[10px_10px_0px_#d91c2b]">
          YOUR
        </h1>
      </motion.div>

      <motion.div
        initial={{ y: 500, rotate: 45, scale: 0.5 }}
        animate={{ y: 0, rotate: -5, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 250, damping: 15 }}
        className="z-20 -mt-2"
      >
        <h1 className="text-9xl font-comic text-p5red drop-shadow-[-5px_5px_0px_#000] animate-pulse">
          HEART
        </h1>
      </motion.div>

      {/* Transition Wipe */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: [1, 1.5, 30], rotate: [0, 45, 180] }}
        transition={{ delay: 1.8, duration: 0.8, ease: "easeInOut" }}
      >
         <div className="w-96 h-96 bg-black star-clip"></div>
      </motion.div>
    </div>
  );
};