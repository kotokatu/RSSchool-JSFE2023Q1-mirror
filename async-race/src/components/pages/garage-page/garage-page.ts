import { BaseComponent } from '../../base-component';
import { PageName } from '../../../types/types';
import Pagination from '../../pagination/pagination';
import { garageStore, Store } from '../../../store/store';
import { Button } from '../../button/button';
import Page from '../page';

export default class GaragePage extends Page {
    constructor(store: Store) {
        super(PageName.Garage, store);
    }

    onNextBtnClick(): void {}

    onPrevBtnClick(): void {}
}
