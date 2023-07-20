import { BaseComponent } from './components/base-component';
import GaragePage from './components/pages/garage-page/garage-page';
import WinnersPage from './components/pages/winners-page/winners-page';
import { Button } from './components/button/button';
import { garageStore, winnersStore } from './store/store';
import { Page } from './components/pages/page';
import './css/style.css';
import './css/normalize.css';

class App {
    private appRoot: HTMLElement;

    private garagePage = new GaragePage(garageStore);

    private winnersPage = new WinnersPage(winnersStore);

    private pageContainer!: BaseComponent;

    private toGarageBtn!: Button;

    private toWinnersBtn!: Button;

    constructor(appRoot: HTMLElement) {
        this.appRoot = appRoot;
        this.render();
    }

    private render(): void {
        const header = new BaseComponent({
            tag: 'header',
            parent: this.appRoot,
            classNames: ['header'],
        });
        const navigation = new BaseComponent({
            tag: 'nav',
            parent: header,
            classNames: ['navigation'],
        });
        this.toGarageBtn = new Button({
            parent: navigation,
            classNames: ['garage-button'],
            content: 'TO GARAGE',
            onClick: () => this.setActivePage(this.garagePage),
        });
        this.toGarageBtn.disable();
        this.toWinnersBtn = new Button({
            parent: navigation,
            classNames: ['winners-button'],
            content: 'TO WINNERS',
            onClick: () => this.setActivePage(this.winnersPage),
        });
        this.pageContainer = new BaseComponent({
            parent: this.appRoot,
            classNames: ['page-container'],
        });
        this.renderActivePage(this.garagePage);
    }

    private setActivePage(page: Page): void {
        this.renderActivePage(page);
        this.toGarageBtn.toggleState();
        this.toWinnersBtn.toggleState();
    }

    private renderActivePage(page: Page): void {
        this.pageContainer.clearNode();
        this.pageContainer.insertChild(page);
    }
}

const app = new App(document.body);
