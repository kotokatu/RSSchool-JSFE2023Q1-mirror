import './news.css';
import { NewsItem } from '../../../types/types';
import { getSafeElement } from '../../../helpers/helpers';
import MyImage from '../../../img/news_placeholder.jpeg';

class News {
    private newsElement: HTMLDivElement = getSafeElement<HTMLDivElement>('.news', document);

    public draw(data: NewsItem[]): void {
        const news: readonly NewsItem[] =
            data.length >= 10 ? data.filter((_item: NewsItem, idx: number): boolean => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = getSafeElement<HTMLTemplateElement>('#newsItemTemp', document);

        news.forEach((item: NewsItem, idx: number): void => {
            if (!(newsItemTemp instanceof HTMLTemplateElement)) {
                throw new Error();
            }
            const newsClone: Node = newsItemTemp.content.cloneNode(true);
            if (!(newsClone instanceof DocumentFragment)) {
                throw new Error();
            }
            if (idx % 2) getSafeElement<HTMLDivElement>('.news__item', newsClone).classList.add('alt');
            getSafeElement<HTMLDivElement>('.news__meta-photo', newsClone).style.backgroundImage = `url(${
                item.urlToImage || `${MyImage}`
            })`;
            getSafeElement<HTMLLIElement>('.news__meta-author', newsClone).textContent =
                item.author || item.source.name;
            getSafeElement<HTMLLIElement>('.news__meta-date', newsClone).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            getSafeElement<HTMLHeadingElement>('.news__description-title', newsClone).textContent = item.title;
            getSafeElement<HTMLHeadingElement>('.news__description-source', newsClone).textContent = item.source.name;
            getSafeElement<HTMLParagraphElement>('.news__description-content', newsClone).textContent =
                item.description;
            getSafeElement<HTMLLinkElement>('.news__read-more a', newsClone).setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        this.clear();
        this.newsElement.append(fragment);
    }

    public clear() {
        this.newsElement.replaceChildren();
    }
}

export default News;
