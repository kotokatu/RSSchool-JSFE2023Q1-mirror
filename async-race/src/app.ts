import { BaseComponent } from './components/base-component';
import GaragePage from './components/pages/garage-page/garage-page';
import WinnersPage from './components/pages/winners-page/winners-page';
import { Button } from './components/button/button';
import { garageStore, winnersStore } from './store/store';
import { PageName } from './types/types';
import Page from './components/pages/page';
import './css/style.css';
import './css/normalize.css';

class App {
    pages: Map<PageName, BaseComponent> = new Map();
    pageContainer: BaseComponent;
    toGarageBtn: Button;
    toWinnersBtn: Button;
    constructor(appRoot: HTMLElement) {
        const header = new BaseComponent({
            tag: 'header',
            parent: appRoot,
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
            onClick: () => this.setActivePage(PageName.Garage),
        });
        this.toGarageBtn.disable();
        this.toWinnersBtn = new Button({
            parent: navigation,
            classNames: ['winners-button'],
            content: 'TO WINNERS',
            onClick: () => this.setActivePage(PageName.Winners),
        });
        this.pageContainer = new BaseComponent({
            parent: appRoot,
            classNames: ['page-container'],
        });
        this.createPages();
    }

    async createPages() {
        const garagePage = new GaragePage(garageStore);
        this.pages.set(PageName.Garage, garagePage);
        const winnersPage = new WinnersPage(winnersStore);
        this.pages.set(PageName.Winners, winnersPage);
        this.renderActivePage(PageName.Garage);
    }

    setActivePage(pageName: PageName) {
        this.renderActivePage(pageName);
        this.toGarageBtn.changeState();
        this.toWinnersBtn.changeState();
    }

    renderActivePage(pageName: PageName) {
        this.pageContainer.clearNode();
        const page = this.pages.get(pageName);

        if (page instanceof Page) {
            this.pageContainer.insertChild(page);
            if (page instanceof WinnersPage) {
                page.renderMainView();
            }
        }
    }
}

const app = new App(document.body);
