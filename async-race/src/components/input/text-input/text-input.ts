import Input from '../input';
import BaseComponent from '../../base-component';
import './text-input.scss';

export default class TextInput extends Input {
    constructor(params: {
        parent: BaseComponent;
        classNames: string[];
        attributes?: Record<string, string>;
        onInput?: () => void;
        onChange?: () => void;
        value?: string;
    }) {
        super({
            parent: params.parent,
            classNames: params.classNames,
            attributes: { type: 'text', ...params.attributes },
            defaultValue: '',
            onInput: params.onInput,
            onChange: params.onChange,
            value: params.value,
        });
    }
}
