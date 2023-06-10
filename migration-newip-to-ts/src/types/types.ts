export interface SourceItem {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface NewsItem {
    source: Pick<SourceItem, 'id' | 'name'>;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: NewsItem[];
}

export interface SourceResponse {
    status: string;
    sources: SourceItem[];
}

interface ObjectKeys {
    [key: string]: string;
}

export interface Options extends ObjectKeys {
    apiKey: string;
    category: string;
    language: string;
    sources: string;
}

export interface Params {
    endpoint: Endpoint;
    options?: Partial<Options>;
}

export type Endpoint = 'sources' | 'everything';

export type Callback<T> = (data?: T) => void;

export enum Status {
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    TooManyRequests = 429,
    ServerError = 500,
}

export enum Category {
    All = '',
    Business = 'business',
    Entertainment = 'entertainment',
    General = 'general',
    Health = 'health',
    Science = 'science',
    Sports = 'sports',
    Technology = 'technology',
}

export enum Language {
    All = '',
    Arabic = 'ar',
    German = 'de',
    English = 'en',
    Spanish = 'es',
    French = 'fr',
    Hebrew = 'he',
    Italian = 'it',
    Dutch = 'nl',
    Norwegian = 'no',
    Portuguese = 'pt',
    Russian = 'ru',
    Swedish = 'sv',
    Urdu = 'ud',
    Chinese = 'zh',
}
