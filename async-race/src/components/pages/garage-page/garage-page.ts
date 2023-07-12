import { PageName } from '../../../types/types';
import { Store } from '../../../store/store';
import Page from '../page';
import { getCars, GetCarApiResponse } from '../../../utils/api-utils';
import CarGenerationControls from '../../car-generation-controls/car-generation-controls';
import CarTrack from '../../car-track/car-track';

export default class GaragePage extends Page {
    constructor(store: Store) {
        super(PageName.Garage, store);
        const carGenerationControls = new CarGenerationControls();
        this.prependChild(carGenerationControls);
        this.addListener('garage-update', () => this.updateView());
    }

    protected async updateView(): Promise<void> {
        const { cars, carsCount } = await getCars(this.store.page, this.store.limit);
        this.updateCarsCount(carsCount);
        this.addCarsToView(cars);
    }

    protected addCarsToView(carConfigs: GetCarApiResponse[]): void {
        this.mainContainer.clearNode();
        carConfigs.forEach((config: GetCarApiResponse) =>
            this.mainContainer.insertChild(new CarTrack(config))
        );
    }
}
