import BaseComponent from '../../../base-component';
import './modal.scss';

export default class Modal extends BaseComponent {
    private carName: string;

    private time: string;

    constructor(parent: BaseComponent, carName: string, time: string) {
        super('div', ['modal'], parent);
        this.carName = carName;
        this.time = time;
        this.render();
    }

    private render(): void {
        const modalContent = new BaseComponent(
            'p',
            ['modal-text'],
            this,
            `${this.carName} wins in `
        );
        const modalTime = new BaseComponent('span', ['modal-time'], modalContent, `${this.time}s`);
    }
}
