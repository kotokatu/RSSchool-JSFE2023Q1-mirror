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
        this.getCarsData();
    }

    async getCarsData() {
        const data = await getCars(this.store.page, this.store.limit);
        if (data) {
            this.carsCountElement.setTextContent(`(#${this.store.carsCount})`);
            data.cars.forEach((config: CarConfig) =>
                this.mainContainer.insertChild(new Car(config))
            );
        }
    }

    onNextBtnClick(): void {
        this.mainContainer.removeChildren();
        this.getCarsData();
    }

    onPrevBtnClick(): void {
        this.mainContainer.removeChildren();
        this.getCarsData();
    }
}
