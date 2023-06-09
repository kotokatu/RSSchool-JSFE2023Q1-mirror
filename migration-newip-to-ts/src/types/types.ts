export interface NewsItem {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface SourceItem {
  id: string,
  name: string,
  description: string,
  url: string,
  category: string,
  language: string,
  country: string
}

export interface NewsResponse {
  status: string,
  totalResults: number,
  articles: NewsItem[]
}

export interface SourceResponse {
  status: string,
  sources: SourceItem[]
}

export interface Options {
  [key: string]: string;
}

export type Endpoint = 'sources' | 'everything';

export interface Params {
  endpoint: Endpoint;
  options?: Options;
}

export type Callback<T> = (data?: T) => void;

export enum Status {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  TooManyRequests = 429,
  ServerError = 500
 }

 export enum Category {
  All = '',
  Business = 'business',
  Entertainment = 'entertainment',
  General = 'general',
  Health = 'health',
  Science = 'science',
  Sports = 'sports',
  Technology = 'technology'
 }
