import { BaseComponent } from '../../base-component';
import { PageName } from '../../../types/types';
import { Store } from '../../../store/store';
import { Button } from '../../button/button';
import { GetCarApiResponse, getWinners } from '../../../utils/api-utils';
import Car from '../../car-track/car/car';
import Page from '../page';

export default class WinnersPage extends Page {
    constructor(store: Store) {
        super(PageName.Winners, store);
    }

    async updateView(): Promise<void> {
        const { cars, carsCount } = await getWinners(this.store.page, this.store.limit);
        this.updateCarsCount(carsCount);
        this.addCarsToView(cars);
    }

    addCarsToView(cars: GetCarApiResponse[]): void {
        this.mainContainer.clearNode();
        console.log(cars);
        cars.forEach((config: GetCarApiResponse) =>
            this.mainContainer.setTextContent(`${config.id}`)
        );
    }
}
