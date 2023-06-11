import AppLoader from './appLoader';
import { HandleApiData, SourceResponse, NewsResponse, Options, Endpoint } from '../../types/types';

class AppController extends AppLoader {
    public getSources(callback: HandleApiData<SourceResponse>, options?: Options): void {
        super.getResp<SourceResponse>(
            {
                endpoint: Endpoint.Sources,
                options,
            },
            callback
        );
    }

    public getNews(e: Event, callback: HandleApiData<NewsResponse>): void {
        if (e.target instanceof HTMLElement && e.currentTarget instanceof HTMLElement) {
            let target: HTMLElement = e.target;
            const newsContainer: HTMLElement = e.currentTarget;

            while (target !== newsContainer) {
                if (target.classList.contains('source__item')) {
                    const sourceId: string | null = target.getAttribute('data-source-id');

                    if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp<NewsResponse>(
                            {
                                endpoint: Endpoint.Everything,
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }

                if (target.parentElement) {
                    target = target.parentElement;
                }
            }
        }
    }
}

export default AppController;
