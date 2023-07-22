import Input from '../input';
import { BaseComponent } from '../../base-component';
import './color-input.scss';

export const DEFAULT_COLOR = '#ffffff';

export class ColorInput extends Input {
    constructor(params: { parent: BaseComponent; onInput?: (e?: Event) => void; value?: string }) {
        super({
            parent: params.parent,
            attributes: { type: 'color' },
            defaultValue: DEFAULT_COLOR,
            value: params.value,
            onInput: params.onInput,
        });
    }
}
