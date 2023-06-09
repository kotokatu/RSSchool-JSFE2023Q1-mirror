import { NewsResponse, SourceResponse } from '../../types/types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  private controller = new AppController();
  private view = new AppView();

  public start() {
    const sourcesElement: HTMLDivElement = document.querySelector('.sources') as HTMLDivElement;
    sourcesElement.addEventListener('click', (e: Event): void => this.controller.getNews(e, (data: NewsResponse | undefined) => {
      if (data) this.view.drawNews(data);
    }));
    this.controller.getSources((data: SourceResponse | undefined): void => {
      if (data) this.view.drawSources(data);
    });
    this.view.drawSelect();
    const selectElement: HTMLSelectElement = document.getElementById('category') as HTMLSelectElement;
    selectElement.addEventListener('change', (e: Event): void => {
      sourcesElement.replaceChildren();
      this.controller.getSources((data: SourceResponse | undefined): void => {
        if (data) this.view.drawSources(data)
      },
        { category: (e.target as HTMLOptionElement).value })});
  }
}

export default App;
