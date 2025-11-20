
import React from 'react';
import { LinkItem, Language } from '../types';
import { audioService } from '../services/audioService';
import { ExternalLink, Zap } from 'lucide-react';

interface LinkCardProps {
    item: LinkItem;
    index: number;
    language: Language;
}

const LinkCard: React.FC<LinkCardProps> = ({ item, index, language }) => {
    
    const handleRedirect = () => {
        audioService.playClick();
        
        // Visual feedback before redirect
        const card = document.getElementById(`card-${item.id}`);
        if (card) {
            card.style.transform = "scale(1.1) rotate(2deg)";
            card.style.filter = "invert(1)";
            card.style.transition = "all 0.2s ease";
        }

        setTimeout(() => {
            window.location.href = item.url;
        }, 300);
    };

    return (
        <div 
            id={`card-${item.id}`}
            className="relative group w-full max-w-sm mx-auto h-full"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            {/* Shadow Layer */}
            <div className="absolute inset-0 bg-phantom-red transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-200 ease-out border-2 border-phantom-black"></div>
            
            {/* Main Card */}
            <div 
                className="relative bg-phantom-white h-full border-2 border-phantom-black flex flex-col overflow-hidden transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:-translate-x-1"
                onMouseEnter={() => audioService.playHover()}
            >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden border-b-2 border-phantom-black bg-phantom-black">
                    <img 
                        src={item.imageUrl} 
                        alt={item.title[language]} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://picsum.photos/400/200';
                        }}
                    />
                    
                    {/* Glitch overlay on hover */}
                    <div className="absolute inset-0 bg-phantom-red mix-blend-hard-light opacity-0 group-hover:opacity-30 transition-opacity duration-100"></div>
                    
                    {/* Category Tag */}
                    <div className="absolute top-2 right-2 bg-phantom-black text-white text-xs font-bold px-2 py-1 transform rotate-3 border border-white">
                        {item.category}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow bg-white relative">
                    <h3 className={`text-2xl uppercase text-phantom-black leading-none mb-3 group-hover:text-phantom-red transition-colors ${language === 'cn' ? 'font-sans font-black' : 'font-display'}`}>
                        {item.title[language]}
                    </h3>
                    
                    <div className="w-12 h-1 bg-phantom-red mb-3 transform -skew-x-12"></div>

                    <p className={`text-phantom-gray text-sm font-bold leading-relaxed line-clamp-3 flex-grow ${language === 'cn' ? 'font-sans' : 'font-marker'}`}>
                        {item.description[language]}
                    </p>

                    {/* Action Area */}
                    <div className="mt-4 flex justify-end items-end">
                        <button 
                            onClick={handleRedirect}
                            className="bg-phantom-black text-white hover:bg-phantom-red px-4 py-2 font-display text-lg hover:scale-110 transition-all flex items-center gap-2 clip-shard border border-transparent hover:border-black"
                        >
                            {language === 'en' ? 'ENTER' : '进入'} <Zap size={16} />
                        </button>
                    </div>
                    
                    {item.isExternal && (
                        <div className="absolute top-4 right-4 text-phantom-gray opacity-30 rotate-45">
                            <ExternalLink size={20} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LinkCard;
