import './news.css';
import { NewsItem } from '../../../types/types';
import { getSafeElement } from '../../../helpers/helpers';

class News {
    private newsElement: HTMLDivElement = getSafeElement('.news');

    public draw(data: NewsItem[]): void {
        const news: readonly NewsItem[] =
            data.length >= 10 ? data.filter((_item: NewsItem, idx: number): boolean => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = getSafeElement('#newsItemTemp');

        news.forEach((item: NewsItem, idx: number): void => {
            if (!(newsItemTemp instanceof HTMLTemplateElement)) {
                throw new Error();
            }
            const newsClone: Node = newsItemTemp.content.cloneNode(true);
            if (!(newsClone instanceof DocumentFragment)) {
                throw new Error();
            }
            if (idx % 2) getSafeElement('.news__item').classList.add('alt');
            getSafeElement('.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            getSafeElement('.news__meta-author').textContent = item.author || item.source.name;
            getSafeElement('.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            getSafeElement('.news__description-title').textContent = item.title;
            getSafeElement('.news__description-source').textContent = item.source.name;
            getSafeElement('.news__description-content').textContent = item.description;
            getSafeElement('.news__read-more a').setAttribute('href', item.url);

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
