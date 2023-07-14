import { BaseComponent } from '../base-component';
import './input.css';

export default class Input extends BaseComponent<HTMLInputElement> {
    constructor(parent: BaseComponent, attributes: Record<string, string>, value?: string) {
        super({ tag: 'input', parent });
        this.setAttributes(attributes);

        if (value) {
            this.setValue(value);
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
