/* eslint-disable @typescript-eslint/lines-between-class-members */
import { BaseComponent } from './components/base-component';
// import NavigationButton from './components/navigation-button/navigation-button';
import GaragePage from './components/pages/garage-page/garage-page';
import { Button } from './components/button/button';
// import { PAGES } from './constants/constants';
import { garageStore, winnersStore } from './store/store';
import { PageName } from './types/types';

class App {
    pages: Map<string, BaseComponent> = new Map();
    pageContainer: BaseComponent | null;

    constructor(appRoot: HTMLElement) {
        this.pageContainer = null;
        this.createView(appRoot);
    }

    createView(appRoot: HTMLElement) {
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
        const garageBtn = new Button({
            parent: navigation,
            classNames: ['garage-button'],
            content: 'TO GARAGE',
            onClick: () => this.onNavBtnClick(PageName.Garage),
        });
        const winnersBtn = new Button({
            parent: navigation,
            classNames: ['winners-button'],
            content: 'TO WINNERS',
            onClick: () => this.onNavBtnClick(PageName.Winners),
        });
        this.pageContainer = new BaseComponent({
            parent: appRoot,
            classNames: ['container'],
        });
        const garagePage = new GaragePage(garageStore);
        this.pages.set(PageName.Garage, garagePage);
        // const winnersPage = new Page();
        // this.pages.set(PageTitle.Winners, winnersPage);
        this.renderActivePage(PageName.Garage);
    }

    onNavBtnClick(pageName: PageName) {
        this.renderActivePage(pageName);
    }

    renderActivePage(pageName: PageName) {
        if (this.pageContainer) {
            this.pageContainer.removeChildren();
            const page = this.pages.get(pageName);
            if (page) {
                this.pageContainer.insertChild(page);
            }
        }
    }
}

const app = new App(document.body);
