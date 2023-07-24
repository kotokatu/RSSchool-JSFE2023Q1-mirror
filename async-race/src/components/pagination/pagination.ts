import BaseComponent from '../base-component';
import Button from '../button/button';
import { Store } from '../../store/store';
import './pagination.scss';

const DEFAULT_PAGINATION_PAGE = 1;

export default class Pagination extends BaseComponent {
    private prevBtn!: Button;

    private nextBtn!: Button;

    private pageNumElement!: BaseComponent;

    private store: Store;

    private onBtnClick: () => void;

    constructor(parent: BaseComponent, store: Store, onBtnClick: () => void) {
        super('div', ['pagination-container'], parent);
        this.store = store;
        this.onBtnClick = onBtnClick;
        this.render();
    }

    private render(): void {
        this.prevBtn = new Button(() => this.handlePrevBtnClick(), this, ['button-prev'], '<<');
        this.pageNumElement = new BaseComponent(
            'span',
            ['page-number'],
            this,
            this.store.page.toString()
        );
        this.nextBtn = new Button(() => this.handleNextBtnClick(), this, ['button-next'], '>>');
    }

    private handlePrevBtnClick(): void {
        this.store.page -= 1;
        this.update();
    }

    private handleNextBtnClick(): void {
        this.store.page += 1;
        this.update();
    }

    private update(): void {
        this.updatePageNum();
        this.updateButtonsState();
        this.onBtnClick();
    }

    private updatePageNum(): void {
        this.pageNumElement.setTextContent(this.store.page.toString());
    }

    public updateButtonsState(): void {
        if (this.store.page === DEFAULT_PAGINATION_PAGE) {
            this.prevBtn.disable();
        } else {
            this.prevBtn.enable();
        }

        if (this.store.page === Math.ceil(this.store.carsCount / this.store.limit)) {
            this.nextBtn.disable();
        } else {
            this.nextBtn.enable();
        }
    }
}
