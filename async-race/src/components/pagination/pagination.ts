import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { Store } from '../../store/store';

const DEFAULT_PAGINATION_PAGE = 1;

export default class Pagination extends BaseComponent {
    prevBtn: Button;
    nextBtn: Button;
    pageNumElement: BaseComponent;
    store: Store;
    onPrev: () => void;
    onNext: () => void;
    constructor(parent: BaseComponent, store: Store, onPrev: () => void, onNext: () => void) {
        super({ parent, classNames: ['pagination-container'] });
        this.store = store;
        this.onPrev = onPrev;
        this.onNext = onNext;
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
            onClick: this.handlePrevBtn.bind(this),
        });
        this.nextBtn = new Button({
            parent: this,
            classNames: ['button-prev'],
            content: '>>',
            onClick: this.handleNextBtn.bind(this),
        });
        this.updateButtonsState();
    }

    private handlePrevBtn() {
        this.store.page -= 1;
        this.updatePageNum();
        this.updateButtonsState();
        this.onPrev();
    }

    private handleNextBtn() {
        this.store.page += 1;
        this.updatePageNum();
        this.updateButtonsState();
        this.onNext();
    }

    private updatePageNum() {
        this.pageNumElement.setTextContent(`Page # ${this.store.page}`);
    }

    private updateButtonsState() {
        if (this.store.page === DEFAULT_PAGINATION_PAGE) {
            this.prevBtn.setAttr('disabled', 'true');
        } else {
            this.prevBtn.removeAttr('disabled');
        }
        if (this.store.page === Math.ceil(this.store.carsCount / this.store.limit)) {
            this.nextBtn.setAttr('disabled', 'true');
        } else {
            this.nextBtn.removeAttr('disabled');
        }
    }
}
