import { BaseComponent } from '../base-component';

export default class Input extends BaseComponent<HTMLInputElement> {
    private defaultValue: string;

    constructor(
        parent: BaseComponent,
        attributes: Record<string, string>,
        defaultValue: string,
        value?: string
    ) {
        super({ tag: 'input', parent });
        this.defaultValue = defaultValue;
        this.setAttributes(attributes);

        if (value) {
            this.setValue(value);
        }
    }

    public getValue(): string {
        return this.node.value;
    }

    public setValue(value: string): void {
        this.node.value = value;
    }

    public clearInput(): void {
        this.node.value = this.defaultValue;
    }
}
