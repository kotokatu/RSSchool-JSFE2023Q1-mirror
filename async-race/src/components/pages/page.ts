import BaseComponent from '../base-component';
import { Store } from '../../store/store';
import Pagination from '../pagination/pagination';
import './page.scss';

export enum PageName {
    Garage = 'garage',
    Winners = 'winners',
}

export abstract class Page extends BaseComponent {
    protected store: Store;

    protected carsCountElement!: BaseComponent;

    protected pagination!: Pagination;

    protected mainContainer!: BaseComponent;

    constructor(pageName: PageName, store: Store) {
        super('div', ['page', `${pageName}-page`]);
        this.store = store;
        this.renderBaseView(pageName);
    }

    protected renderBaseView(pageName: PageName) {
        const title = new BaseComponent('h2', ['page-title'], this, pageName);
        this.carsCountElement = new BaseComponent(
            'span',
            ['cars-count'],
            title,
            `(#${this.store.carsCount})`
        );
        this.mainContainer = new BaseComponent('div', ['main-container'], this);
        this.pagination = new Pagination(this, this.store, () => this.renderMainView());
    }

    protected updateCarsCount(carsCount: number) {
        this.store.carsCount = carsCount;
        this.pagination.updateButtonsState();
        this.carsCountElement.setTextContent(`(#${this.store.carsCount})`);
    }

    protected abstract renderMainView(): void;
}
