import AppLoader from './appLoader';
import { Callback, SourceResponse, NewsResponse, Options } from '../../types/types';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourceResponse>, options?: Partial<Options>): void {
        super.getResp<SourceResponse>(
            {
                endpoint: 'sources',
                options,
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<NewsResponse>): void {
        if (!(e.target instanceof HTMLElement && e.currentTarget instanceof HTMLElement)) {
            throw new Error();
        }
        let target: HTMLElement = e.target;
        const newsContainer: HTMLElement = e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<NewsResponse>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            if (target.parentElement) target = target.parentElement;
        }
    }
}

export default AppController;
