import { NewsResponse, SourceResponse, Category, Language } from '../../types/types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { handleElement } from '../../helpers/helpers';

class App {
    private controller = new AppController();
    private view = new AppView();

    public start(): void {
        const sourcesElement: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.sources');
        const sourcesContainer: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.sources-container');
        sourcesElement?.addEventListener('click', (e: Event): void =>
            this.controller.getNews(e, (data?: NewsResponse) => {
                if (data) {
                    this.view.drawNews(data);
                }
                sourcesContainer?.classList.remove('visible');
            })
        );
        handleElement<HTMLButtonElement>('.sources-button', document, (elem) => {
            elem.addEventListener('click', (): void => {
                sourcesContainer?.classList.toggle('visible');
            });
        });
        const languageSelectElement: HTMLSelectElement | null = document.querySelector<HTMLSelectElement>(
            '.language__select'
        );
        const categorySelectElement: HTMLSelectElement | null = document.querySelector<HTMLSelectElement>(
            '.category__select'
        );

        handleElement<HTMLSelectElement>('.category__select', document, (elem) => {
            this.view.drawSelect(Category, elem);
            elem.addEventListener('change', (): void => {
                this.controller.getSources(
                    (data?: SourceResponse): void => {
                        if (data) {
                            this.view.drawSources(data);
                        }
                    },
                    { category: elem.value, language: languageSelectElement?.value }
                );
            });
        });

        handleElement<HTMLSelectElement>('.language__select', document, (elem) => {
            this.view.drawSelect(Language, elem);
            elem.addEventListener('change', (): void => {
                this.controller.getSources(
                    (data?: SourceResponse): void => {
                        if (data) {
                            this.view.drawSources(data);
                        }
                    },
                    { category: categorySelectElement?.value, language: elem.value }
                );
            });
        });

        this.controller.getSources((data?: SourceResponse): void => {
            if (data) {
                this.view.drawSources(data);
            }
        });

        window.addEventListener('beforeunload', (): void => {
            if (categorySelectElement) {
                categorySelectElement.selectedIndex = 0;
            }
            if (languageSelectElement) {
                languageSelectElement.selectedIndex = 0;
            }
        });
    }
}

export default App;
