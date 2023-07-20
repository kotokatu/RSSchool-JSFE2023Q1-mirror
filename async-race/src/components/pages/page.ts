import { BaseComponent } from '../base-component';
import { Store } from '../../store/store';
import Pagination from '../pagination/pagination';

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
        super({ classNames: ['page', `${pageName}-page`] });
        this.store = store;
        this.renderBaseView(pageName);
    }

    protected renderBaseView(pageName: PageName) {
        const title = new BaseComponent({
            tag: 'h2',
            parent: this,
            classNames: ['page-title'],
            content: pageName.toUpperCase(),
        });
        this.carsCountElement = new BaseComponent({
            tag: 'span',
            parent: title,
            classNames: ['cars-count'],
            content: `(#${this.store.carsCount})`,
        });
        this.mainContainer = new BaseComponent({ parent: this, classNames: ['main-container'] });
        this.pagination = new Pagination(this, this.store, () => this.renderMainView());
    }

    protected updateCarsCount(carsCount: number) {
        this.store.carsCount = carsCount;
        this.pagination.updateButtonsState();
        this.carsCountElement.setTextContent(`(#${this.store.carsCount})`);
    }

    protected abstract renderMainView(): void;
}
