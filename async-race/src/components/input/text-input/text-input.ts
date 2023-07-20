import Input from '../input';
import { BaseComponent } from '../../base-component';
import './text-input.css';

export default class TextInput extends Input {
    constructor(parent: BaseComponent, attributes?: Record<string, string>, value?: string) {
        super(parent, { type: 'text', ...attributes }, '', value);
    }
}
