import { BaseComponent } from '../../../base-component';

export default class Modal extends BaseComponent {
    carName: string;

    time: string;

    constructor(parent: BaseComponent, carName: string, time: string) {
        super({ parent, classNames: ['modal', 'car-track-modal'] });
        this.carName = carName;
        this.time = time;
        this.render();
    }

    render() {
        const modalContent = new BaseComponent({
            tag: 'p',
            parent: this,
            classNames: ['modal-text'],
            content: `${this.carName} wins in `,
        });
        const modalTime = new BaseComponent({
            tag: 'span',
            parent: modalContent,
            classNames: ['modal-time'],
            content: this.time,
        });
    }
}
