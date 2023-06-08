export interface NewsItem {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
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

export type NewsResponse = {
  status: string,
  totalResults: number,
  articles: Array<NewsItem>
}

export type SourceResponse = {
  status: string,
  sources: Array<SourceItem>
}

