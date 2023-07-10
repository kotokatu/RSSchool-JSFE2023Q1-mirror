import { BaseComponent } from './components/base-component';
import GaragePage from './components/pages/garage-page/garage-page';
import WinnersPage from './components/pages/winners-page/winners-page';
import { Button } from './components/button/button';
import { garageStore, winnersStore } from './store/store';
import { PageName } from './types/types';
import { getCarsCount, getWinnersCount } from './utils/api-utils';

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

        this.pageContainer = new BaseComponent({
            parent: appRoot,
            classNames: ['page-container'],
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
        this.createPages();
    }

    async createInitialState() {
        const carsCount = await getCarsCount();
        garageStore.carsCount = carsCount;
        const winnersCount = await getWinnersCount();
        winnersStore.carsCount = winnersCount;
    }

    async createPages() {
        await this.createInitialState();
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
        this.pageContainer.removeChildren();
        const page = this.pages.get(pageName);

        if (page) {
            this.pageContainer.insertChild(page);
        }
    }
}

const app = new App(document.body);
