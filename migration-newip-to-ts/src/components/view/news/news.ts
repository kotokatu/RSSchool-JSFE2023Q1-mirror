import './news.css';
import { NewsItem } from '../../../types/types';
import { handleElement } from '../../../helpers/helpers';
import MyImage from '../../../img/news_placeholder.jpeg';

class News {
    private newsElement: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.news');

    public draw(data: NewsItem[]): void {
        const news: readonly NewsItem[] =
            data.length >= 10 ? data.filter((_item: NewsItem, idx: number): boolean => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item: NewsItem, idx: number): void => {
            if (newsItemTemp instanceof HTMLTemplateElement) {
                const newsClone: Node = newsItemTemp.content.cloneNode(true);
                if (newsClone instanceof DocumentFragment) {
                    if (idx % 2) {
                        handleElement<HTMLDivElement>('.news__item', newsClone, (elem) => elem.classList.add('alt'));
                    }
                    handleElement<HTMLDivElement>(
                        '.news__meta-photo',
                        newsClone,
                        (elem) => (elem.style.backgroundImage = `url(${item.urlToImage || MyImage})`)
                    );
                    handleElement<HTMLLIElement>(
                        '.news__meta-author',
                        newsClone,
                        (elem) => (elem.textContent = item.author || item.source.name)
                    );
                    handleElement<HTMLLIElement>(
                        '.news__meta-date',
                        newsClone,
                        (elem) => (elem.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-'))
                    );

                    handleElement<HTMLHeadingElement>(
                        '.news__description-title',
                        newsClone,
                        (elem) => (elem.textContent = item.title)
                    );
                    handleElement<HTMLHeadingElement>(
                        '.news__description-source',
                        newsClone,
                        (elem) => (elem.textContent = item.source.name)
                    );
                    handleElement<HTMLParagraphElement>(
                        '.news__description-content',
                        newsClone,
                        (elem) => (elem.textContent = item.description)
                    );
                    handleElement<HTMLLinkElement>('.news__read-more a', newsClone, (elem) =>
                        elem.setAttribute('href', item.url)
                    );

                    fragment.append(newsClone);
                }
            }
        });
        this.clear();
        if (this.newsElement) {
            this.newsElement.append(fragment);
        }
    }

    public clear() {
        if (this.newsElement) {
            this.newsElement.replaceChildren();
        }
    }
}

export default News;
