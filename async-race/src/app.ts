import BaseComponent from './components/base-component';
import GaragePage from './components/pages/garage-page/garage-page';
import WinnersPage from './components/pages/winners-page/winners-page';
import Button from './components/button/button';
import { garageStore, winnersStore } from './store/store';
import { Page } from './components/pages/page';
import './scss/style.scss';

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
        const header = new BaseComponent('header', ['header'], this.appRoot);
        const heading = new BaseComponent('h1', ['app-title'], header, 'Async Race');
        const navigation = new BaseComponent('nav', ['app-navigation'], header);
        this.toGarageBtn = new Button(
            () => this.setActivePage(this.garagePage),
            navigation,
            ['garage-button'],
            'garage'
        );
        this.toGarageBtn.disable();
        this.toWinnersBtn = new Button(
            () => this.setActivePage(this.winnersPage),
            navigation,
            ['winners-button'],
            'winners'
        );
        this.pageContainer = new BaseComponent('div', ['page-container'], this.appRoot);
        const footer = new BaseComponent('footer', ['footer'], this.appRoot);
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
