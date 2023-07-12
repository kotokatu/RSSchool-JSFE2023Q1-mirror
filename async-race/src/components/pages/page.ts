import { BaseComponent } from '../base-component';
import { Store } from '../../store/store';
import Pagination from '../pagination/pagination';
import { PageName } from '../../types/types';
import { CarConfig } from '../../utils/api-utils';

export default abstract class Page extends BaseComponent {
    protected store: Store;
    protected carsCountElement: BaseComponent;
    protected pagination: Pagination;
    protected mainContainer: BaseComponent;
    constructor(pageName: PageName, store: Store) {
        super({ classNames: ['page', `${pageName}-page`] });
        this.store = store;
        const title: BaseComponent = new BaseComponent({
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
        this.pagination = new Pagination(this, this.store, this.updateView.bind(this));
        this.updateView();
    }

    protected updateCarsCount(carsCount: number) {
        this.store.carsCount = carsCount;
        this.pagination.updateButtonsState();
        this.carsCountElement.setTextContent(`(#${this.store.carsCount})`);
    }

    protected abstract updateView(): Promise<void>;
    protected abstract updateCarsView(cars: CarConfig[]): void;
}
