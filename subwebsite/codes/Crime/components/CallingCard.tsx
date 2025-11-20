import React from 'react';
import { motion } from 'framer-motion';
import { RansomText } from './RansomText';

export const CallingCard: React.FC = () => {
  return (
    <motion.div 
      className="relative w-full max-w-4xl perspective-1000"
      initial={{ rotateY: 90, scale: 0.5, opacity: 0 }}
      animate={{ rotateY: 0, scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 12, 
        mass: 1.2,
        delay: 0.2 
      }}
    >
      {/* The Card Container */}
      <div className="relative bg-p5white transform -rotate-2 shadow-[20px_20px_0px_rgba(0,0,0,0.8)] border-4 border-black p-6 md:p-12 overflow-hidden group">
        
        {/* Decorative Tape */}
        <div className="absolute -top-6 left-1/2 w-32 h-12 bg-yellow-400/80 -rotate-3 transform -translate-x-1/2 shadow-sm z-20"></div>
        
        {/* Dynamic Stamp Animation */}
        <motion.div 
          className="absolute top-4 right-4 z-30 opacity-80 pointer-events-none"
          initial={{ scale: 2, opacity: 0, rotate: 45 }}
          animate={{ scale: 1, opacity: 0.8, rotate: -15 }}
          transition={{ delay: 1.8, type: "spring", stiffness: 300 }}
        >
          <div className="border-4 border-p5red rounded-full w-32 h-32 flex items-center justify-center">
             <span className="text-p5red font-comic text-xl font-bold -rotate-12">TAKE YOUR<br/>HEART</span>
          </div>
        </motion.div>

        {/* Header: Target */}
        <div className="mb-8 relative">
          <motion.div
            initial={{ x: -200, opacity: 0, skewX: 20 }}
            animate={{ x: 0, opacity: 1, skewX: -12 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="inline-block bg-black text-p5red px-4 py-2 border-2 border-white shadow-[5px_5px_0px_#d91c2b]"
          >
            <h2 className="text-3xl font-black font-sans tracking-widest">致: 叶利钦老师</h2>
          </motion.div>
        </div>

        {/* Main Body: The "Crimes" */}
        <div className="space-y-6 mb-12 relative z-10">
          <div className="transform rotate-1 hover:scale-105 transition-transform duration-100">
            <RansomText 
              text="背诵《过秦论》的暴君啊！" 
              baseSize="text-3xl md:text-5xl" 
              className="mb-4"
            />
          </div>
          
          <div className="bg-black/5 p-4 transform -skew-x-6 border-l-4 border-p5red relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-p5red/10"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
            <p className="text-xl md:text-2xl font-marker text-black leading-relaxed relative z-10">
              您将<span className="bg-black text-white px-1 mx-1">枯燥的背诵</span>强加于我们，
              <br/>
              用那种<span className="text-p5red font-black text-3xl mx-1">令人窒息</span>的古文
              <br/>
              扭曲了我们对语文的热爱。
            </p>
          </div>

          <div className="transform -rotate-1">
            <RansomText 
              text="这无法原谅的『强迫之罪』" 
              baseSize="text-2xl md:text-4xl"
            />
          </div>
          
           <div className="transform rotate-1 ml-8">
            <RansomText 
              text="我们已全数知晓！" 
              baseSize="text-2xl md:text-4xl"
            />
          </div>
        </div>

        {/* The Verdict/Promise */}
        <div className="relative border-t-4 border-dashed border-black pt-8 mt-8">
          <motion.div 
            className="text-center space-y-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
          >
            <p className="text-4xl font-brush text-p5red transform -rotate-2">
              您的“扭曲欲望”
            </p>
            <div className="inline-block bg-p5red text-white px-8 py-4 transform skew-x-12 shadow-[8px_8px_0px_#000] hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] transition-all cursor-default">
               <h1 className="text-4xl md:text-6xl font-black font-sans uppercase animate-pulse-fast">
                 我们收下了!
               </h1>
            </div>
            <p className="text-lg font-mono bg-black text-white inline-block px-2 mt-4 transform -rotate-1">
              从今往后，不需要再背书了 (才怪)
            </p>
          </motion.div>
        </div>

        {/* Footer / Sender */}
        <div className="mt-12 flex justify-end items-end">
          <div className="text-right transform rotate-3">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">SENDER</p>
            <div className="flex flex-col items-end">
              <span className="text-3xl font-marker text-black drop-shadow-[2px_2px_0px_rgba(255,0,0,0.5)]">
                王洪特
              </span>
              <span className="text-xl font-comic text-p5red">
                (The Phantom Thief)
              </span>
            </div>
          </div>
          
          {/* Phantom Logo Approximation */}
          <motion.div 
            className="ml-6 w-24 h-24 bg-black rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
             <span className="text-5xl relative z-10">🎩</span>
             <div className="absolute inset-0 bg-red-600 mix-blend-overlay animate-pulse"></div>
          </motion.div>
        </div>

        {/* Visual Noise / Splatters */}
        <div className="absolute top-1/4 right-10 w-32 h-32 bg-p5red rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-black rounded-full mix-blend-overlay filter blur-2xl opacity-20"></div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        <motion.button 
          whileHover={{ scale: 1.1, rotate: -3, backgroundColor: "#d91c2b", color: "#000" }}
          whileTap={{ scale: 0.9 }}
          className="bg-black text-white font-comic text-2xl px-8 py-3 border-2 border-p5red shadow-[5px_5px_0px_#d91c2b] transition-colors"
          onClick={() => window.location.reload()}
        >
          再次发送
        </motion.button>
        
        <motion.a 
          href="https://hundsrule.github.io"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, rotate: 3, backgroundColor: "#000", color: "#fff" }}
          whileTap={{ scale: 0.9 }}
          className="bg-white text-black font-comic text-2xl px-8 py-3 border-2 border-black shadow-[5px_5px_0px_#000] flex items-center gap-2 no-underline"
        >
          <span>支持怪盗团</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </motion.a>
      </div>
    </motion.div>
  );
};