import { BaseComponent } from '../../base-component';
import { PageName } from '../../../types/types';
import { Store } from '../../../store/store';
import { Button } from '../../button/button';
import Page from '../page';
import { getCars, CarConfig } from '../../../utils/api-utils';
import Car from '../../car/car';

export default class GaragePage extends Page {
    constructor(store: Store) {
        super(PageName.Garage, store);
    }

    creatCar() {}

    protected async updateView(): Promise<void> {
        const { cars, carsCount } = await getCars(this.store.page, this.store.limit);
        this.updateCarsCount(carsCount);
        this.updateMain(cars);
    }

    protected updateMain(carConfigs: CarConfig[]): void {
        this.mainContainer.clearNode();
        carConfigs.forEach((config: CarConfig) => this.mainContainer.insertChild(new Car(config)));
    }
}
