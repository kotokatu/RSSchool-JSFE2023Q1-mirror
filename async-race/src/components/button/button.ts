import { BaseComponent, ComponentParams } from '../base-component';
import './button.css';

export interface ButtonParams extends ComponentParams {
    onClick: (e: Event) => void;
}

export class Button extends BaseComponent<HTMLButtonElement> {
    private isDisabled = false;

    constructor(params: ButtonParams) {
        super({
            tag: 'button',
            classNames: ['button', ...(params.classNames ?? '')],
            parent: params.parent,
            content: params.content,
        });

        if (params.onClick) {
            this.addListener('click', params.onClick);
        }
    }

    public changeState() {
        if (this.isDisabled) {
            this.enable();
        } else {
            this.disable();
        }
    }

    public disable() {
        this.setAttributes({ disabled: '' });
        this.isDisabled = true;
    }

    public enable() {
        this.removeAttr('disabled');
        this.isDisabled = false;
    }
}
