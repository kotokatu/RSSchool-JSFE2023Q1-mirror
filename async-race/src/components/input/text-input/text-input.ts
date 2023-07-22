import Input from '../input';
import { BaseComponent } from '../../base-component';
import './text-input.scss';

export default class TextInput extends Input {
    constructor(params: {
        parent: BaseComponent;
        attributes?: Record<string, string>;
        onInput?: (e?: Event) => void;
        value?: string;
    }) {
        super({
            parent: params.parent,
            attributes: { type: 'text', ...params.attributes },
            defaultValue: '',
            onInput: params.onInput,
            value: params.value,
        });
    }
}
