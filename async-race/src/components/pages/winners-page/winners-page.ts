import { BaseComponent } from '../../base-component';
import { PageName } from '../../../types/types';
import { Store } from '../../../store/store';
import { Button } from '../../button/button';
import { GetCarApiResponse, getWinners } from '../../../utils/api-utils';
import Page from '../page';

export default class WinnersPage extends Page {
    constructor(store: Store) {
        super(PageName.Winners, store);
        this.renderMainView();
    }

    protected async renderMainView(): Promise<void> {
        const { cars, carsCount } = await getWinners(this.store.page, this.store.limit);
        this.updateCarsCount(carsCount);
        this.addCarsToView(cars);
    }

    protected addCarsToView(carsData: GetCarApiResponse[]): void {
        this.mainContainer.clearNode();
        carsData.forEach((data: GetCarApiResponse) =>
            this.mainContainer.setTextContent(`${data.id}`)
        );
    }
}
