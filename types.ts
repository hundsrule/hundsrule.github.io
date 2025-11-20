
export enum CategoryType {
    ALL = 'ALL',
    STUDY = 'STUDY',
    GAMES = 'GAMES',
    CREATIVE = 'CREATIVE',
    PERSONAL = 'PERSONAL'
}

export type Language = 'en' | 'cn';

export interface LocalizedString {
    en: string;
    cn: string;
}

export interface LinkItem {
    id: string;
    title: LocalizedString;
    description: LocalizedString;
    url: string;
    imageUrl: string;
    category: CategoryType;
    isExternal?: boolean;
}

export interface NavItem {
    label: LocalizedString;
    type: CategoryType;
    icon: string;
}
