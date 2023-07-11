import { BaseComponent } from '../../base-component';
import { PageName } from '../../../types/types';
import { Store } from '../../../store/store';
import { Button } from '../../button/button';
import { CarConfig, getWinners } from '../../../utils/api-utils';
import Car from '../../car/car';
import Page from '../page';

export default class WinnersPage extends Page {
    constructor(store: Store) {
        super(PageName.Winners, store);
    }

    async updateView(): Promise<void> {
        const { cars, carsCount } = await getWinners(this.store.page, this.store.limit);
        this.updateCarsCount(carsCount);
        this.updateMain(cars);
    }

    updateMain(cars: CarConfig[]): void {
        this.mainContainer.clearNode();
        cars.forEach((config: CarConfig) => this.mainContainer.insertChild(new Car(config)));
    }
}
