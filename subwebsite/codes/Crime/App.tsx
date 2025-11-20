import React, { useState, useEffect } from 'react';
import { CallingCard } from './components/CallingCard';
import { IntroSequence } from './components/IntroSequence';
import { Background } from './components/Background';

export default function App() {
  const [showCard, setShowCard] = useState(false);

  // Simulate the "Takeover" effect delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-p5gray text-p5white selection:bg-p5black selection:text-p5red">
      <Background active={showCard} />
      
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        {!showCard ? (
          <IntroSequence />
        ) : (
          <CallingCard />
        )}
      </div>
      
      {/* Corner UI Decoration */}
      {showCard && (
        <>
          <div className="fixed top-0 left-0 p-4 text-p5red font-comic text-xl animate-pulse">
            WARNING: PHANTOM THIEVES
          </div>
          <div className="fixed bottom-4 right-4 text-white/20 text-xs font-mono">
             GITHUB_PAGES_HOSTED // SYSTEM_OVERRIDE
          </div>
        </>
      )}
    </div>
  );
}