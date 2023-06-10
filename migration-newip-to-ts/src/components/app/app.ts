import { NewsResponse, SourceResponse } from '../../types/types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller = new AppController();
    private view = new AppView();

    public start(): void {
        const sourcesElement: HTMLDivElement = document.querySelector('.sources') as HTMLDivElement;
        sourcesElement.addEventListener('click', (e: Event): void =>
            this.controller.getNews(e, (data: NewsResponse | undefined) => {
                if (data) this.view.drawNews(data);
            })
        );
        this.view.drawSelect();

        this.controller.getSources((data: SourceResponse | undefined): void => {
            if (data) this.view.drawSources(data);
        });

        const categorySelectElement: HTMLSelectElement = document.querySelector(
            '.category__select'
        ) as HTMLSelectElement;
        const languageSelectElement: HTMLSelectElement = document.querySelector(
            '.language__select'
        ) as HTMLSelectElement;

        [categorySelectElement, languageSelectElement].forEach((elem) =>
            elem.addEventListener('change', (): void => {
                this.controller.getSources(
                    (data: SourceResponse | undefined): void => {
                        if (data) this.view.drawSources(data);
                    },
                    { category: categorySelectElement.value, language: languageSelectElement.value }
                );
            })
        );
        window.addEventListener('beforeunload', (): void => {
            categorySelectElement.selectedIndex = 0;
            languageSelectElement.selectedIndex = 0;
        });
    }
}

export default App;
