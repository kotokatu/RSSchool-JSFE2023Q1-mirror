import { BaseComponent } from '../base-component';
import './input.css';

export default class Input extends BaseComponent<HTMLInputElement> {
    constructor(parent: BaseComponent, attributes?: Record<string, string>) {
        super({ tag: 'input', parent });
        if (attributes) {
            this.setAttributes(attributes);
        }
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

    public setValue(value: string) {
        this.node.value = value;
    }

    public clearInput() {
        this.node.value = '';
    }
}
