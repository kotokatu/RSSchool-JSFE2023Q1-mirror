import { BaseComponent, ComponentParams } from '../base-component';
import './button.css';

export interface ButtonParams extends ComponentParams {
    onClick: (e: Event) => void;
}

export class Button extends BaseComponent {
    private isDisabled = false;

    constructor(params: ButtonParams) {
        super({
            tag: 'button',
            classNames: ['button', ...(params.classNames ?? '')],
            parent: params.parent,
            content: params.content,
        });

        this.addListener('click', params.onClick);
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
