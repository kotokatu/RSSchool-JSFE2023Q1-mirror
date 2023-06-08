import './news.css';
import { NewsItem } from '../../../types/index';

class News {
  public draw(data: Array<NewsItem>): void {
    const news: Array<NewsItem> = data.length >= 10 ? data.filter((_item: NewsItem, idx: number): boolean => idx < 10) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

    news.forEach((item: NewsItem, idx: number) => {
      if (newsItemTemp instanceof HTMLTemplateElement) {
        const newsClone: Node = newsItemTemp.content.cloneNode(true);
        if (!(newsClone instanceof DocumentFragment)) {
          throw new Error()
        }
        if (idx % 2) (newsClone.querySelector('.news__item') as HTMLDivElement).classList.add('alt');
//TODO!!!
        newsClone.querySelector<HTMLDivElement>('.news__meta-photo')!.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'
          })`;
        (newsClone.querySelector('.news__meta-author') as HTMLDivElement).textContent = item.author || item.source.name;
        (newsClone.querySelector('.news__meta-date') as HTMLDivElement).textContent = item.publishedAt
          .slice(0, 10)
          .split('-')
          .reverse()
          .join('-');

        (newsClone.querySelector('.news__description-title') as HTMLDivElement).textContent = item.title;
        (newsClone.querySelector('.news__description-source') as HTMLDivElement).textContent = item.source.name;
        (newsClone.querySelector('.news__description-content') as HTMLDivElement).textContent = item.description;
        (newsClone.querySelector('.news__read-more a') as HTMLDivElement).setAttribute('href', item.url);

        fragment.append(newsClone);

      }
    });

    (document.querySelector('.news') as HTMLElement).innerHTML = '';
    (document.querySelector('.news') as HTMLElement).appendChild(fragment);
  }
}

export default News;
