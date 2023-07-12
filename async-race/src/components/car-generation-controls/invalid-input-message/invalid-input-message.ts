import { BaseComponent } from '../../base-component';

export default class ErrorMessage extends BaseComponent {
    constructor(msg: string) {
        super({
            tag: 'p',
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
