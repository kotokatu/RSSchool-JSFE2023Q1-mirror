import { BaseComponent } from '../base-component';
import { Store } from '../../store/store';
import Pagination from '../pagination/pagination';
import { PageName } from '../../types/types';

export default abstract class Page extends BaseComponent {
    private store: Store;
    carsCountElement: BaseComponent;
    constructor(pageName: PageName, store: Store) {
        super({ classNames: ['page'] });
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
        const pagination = new Pagination(
            this,
            this.store,
            this.onPrevBtnClick.bind(this),
            this.onNextBtnClick.bind(this)
        );
    }

    abstract onNextBtnClick(): void;

    abstract onPrevBtnClick(): void;
}
