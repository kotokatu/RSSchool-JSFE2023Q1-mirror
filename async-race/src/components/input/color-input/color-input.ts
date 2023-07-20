import Input from '../input';
import { BaseComponent } from '../../base-component';

export default class ColorInput extends Input {
    constructor(parent: BaseComponent, value?: string) {
        super(parent, { type: 'color' }, '#000000', value);
    }
}
