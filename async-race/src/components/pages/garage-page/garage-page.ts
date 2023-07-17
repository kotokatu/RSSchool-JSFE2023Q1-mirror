import { PageName } from '../../../types/types';
import { Store } from '../../../store/store';
import Page from '../page';
import { getCars, GetCarApiResponse } from '../../../utils/api-utils';
import CarGenerationControls from '../../car-generation-controls/car-generation-controls';
import AnimationControls from './animation-controls/animation-controls';
import CarTrack from './car-track/car-track';

export default class GaragePage extends Page {
    carTracks: CarTrack[] = [];
    constructor(store: Store) {
        super(PageName.Garage, store);
        this.addListener('garage-update', () => this.renderMainView());
        this.renderPageControls();
        this.renderMainView();
    }

    private renderPageControls(): void {
        const carGenerationControls = new CarGenerationControls();
        const raceAnimationControls = new AnimationControls({
            startButtonContent: 'race',
            stopButtonContent: 'reset',
            onStart: () => this.startRace(),
            onStop: () => this.resetCars(),
        });
        this.prependChildren([raceAnimationControls, carGenerationControls]);
    }

    protected async renderMainView(): Promise<void> {
        const { cars, carsCount } = await getCars(this.store.page, this.store.limit);
        this.createCarTracks(cars);
        this.updateCarsCount(carsCount);
        this.addCarsToView();
    }

    private createCarTracks(carsData: GetCarApiResponse[]): void {
        this.carTracks = [];
        carsData.forEach((data: GetCarApiResponse) => this.carTracks.push(new CarTrack(data)));
    }

    protected addCarsToView(): void {
        this.mainContainer.clearNode();
        this.carTracks.forEach((carTrack) => this.mainContainer.insertChild(carTrack));
    }

    async startRace() {
        // Promise.all(this.carTracks.map((carTrack) => carTrack.getTime()))
        // .then(() =>
        Promise.any(
            this.carTracks.map((carTrack) =>
                carTrack.getTime().then(() => carTrack.startAnimation())
            )
        )
            .then(
                (data: number[]) => {
                    console.log(data[0]);
                    // this.addCarToWinners(data);
                }
                // )
            )
            .catch((err: string) => console.log(err));
    }

    resetCars() {
        this.carTracks.map((carTrack: CarTrack) => carTrack.stopCar());
    }

    // addCarToWinners(data: number[]) {}
}
