import BaseComponent from '../base-component';
import './button.scss';

export default class Button extends BaseComponent {
    private isDisabled = false;

    constructor(
        onClick: (e: Event) => void,
        parent?: BaseComponent | HTMLElement,
        classNames?: string[],
        content?: string
    ) {
        super('button', ['button', ...(classNames ?? '')], parent, content);

        this.addListener('click', onClick);
    }

    public toggleState(): void {
        if (this.isDisabled) {
            this.enable();
        } else {
            this.disable();
        }
    }

    public disable(): void {
        this.setAttributes({ disabled: '' });
        this.isDisabled = true;
    }

    public enable(): void {
        this.removeAttr('disabled');
        this.isDisabled = false;
    }
}
