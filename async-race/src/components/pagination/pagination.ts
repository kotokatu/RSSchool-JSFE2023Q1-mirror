import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { Store } from '../../store/store';

const DEFAULT_PAGINATION_PAGE = 1;

export default class Pagination extends BaseComponent {
    prevBtn!: Button;
    nextBtn!: Button;
    pageNumElement!: BaseComponent;
    private store: Store;
    onBtnClick: () => void;
    constructor(parent: BaseComponent, store: Store, onBtnClick: () => void) {
        super({ parent, classNames: ['pagination-container'] });
        this.store = store;
        this.onBtnClick = onBtnClick;
        this.render();
    }

    private render() {
        this.pageNumElement = new BaseComponent({
            tag: 'span',
            parent: this,
            classNames: ['page-number'],
            content: `Page # ${this.store.page}`,
        });
        this.prevBtn = new Button({
            parent: this,
            classNames: ['button-prev'],
            content: '<<',
            onClick: this.handlePrevBtnClick.bind(this),
        });
        this.nextBtn = new Button({
            parent: this,
            classNames: ['button-prev'],
            content: '>>',
            onClick: this.handleNextBtnClick.bind(this),
        });
    }

    private handlePrevBtnClick() {
        this.store.page -= 1;
        this.update();
    }

    private handleNextBtnClick() {
        this.store.page += 1;
        this.update();
    }

    private update() {
        this.updatePageNum();
        this.updateButtonsState();
        this.onBtnClick();
    }

    private updatePageNum() {
        this.pageNumElement.setTextContent(`Page # ${this.store.page}`);
    }

    public updateButtonsState() {
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
