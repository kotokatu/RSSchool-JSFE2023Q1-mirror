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

export interface Options extends Record<string, string | undefined> {
    apiKey?: string;
    category?: string;
    language?: string;
    sources?: string;
    country?: string;
}

export interface RequestParams {
    endpoint: Endpoint;
    options?: Options;
}

export type HandleApiData<T> = (data?: T) => void;

export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
    Headlines = 'top-headlines',
}

export enum Status {
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    TooManyRequests = 429,
    ServerError = 500,
}

export enum Method {
    Get = 'GET',
    Head = 'HEAD',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
    Options = 'OPTIONS',
    Connect = 'CONNECT',
    Trace = 'TRACE',
    Patch = 'PATCH',
}
