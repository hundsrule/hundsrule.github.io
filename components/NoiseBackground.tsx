import React from 'react';

const NoiseBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-phantom-black">
            {/* Halftone Pattern */}
            <div className="absolute inset-0 opacity-20 halftone"></div>
            
            {/* Animated Shapes */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-phantom-red opacity-10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-phantom-gray opacity-20 rounded-full blur-[80px]"></div>
            
            {/* Scratch/Grunge Overlay (CSS simulated) */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}></div>
            
            {/* Diagonal Lines */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute top-[20%] left-[-10%] w-[120%] h-2 bg-phantom-red transform -rotate-12 opacity-60"></div>
                <div className="absolute top-[22%] left-[-10%] w-[120%] h-1 bg-white transform -rotate-12 opacity-30"></div>
                <div className="absolute bottom-[30%] right-[-10%] w-[120%] h-4 bg-phantom-gray transform -rotate-12 opacity-40"></div>
            </div>
        </div>
    );
};

export default NoiseBackground;