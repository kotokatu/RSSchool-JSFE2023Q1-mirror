import { BaseComponent, ComponentParams } from '../base-component';
import './button.css';

export interface ButtonParams extends ComponentParams {
    onClick?: (e: Event) => void;
}

export class Button extends BaseComponent<HTMLButtonElement> {
    constructor(params: ButtonParams) {
        super({
            tag: 'button',
            parent: params.parent,
            classNames: ['button', ...(params.classNames ?? '')],
            content: params.content,
        });

        if (params.onClick) {
            this.addListener('click', params.onClick);
        }
    }
}
