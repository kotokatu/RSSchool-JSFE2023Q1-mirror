import BaseComponent from '../../base-component';
import { delay } from '../../../utils/utils';
import './invalid-input-message.scss';

export default class InvalidInputMessage extends BaseComponent {
    constructor(parent: BaseComponent, msg: string) {
        super('p', ['error'], parent, msg);
    }

    public async show(): Promise<void> {
        this.setCssClasses(['visible']);
        await delay(1500);
        this.hide();
    }

    public hide(): void {
        this.removeCssClasses(['visible']);
    }
}
