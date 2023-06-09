import News from './news/news';
import Sources from './sources/sources';
import Select from './select/select';
import { NewsItem, SourceItem, NewsResponse, SourceResponse } from '../../types/types';

export class AppView {
  private news: News = new News();
  private sources: Sources = new Sources();
  private select: Select = new Select();

  public drawNews(data: NewsResponse): void {
    const values: NewsItem[] | [] = data?.articles ? data.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: SourceResponse): void {
    const values: SourceItem[] | [] = data?.sources ? data.sources : [];
    this.sources.draw(values);
  }

  public drawSelect(): void {
    this.select.draw();
  }
}

export default AppView;
