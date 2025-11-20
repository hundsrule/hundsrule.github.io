
import React, { useState, useEffect, useMemo } from 'react';
import { LINKS } from './data';
import { CategoryType, Language } from './types';
import NoiseBackground from './components/NoiseBackground';
import CategoryMenu from './components/CategoryMenu';
import LinkCard from './components/LinkCard';
import { Volume2, VolumeX, Github, Mail, Video, Globe } from 'lucide-react';

const App: React.FC = () => {
    // Initialize language based on browser preference
    const [language, setLanguage] = useState<Language>(() => {
        const browserLang = navigator.language.toLowerCase();
        return browserLang.startsWith('zh') ? 'cn' : 'en';
    });
    
    const [category, setCategory] = useState<CategoryType>(CategoryType.ALL);
    const [isMuted, setIsMuted] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'cn' : 'en');
    };

    // Filter links based on category
    const filteredLinks = useMemo(() => {
        if (category === CategoryType.ALL) return LINKS;
        return LINKS.filter(link => link.category === category);
    }, [category]);

    return (
        <div className={`min-h-screen w-full font-sans selection:bg-phantom-red selection:text-white transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <NoiseBackground />

            {/* Top Bar Controls */}
            <div className="fixed top-4 right-4 z-50 flex gap-4">
                 {/* Language Toggle */}
                <button 
                    onClick={toggleLanguage}
                    className="bg-phantom-black border-2 border-white text-white p-2 hover:bg-white hover:text-phantom-black transition-colors transform hover:scale-110 flex items-center gap-2 font-display shadow-lg"
                >
                    <Globe size={20} />
                    <span className="font-bold">{language === 'en' ? 'CN' : 'EN'}</span>
                </button>
            </div>

            {/* Audio Control for BGM */}
            <div className="fixed bottom-4 left-4 z-50 bg-phantom-black border-2 border-white p-2 transform -skew-x-12 hover:scale-110 transition-transform shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] cursor-pointer">
                <button 
                    onClick={() => {
                        setIsMuted(!isMuted);
                        const audio = document.getElementById('bgm-audio') as HTMLAudioElement;
                        if(audio) audio.muted = !audio.muted;
                    }}
                    className="text-white flex items-center gap-2 font-display transform skew-x-12"
                >
                    {isMuted ? <VolumeX color="#E60012" /> : <Volume2 color="#E60012" />}
                    <span className="hidden md:inline text-xs tracking-widest">BGM: VELVET ROOM</span>
                </button>
                <audio id="bgm-audio" src="subwebsite/BGM.mp3" autoPlay loop className="hidden" />
            </div>

            {/* Social Links */}
            <div className="fixed bottom-4 right-4 z-50 flex gap-2">
                {[
                    { icon: Github, href: "https://github.com/hundsrule", color: "hover:text-phantom-red" },
                    { icon: Video, href: "https://space.bilibili.com/176868483", color: "hover:text-blue-400" },
                    { icon: Mail, href: "mailto:wanghongte@outlook.com", color: "hover:text-yellow-400" }
                ].map((social, idx) => (
                    <a 
                        key={idx}
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`bg-phantom-black border border-white p-3 text-white ${social.color} transition-transform hover:-translate-y-2 shadow-lg`}
                    >
                        <social.icon size={20} />
                    </a>
                ))}
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
                
                {/* Header Section */}
                <header className="text-center mb-12 mt-8">
                    <div className="inline-block relative group cursor-default select-none">
                        <h1 className="font-display text-6xl md:text-9xl text-white tracking-tighter uppercase transform -rotate-2 relative z-10 text-shadow-pop group-hover:animate-glitch">
                            HONGTE'S
                            <br />
                            <span className="text-phantom-red">VELVET ROOM</span>
                        </h1>
                        {/* Spray Paint Effect Behind Text */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-black blur-xl -z-10 opacity-80"></div>
                    </div>
                    
                    <div className="mt-8 max-w-3xl mx-auto bg-phantom-white transform rotate-1 p-6 border-l-8 border-phantom-red shadow-xl hover:scale-[1.02] transition-transform">
                        <p className={`text-phantom-black text-xl md:text-2xl transform -rotate-1 ${language === 'cn' ? 'font-sans font-bold' : 'font-marker'}`}>
                            {language === 'en' 
                                ? '"Welcome to the Velvet Room. What is your desire today?"'
                                : '"欢迎来到洪特的天鹅绒房间。今天想要干什么呢？"'}
                        </p>
                    </div>
                </header>

                {/* Navigation */}
                <CategoryMenu currentCategory={category} onSelect={setCategory} language={language} />

                {/* Grid Content */}
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-32">
                    {filteredLinks.map((link, index) => (
                        <div key={link.id} className="animate-pop-in" style={{ animationDelay: `${index * 50}ms` }}>
                            <LinkCard item={link} index={index} language={language} />
                        </div>
                    ))}
                </main>

                {/* Footer / About */}
                <footer className="mt-auto text-center py-12 border-t-4 border-phantom-red bg-phantom-black text-white relative overflow-hidden">
                     {/* Background Texture */}
                     <div className="absolute inset-0 opacity-10 pointer-events-none halftone"></div>
                     
                     <div className="relative z-10 max-w-2xl mx-auto px-4">
                        <div className="mb-8">
                            <h4 className={`text-2xl mb-4 text-phantom-red ${language === 'cn' ? 'font-sans font-black' : 'font-display'}`}>
                                {language === 'en' ? 'ABOUT THE CREATOR' : '关于创作者'}
                            </h4>
                            <p className={`text-gray-300 leading-loose text-lg ${language === 'cn' ? 'font-sans' : 'font-mono text-sm'}`}>
                                {language === 'en' 
                                    ? "Hello, I am Hongte, a high school senior. I created this webpage in my limited free time. Most of the programming was done by AI. My own programming skills are limited. If you have suggestions, please email me."
                                    : "你好，我是洪特，一个高三学生。我在有限的空闲时间创建了这个网页。大多数的编程都是AI完成的。我本人的编程水平很有限。如果有建议，欢迎发邮件给我。"}
                            </p>
                        </div>
                        
                        <div className="w-full h-[1px] bg-gray-700 my-6"></div>
                        
                        <p className="font-mono text-xs text-gray-500">
                            DESIGNED BY AI // CURATED BY HONGTE<br/>
                            SYSTEM VERSION 2.1 // REBEL EDITION
                        </p>
                     </div>
                </footer>

            </div>
        </div>
    );
};

export default App;
