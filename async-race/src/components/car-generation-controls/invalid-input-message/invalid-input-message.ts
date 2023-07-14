import { BaseComponent } from '../../base-component';
import './invalid-input-message.css';

export default class InvalidInputMessage extends BaseComponent {
    constructor(parent: BaseComponent, msg: string) {
        super({
            tag: 'p',
            parent,
            classNames: ['error'],
            content: msg,
        });
    }

    public show() {
        this.setCssClasses(['visible']);
    }

    public hide() {
        this.removeCssClasses(['visible']);
    }
}
