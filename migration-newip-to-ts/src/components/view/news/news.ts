import './news.css';
import { NewsItem } from '../../../types/types';

class News {
    public draw(data: NewsItem[]): void {
        const news: readonly NewsItem[] =
            data.length >= 10 ? data.filter((_item: NewsItem, idx: number): boolean => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item: NewsItem, idx: number): void => {
            if (!(newsItemTemp instanceof HTMLTemplateElement)) {
                throw new Error();
            }
            const newsClone: Node = newsItemTemp.content.cloneNode(true);
            if (!(newsClone instanceof DocumentFragment)) {
                throw new Error();
            }
            if (idx % 2) (newsClone.querySelector('.news__item') as HTMLDivElement).classList.add('alt');
            (newsClone.querySelector('.news__meta-photo') as HTMLDivElement).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            (newsClone.querySelector('.news__meta-author') as HTMLLIElement).textContent =
                item.author || item.source.name;
            (newsClone.querySelector('.news__meta-date') as HTMLLIElement).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            (newsClone.querySelector('.news__description-title') as HTMLHeadingElement).textContent = item.title;
            (newsClone.querySelector('.news__description-source') as HTMLHeadingElement).textContent = item.source.name;
            (newsClone.querySelector('.news__description-content') as HTMLParagraphElement).textContent =
                item.description;
            (newsClone.querySelector('.news__read-more a') as HTMLLinkElement).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElement: HTMLDivElement = document.querySelector('.news') as HTMLDivElement;
        newsElement.replaceChildren();
        newsElement.append(fragment);
    }
}

export default News;
