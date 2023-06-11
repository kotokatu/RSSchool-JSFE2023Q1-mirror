import { NewsResponse, SourceResponse } from '../../types/types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { handleElement } from '../../helpers/helpers';
import { CATEGORY_SELECT_OPTIONS, LANGUAGE_SELECT_OPTIONS } from '../view/select/selectConfigs';

class App {
    private controller = new AppController();
    private view = new AppView();

    public start(): void {
        const sourcesElement: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.sources');
        const sourcesContainer: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.sources-container');
        sourcesElement?.addEventListener('click', (e: Event): void =>
            this.controller.getNews((data?: NewsResponse): void => {
                if (data) {
                    this.view.drawNews(data);
                }
                sourcesContainer?.classList.remove('visible');
            }, e)
        );
        handleElement<HTMLButtonElement>('.sources-button', document, (elem: HTMLButtonElement): void => {
            elem.addEventListener('click', (): void => {
                sourcesContainer?.classList.toggle('visible');
            });
        });
        const languageSelect: HTMLSelectElement | null = document.querySelector<HTMLSelectElement>('.language__select');
        const categorySelect: HTMLSelectElement | null = document.querySelector<HTMLSelectElement>('.category__select');

        handleElement<HTMLSelectElement>('.category__select', document, (elem: HTMLSelectElement): void => {
            this.view.drawSelect(CATEGORY_SELECT_OPTIONS, elem);
            elem.addEventListener('change', (): void => {
                this.controller.getSources(
                    (data?: SourceResponse): void => {
                        if (data) {
                            this.view.drawSources(data);
                        }
                    },
                    { category: elem.value, language: languageSelect?.value }
                );
            });
        });

        handleElement<HTMLSelectElement>('.language__select', document, (elem: HTMLSelectElement): void => {
            this.view.drawSelect(LANGUAGE_SELECT_OPTIONS, elem);
            elem.addEventListener('change', (): void => {
                this.controller.getSources(
                    (data?: SourceResponse): void => {
                        if (data) {
                            this.view.drawSources(data);
                        }
                    },
                    { category: categorySelect?.value, language: elem.value }
                );
            });
        });

        this.controller.getSources((data?: SourceResponse): void => {
            if (data) {
                this.view.drawSources(data);
            }
        });

        this.controller.getHeadlines((data?: NewsResponse): void => {
            if (data) {
                this.view.drawNews(data);
            }
        });

        window.addEventListener('beforeunload', (): void => {
            if (categorySelect) {
                categorySelect.selectedIndex = 0;
            }
            if (languageSelect) {
                languageSelect.selectedIndex = 0;
            }
        });
    }
}

export default App;
