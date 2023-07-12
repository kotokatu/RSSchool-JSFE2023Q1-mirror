import { BaseComponent } from '../base-component';
import './input.css';

export default class Input extends BaseComponent<HTMLInputElement> {
    constructor(attributes: Record<string, string>) {
        super({ tag: 'input' });
        this.setAttributes(attributes);
    }

    public disable() {
        this.setAttributes({ disabled: '' });
    }

    public enable() {
        this.removeAttr('disabled');
    }

    public getValue() {
        return this.node.value;
    }

    public clearInput() {
        this.node.value = '';
    }
}
