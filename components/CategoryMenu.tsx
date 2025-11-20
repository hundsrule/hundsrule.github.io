
import React from 'react';
import { NAV_ITEMS } from '../data';
import { CategoryType, Language } from '../types';
import { audioService } from '../services/audioService';
import { Skull, Book, Gamepad2, Palette, Eye } from 'lucide-react';

interface CategoryMenuProps {
    currentCategory: CategoryType;
    onSelect: (category: CategoryType) => void;
    language: Language;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ currentCategory, onSelect, language }) => {
    
    const getIcon = (iconName: string) => {
        switch(iconName) {
            case 'skull': return <Skull size={24} />;
            case 'book': return <Book size={24} />;
            case 'gamepad': return <Gamepad2 size={24} />;
            case 'palette': return <Palette size={24} />;
            case 'eye': return <Eye size={24} />;
            default: return null;
        }
    };

    return (
        <nav className="relative z-20 flex flex-wrap justify-center gap-4 mb-12 px-4">
            {NAV_ITEMS.map((item) => {
                const isActive = currentCategory === item.type;
                return (
                    <button
                        key={item.type}
                        onClick={() => {
                            audioService.playSwitch();
                            onSelect(item.type);
                        }}
                        onMouseEnter={() => audioService.playHover()}
                        className={`
                            group relative overflow-hidden
                            transform transition-all duration-200 ease-out
                            ${isActive ? 'scale-105 z-10 shadow-[4px_4px_0px_0px_rgba(230,0,18,1)]' : 'opacity-80 hover:opacity-100 hover:scale-105'}
                            bg-phantom-black border-2
                            ${isActive ? 'border-phantom-red text-phantom-red' : 'border-white text-white hover:border-phantom-red'}
                            px-6 py-3 min-w-[140px] md:min-w-[160px]
                            clip-slant
                        `}
                    >
                        {/* Background Fill Animation */}
                        <div className={`absolute inset-0 bg-white transform origin-left transition-transform duration-300 ease-out ${isActive ? 'scale-x-0' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
                        
                        {/* Content */}
                        <div className={`relative flex items-center justify-center gap-3 font-display text-lg md:text-xl tracking-wider uppercase ${isActive ? '' : 'group-hover:text-phantom-black'}`}>
                            <span className={isActive ? 'animate-pulse' : ''}>{getIcon(item.icon)}</span>
                            <span className={language === 'cn' ? 'font-sans font-bold' : ''}>{item.label[language]}</span>
                        </div>

                        {/* Decorative Glitch lines for active state */}
                        {isActive && (
                            <>
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-phantom-red animate-ping"></div>
                                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-phantom-red animate-ping"></div>
                            </>
                        )}
                    </button>
                );
            })}
        </nav>
    );
};

export default CategoryMenu;
