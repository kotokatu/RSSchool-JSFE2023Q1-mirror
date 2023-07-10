import { BaseComponent } from '../../base-component';
import { PageName } from '../../../types/types';
import { Store } from '../../../store/store';
import { Button } from '../../button/button';
import Page from '../page';

export default class WinnersPage extends Page {
    constructor(store: Store) {
        super(PageName.Winners, store);
    }

    onNextBtnClick(): void {}

    onPrevBtnClick(): void {}
}
