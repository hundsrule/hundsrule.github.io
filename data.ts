
import { CategoryType, LinkItem, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
    { 
        label: { en: 'OVERVIEW', cn: '全息总览' }, 
        type: CategoryType.ALL, 
        icon: 'eye' 
    },
    { 
        label: { en: 'MISSION CONTROL', cn: '核心控制' }, 
        type: CategoryType.PERSONAL, 
        icon: 'skull' 
    },
    { 
        label: { en: 'BRAIN REBOOT', cn: '思维重塑' }, 
        type: CategoryType.STUDY, 
        icon: 'book' 
    },
    { 
        label: { en: 'ARCADE', cn: '街机领域' }, 
        type: CategoryType.GAMES, 
        icon: 'gamepad' 
    },
    { 
        label: { en: 'CHAOS LAB', cn: '混沌实验' }, 
        type: CategoryType.CREATIVE, 
        icon: 'palette' 
    },
];

export const LINKS: LinkItem[] = [
    {
        id: 'blog',
        title: { en: "Hongte's Blog", cn: "洪特的博客" },
        description: { en: "The inner workings of my mind. Enter if you dare.", cn: "洪特的个人博客，欢迎参观。" },
        url: 'http://blog.wht.icu',
        imageUrl: 'subwebsite/images/FlyingWHT.png',
        category: CategoryType.PERSONAL,
        isExternal: true
    },
    {
        id: 'gaokao',
        title: { en: "GaoKao Countdown", cn: "高考倒计时" },
        description: { en: "The doomsday clock is ticking. Functionality as named.", cn: "功能如其名的一个倒计时工具。" },
        url: 'subwebsite/codes/%E9%AB%98%E8%80%83%E5%80%92%E8%AE%A1%E6%97%B6/index.html',
        imageUrl: 'subwebsite/images/image-demostration1/pink.jpg',
        category: CategoryType.STUDY
    },
    {
        id: 'recite',
        title: { en: "Poetry Recite", cn: "古诗背诵" },
        description: { en: "Ancient words, modern suffering. Memorization tool.", cn: "古诗背诵工具，开始背书。" },
        url: 'recite.html',
        imageUrl: 'subwebsite/images/recite.jpeg',
        category: CategoryType.STUDY
    },
    {
        id: 'wordcrusher',
        title: { en: "Word Crusher", cn: "词汇破坏者" },
        description: { en: "WHT Conquers English. Destroy vocabulary.", cn: "WHT征服英语，开始背单词。" },
        url: 'subwebsite/codes/WordCrusher/WordCrusher.html',
        imageUrl: 'subwebsite/images/WordCrusher.jpeg',
        category: CategoryType.STUDY
    },
    {
        id: 'apology',
        title: { en: "Apology Generator", cn: "道歉生成器" },
        description: { en: "Sorry Teacher. Automated regret generation.", cn: "老师对不起，开始道歉。" },
        url: 'subwebsite/codes/Apology/apology.html',
        imageUrl: 'subwebsite/images/FlyingWHT.png',
        category: CategoryType.STUDY
    },
    {
        id: 'rolling-android',
        title: { en: "Rolling WHT (APK)", cn: "滚动的洪特 (安卓)" },
        description: { en: "Android version of the rolling simulation.", cn: "洪特的滚动模拟小游戏安卓版本。" },
        url: 'subwebsite/codes/RollingWHT/RollingWHt.apk',
        imageUrl: 'subwebsite/images/WHT.gif',
        category: CategoryType.GAMES
    },
    {
        id: 'flying-wht',
        title: { en: "Flying WHT", cn: "飞行洪特" },
        description: { en: "Simulation game. Start your question brushing journey.", cn: "洪特的刷题模拟小游戏。" },
        url: 'subwebsite/codes/FlyingWHT/index.html',
        imageUrl: 'subwebsite/images/FlyingWHT.png',
        category: CategoryType.GAMES
    },
    {
        id: 'random-word',
        title: { en: "Random Word", cn: "随机单词" },
        description: { en: "Displays a random word from K048.", cn: "显示一个随机单词。" },
        url: 'subwebsite/codes/RandomWord/index.html',
        imageUrl: 'subwebsite/images/k048.jpg',
        category: CategoryType.CREATIVE
    },
    {
        id: 'k048',
        title: { en: "Project K048", cn: "合成K计划" },
        description: { en: "Synthesize the ultimate K. A puzzle game.", cn: "目标是合成出K的小游戏。" },
        url: 'subwebsite/codes/K048/index.html',
        imageUrl: 'subwebsite/images/k048.jpg',
        category: CategoryType.GAMES
    },
    {
        id: 'album-wall',
        title: { en: "Album Wall", cn: "唱片墙" },
        description: { en: "Convert images into a vinyl record wall.", cn: "将所提供的图片转换为唱片墙。" },
        url: 'subwebsite/codes/AlbumWall/index.html',
        imageUrl: 'subwebsite/images/cover.jpg',
        category: CategoryType.CREATIVE
    },
    {
        id: 'kkk-gen',
        title: { en: "KKK Generator", cn: "KK生成器" },
        description: { en: "Randomly replaces text parts with K.", cn: "将输入的任何文本的一部分随机替换为K。" },
        url: 'subwebsite/codes/kkkgenerator/',
        imageUrl: 'subwebsite/images/imgae-demostration2/kcoffee.png',
        category: CategoryType.CREATIVE
    },
    {
        id: 'rolling-web',
        title: { en: "Rolling WHT (Web)", cn: "滚动的洪特 (网页)" },
        description: { en: "The rolling Hongte experience in browser.", cn: "RollingWHT 滚动的洪特。" },
        url: 'subwebsite/codes/RollingWHT/index.html',
        imageUrl: 'subwebsite/images/WHT.gif',
        category: CategoryType.GAMES
    },
    {
        id: 'rolling-style',
        title: { en: "Rolling WHT (Style)", cn: "滚动的洪特 (风格化)" },
        description: { en: "4399 Version. A stylized web variant.", cn: "RollingWHT 滚动的洪特 风格化网页版。" },
        url: 'subwebsite/codes/RollingWHT/4399version.html',
        imageUrl: 'subwebsite/images/WHTm.jpg',
        category: CategoryType.GAMES
    },
    {
        id: 'furry-1',
        title: { en: "Furry Art I", cn: "福瑞图集 I" },
        description: { en: "A furry image. Fluttershy vibe.", cn: "一张福瑞图片。" },
        url: 'subwebsite/images/Furry1 (1).jpg',
        imageUrl: 'subwebsite/images/Fluttershy.jpg',
        category: CategoryType.CREATIVE
    },
    {
        id: 'furry-2',
        title: { en: "Furry Art II", cn: "福瑞图集 II" },
        description: { en: "Another furry image entry.", cn: "一张福瑞图片。" },
        url: 'subwebsite/images/Furry1 (3).jpg',
        imageUrl: 'subwebsite/images/Furry1 (2).jpg',
        category: CategoryType.CREATIVE
    },
];
