import News from './news/news';
import Sources from './sources/sources';
import { NewsItem, SourceItem, NewsResponse, SourceResponse } from '../../types/index';

export class AppView {
  news: News = new News();
  sources: Sources = new Sources();

  public drawNews(data: NewsResponse): void {
    const values: Array<NewsItem>  = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: SourceResponse): void {
    const values: Array<SourceItem> = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
